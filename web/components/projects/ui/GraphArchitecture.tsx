import {
  Bell,
  Cloud,
  CloudOff,
  Code,
  Database,
  Globe,
  Lock,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type {
  ProjectDecision,
  ProjectDetail,
  ProjectLayer,
} from "@/constants/type";
import type { SiteContent } from "@/content/types";

type GraphArchitectureProps = {
  content: SiteContent["architecture"];
  project: ProjectDetail;
};

const ICONS: Record<NonNullable<ProjectLayer["icon"]>, LucideIcon> = {
  bell: Bell,
  "cloud-off": CloudOff,
  cloud: Cloud,
  code: Code,
  database: Database,
  globe: Globe,
  lock: Lock,
  phone: Smartphone,
  server: Server,
};

const GraphArchitecture = ({ content, project }: GraphArchitectureProps) => {
  const layers = project.layers ?? [];
  const decisions = project.decisions ?? [];
  const core = layers.filter((layer) => layer.group !== "absent");
  const absent = layers.filter((layer) => layer.group === "absent");

  const rows = core.reduce<ProjectLayer[][]>((acc, layer, index) => {
    const previous = core[index - 1];
    if (previous?.sideBySide && acc.length) acc[acc.length - 1].push(layer);
    else acc.push([layer]);
    return acc;
  }, []);

  if (!layers.length) return <EmptyGraph content={content} />;

  return (
    <div className="flex flex-col gap-4 py-5 px-0 md:p-10">
      {rows.length > 0 && (
        <div className="flex flex-col rounded-frame border-2 border-dashed border-line-dashed p-4 md:p-6">
          {project.layersBoundary && (
            <p className="mb-4 text-label font-bold uppercase tracking-label-wide text-link">
              {project.layersBoundary}
            </p>
          )}
          {rows.map((row, index) => {
            const connector = row.findLast(
              (layer) => layer.connector,
            )?.connector;
            const isLast = index === rows.length - 1;

            return (
              <div key={row[0]._key} className="flex flex-col">
                <div
                  className={
                    row.length > 1
                      ? "grid gap-4 md:grid-cols-2"
                      : "grid grid-cols-1"
                  }
                >
                  {row.map((layer) => (
                    <LayerCard
                      key={layer._key}
                      layer={layer}
                      decisions={decisions}
                      stacked={row.length > 1}
                    />
                  ))}
                </div>
                {!isLast && (
                  <div className="ml-11.5 flex min-h-10 items-center border-l-2 border-line-strong py-2 pl-6">
                    {connector && (
                      <span className="text-caption text-muted">
                        {connector}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {absent.map((layer) => (
        <AbsentLayer key={layer._key} layer={layer} decisions={decisions} />
      ))}
    </div>
  );
};

export default GraphArchitecture;

type LayerProps = {
  layer: ProjectLayer;
  decisions: ProjectDecision[];
};

const LayerCard = ({
  layer,
  decisions,
  stacked,
}: LayerProps & { stacked: boolean }) => {
  const Icon = layer.icon ? ICONS[layer.icon] : Code;

  return (
    <div
      className={`flex flex-col gap-4 rounded-layer border border-line-card bg-card px-6 py-5 ${
        stacked ? "" : "md:flex-row md:items-center md:justify-between"
      }`}
    >
      <div className="flex items-center gap-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-icon bg-indigo-deep text-link">
          <Icon className="size-5" aria-hidden />
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xl font-bold text-heading">{layer.name}</h3>
          {layer.tech && (
            <p className="text-base text-description">{layer.tech}</p>
          )}
        </div>
      </div>
      <DecisionBadges codes={layer.decisions} decisions={decisions} />
    </div>
  );
};

const AbsentLayer = ({ layer, decisions }: LayerProps) => {
  const Icon = layer.icon ? ICONS[layer.icon] : CloudOff;

  return (
    <div className="flex flex-col gap-4 rounded-frame border-2 border-dashed border-line-dashed px-6 py-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-icon border-2 border-dashed border-line-dashed text-muted">
          <Icon className="size-5" aria-hidden />
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xl font-bold text-muted line-through">
            {layer.name}
          </h3>
          {layer.tech && (
            <p className="text-base text-description">{layer.tech}</p>
          )}
        </div>
      </div>
      <DecisionBadges codes={layer.decisions} decisions={decisions} />
    </div>
  );
};

const DecisionBadges = ({
  codes,
  decisions,
}: {
  codes: string[] | null;
  decisions: ProjectDecision[];
}) => {
  if (!codes?.length) return null;

  return (
    <div className="flex flex-wrap gap-2 md:shrink-0">
      {codes.map((code) => {
        const decision = decisions.find((d) => d.code === code);

        return (
          <a
            key={code}
            href={`#${code.toLowerCase()}`}
            className="rounded-pill border border-decision bg-indigo-deep px-3 py-1.5 font-mono text-sm font-medium text-tag transition-colors duration-300 hover:border-indicator hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
          >
            {[code, decision?.shortLabel].filter(Boolean).join(" · ")}
          </a>
        );
      })}
    </div>
  );
};

const EmptyGraph = ({
  content,
}: {
  content: SiteContent["architecture"];
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-line-card px-6 py-16 text-center">
      <p className="font-mono text-sm md:text-base text-comment">
        {content.emptyEyebrow}
      </p>
      <p className="max-w-xl text-sm md:text-lg text-description">
        {content.emptyText}
      </p>
    </div>
  );
};
