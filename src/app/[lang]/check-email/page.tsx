import { Suspense } from "react";
import CheckEmailContent from "./CheckEmailContent";
import { LocalizationProvider } from "../../../components/Shell";

export const metadata = {
  title: "Check your email | Vibe Hosting",
  description: "Verify your email before signing in to Vibe Hosting.",
};

export default function CheckEmailPage({ params }: { params: { lang: string } }) {
  return (
    <LocalizationProvider lang={params?.lang}>
      <Suspense fallback={<div className="loading" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>Loading...</div>}>
        <CheckEmailContent />
      </Suspense>
    </LocalizationProvider>
  );
}
