import type { ProjectDetail } from "@/constants/type";
import DecisionCard from "./ui/DecisionCard";

type ProjectDecisionsProps = {
  project: ProjectDetail;
};

const ProjectDecisions = ({ project }: ProjectDecisionsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-primary font-mono text-base">03 — Decisions</p>
      <h2
        id="decisions-heading"
        className="text-3xl md:text-5xl font-bold text-heading leading-snug"
      >
        Decision log
      </h2>
      <p className="text-description text-lg">
        Context, choice and the price paid for each one.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {project.decisions?.map((decision) => (
          <DecisionCard key={decision._key} decision={decision} />
        ))}
      </div>
    </div>
  );
};

export default ProjectDecisions;
