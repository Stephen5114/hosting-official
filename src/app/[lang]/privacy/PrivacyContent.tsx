"use client";

import React from "react";
import {
  ShieldAlert,
  FileText,
  Eye,
  Server,
  Users,
  Lock,
  HardDrive,
  Mail,
  RefreshCw,
} from "lucide-react";
import { LayoutShell, useLocalization } from "../../../components/Shell";

export default function PrivacyContent() {
  const { t } = useLocalization();
  const lastUpdated = "May 26, 2026";

  const sections = [
    { id: "commitment", title: t("privSec1"), icon: <Eye size={16} /> },
    { id: "vendors", title: t("privSec2"), icon: <Server size={16} /> },
    { id: "disclosure", title: t("privSec3"), icon: <ShieldAlert size={16} /> },
    { id: "aggregate", title: t("privSec4"), icon: <Users size={16} /> },
    { id: "personal", title: t("privSec5"), icon: <FileText size={16} /> },
    { id: "security", title: t("privSec6"), icon: <Lock size={16} /> },
    { id: "cookies", title: t("privSec7"), icon: <HardDrive size={16} /> },
    { id: "optout", title: t("privSec8"), icon: <Mail size={16} /> },
    { id: "changes", title: t("privSec9"), icon: <RefreshCw size={16} /> },
  ];

  return (
    <LayoutShell>
      <main className="tos-shell container">
        {/* Header */}
        <header className="tos-header">
          <span className="tos-badge">{t("legalText")}</span>
          <h1>{t("privacyTitle")}</h1>
          <p className="tos-subtitle">
            {t("privacySub")}
          </p>
          <div className="tos-meta">
            <span>{t("lastUpdatedLabel")}: <strong>{lastUpdated}</strong></span>
          </div>
        </header>

        <hr className="section-divider" style={{ margin: "2rem 0" }} />

        {/* Layout */}
        <div className="tos-layout">
          {/* Left Sidebar Table of Contents */}
          <aside className="tos-sidebar">
            <div className="tos-sidebar-card">
              <h3>{t("tableOfContents")}</h3>
              <ul className="tos-toc-list">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="tos-toc-link">
                      {section.icon}
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right Content Column */}
          <article className="tos-content">
            {/* Commitment Section */}
            <section id="commitment" className="tos-section">
              <h2>
                <Eye className="section-header-icon" />
                {t("privSec1")}
              </h2>
              <p>
                At <strong>Vibe Hosting</strong>, we recognize the vital importance of protecting our
                customers' and visitors' privacy. We are fully committed to implementing secure technology and
                transparent data practices to ensure you have a safe and trusted hosting experience.
              </p>
              <p>
                This Privacy Policy sets forth our privacy practices regarding the information we collect when
                you interact with our public website, purchase our services, or access your self-service Control Panel.
              </p>
              <p>
                By accessing Vibe Hosting's website, utilizing our APIs, registering an account, or deploying applications on
                our infrastructure, you consent to the collection, storage, and usage of data as described within this policy.
              </p>
            </section>

            {/* Third Party Vendors Section */}
            <section id="vendors" className="tos-section">
              <h2>
                <Server className="section-header-icon" />
                {t("privSec2")}
              </h2>
              <p>
                Vibe Hosting may integrate or utilize services from third-party vendors to deliver high-quality hosting solutions.
                This includes domain registrar partners, SSL certification authorities, third-party payment gateways, and content delivery
                networks (CDNs).
              </p>
              <p>
                These third-party vendors maintain their own independent privacy policies, which govern their collection and use of
                information. You acknowledge and agree that Vibe Hosting has no control over, and accepts no responsibility or
                liability for, the policies or privacy practices of these third-party services.
              </p>
            </section>

            {/* Information Disclosure Section */}
            <section id="disclosure" className="tos-section">
              <h2>
                <ShieldAlert className="section-header-icon" />
                {t("privSec3")}
              </h2>
              <p>
                We do not sell, rent, or lease your personally identifiable information (PII) to third parties under any circumstances.
                Vibe Hosting will not share your personal information with external parties without your explicit permission, except in the
                following necessary situations:
              </p>
              <ul className="tos-list">
                <li>To comply with federal, state, or local laws, judicial regulations, court orders, or subpoenas.</li>
                <li>To resolve and troubleshoot a technical service or billing request initiated by Customer.</li>
                <li>To pass necessary registration details to our domain registry partner to secure your requested domain name.</li>
                <li>To protect the rights, property, or safety of Vibe Hosting, our employees, our users, or the public.</li>
                <li>In connection with corporate reorganization, liquidation, mergers, acquisitions, or the sale of assets.</li>
              </ul>
            </section>

            {/* Aggregate Statistics Section */}
            <section id="aggregate" className="tos-section">
              <h2>
                <Users className="section-header-icon" />
                {t("privSec4")}
              </h2>
              <p>
                Vibe Hosting may collect, compile, and analyze aggregate, anonymized statistical data regarding our visitors,
                customers, and platform performance. This may include generic demographic information, service usage patterns,
                website traffic analysis, and user survey responses.
              </p>
              <p>
                We may share this aggregate statistical data with our partners, advertisers, or other third parties to improve
                our service and marketing efficiency. In no way does this aggregate information contain any personally identifiable details,
                and it cannot be linked to any individual user or account.
              </p>
            </section>

            {/* Personal Information Section */}
            <section id="personal" className="tos-section">
              <h2>
                <FileText className="section-header-icon" />
                {t("privSec5")}
              </h2>
              <p>
                When you purchase our services or create an account, we request essential personal, contact, and financial details
                through our secure online order and lead registration forms.
              </p>
              <p>
                The information collected may include:
              </p>
              <ul className="tos-list">
                <li><strong>Contact Details:</strong> Your full name, company name (if applicable), email address, physical mailing address, and telephone number. This contact information is used strictly to provision services, send server notifications, and manage our business relationship.</li>
                <li><strong>Financial Details:</strong> Your credit card number, expiration date, billing zip code, and CVV code. This financial information is used solely to bill you for the specific Vibe Hosting services you purchase and is processed securely.</li>
              </ul>
            </section>

            {/* Secure Data Section */}
            <section id="security" className="tos-section">
              <h2>
                <Lock className="section-header-icon" />
                {t("privSec6")}
              </h2>
              <p>
                Vibe Hosting takes data security seriously. When we collect personally identifiable or financial information,
                all data entry forms are fully protected by industry-standard Secure Sockets Layer (SSL) and Transport Layer
                Security (TLS) encryption technology.
              </p>
              <p>
                Using SSL/TLS protected pages, all information you input is encrypted locally before being transmitted across the internet
                to our secure databases. This prevents unauthorized interception or tampering of your sensitive details during transport.
              </p>
            </section>

            {/* Cookies Section */}
            <section id="cookies" className="tos-section">
              <h2>
                <HardDrive className="section-header-icon" />
                {t("privSec7")}
              </h2>
              <p>
                To provide a highly optimized and personalized experience, Vibe Hosting utilizes cookies, website traffic statistics trackers,
                IP logs, and digital image markers (web beacons) across our web properties.
              </p>
              <p>
                These tools help us in the following ways:
              </p>
              <ul className="tos-list">
                <li><strong>Cookies:</strong> Small text files saved on your computer that remember your preferences, authentication tokens, and portal settings to eliminate redundant logins.</li>
                <li><strong>Website Statistics:</strong> Anonymized tools that monitor how visitors navigate our pages, helping us identify bottleneck issues, high-traffic periods, and optimize server scaling.</li>
                <li><strong>Image Markers & Beacons:</strong> Invisible pixels embedded in our email newsletters and marketing campaigns to track open rates and click-through rates, helping us gauge message relevance.</li>
                <li><strong>Advertising Trackers:</strong> We may work with third-party advertising companies to serve interest-based ads across the web. These platforms may collect anonymous, non-personally identifiable visit logs to optimize ad relevancy.</li>
              </ul>
            </section>

            {/* Opt-out Section */}
            <section id="optout" className="tos-section">
              <h2>
                <Mail className="section-header-icon" />
                {t("privSec8")}
              </h2>
              <p>
                We respect your inbox control. Vibe Hosting provides an easy-to-use Opt-out mechanism for customers who wish to stop
                receiving promotional announcements, newsletters, or marketing updates from us.
              </p>
              <p>
                You can easily exercise your right to opt-out by:
              </p>
              <ul className="tos-list">
                <li>Clicking the **"Unsubscribe"** link located at the bottom of all promotional and news emails we distribute.</li>
                <li>Logging into your customer Control Panel and adjusting your email preference settings.</li>
              </ul>
              <div className="tos-alert note">
                <strong>Administrative Notices:</strong> Please note that even if you opt-out of marketing emails, you will
                continue to receive essential system alerts, billing invoices, domain expiration warnings, and critical security notices
                related directly to the maintenance of your active hosting accounts.
              </div>
            </section>

            {/* Policy Changes Section */}
            <section id="changes" className="tos-section">
              <h2>
                <RefreshCw className="section-header-icon" />
                {t("privSec9")}
              </h2>
              <p>
                Vibe Hosting reserves the right to update, amend, or modify this Privacy Policy at our sole discretion to reflect changes in
                legal regulations, privacy compliance standard procedures, or security upgrades.
              </p>
              <p>
                When an update is published, we will immediately revise the "Last Updated" date at the top and bottom of this page.
                Your continued use of Vibe Hosting websites, Control Panels, or server services after any changes are posted constitutes your
                express agreement to the revised Privacy Policy.
              </p>
              <p>
                If you have questions, inquiries, or feedback regarding our privacy protections, secure forms, or this document's implementation,
                please open a support ticket or contact our Sales team. We will route your inquiry to the appropriate compliance staff.
              </p>
              <p style={{ marginTop: "2rem", fontSize: "0.85rem", color: "var(--text-tertiary)" }}>
                {t("lastUpdatedLabel")}: {lastUpdated}
              </p>
            </section>
          </article>
        </div>
      </main>
    </LayoutShell>
  );
}
