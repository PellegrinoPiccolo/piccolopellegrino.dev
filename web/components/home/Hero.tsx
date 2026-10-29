import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col py-20">
      <p className="font-mono text-base text-primary font-medium">
        /* Full-stack & mobile developer — Montesarchio, IT */
      </p>
      <h1 className="text-hero font-bold text-heading">
        Pellegrino <br /> Piccolo
      </h1>
      <div className="flex flex-row items-center justify-between mt-4">
        <p className="text-fg flex-1 text-lg">
          I design and build seamless digital experiences from concept to
          launch, creating exceptional web and mobile applications focused on
          quality and performance.
        </p>
        <div className="flex flex-row space-x-4 flex-1 justify-end">
          <Link
            href="#projects"
            className="bg-indigo-bright text-heading px-8 py-3 rounded-full font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_10px_30px_-8px_var(--color-indigo-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
            className="bg-page border-2 border-divider text-heading px-8 py-3 rounded-full font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:bg-indigo-deep hover:shadow-[0_10px_30px_-12px_var(--color-indicator)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
          >
            Contact Me
          </Link>
          <a
            href="https://github.com/PellegrinoPiccolo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center group bg-page border-2 border-divider text-heading p-3 rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:bg-indigo-deep hover:text-link hover:shadow-[0_10px_30px_-12px_var(--color-indicator)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
          >
            <FiGithub className="text-2xl transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-8" />
          </a>
          <a
            href="https://www.linkedin.com/in/pellegrino-piccolo-2a6739247"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center group bg-page border-2 border-divider text-heading p-3 rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:bg-indigo-deep hover:text-link hover:shadow-[0_10px_30px_-12px_var(--color-indicator)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
          >
            <FiLinkedin className="text-2xl transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-8" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
