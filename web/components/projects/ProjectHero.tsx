import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import type { SanityImageSource } from "@sanity/image-url";
import type { ProjectDetail } from "@/constants/type";
import type { SiteContent } from "@/content/types";
import { format, localizePath } from "@/lib/i18n";
import { urlFor } from "@/sanity/image";

type ProjectHeroProps = {
  content: SiteContent;
  project: ProjectDetail;
};

const ProjectHero = ({ content, project }: ProjectHeroProps) => {
  const t = content.projectHero;
  const InfoSection = [
    {
      title: t.role,
      value: project.role,
    },
    {
      title: t.platforms,
      value: project.platforms,
    },
    {
      title: t.architecture,
      value: project.architectureSummary,
    },
    {
      title: t.keyDecisions,
      value: project.decisions?.length ?? 0,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-8">
      <div className="flex w-full min-w-0 flex-col gap-4 md:flex-2">
        <Link
          href={localizePath(content.locale, "/projects")}
          className="flex items-center gap-2 text-indicator"
        >
          <FaArrowLeft />
          {t.allProjects}
        </Link>
        <div className="flex min-w-0 flex-col md:flex-row items-center justify-center md:justify-start gap-4 mt-4">
          {project.icon?.asset ? (
            <Image
              src={urlFor(project.icon as SanityImageSource)
                .width(128)
                .height(128)
                .url()}
              alt=""
              width={64}
              height={64}
              className="size-16 shrink-0 rounded-icon object-cover"
            />
          ) : (
            <div className="flex size-16 shrink-0 items-center justify-center rounded-icon bg-indigo-bright text-2xl font-bold text-heading">
              {project.title?.charAt(0)}
            </div>
          )}
          <div className="flex min-w-0 flex-col gap-2 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-heading wrap-break-word">
                {project.title}
              </h1>
              {project.isClientWork && (
                <span className="shrink-0 border border-indicator rounded-pill px-3 py-1 font-mono text-sm text-indicator lowercase">
                  {content.clientWork}
                </span>
              )}
            </div>
            <p className="text-base text-description">
              {[
                project.kind && content.kinds[project.kind],
                project.releaseDate &&
                  format(t.released, {
                    date: new Date(project.releaseDate).toLocaleDateString(
                      content.dateLocale,
                      {
                        month: "short",
                        year: "numeric",
                        timeZone: "UTC",
                      },
                    ),
                  }),
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        </div>
        <p className="text-base text-description text-center md:text-left">
          {project.excerpt}
        </p>
        <div className="flex flex-row items-center justify-center md:justify-start gap-4 mt-4 flex-wrap">
          {project.stack?.map((stack) => (
            <span
              key={stack}
              className="text-sm text-indicator border border-indicator/40 p-2 rounded-lg font-mono font-medium"
            >
              {stack}
            </span>
          ))}
        </div>
        <div className="flex flex-row justify-center md:justify-start gap-4 mt-4 flex-wrap">
          {project.links?.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-line-strong bg-card px-6 py-3 font-bold text-heading transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:bg-indigo-deep hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
            >
              <FiGithub className="text-xl" />
              {t.code}
            </a>
          )}
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg bg-indigo-bright px-6 py-3 font-bold text-heading transition-all duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
            >
              {t.visitSite}
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
              {project.links.storeLabel ?? t.download}
              <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-8 bg-card border border-primary/40 rounded-lg p-4 md:p-8 w-full md:flex-1">
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
