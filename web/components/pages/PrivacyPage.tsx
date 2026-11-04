import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import type { SiteContent } from "@/content/types";
import { format, localizePath } from "@/lib/i18n";
import { contactEmail as email, localeAlternates } from "@/lib/site";

const lastUpdated = new Date("2026-11-02T00:00:00Z");

export const privacyMetadata = ({ privacy, locale }: SiteContent): Metadata => ({
  title: privacy.title,
  description: privacy.description,
  alternates: localeAlternates(locale, "/privacy"),
});

const withEmail = (text: string) =>
  text.split("{email}").map((part, index) => (
    <span key={index}>
      {index > 0 && (
        <a href={`mailto:${email}`} className="text-link hover:underline">
          {email}
        </a>
      )}
      {part}
    </span>
  ));

type PrivacyPageProps = {
  content: SiteContent;
};

export function PrivacyPage({ content }: PrivacyPageProps) {
  const { privacy, nav, locale, dateLocale } = content;

  return (
    <div className="w-full bg-page">
      <div className="container pt-15 pb-20 md:py-20 flex flex-col gap-4">
        <Link
          href={localizePath(locale)}
          className="flex items-center gap-2 text-indicator"
        >
          <FaArrowLeft />
          {nav.home}
        </Link>
        <p className="font-mono text-sm lg:text-base text-primary font-medium">
          {privacy.eyebrow}
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-heading">
          {privacy.title}
        </h1>
        <p className="text-base text-description font-mono font-medium">
          {format(privacy.lastUpdated, {
            date: lastUpdated.toLocaleDateString(dateLocale, {
              dateStyle: "long",
              timeZone: "UTC",
            }),
          })}
        </p>
        <div className="mt-8 flex max-w-3xl flex-col border-t border-divider">
          {privacy.sections.map((section, index) => (
            <section
              key={section.title}
              className="flex flex-col gap-2 border-b border-divider py-8"
            >
              <p className="text-primary font-mono text-sm">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-heading">
                {section.title}
              </h2>
              <p className="text-base md:text-lg text-body leading-relaxed">
                {withEmail(section.body)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
