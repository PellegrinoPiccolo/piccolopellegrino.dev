import type { ProjectDetail } from "@/constants/type";
import type { SiteContent } from "@/content/types";
import { format } from "@/lib/i18n";
import VideoPlayer from "./ui/VideoPlayer";

type ProjectVideosProps = {
  content: SiteContent["videos"];
  project: ProjectDetail;
};

const ProjectVideos = ({ content, project }: ProjectVideosProps) => {
  const videos = project.videos?.filter((video) => video.url) ?? [];

  if (!videos.length) return null;

  const single = videos.length === 1;
  const hasCaptions = videos.some((video) => video.caption);
  const itemClassName = `${single ? "w-full" : "w-[70vw] sm:w-[42vw]"} mx-auto max-w-[calc(75svh*9/16)] shrink-0 snap-center md:w-[calc((100%-2rem)/3)]`;
  const rowClassName = "flex gap-4 md:flex-wrap md:justify-center";

  return (
    <section aria-labelledby="videos-heading" className="flex flex-col gap-2">
      <p className="text-primary font-mono text-base">{content.eyebrow}</p>
      <h2
        id="videos-heading"
        className="text-3xl md:text-5xl font-bold text-heading leading-snug"
      >
        {content.heading}
      </h2>
      <p className="text-description text-lg">{content.description}</p>
      <div className="mt-4 snap-x snap-mandatory overflow-x-auto md:overflow-visible">
        <div
          className={`flex flex-col gap-3 ${single ? "w-full" : "w-max min-w-full md:w-full"}`}
        >
          <div className={`${rowClassName} rounded-lg bg-card/40 p-2 md:p-4`}>
            {videos.map((video, index) => (
              <div key={video._key} className={itemClassName}>
                <VideoPlayer
                  video={video}
                  label={
                    video.label ??
                    format(content.videoLabel, {
                      index: index + 1,
                      count: videos.length,
                    })
                  }
                />
              </div>
            ))}
          </div>
          {hasCaptions && (
            <div className={`${rowClassName} px-2 md:px-4`}>
              {videos.map((video) => (
                <p
                  key={video._key}
                  className={`${itemClassName} px-2 text-center font-mono text-sm md:text-base text-heading`}
                >
                  {video.caption}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectVideos;
