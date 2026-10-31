import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteName = "Pellegrino Piccolo";
const description =
  "Personal website of Pellegrino Piccolo, developer. Projects, writing and contact.";

export const metadata: Metadata = {
  metadataBase: new URL("https://piccolopellegrino.dev"),
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description,
  applicationName: siteName,
  authors: [
    { name: "Pellegrino Piccolo", url: "https://piccolopellegrino.dev" },
  ],
  creator: "Pellegrino Piccolo",
  keywords: ["Pellegrino Piccolo", "developer", "portfolio", "web development"],
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${notoSans.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="font-sans bg-page min-h-full scheme-dark">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
