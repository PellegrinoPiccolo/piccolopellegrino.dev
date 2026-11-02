import Image from "next/image";
import { FiDownload } from "react-icons/fi";

const workSteps = [
  {
    number: "01",
    title: "Design",
    description:
      "Flows and screens first, so we agree on what we're building before any code.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "React Native, Next.js or Electron. Typed, tested and easy to maintain.",
  },
  {
    number: "03",
    title: "Ship",
    description:
      "Store listings, distribution and updates: I handle the release and the boring parts.",
  },
];

type AboutProps = {
  resumeUrl: string | null;
};

const About = ({ resumeUrl }: AboutProps) => {
  return (
    <section
      className="w-full bg-page scroll-mt-20"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="container py-12 md:py-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="w-full max-w-sm lg:max-w-none aspect-square relative lg:flex-1">
          <Image
            src="/about.jpg"
            alt=""
            className="rounded-lg object-cover"
            sizes="(min-width: 1024px) 33vw, 384px"
            fill
            loading="lazy"
          />
        </div>
        <div className="lg:flex-2 w-full flex flex-col gap-4">
          <p className="text-primary font-mono text-base">02 — About</p>
          <h2
            id="about-heading"
            className="text-3xl md:text-5xl font-bold text-heading"
          >
            A builder, end to end.
          </h2>
          <p className="text-base md:text-lg text-body font-medium leading-relaxed md:leading-loose">
            I take products from idea to store listing: design, code, release
            and the boring parts in between. I care about apps that are fast and
            easy to maintain. <br /> <br />
            I'm also a Master's student in Computer Science (Cloud Computing) at
            the University of Salerno, so I spend a lot of time on how systems
            are built, not just how they look.
          </p>
          {resumeUrl && (
            <a
              href={resumeUrl}
              className="group self-start flex items-center justify-center gap-2 whitespace-nowrap bg-page border-2 border-divider text-heading text-sm md:text-base px-6 py-2.5 md:py-3 rounded-full font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:bg-indigo-deep hover:shadow-[0_10px_30px_-12px_var(--color-indicator)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
            >
              <FiDownload className="transition-transform duration-300 group-hover:translate-y-0.5" />
              Download CV
            </a>
          )}
          <p className="text-sm uppercase font-mono text-body mt-4">
            HOW I WORK
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {workSteps.map((step) => (
              <div
                key={step.number}
                className={`flex flex-col gap-2 border-t-2 ${step.number === "01" ? "border-t-indicator shadow-lg" : "border-t-primary/40"} py-4`}
              >
                <p className="text-primary font-mono text-base">
                  {step.number}
                </p>
                <h3 className="text-lg font-bold text-heading">{step.title}</h3>
                <p className="text-body text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
