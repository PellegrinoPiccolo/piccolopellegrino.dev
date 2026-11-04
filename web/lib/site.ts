import type { Metadata } from "next";
import { defaultLocale, localizePath, locales, type Locale } from "./i18n";

export const siteUrl = "https://piccolopellegrino.dev";
export const siteName = "Pellegrino Piccolo";

export const contactEmail = "piccolopellegrino.dev@gmail.com";

export const socialLinks = {
  github: "https://github.com/PellegrinoPiccolo",
  linkedin: "https://www.linkedin.com/in/pellegrino-piccolo-2a6739247",
};

export const navSections = ["projects", "about", "stack"] as const;

export const serviceArea = {
  home: "Montesarchio",
  towns: [
    "Montesarchio",
    "Airola",
    "Arpaia",
    "Bonea",
    "Bucciano",
    "Forchia",
    "Moiano",
    "Pannarano",
    "Paolisi",
    "Cervinara",
    "Rotondi",
    "San Martino Valle Caudina",
    "Roccabascerana",
    "Sant'Agata de' Goti",
    "Tocco Caudio",
    "Benevento",
  ],
  regions: ["Valle Caudina", "Provincia di Benevento", "Campania"],
};

export const defaultOgImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
};

export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

export const localeAlternates = (
  locale: Locale,
  path = "/",
): Metadata["alternates"] => ({
  canonical: localizePath(locale, path),
  languages: {
    ...Object.fromEntries(locales.map((l) => [l, localizePath(l, path)])),
    "x-default": localizePath(defaultLocale, path),
  },
});
