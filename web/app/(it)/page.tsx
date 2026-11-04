import { HomePage, homeMetadata } from "@/components/pages/HomePage";
import { it } from "@/content/it";

export const metadata = homeMetadata(it);

export default function Page() {
  return <HomePage content={it} />;
}
