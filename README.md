# piccolopellegrino.dev

Personal website and portfolio of **Pellegrino Piccolo**, full-stack & mobile developer.

🌐 **[piccolopellegrino.dev](https://piccolopellegrino.dev)** · [GitHub](https://github.com/PellegrinoPiccolo) · [LinkedIn](https://www.linkedin.com/in/pellegrino-piccolo-2a6739247)

The repository contains two applications:

| Folder | What it contains | Stack |
| --- | --- | --- |
| [`web/`](web/) | The public website, exported as a static site | [Next.js 16](https://nextjs.org/docs), [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com/docs), [TypeScript](https://www.typescriptlang.org/docs/) |
| [`studio/`](studio/) | The CMS used to manage the portfolio projects | [Sanity Studio](https://www.sanity.io/docs/studio) |

## Architecture

```text
┌──────────────────┐      GROQ       ┌──────────────────────┐
│  Sanity Studio   │ ──────────────▶ │  Sanity Content Lake │
│  (studio/)       │     content     │                      │
└────────┬─────────┘                 └──────────┬───────────┘
         │                                      │
         │ "Update Site"                        │ fetched at build time
         ▼                                      ▼
┌──────────────────────────────┐      ┌──────────────────────┐
│ Deploy endpoint              │ ───▶ │  Next.js (web/)      │
│ triggers a new build         │      │  static export       │
└──────────────────────────────┘      └──────────────────────┘
```

- Portfolio projects are managed in Sanity Studio and read by the website through GROQ queries ([`web/sanity/queries.ts`](web/sanity/queries.ts)).
- The website is a static export ([`web/next.config.ts`](web/next.config.ts)): fast, serverless, and rebuilt whenever the content changes.
- The Studio includes an **Update Site** tool ([`studio/tools/deployTool.tsx`](studio/tools/deployTool.tsx)) that triggers the build with one click.
- TypeScript types for the queries are generated automatically with [Sanity TypeGen](https://www.sanity.io/docs/apis-and-sdks/sanity-typegen) ([`web/sanity.types.ts`](web/sanity.types.ts)).

## Structure

```text
.
├── studio/
│   ├── sanity.config.ts       # Studio configuration
│   ├── schemaTypes/project.ts # "project" document schema
│   ├── structure.ts           # content panel structure
│   └── tools/deployTool.tsx   # "Update Site" tool
└── web/
    ├── app/                   # App Router: layout, pages, globals.css
    ├── components/            # UI components
    └── sanity/                # client, queries, caching and images
```

## Content model

Each portfolio project is a **Project** document ([`studio/schemaTypes/project.ts`](studio/schemaTypes/project.ts)), designed as a small case study:

- **General**: kind (Mobile app, Web app, Website, Desktop app, Tool), category, role, platforms, stack, release date, cover, and links to repository, live site and store.
- **Gallery**: images shown as a carousel.
- **Architecture**: the layers of the project's architecture, drawn as a diagram.
- **Decisions**: the technical decisions made, with context, choice, trade-offs and alternatives considered.
- **SEO**: title, description and Open Graph image.

## Design

Dark theme with an indigo palette, defined as Tailwind design tokens in [`web/app/globals.css`](web/app/globals.css). Fonts: [Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans) and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono).

## Technologies

[Next.js](https://nextjs.org) · [React](https://react.dev) · [TypeScript](https://www.typescriptlang.org) · [Tailwind CSS](https://tailwindcss.com) · [Sanity](https://www.sanity.io) · [next-sanity](https://github.com/sanity-io/next-sanity) · [GROQ](https://www.sanity.io/docs/groq) · [React Icons](https://react-icons.github.io/react-icons/) · [Lucide](https://lucide.dev)

## Contact

- Website: [piccolopellegrino.dev](https://piccolopellegrino.dev)
- GitHub: [@PellegrinoPiccolo](https://github.com/PellegrinoPiccolo)
- LinkedIn: [Pellegrino Piccolo](https://www.linkedin.com/in/pellegrino-piccolo-2a6739247)
