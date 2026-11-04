import { LuMapPin } from "react-icons/lu";
import type { SiteContent } from "@/content/types";
import { format } from "@/lib/i18n";
import { serviceArea } from "@/lib/site";

type ServicesProps = {
  content: SiteContent["services"];
};

const Services = ({ content }: ServicesProps) => {
  const nearbyTowns = serviceArea.towns.filter(
    (town) => town !== serviceArea.home,
  );

  return (
    <section
      className="w-full bg-page scroll-mt-20"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="container py-20 flex flex-col items-start gap-4">
        <p className="text-primary font-mono text-base">{content.eyebrow}</p>
        <h2
          id="services-heading"
          className="text-3xl md:text-5xl font-bold text-heading"
        >
          {content.heading}
        </h2>
        <p className="text-description text-lg">{content.description}</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-8">
          {content.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-2 bg-card border border-line-card rounded-lg p-6"
            >
              <h3 className="text-xl font-bold text-heading">{item.title}</h3>
              <p className="text-body text-base">{item.description}</p>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 w-full mt-8 border-t border-divider pt-8">
          <h3 className="flex items-center gap-2 text-xl font-bold text-heading">
            <LuMapPin className="text-indicator" aria-hidden="true" />
            {content.areaHeading}
          </h3>
          <p className="max-w-3xl text-base md:text-lg text-body leading-relaxed">
            {format(content.areaDescription, {
              towns: nearbyTowns.join(", "),
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
