import type { ProjectDetail } from "@/constants/type";
import Carousel from "./ui/Carousel";

type ProjectGalleryProps = {
  project: ProjectDetail;
};

const ProjectGallery = ({ project }: ProjectGalleryProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-primary font-mono text-base">01 — Gallery</p>
      <h2
        id="contact-heading"
        className="text-3xl md:text-5xl font-bold text-heading leading-snug"
      >
        The app, screen by screen
      </h2>
      <p className="text-description text-lg">
        A look at the main screens of the app.
      </p>
      <div className="mt-4">
        {project.gallery?.length ? (
          <Carousel images={project.gallery} />
        ) : (
          <EmptyGallery />
        )}
      </div>
    </div>
  );
};

export default ProjectGallery;

const EmptyGallery = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-line-card px-6 py-16 text-center">
      <p className="font-mono text-sm md:text-base text-comment">
        {"/* No screenshots */"}
      </p>
      <p className="max-w-xl text-sm md:text-lg text-description">
        There are no screens available for this project.
      </p>
    </div>
  );
};
