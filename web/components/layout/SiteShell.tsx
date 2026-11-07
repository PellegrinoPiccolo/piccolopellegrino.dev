import "@/app/globals.css";
import type { ReactNode } from "react";
import type { SiteContent } from "@/content/types";
import { fontVariables } from "@/lib/fonts";
import Header from "./Header";
import Footer from "./Footer";
import NextTopLoader from "nextjs-toploader";

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
        <NextTopLoader
          color="#4e65a0"
          height={3}
          speed={300}
          showSpinner={false}
          easing="ease-out"
          shadow={false}
          showForHashAnchor={false}
        />
        <Header content={content.nav} locale={content.locale} />
        <main>{children}</main>
        <Footer content={content} />
      </body>
    </html>
  );
};

export default SiteShell;
