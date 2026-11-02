import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { siteName } from "@/lib/site";

const email = "piccolopellegrino.dev@gmail.com";
const lastUpdated = "November 2, 2026";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${siteName} handles the personal data you share through this website.`,
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    title: "Who is responsible",
    body: (
      <>
        The data controller is {siteName}, a freelance developer based in
        Italy. You can reach me at{" "}
        <a href={`mailto:${email}`} className="text-link hover:underline">
          {email}
        </a>{" "}
        for anything related to your data.
      </>
    ),
  },
  {
    title: "What I collect",
    body: (
      <>
        Only what you send through the contact form: your name, your email
        address, your message and the type of project you selected. The site
        has no accounts, no analytics and no tracking or advertising cookies.
      </>
    ),
  },
  {
    title: "Why and on what basis",
    body: (
      <>
        I use your data only to reply to your message and, if we decide to
        work together, to discuss the project. The legal basis is taking steps
        at your request before entering into a contract (Art. 6(1)(b) GDPR).
        Your data is never sold, shared for marketing or added to a
        newsletter.
      </>
    ),
  },
  {
    title: "Who processes it",
    body: (
      <>
        Form submissions are delivered by StaticForms (staticforms.dev), which
        forwards them to my email inbox, hosted by Google. Project images are
        served from the Sanity CDN (cdn.sanity.io), which receives your IP
        address as part of any normal web request. These providers act on my
        behalf and may process data outside the EU under the safeguards
        required by the GDPR.
      </>
    ),
  },
  {
    title: "How long I keep it",
    body: (
      <>
        Messages are kept as long as needed to handle your request and for no
        more than 24 months afterwards, unless we start working together, in
        which case they become part of the project correspondence.
      </>
    ),
  },
  {
    title: "Your rights",
    body: (
      <>
        You can ask to access, correct or delete your data, to restrict or
        object to its processing, or to receive it in a portable format, by
        writing to{" "}
        <a href={`mailto:${email}`} className="text-link hover:underline">
          {email}
        </a>
        . You also have the right to lodge a complaint with the Italian data
        protection authority (Garante per la protezione dei dati personali).
      </>
    ),
  },
];

const Page = () => {
  return (
    <div className="w-full bg-page">
      <div className="container pt-15 pb-20 md:py-20 flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 text-indicator">
          <FaArrowLeft />
          Home
        </Link>
        <p className="font-mono text-sm lg:text-base text-primary font-medium">
          {"/* the short version: I only use what you send me */"}
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-heading">
          Privacy policy
        </h1>
        <p className="text-base text-description font-mono font-medium">
          Last updated: {lastUpdated}
        </p>
        <div className="mt-8 flex max-w-3xl flex-col border-t border-divider">
          {sections.map((section, index) => (
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
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
