export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

const prefixes: Record<Locale, string> = { it: "", en: "en" };

const segments: Record<Locale, Record<string, string>> = {
  it: { projects: "progetti" },
  en: {},
};

export const localizePath = (locale: Locale, path = "/") => {
  const [, first = "", ...rest] = path.split("/");
  const segment = segments[locale][first] ?? first;
  const localized = [prefixes[locale], segment, ...rest]
    .filter(Boolean)
    .join("/");

  return `/${localized}`;
};

export const delocalizePath = (pathname: string) => {
  const locale: Locale =
    pathname === "/en" || pathname.startsWith("/en/")
      ? "en"
      : "it";
  const [, first = "", ...rest] = pathname
    .slice(locale === "en" ? 3 : 0)
    .split("/");
  const segment =
    Object.entries(segments[locale]).find(([, value]) => value === first)?.[0] ??
    first;

  return { locale, path: `/${[segment, ...rest].filter(Boolean).join("/")}` };
};

export const format = (
  template: string,
  values: Record<string, string | number>,
) => template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
