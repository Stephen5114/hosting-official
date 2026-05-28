"use client";
import React from "react";
import { Hammer } from "lucide-react";
import { LocalizationProvider, LayoutShell, useLocalization } from "../../../components/Shell";

export default function DevelopingPage({ params }: { params: { lang: string } }) {
  return (
    <LocalizationProvider lang={params?.lang}>
      <DevelopingContent />
    </LocalizationProvider>
  );
}

function DevelopingContent() {
  const { t } = useLocalization();

  return (
    <LayoutShell>
      <main className="followup-shell" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1rem" }}>
        <section className="followup-card" style={{ maxWidth: "500px", textAlign: "center" }}>
          <div style={{ 
            display: "inline-flex", 
            padding: "1.2rem", 
            borderRadius: "50%", 
            background: "rgba(99, 102, 241, 0.1)", 
            border: "1px solid rgba(99, 102, 241, 0.2)",
            color: "var(--accent)", 
            marginBottom: "1.5rem" 
          }}>
            <Hammer size={36} style={{ animation: "pulse 2s infinite" }} />
          </div>
          <p className="section-label" style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}>{t("developingTitle")}</p>
          <h1 style={{ 
            fontSize: "2.2rem", 
            fontWeight: "800", 
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent", 
            margin: "1rem 0 1.5rem" 
          }}>
            {t("developingMessage")}
          </h1>
          <p style={{ 
            color: "var(--text-secondary)", 
            fontSize: "1.05rem",
            lineHeight: "1.6", 
            marginBottom: "2rem",
            padding: "0 1rem"
          }}>
            {t("developingSub")}
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <a className="btn btn-primary btn-lg" href="/">
              {t("backHome")}
            </a>
          </div>
        </section>
      </main>
    </LayoutShell>
  );
}
