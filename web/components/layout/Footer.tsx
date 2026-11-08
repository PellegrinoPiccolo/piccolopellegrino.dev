import Image from "next/image";
import Link from "next/link";
import {
  FiArrowUp,
  FiDownload,
  FiGithub,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import type { SiteContent } from "@/content/types";
import { localizePath } from "@/lib/i18n";
import { contactEmail, navSections, siteName, socialLinks } from "@/lib/site";
import { getResumeUrl } from "@/sanity/resume";

const linkClass =
  "text-sm lg:text-base text-body transition-colors hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator";

type FooterProps = {
  content: SiteContent;
};

const Footer = async ({ content }: FooterProps) => {
  const { footer, nav, locale } = content;
  const home = localizePath(locale);
  const footerNav = [
    ...navSections.map((section) => ({
      href: `${home}#${section}`,
      label: nav[section],
    })),
    { href: `${home}#contact`, label: nav.contact },
    { href: localizePath(locale, "/projects"), label: nav.allProjects },
  ];
  const connectLinks = [
    {
      href: `mailto:${contactEmail}`,
      label: footer.email,
      icon: MdOutlineEmail,
    },
    { href: socialLinks.github, label: "GitHub", icon: FiGithub },
    { href: socialLinks.linkedin, label: "LinkedIn", icon: FiLinkedin },
    { href: socialLinks.instagram, label: "Instagram", icon: FiInstagram },
  ];
  const resumeUrl = await getResumeUrl();
  const links = resumeUrl
    ? [
        ...connectLinks,
        { href: resumeUrl, label: footer.resume, icon: FiDownload },
      ]
    : connectLinks;

  return (
    <footer className="w-full bg-page border-t border-divider">
      <div className="container py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-10">
        <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
          <Image
            src="/logo.svg"
            alt={siteName}
            width={491}
            height={165}
            className="h-12 w-auto self-start"
          />
          <p className="max-w-sm text-sm lg:text-base text-description">
            {footer.tagline}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <p className="font-mono text-fg text-xs md:text-sm">
              {footer.available}
            </p>
          </div>
        </div>
        <nav aria-label={footer.label} className="flex flex-col gap-4">
          <p className="font-mono text-sm uppercase text-primary">
            {footer.navigate}
          </p>
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
          <p className="font-mono text-sm uppercase text-primary">
            {footer.connect}
          </p>
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
            <Link
              href={localizePath(locale, "/privacy")}
              className="hover:text-link hover:underline"
            >
              {footer.privacy}
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-body">{footer.builtWith}</p>
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-divider px-3 py-1.5 text-sm text-fg transition-colors hover:border-indicator hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
            >
              {footer.backToTop}
              <FiArrowUp className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
