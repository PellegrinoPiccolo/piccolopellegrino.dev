import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import type { SanityImageSource } from "@sanity/image-url";
import type { ProjectDetail } from "@/constants/type";
import { urlFor } from "@/sanity/image";

type ProjectHeroProps = {
  project: ProjectDetail;
};

const ProjectHero = ({ project }: ProjectHeroProps) => {
  const InfoSection = [
    {
      title: "Role",
      value: project.role,
    },
    {
      title: "Platforms",
      value: project.platforms,
    },
    {
      title: "Architecture",
      value: project.architectureSummary,
    },
    {
      title: "Key decisions",
      value: project.decisions?.length ?? 0,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-8">
      <div className="flex flex-col gap-4 md:flex-2">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-indicator"
        >
          <FaArrowLeft />
          All projects
        </Link>
        <div className="flex flex-row items-center gap-4">
          {project.icon?.asset ? (
            <Image
              src={urlFor(project.icon as SanityImageSource)
                .width(128)
                .height(128)
                .url()}
              alt=""
              width={64}
              height={64}
              className="size-16 rounded-icon object-cover"
            />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-icon bg-indigo-bright text-2xl font-bold text-heading">
              {project.title?.charAt(0)}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-heading">{project.title}</h1>
            <p className="text-base text-description">
              {[
                project.kind,
                project.releaseDate &&
                  `Released ${new Date(project.releaseDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      year: "numeric",
                      timeZone: "UTC",
                    },
                  )}`,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        </div>
        <p className="text-base text-description">{project.excerpt}</p>
        <div className="flex flex-row gap-4 mt-4 flex-wrap">
          {project.stack?.map((stack) => (
            <span
              key={stack}
              className="text-sm text-indicator border border-indicator/40 p-2 rounded-lg font-mono font-medium"
            >
              {stack}
            </span>
          ))}
        </div>
        <div className="flex flex-row gap-4 mt-4 flex-wrap">
          {project.links?.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-line-strong bg-card px-6 py-3 font-bold text-heading transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:bg-indigo-deep hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
            >
              <FiGithub className="text-xl" />
              Code
            </a>
          )}
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg bg-primary px-6 py-3 font-bold text-heading transition-all duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
            >
              Visit site
              <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          {project.links?.store && (
            <a
              href={project.links.store}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg bg-green-700 px-6 py-3 font-bold text-heading transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
            >
              {project.links.storeLabel ?? "Download"}
              <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-8 bg-card border border-primary/40 rounded-lg p-8 w-full md:flex-1">
        {InfoSection.map((info) => (
          <div key={info.title} className="flex flex-col">
            <span className="font-bold text-description uppercase text-sm">
              {info.title}
            </span>
            <span className="text-base text-heading font-bold">
              {info.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectHero;
