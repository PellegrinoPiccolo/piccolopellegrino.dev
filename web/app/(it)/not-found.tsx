import { NotFoundPage, notFoundMetadata } from "@/components/pages/NotFoundPage";
import { it } from "@/content/it";

export const metadata = notFoundMetadata(it);

export default function NotFound() {
  return <NotFoundPage content={it} />;
}
