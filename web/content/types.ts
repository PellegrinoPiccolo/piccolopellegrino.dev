import type { ProjectItem } from "@/constants/type";
import type { Locale } from "@/lib/i18n";

export type ProjectKind = NonNullable<ProjectItem["kind"]>;
export type ProjectCategory = "app" | "web" | "desktop";
export type ProjectType = "mobile" | "website" | "desktop" | "other";

export type NavContent = {
  projects: string;
  about: string;
  stack: string;
  services: string;
  contact: string;
  home: string;
  allProjects: string;
  logoAlt: string;
  openMenu: string;
  closeMenu: string;
  menu: string;
  language: string;
  switchTo: string;
  languages: Record<Locale, string>;
};

export type FormContent = {
  legend: string;
  types: Record<ProjectType, string>;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  sending: string;
  send: string;
  success: string;
  idle: string;
  consent: { before: string; link: string; after: string };
  errors: {
    invalidEmail: string;
    required: string;
    failed: string;
    generic: string;
  };
};

export type ProjectsListContent = {
  filterLabel: string;
  all: string;
  upcoming: string;
  categories: Record<ProjectCategory, string>;
};

export type SiteContent = {
  locale: Locale;
  dateLocale: string;
  ogLocale: string;
  meta: {
    title: string;
    description: string;
    jobTitle: string;
    keywords: string[];
  };
  nav: NavContent;
  kinds: Record<ProjectKind, string>;
  footer: {
    label: string;
    tagline: string;
    available: string;
    navigate: string;
    connect: string;
    email: string;
    resume: string;
    privacy: string;
    builtWith: string;
    backToTop: string;
  };
  hero: {
    eyebrow: string;
    description: string;
    viewProjects: string;
    contactMe: string;
    latestWork: string;
    available: string;
    coverAlt: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    description: string;
    items: { title: string; description: string; serviceType: string }[];
    areaHeading: string;
    areaDescription: string;
  };
  homeProjects: {
    eyebrow: string;
    heading: string;
    allProjects: string;
    emptyEyebrow: string;
    emptyTitle: string;
    emptyText: string;
    contactMe: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    downloadCv: string;
    howIWork: string;
    steps: { title: string; description: string }[];
  };
  stack: {
    eyebrow: string;
    heading: string;
    description: string;
    comingSoon: string;
    usedIn: string;
    emptyEyebrow: string;
    emptyText: string;
  };
  contact: {
    eyebrow: string;
    badge: string;
    heading: [string, string];
    description: string;
    location: string;
  };
  form: FormContent;
  projectsPage: {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    count: { one: string; other: string };
    intro: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaButton: string;
  };
  projectsList: ProjectsListContent;
  projectCard: {
    coverAlt: string;
    readCaseStudy: string;
    readCaseStudyLabel: string;
    sourceCode: string;
    liveSite: string;
    download: string;
  };
  projectHero: {
    allProjects: string;
    released: string;
    role: string;
    platforms: string;
    architecture: string;
    keyDecisions: string;
    code: string;
    visitSite: string;
    download: string;
  };
  gallery: {
    eyebrow: string;
    heading: string;
    description: string;
    emptyEyebrow: string;
    emptyText: string;
    imageAlt: string;
  };
  architecture: {
    eyebrow: string;
    heading: string;
    description: string;
    emptyEyebrow: string;
    emptyText: string;
  };
  decisions: {
    eyebrow: string;
    heading: string;
    description: string;
    context: string;
    decision: string;
    tradeoff: string;
    alternatives: string;
  };
  projectNavigation: {
    label: string;
    eyebrow: string;
    heading: string;
    position: string;
    next: string;
    previous: string;
    allProjects: string;
  };
  privacy: {
    title: string;
    description: string;
    eyebrow: string;
    lastUpdated: string;
    sections: { title: string; body: string }[];
  };
  notFound: {
    title: string;
    eyebrow: string;
    heading: string;
    description: string;
    terminalError: string;
    backHome: string;
    viewProjects: string;
  };
};
