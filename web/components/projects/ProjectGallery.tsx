import type { ProjectDetail } from "@/constants/type";
import type { SiteContent } from "@/content/types";
import Carousel from "./ui/Carousel";

type ProjectGalleryProps = {
  content: SiteContent["gallery"];
  project: ProjectDetail;
};

const ProjectGallery = ({ content, project }: ProjectGalleryProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-comment font-mono text-base">{content.eyebrow}</p>
      <h2
        id="gallery-heading"
        className="text-3xl md:text-5xl font-bold text-heading leading-snug"
      >
        {content.heading}
      </h2>
      <p className="text-description text-lg">
        {content.description}
      </p>
      <div className="mt-4">
        {project.gallery?.length ? (
          <Carousel images={project.gallery} imageAlt={content.imageAlt} />
        ) : (
          <EmptyGallery content={content} />
        )}
      </div>
    </div>
  );
};

export default ProjectGallery;

const EmptyGallery = ({ content }: { content: SiteContent["gallery"] }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-line-card px-6 py-16 text-center">
      <p className="font-mono text-sm md:text-base text-comment">
        {content.emptyEyebrow}
      </p>
      <p className="max-w-xl text-sm md:text-lg text-description">
        {content.emptyText}
      </p>
    </div>
  );
};
