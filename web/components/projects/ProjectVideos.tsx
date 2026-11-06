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
      <div className="mt-4 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0 md:pb-0">
        {videos.map((video, index) => (
          <figure
            key={video._key}
            className="w-[75%] max-w-sm shrink-0 snap-center sm:w-[45%] md:w-[calc((100%-2rem)/3)]"
          >
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
            {video.caption && (
              <figcaption className="mt-3 px-2 text-center font-mono text-sm md:text-base text-heading">
                {video.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
};

export default ProjectVideos;
