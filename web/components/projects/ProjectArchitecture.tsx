import type { ProjectDetail } from "@/constants/type";
import type { SiteContent } from "@/content/types";
import GraphArchitecture from "./ui/GraphArchitecture";

type ProjectArchitectureProps = {
  content: SiteContent["architecture"];
  project: ProjectDetail;
};

const ProjectArchitecture = ({ content, project }: ProjectArchitectureProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-primary font-mono text-base">{content.eyebrow}</p>
      <h2
        id="architecture-heading"
        className="text-3xl md:text-5xl font-bold text-heading leading-snug"
      >
        {content.heading}
      </h2>
      <p className="text-description text-lg">
        {content.description}
      </p>
      <GraphArchitecture content={content} project={project} />
    </div>
  );
};

export default ProjectArchitecture;
