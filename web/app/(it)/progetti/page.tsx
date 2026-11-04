import { ProjectsPage, projectsMetadata } from "@/components/pages/ProjectsPage";
import { it } from "@/content/it";

export const metadata = projectsMetadata(it);

export default function Page() {
  return <ProjectsPage content={it} />;
}
