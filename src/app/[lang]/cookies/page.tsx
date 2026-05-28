import CookiesContent from "./CookiesContent";
import { LocalizationProvider } from "../../../components/Shell";

export const metadata = {
  title: "Cookie Policy | Vibe Hosting",
  description: "Vibe Hosting Cookie Policy. Learn how we use cookies, web beacons, and similar tracking technologies to improve our platform.",
};

export default function CookiePolicyPage({ params }: { params: { lang: string } }) {
  return (
    <LocalizationProvider lang={params?.lang}>
      <CookiesContent />
    </LocalizationProvider>
  );
}
