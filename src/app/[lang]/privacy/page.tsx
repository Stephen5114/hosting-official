import PrivacyContent from "./PrivacyContent";
import { LocalizationProvider } from "../../../components/Shell";

export const metadata = {
  title: "Privacy Policy | Vibe Hosting",
  description: "Privacy Policy for Vibe Hosting. Learn how we collect, use, and secure your personal and financial information.",
};

export default function PrivacyPolicyPage({ params }: { params: { lang: string } }) {
  return (
    <LocalizationProvider lang={params?.lang}>
      <PrivacyContent />
    </LocalizationProvider>
  );
}
