import type { ProjectDetail } from "@/constants/type";
import type { SiteContent } from "@/content/types";
import DecisionCard from "./ui/DecisionCard";

type ProjectDecisionsProps = {
  content: SiteContent["decisions"];
  project: ProjectDetail;
};

const ProjectDecisions = ({ content, project }: ProjectDecisionsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-primary font-mono text-base">{content.eyebrow}</p>
      <h2
        id="decisions-heading"
        className="text-3xl md:text-5xl font-bold text-heading leading-snug"
      >
        {content.heading}
      </h2>
      <p className="text-description text-lg">
        {content.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {project.decisions?.map((decision) => (
          <DecisionCard
            key={decision._key}
            decision={decision}
            content={content}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectDecisions;
