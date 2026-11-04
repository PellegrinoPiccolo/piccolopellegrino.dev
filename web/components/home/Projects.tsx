import Link from "next/link";
import { FeaturedProjects } from "@/constants/type";
import type { SiteContent } from "@/content/types";
import { localizePath } from "@/lib/i18n";
import ProjectCard from "../ui/ProjectCard";
import { FaArrowRight } from "react-icons/fa6";

type ProjectsProps = {
  content: SiteContent;
  featuredProjects: FeaturedProjects;
};

const Projects = ({ content, featuredProjects }: ProjectsProps) => {
  const { homeProjects } = content;

  return (
    <section
      className="w-full bg-section scroll-mt-20"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className="container py-20 flex flex-col gap-2">
        <p className="text-primary font-mono text-base">
          {homeProjects.eyebrow}
        </p>
        <div className="flex flex-row justify-between items-center">
          <h2
            id="projects-heading"
            className="text-3xl md:text-5xl font-bold text-heading"
          >
            {homeProjects.heading}
          </h2>
          <Link
            href={localizePath(content.locale, "/projects")}
            className="text-sm md:text-base text-link flex flex-row items-center gap-2"
          >
            <span>{homeProjects.allProjects}</span>
            <FaArrowRight />
          </Link>
        </div>
        {featuredProjects?.length ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                content={content}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyProjects content={homeProjects} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;

const EmptyProjects = ({
  content,
}: {
  content: SiteContent["homeProjects"];
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center bg-card rounded-lg p-4">
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-line-card px-6 py-16 md:py-24">
        <p className="font-mono text-sm md:text-base text-comment">
          {content.emptyEyebrow}
        </p>
        <h3 className="text-3xl md:text-h2 text-heading">
          {content.emptyTitle}
        </h3>
        <p className="max-w-xl text-sm md:text-lg text-description">
          {content.emptyText}
        </p>
        <Link
          href="#contact"
          className="mt-4 flex items-center justify-center whitespace-nowrap bg-page border-2 border-divider text-heading text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-full font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:bg-indigo-deep hover:shadow-[0_10px_30px_-12px_var(--color-indicator)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
        >
          {content.contactMe}
        </Link>
      </div>
    </div>
  );
};
