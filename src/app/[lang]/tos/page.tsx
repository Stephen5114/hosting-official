import TosContent from "./TosContent";
import { LocalizationProvider } from "../../../components/Shell";

export const metadata = {
  title: "Terms of Service | Vibe Hosting",
  description: "Terms of Service and Hosting Agreement for Vibe Hosting. Please read these terms carefully before deploying.",
};

export default function TermsOfServicePage({ params }: { params: { lang: string } }) {
  return (
    <LocalizationProvider lang={params?.lang}>
      <TosContent />
    </LocalizationProvider>
  );
}
