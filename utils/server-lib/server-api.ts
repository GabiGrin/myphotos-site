import {
  CreateProcessPageJobData,
  CreateImageUploadJobData,
  JobType,
  JobStatus,
} from "@/types/gphotos";
import { Database, Json } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export interface BaseJobDto {
  sessionId: string;
  googleAccessToken: string;
  userId: string;
  parentJobId?: string;
}

export interface CreateProcessPageJobDto
  extends BaseJobDto,
    CreateProcessPageJobData {}

export interface CreateImageUploadJobDto
  extends BaseJobDto,
    CreateImageUploadJobData {}

export function createServerApi(client: SupabaseClient<Database>) {
  return {
    createProcessPageJob: async (data: CreateProcessPageJobDto) => {
      const res = await client
        .from("jobs")
        .insert({
          type: JobType.PROCESS_PAGE,
          session_id: data.sessionId,
          job_data: {
            googleAccessToken: data.googleAccessToken,
            pageToken: data.pageToken,
            pageSize: data.pageSize,
          },
          user_id: data.userId,
          parent_job_id: data.parentJobId,
        })
        .select();
      if (res.error) {
        throw new Error(res.error.message);
      }
      if (!res.data) {
        throw new Error("No data returned from insert");
      }
      return res.data[0];
    },
    createImageUploadJob: async (data: CreateImageUploadJobDto) => {
      const res = await client
        .from("jobs")
        .insert({
          type: JobType.UPLOAD_IMAGE,
          session_id: data.sessionId,
          job_data: {
            imageFile: data.imageFile as unknown as Json,
            googleAccessToken: data.googleAccessToken,
          },
          user_id: data.userId,
          parent_job_id: data.parentJobId,
        })
        .select();
      if (res.error) {
        throw new Error(res.error.message);
      }
      if (!res.data) {
        throw new Error("No data returned from insert");
      }
      return res.data[0];
    },
    markJobAsProcessing: async (jobId: string) => {
      const res = await client
        .from("jobs")
        .update({
          status: JobStatus.PROCESSING,
          updated_at: new Date().toISOString(),
        })
        .eq("id", jobId);

      if (res.error) {
        throw new Error(res.error.message);
      }
    },
    markJobAsCompleted: async (jobId: string) => {
      const res = await client
        .from("jobs")
        .update({
          status: JobStatus.COMPLETED,
          updated_at: new Date().toISOString(),
        })
        .eq("id", jobId);

      if (res.error) {
        throw new Error(res.error.message);
      }
    },
    markJobAsFailed: async (jobId: string, errorMessage: string) => {
      const res = await client
        .from("jobs")
        .update({
          status: JobStatus.FAILED,
          updated_at: new Date().toISOString(),
          last_error: errorMessage,
        })
        .eq("id", jobId);
      if (res.error) {
        throw new Error(res.error.message);
      }
    },
  };
}
