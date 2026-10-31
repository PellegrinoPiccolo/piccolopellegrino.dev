import type { Stack as StackData, StackGroup } from "@/constants/type";
import React from "react";
import Link from "next/link";

type StackProps = {
  stack: StackData;
};

const Stack = ({ stack }: StackProps) => {
  return (
    <section
      className="w-full bg-section scroll-mt-20"
      id="stack"
      aria-labelledby="stack-heading"
    >
      <div className="container py-20 flex flex-col items-start gap-4">
        <p className="text-primary font-mono text-base">03 — Stack</p>
        <h2
          id="stack-heading"
          className="text-3xl md:text-5xl font-bold text-heading"
        >
          Tools I ship with
        </h2>
        <p className="text-description text-lg">
          Grouped by what they&apos;re for, and linked to where I used them.
        </p>
        {stack?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mt-8 border-b border-divider">
            {stack.map((item) => {
              return <StackComponent key={item._key} stackItem={item} />;
            })}
          </div>
        ) : (
          <EmptyStack />
        )}
      </div>
    </section>
  );
};

export default Stack;

// StackGroup = {
//   _key: string;
//   title: string | null;
//   items: string[] | null;
//   projects: { _id: string; title: string | null; slug: string | null }[] | null;
//   note: string | null;
// }
const StackComponent = ({ stackItem }: { stackItem: StackGroup }) => {
  const items = stackItem.items ?? [];
  const projects = stackItem.projects ?? [];

  return (
    <div className="flex flex-col items-start gap-2 md:gap-4 border-t border-divider py-8 md:pr-8">
      <h3 className="text-xl font-bold text-heading">{stackItem.title}</h3>
      {items.length ? (
        <p className="text-fg text-base font-medium font-mono">
          {items.map((item, index) => (
            <React.Fragment key={item}>
              <span>{item}</span>
              {index !== items.length - 1 && <span> - </span>}
            </React.Fragment>
          ))}
        </p>
      ) : (
        <p className="font-mono text-sm text-comment">{"/* Coming soon */"}</p>
      )}
      {stackItem.note && (
        <p className="text-comment text-sm font-mono">{stackItem.note}</p>
      )}
      {projects.length > 0 && (
        <p className="text-fg text-base font-medium">
          Used in{" "}
          {projects.map((project, index) => (
            <React.Fragment key={project._id}>
              <Link
                href={`/projects/${project.slug ?? ""}`}
                className="text-link hover:underline"
              >
                {project.title}
              </Link>
              {index !== projects.length - 1 && <span>, </span>}
            </React.Fragment>
          ))}
        </p>
      )}
    </div>
  );
};

const EmptyStack = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-line-card px-6 py-16 text-center">
      <p className="font-mono text-sm md:text-base text-comment">
        {"/* Work in progress */"}
      </p>
      <p className="max-w-xl text-sm md:text-lg text-description">
        I&apos;m putting together the tools I work with. Check back soon.
      </p>
    </div>
  );
};
