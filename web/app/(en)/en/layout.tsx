import type { ReactNode } from "react";
import SiteShell from "@/components/layout/SiteShell";
import { en } from "@/content/en";
import { siteMetadata, siteViewport } from "@/lib/metadata";

export const metadata = siteMetadata(en);
export const viewport = siteViewport;

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteShell content={en}>{children}</SiteShell>;
}
