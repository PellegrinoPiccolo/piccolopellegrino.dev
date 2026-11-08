import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import Link from "next/link";
import type { ProjectItem, Projects } from "@/constants/type";
import { SanityImageSource } from "@sanity/image-url/signed";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import type { SiteContent } from "@/content/types";
import { localizePath } from "@/lib/i18n";
import { socialLinks } from "@/lib/site";

/**
 * recentProjects: Array<{...}> (3 most recent by releaseDate)
 *
 * - _id: string
 * - title: string | null
 * - slug: string | null
 * - kind: "Mobile app" | "Web app" | "Website" | "Desktop app" | "Tool" | null
 * - category: "app" | "web" | "desktop" | null
 * - isClientWork: boolean | null
 * - releaseDate: string | null (YYYY-MM-DD)
 * - excerpt: string | null
 * - stack: string[] | null
 * - icon: image | null
 * - cover: { asset: { _id, metadata: { lqip } }, alt?, hotspot?, crop? } | null
 */

type HeroProps = {
  content: SiteContent;
  recentProjects: Projects;
};

const Hero = ({ content, recentProjects }: HeroProps) => {
  const { hero } = content;

  return (
    <div className="w-full bg-page">
      <div className="container flex flex-col pt-15 pb-20 md:py-20 gap-4 md:gap-0">
        <h1 className="flex flex-col gap-4 md:gap-0">
          <span className="font-mono text-sm lg:text-base text-comment font-medium">
            {hero.eyebrow}
          </span>
          <span className="text-6xl md:text-hero font-bold text-heading leading-[1.1]">
            Pellegrino <br /> Piccolo
          </span>
        </h1>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mt-4">
          <p className="text-fg flex-1 text-sm md:text-lg">
            {hero.description}
          </p>
          <div className="flex flex-wrap w-full lg:w-auto lg:flex-1 justify-start md:justify-end mt-8 lg:mt-0 gap-2">
            <div className="flex grow sm:grow-0 gap-2">
              <Link
                href="#projects"
                className="flex flex-1 sm:flex-none items-center justify-center whitespace-nowrap bg-indigo-bright text-heading text-sm md:text-base px-4 md:px-8 py-2.5 md:py-3 rounded-full font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_10px_30px_-8px_var(--color-indigo-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
              >
                {hero.viewProjects}
              </Link>
              <Link
                href="#contact"
                className="flex flex-1 sm:flex-none items-center justify-center whitespace-nowrap bg-page border-2 border-divider text-heading text-sm md:text-base px-4 md:px-8 py-2.5 md:py-3 rounded-full font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:bg-indigo-deep hover:shadow-[0_10px_30px_-12px_var(--color-indicator)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
              >
                {hero.contactMe}
              </Link>
            </div>
            <div className="flex gap-2">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center justify-center group bg-page border-2 border-divider text-heading p-2.5 md:p-3 rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:bg-indigo-deep hover:text-link hover:shadow-[0_10px_30px_-12px_var(--color-indicator)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
              >
                <FiGithub className="text-xl md:text-2xl transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-8" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center group bg-page border-2 border-divider text-heading p-2.5 md:p-3 rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:bg-indigo-deep hover:text-link hover:shadow-[0_10px_30px_-12px_var(--color-indicator)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
              >
                <FiLinkedin className="text-xl md:text-2xl transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-8" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-8 lg:mt-16">
          <div className="flex flex-row justify-between items-center">
            <p className="font-mono text-fg text-xs md:text-sm">{hero.latestWork}</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <p className="font-mono text-fg text-xs md:text-sm">
                {hero.available}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recentProjects.map((project) => (
              <RecentProjectCard
                key={project._id}
                project={project}
                content={content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

const RecentProjectCard = ({
  project,
  content,
}: {
  project: ProjectItem;
  content: SiteContent;
}) => {
  return (
    <Link
      href={localizePath(content.locale, `/projects/${project.slug}`)}
      className="flex flex-col gap-4 bg-card p-4 rounded-lg transition-shadow duration-300 hover:shadow-[0_10px_30px_-12px_var(--color-indicator)]"
    >
      <div className="flex w-full aspect-16/10 items-center justify-center overflow-hidden rounded-lg border-2 border-line-card border-dashed p-2">
        {project.cover?.asset ? (
          <Image
            src={urlFor(project.cover as SanityImageSource)
              .width(600)
              .url()}
            alt={project.cover.alt ?? project.title ?? content.hero.coverAlt}
            width={600}
            height={Math.round(
              600 /
                (project.cover.asset.metadata?.dimensions?.aspectRatio ??
                  16 / 10),
            )}
            loading="eager"
            placeholder={project.cover.asset.metadata?.lqip ? "blur" : "empty"}
            blurDataURL={project.cover.asset.metadata?.lqip ?? undefined}
            sizes="(width >= 48rem) 33vw, (width >= 40rem) 50vw, 100vw"
            className="max-h-full max-w-full w-auto h-auto rounded-md"
          />
        ) : (
          <span className="font-mono text-caption text-muted">
            {project.title}
          </span>
        )}
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-heading font-bold text-lg">{project.title}</p>
        <p className="font-mono text-fg text-sm">
          {project.kind && content.kinds[project.kind]}
        </p>
      </div>
    </Link>
  );
};
