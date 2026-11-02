import type { ProjectDecision } from "@/constants/type";

type DecisionCardProps = {
  decision: ProjectDecision;
};

// ProjectDecision = {
//   _key: string;
//   code: string | null;
//   title: string | null;
//   shortLabel: string | null;
//   context: string | null;
//   decision: string | null;
//   tradeoff: string | null;
//   alternatives: string[] | null;
// }

const DecisionCard = ({ decision }: DecisionCardProps) => {
  const DecisionContent = [
    {
      title: "Context",
      content: decision.context,
    },
    {
      title: "Decision",
      content: decision.decision,
    },
    {
      title: "Tradeoff",
      content: decision.tradeoff,
    },
    {
      title: "Alternatives",
      content: decision.alternatives?.join(", "),
    },
  ];

  return (
    <div
      className="flex flex-col gap-8 bg-card border border-divider rounded-lg p-4 scroll-mt-20 target:animate-highlight"
      id={decision.code?.toLowerCase()}
    >
      <div className="flex flex-row gap-2 items-center">
        <div className="bg-indicator/15 rounded-lg py-1 px-2 text-indicator font-medium font-mono">
          {decision.code}
        </div>
        <p className="text-heading font-bold">{decision.title}</p>
      </div>
      {DecisionContent.map(({ title, content }) => (
        <div key={title} className="flex flex-col gap-1">
          <p className="text-description text-sm uppercase font-medium">
            {title}
          </p>
          <p className="text-heading text-base font-medium">{content}</p>
        </div>
      ))}
    </div>
  );
};

export default DecisionCard;
