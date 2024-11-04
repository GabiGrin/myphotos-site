import { Album, AlbumWithCoverPhoto, LayoutConfig } from "@/types/gphotos";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import { EmailIcon, WebsiteIcon } from "./icons/icons";
import Link from "next/link";
import ShareButton from "./buttons/ShareButton";
import BrandingFooter from "./BrandingFooter";

export default function UserAlbums({
  layoutConfig,
  albums,
}: {
  layoutConfig: LayoutConfig;
  albums: AlbumWithCoverPhoto[];
}) {
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen mx-4">
        <div className="flex-grow flex flex-col items-center py-4 mt-8 max-w-6xl mx-auto pb-16 w-full relative 2xl:max-w-7xl">
          {/* Action buttons container - mobile: centered row, desktop: split to corners */}
          <div className="w-full flex justify-center md:justify-between items-center mb-8 md:mb-0">
            {/* Email and Website buttons */}
            <div className="flex flex-row md:flex-col gap-2">
              {layoutConfig.buttons?.email?.show && (
                <SimpleTooltip content="Contact via Email" side="right">
                  <a
                    href={`mailto:${layoutConfig.buttons.email.value}?subject=Inquiry about your GPhotos.site gallery`}
                    className="main-btn icon-btn"
                  >
                    <EmailIcon />
                  </a>
                </SimpleTooltip>
              )}
              {layoutConfig.buttons?.website?.show && (
                <SimpleTooltip content="Visit Author's Website" side="right">
                  <a
                    href={layoutConfig.buttons.website.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="main-btn icon-btn !py-[5px]"
                  >
                    <WebsiteIcon />
                  </a>
                </SimpleTooltip>
              )}
            </div>

            {/* Share button */}
            {layoutConfig.buttons?.share?.show && (
              <div className="md:absolute md:right-0 md:top-4">
                <ShareButton
                  title={layoutConfig.content?.title?.value || "Photo Gallery"}
                />
              </div>
            )}
          </div>

          <header className="flex flex-col items-center max-w-4xl mb-8">
            {layoutConfig.content?.title?.show && (
              <h1 className="text-3xl mb-6 px-4 tracking-tight">
                {layoutConfig.content.title.value}
              </h1>
            )}
            {layoutConfig.content?.description?.show && (
              <h3 className="text-center mb-6 text-[#444] tracking-tight">
                {layoutConfig.content.description.value}
              </h3>
            )}
          </header>

          <div className="w-full gap-3 flex flex-wrap flex-row">
            {albums.map((album) => (
              <Link
                key={album.id}
                href={`/${album.id}`}
                className="w-[406px] group flex flex-col bg-white rounded-sm overflow-hidden border border-stone-200 hover:border-gray-300 transition-all"
              >
                <div className="h-[393px] max-w-full relative shadow-lg">
                  {album.coverPhoto && (
                    <img
                      src={album.coverPhoto.thumbnailUrl}
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4 antialiased">
                  <h3 className="text-[32px] tracking-tighter letter font-medium  group-hover:text-gray-700 line-clamp-1">
                    {album.title}
                  </h3>
                  {album.description && (
                    <p className="text-[16px] font-normal tracking-tight line-clamp-2 overflow-hidden">
                      {album.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <BrandingFooter />
      </div>
    </TooltipProvider>
  );
}