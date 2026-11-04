import { NotFoundPage, notFoundMetadata } from "@/components/pages/NotFoundPage";
import { en } from "@/content/en";

export const metadata = notFoundMetadata(en);

export default function NotFound() {
  return <NotFoundPage content={en} />;
}
