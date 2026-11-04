import type { ReactNode } from "react";
import SiteShell from "@/components/layout/SiteShell";
import { it } from "@/content/it";
import { siteMetadata, siteViewport } from "@/lib/metadata";

export const metadata = siteMetadata(it);
export const viewport = siteViewport;

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteShell content={it}>{children}</SiteShell>;
}
