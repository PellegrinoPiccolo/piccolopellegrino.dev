import Link from "next/link";
import {
  FiArrowUp,
  FiDownload,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { contactEmail, navItems, siteName, socialLinks } from "@/lib/site";
import { getResumeUrl } from "@/sanity/resume";

const footerNav = [
  ...navItems,
  { href: "/#contact", label: "Contact" },
  { href: "/projects", label: "All projects" },
];

const connectLinks = [
  { href: `mailto:${contactEmail}`, label: "Email", icon: MdOutlineEmail },
  { href: socialLinks.github, label: "GitHub", icon: FiGithub },
  { href: socialLinks.linkedin, label: "LinkedIn", icon: FiLinkedin },
];

const linkClass =
  "text-sm lg:text-base text-body transition-colors hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator";

const Footer = async () => {
  const resumeUrl = await getResumeUrl();
  const links = resumeUrl
    ? [...connectLinks, { href: resumeUrl, label: "Resume", icon: FiDownload }]
    : connectLinks;

  return (
    <footer className="w-full bg-page border-t border-divider">
      <div className="container py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-10">
        <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
          <p className="font-mono text-heading font-medium">
            {"/* PellegrinoPiccolo */"}
          </p>
          <p className="max-w-sm text-sm lg:text-base text-description">
            Full-stack and mobile developer building web, mobile and desktop
            apps, from design to release.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <p className="font-mono text-fg text-xs md:text-sm">
              Available for freelance
            </p>
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-4">
          <p className="font-mono text-sm uppercase text-primary">Navigate</p>
          <ul className="flex flex-col gap-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-4">
          <p className="font-mono text-sm uppercase text-primary">Connect</p>
          <ul className="flex flex-col gap-2">
            {links.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={
                    item.href.startsWith("mailto:") || item.href === resumeUrl
                      ? undefined
                      : "_blank"
                  }
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-2`}
                >
                  <item.icon aria-hidden="true" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-divider">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-body">
            &copy; {new Date().getFullYear()} {siteName} ·{" "}
            <Link href="/privacy" className="hover:text-link hover:underline">
              Privacy
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-body">Built with Next.js & Tailwind</p>
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-divider px-3 py-1.5 text-sm text-fg transition-colors hover:border-indicator hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
            >
              Back to top
              <FiArrowUp className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
