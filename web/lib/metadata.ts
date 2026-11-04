import type { Metadata, Viewport } from "next";
import type { SiteContent } from "@/content/types";
import { localizePath, locales } from "./i18n";
import { defaultOgImage, siteName, siteUrl } from "./site";

export const siteMetadata = ({ meta, locale, ogLocale }: SiteContent): Metadata => ({
  metadataBase: new URL(siteUrl),
  title: {
    default: meta.title,
    template: `%s — ${siteName}`,
  },
  description: meta.description,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  keywords: meta.keywords,
  openGraph: {
    type: "website",
    siteName,
    title: meta.title,
    description: meta.description,
    url: localizePath(locale),
    locale: ogLocale,
    alternateLocale: locales
      .filter((l) => l !== locale)
      .map((l) => (l === "it" ? "it_IT" : "en_US")),
    images: [{ ...defaultOgImage, alt: meta.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: [{ ...defaultOgImage, alt: meta.title }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
});

export const siteViewport: Viewport = {
  themeColor: "#0b1020",
  colorScheme: "dark",
};
