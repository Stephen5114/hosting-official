import SlaContent from "./SlaContent";
import { LocalizationProvider } from "../../../components/Shell";

export const metadata = {
  title: "Service Level Agreement (SLA) | Vibe Hosting",
  description: "Vibe Hosting Service Level Agreement (SLA). Uptime guarantees, network reliability, and credit policies.",
};

export default function ServiceLevelAgreementPage({ params }: { params: { lang: string } }) {
  return (
    <LocalizationProvider lang={params?.lang}>
      <SlaContent />
    </LocalizationProvider>
  );
}
