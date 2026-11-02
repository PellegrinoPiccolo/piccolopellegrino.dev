import type { ProjectDetail } from "@/constants/type";
import GraphArchitecture from "./ui/GraphArchitecture";

type ProjectArchitectureProps = {
  project: ProjectDetail;
};

const ProjectArchitecture = ({ project }: ProjectArchitectureProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-primary font-mono text-base">02 — Architecture</p>
      <h2
        id="architecture-heading"
        className="text-3xl md:text-5xl font-bold text-heading leading-snug"
      >
        How it&apos;s built
      </h2>
      <p className="text-description text-lg">
        The app, layer by layer. Each badge links to the decision that shaped
        that layer.
      </p>
      <GraphArchitecture project={project} />
    </div>
  );
};

export default ProjectArchitecture;
