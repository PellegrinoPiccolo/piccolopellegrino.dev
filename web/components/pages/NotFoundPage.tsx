import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import MissingPath from "@/components/ui/MissingPath";
import type { SiteContent } from "@/content/types";
import { localizePath } from "@/lib/i18n";

export const notFoundMetadata = ({ notFound }: SiteContent): Metadata => ({
  title: notFound.title,
  robots: {
    index: false,
    follow: true,
  },
});

type NotFoundPageProps = {
  content: SiteContent;
};

export function NotFoundPage({ content }: NotFoundPageProps) {
  const { notFound: t, locale } = content;

  return (
    <div className="relative w-full overflow-hidden bg-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-divider)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-divider)_1px,transparent_1px)] bg-size-[48px_48px] opacity-40 mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-bright/20 blur-[120px]"
      />

      <div className="container relative flex min-h-[calc(100svh-10rem)] flex-col items-center justify-center gap-8 py-20 text-center">
        <p className="font-mono text-sm lg:text-base text-primary font-medium">
          {t.eyebrow}
        </p>

        <h1 className="bg-linear-to-b from-heading via-tag to-indicator/40 bg-clip-text text-[8rem] font-bold leading-none tracking-tight text-transparent md:text-[12rem] animate-in fade-in slide-in-from-bottom-4 duration-700">
          404
        </h1>

        <div className="flex max-w-xl flex-col gap-3">
          <h2 className="text-3xl md:text-4xl font-bold text-heading">
            {t.heading}
          </h2>
          <p className="text-fg text-sm md:text-lg">
            {t.description}
          </p>
        </div>

        <div className="w-full max-w-xl overflow-hidden rounded-lg border border-line-card bg-card text-left shadow-[0_20px_60px_-30px_var(--color-indicator)]">
          <div className="flex items-center gap-2 border-b border-line-card px-4 py-3">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-yellow-400/80" />
            <span className="size-3 rounded-full bg-green-500/80" />
            <span className="ml-auto font-mono text-xs text-muted">zsh</span>
          </div>
          <div className="flex flex-col gap-1 p-4 font-mono text-xs md:text-sm">
            <p className="text-fg">
              <span className="text-available">~</span>{" "}
              <span className="text-comment">$</span> cd <MissingPath />
            </p>
            <p className="text-destructive">{t.terminalError}</p>
            <p className="text-fg">
              <span className="text-available">~</span>{" "}
              <span className="text-comment">$</span> cd {localizePath(locale)}
              <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-link" />
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Link
            href={localizePath(locale)}
            className="group flex items-center justify-center gap-2 whitespace-nowrap bg-indigo-bright text-heading text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-full font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_10px_30px_-8px_var(--color-indigo-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
          >
            <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            {t.backHome}
          </Link>
          <Link
            href={localizePath(locale, "/projects")}
            className="flex items-center justify-center whitespace-nowrap bg-page border-2 border-divider text-heading text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-full font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:bg-indigo-deep hover:shadow-[0_10px_30px_-12px_var(--color-indicator)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
          >
            {t.viewProjects}
          </Link>
        </div>
      </div>
    </div>
  );
}
