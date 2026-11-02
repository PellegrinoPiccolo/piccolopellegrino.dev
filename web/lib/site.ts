export const siteUrl = "https://piccolopellegrino.dev";
export const siteName = "Pellegrino Piccolo";
export const siteTitle = `${siteName} — Full-stack & Mobile Developer`;
export const siteDescription =
  "Pellegrino Piccolo is a full-stack and mobile developer building web, mobile and desktop apps with React Native, Next.js and Electron, from design to release.";

export const contactEmail = "piccolopellegrino.dev@gmail.com";

export const socialLinks = {
  github: "https://github.com/PellegrinoPiccolo",
  linkedin: "https://www.linkedin.com/in/pellegrino-piccolo-2a6739247",
};

export const navItems = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
];

export const defaultOgImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: siteTitle,
};

export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();
