import { ProjectsPage, projectsMetadata } from "@/components/pages/ProjectsPage";
import { en } from "@/content/en";

export const metadata = projectsMetadata(en);

export default function Page() {
  return <ProjectsPage content={en} />;
}
