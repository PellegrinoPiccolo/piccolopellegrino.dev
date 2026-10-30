import Link from "next/link";
import Image from "next/image";
import { FiDownload, FiExternalLink, FiGithub } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import type { SanityImageSource } from "@sanity/image-url/signed";
import type { FeaturedProjectItem } from "@/constants/type";
import { urlFor } from "@/sanity/image";

/**
 * project: FeaturedProjectItem
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
 * - links: { repo?, live?, store?, storeLabel? } | null
 * - icon: image | null
 * - cover: { asset: { _id, metadata: { lqip, dimensions } }, alt?, hotspot?, crop? } | null
 */

type ProjectCardProps = {
  project: FeaturedProjectItem;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const year = project.releaseDate?.slice(0, 4);
  const { repo, live, store, storeLabel } = project.links ?? {};

  return (
    <article className="flex flex-col h-full overflow-hidden bg-card border border-line-card rounded-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-line hover:shadow-[0_10px_30px_-12px_var(--color-indicator)]">
      <div className="relative aspect-16/10 bg-page border-b border-line-card">
        {project.cover?.asset ? (
          <Image
            src={urlFor(project.cover as SanityImageSource)
              .width(800)
              .height(500)
              .url()}
            alt={project.cover.alt ?? project.title ?? "Project cover"}
            fill
            sizes="(width >= 64rem) 33vw, (width >= 48rem) 50vw, 100vw"
            placeholder={project.cover.asset.metadata?.lqip ? "blur" : "empty"}
            blurDataURL={project.cover.asset.metadata?.lqip ?? undefined}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-caption text-muted">
            {project.title}
          </div>
        )}
        {project.kind && (
          <span className="absolute top-4 left-4 bg-page/80 backdrop-blur border border-line-strong rounded-pill px-3 py-1 font-mono text-sm text-fg lowercase">
            {project.kind}
          </span>
        )}
        <div className="absolute left-6 -bottom-8 p-1 bg-card rounded-icon-lg">
          {project.icon?.asset ? (
            <Image
              src={urlFor(project.icon as SanityImageSource)
                .width(128)
                .height(128)
                .url()}
              alt=""
              width={56}
              height={56}
              className="size-14 rounded-icon object-cover"
            />
          ) : (
            <div className="flex size-14 items-center justify-center rounded-icon bg-indigo-bright text-2xl font-bold text-heading">
              {project.title?.charAt(0)}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-6 pt-12 pb-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-h3 md:text-3xl font-bold text-heading">
            {project.title}
          </h3>
          {year && (
            <span className="font-mono text-caption text-muted">{year}</span>
          )}
        </div>
        {project.excerpt && (
          <p className="text-description line-clamp-3 md:line-clamp-3">
            {project.excerpt}
          </p>
        )}
        {project.stack?.length ? (
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="border border-indicator rounded-tag px-2.5 py-1 font-mono font-bold text-xs text-indicator"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <Link
            href={`/projects/${project.slug}`}
            className="group flex items-center gap-2 font-bold text-link transition-colors hover:text-tag focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
          >
            Read case study
            <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <div className="flex gap-2">
            {repo && (
              <ProjectLink href={repo} label="Source code">
                <FiGithub />
              </ProjectLink>
            )}
            {live && (
              <ProjectLink href={live} label="Live site">
                <FiExternalLink />
              </ProjectLink>
            )}
            {store && (
              <ProjectLink href={store} label={storeLabel ?? "Download"}>
                <FiDownload />
              </ProjectLink>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;

const ProjectLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="flex size-11 items-center justify-center rounded-layer border border-line-strong text-xl text-heading transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:bg-indigo-deep hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
    >
      {children}
    </a>
  );
};
