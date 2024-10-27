import { CreateImageUploadJobData, Job, JobType } from "@/types/gphotos";
import { Database } from "@/types/supabase";
import { createServerApi } from "@/utils/dal/server-api";
import { createServiceClient } from "@/utils/supabase/service";
import { NextRequest, NextResponse } from "next/server";
import logger from "@/utils/logger";
import { getGPhotosClient } from "@/utils/gphotos";
import { createThumbnail } from "@/utils/create-thumbnail";
import { processGPhotosImage } from "@/utils/process-gphotos-image";
import posthogServer from "@/utils/posthog";

type InsertPayload<T> = {
  type: "INSERT";
  table: string;
  schema: string;
  record: T;
  old_record: null;
};

export async function POST(req: NextRequest) {
  const body = await req.json();

  const payload = body as InsertPayload<
    Database["public"]["Tables"]["jobs"]["Row"]
  >;

  const newJob = payload.record as Job;

  logger.info({ jobId: newJob.id, jobType: newJob.type }, "New job received");
  posthogServer.capture({
    distinctId: newJob.user_id,
    event: "job_started",
    properties: {
      jobId: newJob.id,
      jobType: newJob.type,
    },
  });

  const client = createServiceClient();
  const serverApi = createServerApi(client);

  function normalizeError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === "string") {
      return error;
    }
    if (error && typeof error === "object" && "toString" in error) {
      try {
        return JSON.stringify(error);
      } catch (e) {
        return error.toString();
      }
    }
    return "An unknown error occurred";
  }

  try {
    await serverApi.markJobAsProcessing(newJob.id);
    logger.debug({ jobId: newJob.id }, "Job marked as processing");

    const gphotos = getGPhotosClient();

    switch (newJob.type) {
      case JobType.PROCESS_PAGE: {
        logger.info({ jobId: newJob.id }, "Processing PROCESS_PAGE job");

        const items = await gphotos.listMediaItems({
          sessionId: newJob.session_id,
          googleAccessToken: newJob.job_data.googleAccessToken,
          pageSize: newJob.job_data.pageSize,
          pageToken: newJob.job_data.pageToken,
        });

        logger.info(
          { jobId: newJob.id, itemsCount: items.mediaItems.length },
          "Processed page"
        );

        if (items.nextPageToken) {
          logger.info(
            { jobId: newJob.id, nextPageToken: items.nextPageToken },
            "Creating next page job"
          );
          const nextJob = await serverApi.createProcessPageJob({
            parentJobId: newJob.id,
            pageToken: items.nextPageToken,
            pageSize: newJob.job_data.pageSize,
            sessionId: newJob.session_id,
            googleAccessToken: newJob.job_data.googleAccessToken,
            userId: newJob.user_id,
          });
          logger.info(
            { jobId: newJob.id, nextJobId: nextJob.id },
            "Next page job created"
          );
        }

        for (const item of items.mediaItems) {
          logger.info(
            { jobId: newJob.id, itemId: item.id },
            "Creating image upload job"
          );
          if (item.type !== "PHOTO") {
            logger.info(
              { jobId: newJob.id, itemId: item.id },
              "Skipping non-image item"
            );
            continue;
          }
          try {
            await serverApi.createImageUploadJob({
              parentJobId: newJob.id,
              mediaItem: item,
              googleAccessToken: newJob.job_data.googleAccessToken,
              userId: newJob.user_id,
              sessionId: newJob.session_id,
            });
            logger.info(
              { jobId: newJob.id, itemId: item.id },
              "Image upload job created"
            );
          } catch (error) {
            logger.error(
              { jobId: newJob.id, itemId: item.id, error: error },
              "Error creating image upload job"
            );
          }
          logger.info({ jobId: newJob.id }, "Marking job as completed");
          await serverApi.markJobAsCompleted(newJob.id);
          logger.info({ jobId: newJob.id }, "Job marked as completed");

          posthogServer.capture({
            distinctId: newJob.user_id,
            event: "process_page_completed",
            properties: {
              jobId: newJob.id,
              itemsCount: items.mediaItems.length,
              hasNextPage: !!items.nextPageToken,
            },
          });
        }
        break;
      }
      case JobType.UPLOAD_IMAGE: {
        const { mediaItem, googleAccessToken } = newJob.job_data;
        try {
          await processGPhotosImage({
            userId: newJob.user_id,
            sessionId: newJob.session_id,
            mediaItem,
            googleAccessToken,
            thumbnailWidth: 400,
          });

          logger.info(
            { jobId: newJob.id, mediaItemId: mediaItem.id },
            "Image processed and added to database"
          );
        } catch (error) {
          logger.error(
            { jobId: newJob.id, mediaItemId: mediaItem.id, error: error },
            "Error processing image upload"
          );
          throw error;
        }

        posthogServer.capture({
          distinctId: newJob.user_id,
          event: "image_upload_completed",
          properties: {
            jobId: newJob.id,
            mediaItemId: mediaItem.id,
          },
        });

        break;
      }
      default: {
        //@ts-expect-error
        throw new Error(`Invalid job type: ${newJob.type}`);
      }
    }

    await serverApi.markJobAsCompleted(newJob.id);
    logger.info({ jobId: newJob.id }, "Job processing completed");

    posthogServer.capture({
      distinctId: newJob.user_id,
      event: "job_completed",
      properties: {
        jobId: newJob.id,
        jobType: newJob.type,
      },
    });

    return NextResponse.json(
      { message: "Job processing completed" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = normalizeError(error);
    await serverApi.markJobAsFailed(newJob.id, errorMessage);

    logger.error(
      { jobId: newJob.id, error: errorMessage },
      "Job processing failed"
    );

    posthogServer.capture({
      distinctId: newJob.user_id,
      event: "job_failed",
      properties: {
        jobId: newJob.id,
        jobType: newJob.type,
        error: errorMessage,
      },
    });

    return NextResponse.json(
      { message: "Job processing failed" },
      { status: 200 }
    );
  }
}
