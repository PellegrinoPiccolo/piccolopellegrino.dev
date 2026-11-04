import { PrivacyPage, privacyMetadata } from "@/components/pages/PrivacyPage";
import { en } from "@/content/en";

export const metadata = privacyMetadata(en);

export default function Page() {
  return <PrivacyPage content={en} />;
}
