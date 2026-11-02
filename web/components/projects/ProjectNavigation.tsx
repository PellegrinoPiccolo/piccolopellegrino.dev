import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import type { ProjectDetail, ProjectSibling } from "@/constants/type";

type ProjectNavigationProps = {
  project: ProjectDetail;
};

const ProjectNavigation = ({ project }: ProjectNavigationProps) => {
  const siblings = project.siblings.filter((sibling) => sibling.slug);
  const index = siblings.findIndex((sibling) => sibling.slug === project.slug);

  if (index === -1 || siblings.length < 2) return null;

  const prev = siblings[(index - 1 + siblings.length) % siblings.length];
  const next = siblings[(index + 1) % siblings.length];

  return (
    <nav aria-label="Project navigation" className="flex flex-col gap-2">
      <p className="text-primary font-mono text-base">04 — More projects</p>
      <h2 className="text-3xl md:text-5xl font-bold text-heading leading-snug">
        Keep exploring
      </h2>
      <p className="text-description text-lg">
        Project {index + 1} of {siblings.length}.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <NavigationLink sibling={prev} direction="prev" />
        {next.slug !== prev.slug && (
          <NavigationLink sibling={next} direction="next" />
        )}
      </div>
    </nav>
  );
};

export default ProjectNavigation;

const NavigationLink = ({
  sibling,
  direction,
}: {
  sibling: ProjectSibling;
  direction: "prev" | "next";
}) => {
  const isNext = direction === "next";

  return (
    <Link
      href={`/projects/${sibling.slug}`}
      rel={direction}
      className={`group flex flex-col gap-2 rounded-card border border-line-card bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:shadow-[0_10px_30px_-12px_var(--color-indicator)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator ${
        isNext ? "md:col-start-2 md:items-end md:text-right" : ""
      }`}
    >
      <span
        className={`flex items-center gap-2 font-mono text-sm text-indicator ${
          isNext ? "md:flex-row-reverse" : ""
        }`}
      >
        {isNext ? (
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        ) : (
          <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
        )}
        {isNext ? "Next project" : "Previous project"}
      </span>
      <span className="text-2xl md:text-3xl font-bold text-heading">
        {sibling.title}
      </span>
    </Link>
  );
};
