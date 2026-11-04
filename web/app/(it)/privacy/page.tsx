import { PrivacyPage, privacyMetadata } from "@/components/pages/PrivacyPage";
import { it } from "@/content/it";

export const metadata = privacyMetadata(it);

export default function Page() {
  return <PrivacyPage content={it} />;
}
