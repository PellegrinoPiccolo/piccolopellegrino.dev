"use client";

import { useState, type ReactNode } from "react";

export type ProjectCategory = "app" | "web" | "desktop";

export type ProjectsListItem = {
  id: string;
  category: ProjectCategory | null;
  year: string | null;
  card: ReactNode;
};

type Filter = ProjectCategory | "all";

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  app: "App",
  web: "Web",
  desktop: "Desktop",
};

type ProjectsListProps = {
  items: ProjectsListItem[];
};

const ProjectsList = ({ items }: ProjectsListProps) => {
  const [filter, setFilter] = useState<Filter>("all");

  const categories = (Object.keys(CATEGORY_LABELS) as ProjectCategory[]).filter(
    (category) => items.some((item) => item.category === category),
  );
  const filters: Filter[] = ["all", ...categories];

  const visible =
    filter === "all" ? items : items.filter((item) => item.category === filter);

  const groups = visible.reduce<{ year: string; items: ProjectsListItem[] }[]>(
    (acc, item) => {
      const year = item.year ?? "Upcoming";
      const group = acc.find((g) => g.year === year);
      if (group) group.items.push(item);
      else acc.push({ year, items: [item] });
      return acc;
    },
    [],
  );

  return (
    <div className="flex flex-col gap-12">
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-3"
      >
        {filters.map((value) => {
          const active = filter === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(value)}
              className={`rounded-pill border px-5 py-2 font-medium transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator ${
                active
                  ? "border-heading bg-heading text-page"
                  : "border-line-strong text-fg hover:border-indicator hover:bg-indigo-deep hover:text-link"
              }`}
            >
              {value === "all" ? "All" : CATEGORY_LABELS[value]}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="flex flex-col gap-12">
        {groups.map((group) => (
          <section
            key={group.year}
            aria-labelledby={`year-${group.year}`}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-6">
              <h2
                id={`year-${group.year}`}
                className="font-mono text-2xl md:text-3xl font-medium text-muted"
              >
                {group.year}
              </h2>
              <span aria-hidden className="h-px flex-1 bg-divider" />
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item) => (
                <li key={item.id}>{item.card}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
