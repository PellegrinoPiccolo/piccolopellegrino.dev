import "@/app/globals.css";
import type { ReactNode } from "react";
import type { SiteContent } from "@/content/types";
import { fontVariables } from "@/lib/fonts";
import Header from "./Header";
import Footer from "./Footer";

type SiteShellProps = {
  content: SiteContent;
  children: ReactNode;
};

const SiteShell = ({ content, children }: SiteShellProps) => {
  return (
    <html
      lang={content.locale}
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full antialiased scroll-smooth`}
    >
      <body className="font-sans bg-page min-h-full scheme-dark">
        <Header content={content.nav} locale={content.locale} />
        <main>{children}</main>
        <Footer content={content} />
      </body>
    </html>
  );
};

export default SiteShell;
