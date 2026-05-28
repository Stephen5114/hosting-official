"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { LayoutShell, useLocalization } from "../../../components/Shell";

const customerPanelUrl =
  (process.env.NEXT_PUBLIC_CUSTOMER_PANEL_URL as string | undefined) ?? "https://cp.hostvibecoding.com";

export default function CheckEmailContent() {
  const { t } = useLocalization();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email")?.trim() ?? "";
  const previewUrl = searchParams?.get("preview")?.trim() ?? "";
  const loginUrl = new URL(`${customerPanelUrl}/login`);

  if (email) {
    loginUrl.searchParams.set("email", email);
  }

  return (
    <LayoutShell>
      <main className="followup-shell" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1rem" }}>
        <section className="followup-card">
          <p className="section-label">{t("nextStepLabel")}</p>
          <h1>{t("verifyEmailHeading")}</h1>
          <p className="followup-copy">
            {t("verifyEmailCopyPart1")}
            <strong>{email || "your inbox"}</strong>
            {t("verifyEmailCopyPart2")}
          </p>

          <div className="followup-actions">
            <a className="btn btn-primary btn-lg" href={loginUrl.toString()}>
              {t("openCustomerLogin")}
            </a>
            <a className="btn btn-secondary btn-lg" href={`${customerPanelUrl}/register`}>
              {t("createAccountPortal")}
            </a>
            {previewUrl ? (
              <a className="btn btn-secondary" href={previewUrl}>
                {t("openVerificationLink")}
              </a>
            ) : null}
          </div>

          <div className="followup-note">
            <p>{t("followupNote")}</p>
            <a href="/">{t("backHome")}</a>
          </div>
        </section>
      </main>
    </LayoutShell>
  );
}
