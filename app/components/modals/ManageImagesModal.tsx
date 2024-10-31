import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Photo, ProcessedImage } from "@/types/gphotos";

import { useEffect, useState } from "react";
import { deleteImages } from "@/app/actions/images";
import { useToast } from "@/hooks/use-toast";
import { ImportImagesModal } from "./ImportImagesModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";

interface ManageImagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: Photo[];
  onImagesDeleted: () => void;
  onImportImages: () => void;
  userId: string;
}

const THUMBNAIL_SIZES = {
  small: {
    label: "Small",
    size: 70,
  },
  medium: {
    label: "Medium",
    size: 120,
  },
  large: {
    label: "Large",
    size: 180,
  },
} as const;

type ThumbnailSize = keyof typeof THUMBNAIL_SIZES;

export function ManageImagesModal({
  isOpen,
  onClose,
  photos,
  onImagesDeleted,
  onImportImages,
  userId,
}: ManageImagesModalProps) {
  const { toast } = useToast();
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [thumbnailSize, setThumbnailSize] = useState<ThumbnailSize>("small");

  useEffect(() => {
    if (isOpen) {
      setSelectedPhotos([]);
    }
  }, [isOpen]);

  const togglePhotoSelection = (photoId: string) => {
    setSelectedPhotos((current) =>
      current.includes(photoId)
        ? current.filter((id) => id !== photoId)
        : [...current, photoId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPhotos.length === photos.length) {
      setSelectedPhotos([]);
    } else {
      setSelectedPhotos(photos.map((photo) => photo.id));
    }
  };

  const handleDelete = async () => {
    if (!selectedPhotos.length) return;

    setIsDeleting(true);
    try {
      const result = await deleteImages(userId, selectedPhotos);
      if (result.success) {
        setSelectedPhotos([]);
        onImagesDeleted?.();
        toast({
          title: "Success",
          description: `${selectedPhotos.length} image${selectedPhotos.length > 1 ? "s" : ""} deleted successfully`,
        });

        if (selectedPhotos.length === photos.length) {
          onClose();
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to delete images",
          variant: "destructive",
        });
        console.error("Failed to delete photos:", result.error);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose} // Allow normal closing behavior
    >
      <DialogContent
        className="max-w-4xl h-[80vh] flex flex-col"
        onPointerDownOutside={(e) =>
          selectedPhotos.length > 0 && e.preventDefault()
        }
      >
        <DialogHeader>
          <DialogTitle>
            Manage Images
            {photos.length > 0 && (
              <span className="text-sm text-gray-500 ml-2">
                ({selectedPhotos.length} of {photos.length} selected)
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 min-h-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Image Management Controls */}
              <div className="flex items-center gap-2">
                <Button variant="default" onClick={onImportImages}>
                  Import more
                </Button>
              </div>

              {/* Selection Controls */}
              <div className="flex items-center gap-2 border-l pl-4">
                <button className="main-btn" onClick={toggleSelectAll}>
                  {selectedPhotos.length === photos.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
                {selectedPhotos.length > 0 && (
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    size="sm"
                    disabled={isDeleting}
                  >
                    {isDeleting
                      ? "Deleting..."
                      : `Delete selected (${selectedPhotos.length})`}
                  </Button>
                )}
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-2 border-l pl-4">
                <span className="text-sm text-muted-foreground">View:</span>
                <Select
                  value={thumbnailSize}
                  onValueChange={(value: ThumbnailSize) =>
                    setThumbnailSize(value)
                  }
                >
                  <SelectTrigger className="w-[100px]" size="sm">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(THUMBNAIL_SIZES).map(([key, { label }]) => (
                      <SelectItem key={key} value={key} className="text-sm">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="flex flex-wrap gap-2 content-start">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`relative cursor-pointer group ${
                    selectedPhotos.includes(photo.id)
                      ? "outline outline-2 outline-blue-500"
                      : ""
                  }`}
                  style={{
                    width: THUMBNAIL_SIZES[thumbnailSize].size,
                    height: THUMBNAIL_SIZES[thumbnailSize].size,
                  }}
                  onClick={() => togglePhotoSelection(photo.id)}
                >
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.id}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {selectedPhotos.includes(photo.id) && (
                    <>
                      <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-lg" />
                      <div className="absolute top-2 right-2 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                    </>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {new Date(photo.imported_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}