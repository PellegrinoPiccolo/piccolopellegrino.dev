import SiteShell from "@/components/layout/SiteShell";
import { NotFoundPage, notFoundMetadata } from "@/components/pages/NotFoundPage";
import { it } from "@/content/it";

export const metadata = notFoundMetadata(it);

export default function GlobalNotFound() {
  return (
    <SiteShell content={it}>
      <NotFoundPage content={it} />
    </SiteShell>
  );
}
