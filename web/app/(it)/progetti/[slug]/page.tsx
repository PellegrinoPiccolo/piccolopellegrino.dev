import type { Metadata } from "next";
import {
  ProjectPage,
  projectMetadata,
  projectStaticParams,
} from "@/components/pages/ProjectPage";
import { it } from "@/content/it";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = projectStaticParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return projectMetadata(it, slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ProjectPage content={it} slug={slug} />;
}
