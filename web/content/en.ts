import type { SiteContent } from "./types";

export const en: SiteContent = {
  locale: "en",
  dateLocale: "en-US",
  ogLocale: "en_US",
  meta: {
    title: "Pellegrino Piccolo — Web & App Developer near Benevento, Italy",
    description:
      "Web and app developer from Montesarchio (Benevento), Italy. Computer Science student building websites, mobile apps and custom software, also on request.",
    jobTitle: "Full-stack & Mobile Developer",
    keywords: [
      "Pellegrino Piccolo",
      "full-stack developer",
      "mobile developer",
      "React Native developer",
      "Next.js developer",
      "Electron",
      "web developer Benevento",
      "app developer Italy",
      "portfolio",
    ],
  },
  nav: {
    projects: "Projects",
    about: "About",
    stack: "Stack",
    services: "What I do",
    contact: "Contact",
    home: "Home",
    allProjects: "All projects",
    logoAlt: "Pellegrino Piccolo — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    language: "Language",
    switchTo: "Switch to {language}",
    languages: { it: "Italiano", en: "English" },
  },
  kinds: {
    "Desktop app": "Desktop app",
    "Mobile app": "Mobile app",
    Tool: "Tool",
    "Web app": "Web app",
    Website: "Website",
  },
  footer: {
    label: "Footer",
    tagline:
      "Full-stack and mobile developer building web, mobile and desktop apps, from design to release.",
    available: "Open to new projects",
    navigate: "Navigate",
    connect: "Connect",
    email: "Email",
    resume: "Resume",
    privacy: "Privacy",
    builtWith: "Built with Next.js & Tailwind",
    backToTop: "Back to top",
  },
  hero: {
    eyebrow: "/* Full-stack & mobile developer */",
    description:
      "I design and build websites, mobile apps and custom software, focused on quality and performance. If you have an idea or a business near Benevento, we can build it together.",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    latestWork: "Latest work",
    available: "Open to new projects",
    coverAlt: "Project cover",
  },
  services: {
    eyebrow: "04 — What I do",
    heading: "What I can do",
    description:
      "Alongside my studies I take on projects on request, one at a time, and follow them from idea to launch.",
    items: [
      {
        title: "Websites",
        description:
          "Showcase websites, product catalogs and landing pages that load fast, are easy to find on Google and easy to update.",
        serviceType: "Website development",
      },
      {
        title: "Mobile apps",
        description:
          "Android and iOS apps built with React Native, from screen design to store release.",
        serviceType: "Mobile app development",
      },
      {
        title: "Custom software",
        description:
          "Small web or desktop tools to organize your work: internal tools and automations.",
        serviceType: "Custom software development",
      },
      {
        title: "Maintenance",
        description:
          "Updates, fixes and new features for existing websites and apps.",
        serviceType: "Website and app maintenance",
      },
    ],
    areaHeading: "Area",
    areaDescription:
      "I live in Montesarchio and I'm happy to work with businesses and people across the Valle Caudina and the province of Benevento, in person or remotely. Nearby towns include {towns}.",
  },
  homeProjects: {
    eyebrow: "01 — Projects",
    heading: "Selected work",
    allProjects: "All Projects",
    emptyEyebrow: "/* Work in progress */",
    emptyTitle: "New projects coming soon",
    emptyText:
      "I'm curating a selection of my best work. In the meantime, feel free to reach out to talk about your next idea.",
    contactMe: "Contact Me",
  },
  about: {
    eyebrow: "02 — About",
    heading: "A builder, end to end.",
    paragraphs: [
      "I take products from idea to store listing: design, code, release and the boring parts in between. I care about apps that are fast and easy to maintain.",
      "I'm also a Master's student in Computer Science (Cloud Computing) at the University of Salerno, so I spend a lot of time on how systems are built, not just how they look.",
    ],
    downloadCv: "Download CV",
    howIWork: "How I work",
    steps: [
      {
        title: "Design",
        description:
          "Flows and screens first, so we agree on what we're building before any code.",
      },
      {
        title: "Build",
        description:
          "React Native, Next.js or Electron. Typed, tested and easy to maintain.",
      },
      {
        title: "Ship",
        description:
          "Store listings, distribution and updates: I handle the release and the boring parts.",
      },
    ],
  },
  stack: {
    eyebrow: "03 — Stack",
    heading: "Tools I ship with",
    description: "Grouped by what they're for, and linked to where I used them.",
    comingSoon: "/* Coming soon */",
    usedIn: "Used in",
    emptyEyebrow: "/* Work in progress */",
    emptyText: "I'm putting together the tools I work with. Check back soon.",
  },
  contact: {
    eyebrow: "05 — Contact",
    badge: "Get in touch",
    heading: ["Have a project", "in mind?"],
    description:
      "Tell me what you're building: an app, a website or a tool. I'll get back to you as soon as I can, usually the same day.",
    location:
      "Montesarchio (BN), Italy - working locally and remotely in Italian and English",
  },
  form: {
    legend: "What do you need?",
    types: {
      mobile: "Mobile app",
      website: "Website",
      desktop: "Desktop app",
      other: "Something else",
    },
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@company.com",
    message: "Message",
    messagePlaceholder: "A few lines about the project, timeline and goals",
    sending: "Sending...",
    send: "Send message",
    success: "Message sent successfully!",
    idle: "No spam, no newsletter — your message comes straight to my inbox.",
    consent: {
      before: "By sending this form you agree to the ",
      link: "privacy policy",
      after: ".",
    },
    errors: {
      invalidEmail: "Please enter a valid email address.",
      required: "Please fill in all required fields.",
      failed: "Failed to send message. Please try again later.",
      generic: "An error occurred. Please try again later.",
    },
  },
  projectsPage: {
    title: "Projects",
    description:
      "Projects by Pellegrino Piccolo: web apps, mobile apps, tools and websites.",
    eyebrow: "/* everything I've shipped */",
    heading: "All projects",
    count: { one: "{count} project", other: "{count} projects" },
    intro: "Apps, websites and tools — personal products and client work.",
    ctaEyebrow: "/* next one could be yours */",
    ctaTitle: "Have a project in mind?",
    ctaButton: "Get in touch",
  },
  projectsList: {
    filterLabel: "Filter projects by category",
    all: "All",
    upcoming: "Upcoming",
    categories: { app: "App", web: "Web", desktop: "Desktop" },
  },
  projectCard: {
    coverAlt: "Project cover",
    readCaseStudy: "Read case study",
    readCaseStudyLabel: "Read case study: {title}",
    sourceCode: "Source code",
    liveSite: "Live site",
    download: "Download",
  },
  projectHero: {
    allProjects: "All projects",
    released: "Released {date}",
    role: "Role",
    platforms: "Platforms",
    architecture: "Architecture",
    keyDecisions: "Key decisions",
    code: "Code",
    visitSite: "Visit site",
    download: "Download",
  },
  gallery: {
    eyebrow: "01 — Gallery",
    heading: "The app, screen by screen",
    description: "A look at the main screens of the app.",
    emptyEyebrow: "/* No screenshots */",
    emptyText: "There are no screens available for this project.",
    imageAlt: "Carousel image {index} of {count}",
  },
  architecture: {
    eyebrow: "02 — Architecture",
    heading: "How it's built",
    description:
      "The app, layer by layer. Each badge links to the decision that shaped that layer.",
    emptyEyebrow: "/* No architecture */",
    emptyText: "The architecture of this project has not been documented yet.",
  },
  decisions: {
    eyebrow: "03 — Decisions",
    heading: "Decision log",
    description: "Context, choice and the price paid for each one.",
    context: "Context",
    decision: "Decision",
    tradeoff: "Tradeoff",
    alternatives: "Alternatives",
  },
  projectNavigation: {
    label: "Project navigation",
    eyebrow: "04 — More projects",
    heading: "Keep exploring",
    position: "Project {index} of {total}.",
    next: "Next project",
    previous: "Previous project",
    allProjects: "All projects",
  },
  privacy: {
    title: "Privacy policy",
    description:
      "How Pellegrino Piccolo handles the personal data you share through this website.",
    eyebrow: "/* the short version: I only use what you send me */",
    lastUpdated: "Last updated: {date}",
    sections: [
      {
        title: "Who is responsible",
        body: "The data controller is Pellegrino Piccolo, a private individual based in Italy. You can reach me at {email} for anything related to your data.",
      },
      {
        title: "What I collect",
        body: "Only what you send through the contact form: your name, your email address, your message and the type of project you selected. The site has no accounts, no analytics and no tracking or advertising cookies.",
      },
      {
        title: "Why and on what basis",
        body: "I use your data only to reply to your message and, if we decide to work together, to discuss the project. The legal basis is taking steps at your request before entering into a contract (Art. 6(1)(b) GDPR). Your data is never sold, shared for marketing or added to a newsletter.",
      },
      {
        title: "Who processes it",
        body: "Form submissions are delivered by StaticForms (staticforms.dev), which forwards them to my email inbox, hosted by Google. Project images are served from the Sanity CDN (cdn.sanity.io), which receives your IP address as part of any normal web request. These providers act on my behalf and may process data outside the EU under the safeguards required by the GDPR.",
      },
      {
        title: "How long I keep it",
        body: "Messages are kept as long as needed to handle your request and for no more than 24 months afterwards, unless we start working together, in which case they become part of the project correspondence.",
      },
      {
        title: "Your rights",
        body: "You can ask to access, correct or delete your data, to restrict or object to its processing, or to receive it in a portable format, by writing to {email}. You also have the right to lodge a complaint with the Italian data protection authority (Garante per la protezione dei dati personali).",
      },
    ],
  },
  notFound: {
    title: "Page not found",
    eyebrow: "/* Error 404 — route not found */",
    heading: "This page went off the map",
    description:
      "The page you're looking for doesn't exist, was moved, or never made it past the drawing board.",
    terminalError: "cd: no such file or directory",
    backHome: "Back to home",
    viewProjects: "View Projects",
  },
};
