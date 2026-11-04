import { HomePage, homeMetadata } from "@/components/pages/HomePage";
import { en } from "@/content/en";

export const metadata = homeMetadata(en);

export default function Page() {
  return <HomePage content={en} />;
}
