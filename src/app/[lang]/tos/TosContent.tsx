"use client";

import React from "react";
import {
  Scale,
  FileText,
  ShieldAlert,
  Server,
  CreditCard,
  RefreshCw,
  Lock,
  HardDrive,
  FolderLock,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import { LayoutShell, useLocalization } from "../../../components/Shell";

export default function TosContent() {
  const { t } = useLocalization();
  const lastUpdated = "May 26, 2026";

  const sections = [
    { id: "agreement", title: t("tosSec1"), icon: <FileText size={16} /> },
    { id: "scope", title: t("tosSec2"), icon: <Server size={16} /> },
    { id: "contact", title: t("tosSec3"), icon: <BookOpen size={16} /> },
    { id: "billing", title: t("tosSec4"), icon: <CreditCard size={16} /> },
    { id: "refund", title: t("tosSec5"), icon: <RefreshCw size={16} /> },
    { id: "limits", title: t("tosSec6"), icon: <AlertTriangle size={16} /> },
    { id: "security", title: t("tosSec7"), icon: <Lock size={16} /> },
    { id: "backups", title: t("tosSec8"), icon: <HardDrive size={16} /> },
    { id: "content", title: t("tosSec9"), icon: <ShieldAlert size={16} /> },
    { id: "termination", title: t("tosSec10"), icon: <FolderLock size={16} /> },
    { id: "legal", title: t("tosSec11"), icon: <Scale size={16} /> },
  ];

  return (
    <LayoutShell>
      <main className="tos-shell container">
        {/* Header */}
        <header className="tos-header">
          <span className="tos-badge">{t("legalText")}</span>
          <h1>{t("tosTitle")}</h1>
          <p className="tos-subtitle">
            {t("tosSub")}
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
            {/* Agreement Section */}
            <section id="agreement" className="tos-section">
              <h2>
                <FileText className="section-header-icon" />
                {t("tosSec1")}
              </h2>
              <p>
                This Terms of Service (TOS) agreement constitutes a binding contract between{" "}
                <strong>Vibe Hosting</strong> (&quot;Vibe Hosting&quot;, &quot;us&quot;, &quot;we&quot;,
                &quot;our&quot;) and you (&quot;Customer&quot;, &quot;Client&quot;, &quot;Member&quot;,
                &quot;you&quot;, &quot;your&quot;).
              </p>
              <p>
                Use of any Vibe Hosting services, including shared web hosting, VPS hosting, cloud
                hosting, SSL certificates, or domain names, constitutes your immediate acceptance and
                express agreement to this Terms of Service (TOS) agreement, as well as the Vibe Hosting{" "}
                <a href="#agreement">Acceptable Use Policy (AUP)</a> and{" "}
                <a href="#agreement">Privacy Policy</a>, which are incorporated by reference.
              </p>
              <div className="tos-alert warning">
                <strong>Attention:</strong> Vibe Hosting reserves the right to refuse service to anyone
                for any reason or no reason. We reserve the right to terminate this TOS agreement and
                cease providing services immediately in accordance with these terms.
              </div>
            </section>

            {/* Service Scope Section */}
            <section id="scope" className="tos-section">
              <h2>
                <Server className="section-header-icon" />
                {t("tosSec2")}
              </h2>
              <p>
                The exact technical features, resource quotas, and pricing details of the Services governed by
                this TOS are defined on our public website (e.g., plan configurations, recommended site limits,
                disk limit, file count limit, and technology stack support). The services we provide are
                referred to collectively as the &quot;Service.&quot;
              </p>
              <p>
                Certain backend features, infrastructure tools, and services (such as DNS management or email
                delivery integrations) may be provided by third-party vendors. These third parties may make
                changes (including material changes) to their products. If a third party changes its product,
                you are not entitled to terminate this agreement, even if it materially impacts the Service,
                and Vibe Hosting shall bear no liability for such changes.
              </p>
              <p>
                Vibe Hosting reserves the right to amend its service offerings, suspend specific features,
                or modify service fees at any time at its sole discretion, and to determine whether and when
                such changes apply to both existing and future customers.
              </p>
            </section>

            {/* Contact & Ownership Section */}
            <section id="contact" className="tos-section">
              <h2>
                <BookOpen className="section-header-icon" />
                {t("tosSec3")}
              </h2>
              <p>
                To activate and maintain the Service, you are required to provide Vibe Hosting with accurate,
                truthful, and up-to-date information during registration and for the duration of our business
                relationship. All official notices, billing reminders, and service alerts will be sent via email.
                You agree to supply us with an email address that is active and monitored on a daily basis.
              </p>
              <p>
                Vibe Hosting has no responsibility or liability for service interruptions, data losses, or
                consequential damages resulting from misdirected communications due to your failure to provide
                accurate and valid contact details.
              </p>
              <div className="tos-alert note">
                <strong>Ownership Rule:</strong> The contact person listed in our records is considered the
                primary account administrator. However, in the event of an ownership dispute, Vibe Hosting
                will consider the person or entity who paid for the latest billing period of the account to
                be the sole owner of the account.
              </div>
            </section>

            {/* Billing Section */}
            <section id="billing" className="tos-section">
              <h2>
                <CreditCard className="section-header-icon" />
                {t("tosSec4")}
              </h2>
              <p>
                The date of your initial online order for Vibe Hosting Services establishes your account's
                monthly anniversary date for all future billing. Services are provided on a prepayment basis.
                Fees for all services will be billed in advance on the anniversary date of the service cycle
                (monthly, quarterly, or annually).
              </p>
              <p>
                All fees are fully earned when due and non-refundable unless explicitly covered by our refund guarantees.
                Customer agrees that Vibe Hosting is authorized to charge all recurring Service Fees to the payment
                method supplied by Customer in the Control Panel.
              </p>
              <p>
                All payments must be made in US Dollars. Service Fees do not include sales, use, excise, VAT, or other taxes
                imposed by any taxing authority. If applicable, all such taxes will be added to your invoice and paid by you.
              </p>
            </section>

            {/* Refund Section */}
            <section id="refund" className="tos-section">
              <h2>
                <RefreshCw className="section-header-icon" />
                {t("tosSec5")}
              </h2>
              <p>
                We stand behind our hosting quality. If Customer terminates this agreement within 7 calendar days of
                the initial signup date and requests immediate termination via the accounting department, Customer
                will receive a full refund of the annual hosting Service Fees paid.
              </p>
              <p>
                If Customer requests termination at the end of the first 7 days, then a pro-rated refund will be
                calculated for the remaining unused months.
              </p>
              <div className="tos-alert note">
                <strong>Exclusions:</strong>
                <ul className="tos-inner-list">
                  <li>Setup fees, custom onboarding fees, domain registrations, domain transfers, and SSL certificates are non-refundable.</li>
                  <li>Payments that are over 6 months old are non-refundable.</li>
                  <li>This Money-Back Guarantee does not apply to monthly purchases, 3-month purchases, 6-month purchases, renewals, plan upgrades, or add-ons.</li>
                </ul>
              </div>
            </section>

            {/* Limits Section */}
            <section id="limits" className="tos-section">
              <h2>
                <AlertTriangle className="section-header-icon" />
                {t("tosSec6")}
              </h2>
              <p>
                To ensure a high quality of service for all users on our shared infrastructure, your use of resources
                must be reasonable. You agree not to place an excessive burden on our CPU, memory, database, or disk I/O systems.
              </p>
              <p>
                We enforce strict file counts and directory item quotas per plan to preserve disk health and system speeds.
                The specific limits for Vibe Hosting shared plans are:
              </p>
              <div className="tos-table-container">
                <table className="tos-table">
                  <thead>
                    <tr>
                      <th>Plan Type</th>
                      <th>Storage Quota</th>
                      <th>File/Folder Count Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Basic Plan</strong></td>
                      <td>1,024 MB (1 GB)</td>
                      <td>50,000 files/folders</td>
                    </tr>
                    <tr>
                      <td><strong>Pro Plan</strong></td>
                      <td>5,120 MB (5 GB)</td>
                      <td>150,000 files/folders</td>
                    </tr>
                    <tr>
                      <td><strong>Enterprise Plan</strong></td>
                      <td>20,480 MB (20 GB)</td>
                      <td>500,000 files/folders</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: "1rem" }}>
                Additionally, each individual shared hosting account shall not exceed the limit of{" "}
                <strong>99 IIS Entries</strong>. Reaching these capacity thresholds or placing abnormal stress
                on our hosting nodes will trigger remedy action, which may include instant rate-limiting, temporary
                isolation, or suspension with or without notice.
              </p>
            </section>

            {/* Security Section */}
            <section id="security" className="tos-section">
              <h2>
                <Lock className="section-header-icon" />
                {t("tosSec7")}
              </h2>
              <p>
                Customer is strictly prohibited from violating, attempting to violate, or circumventing the security
                of the Vibe Hosting Network, servers, or any customer site. Violations of system or network security
                will result in immediate termination and civil or criminal liability.
              </p>
              <p>
                Prohibited security behaviors include, but are not limited to:
              </p>
              <ul className="tos-list">
                <li>Accessing data not intended for Customer or logging into a server/account Customer is not authorized to access.</li>
                <li>Attempting to probe, scan, or test the vulnerability of our systems or networks.</li>
                <li>Interfering with service to any user, host, or network, including via DDoS attacks, mail bombing, or flooding.</li>
                <li>Forging any TCP/IP packet header or any part of the header information in any email or upload.</li>
              </ul>
              <p>
                Vibe Hosting will investigate all security breaches and will cooperate fully with law enforcement
                authorities to prosecute any Customer involved in such violations.
              </p>
            </section>

            {/* Backups Section */}
            <section id="backups" className="tos-section">
              <h2>
                <HardDrive className="section-header-icon" />
                {t("tosSec8")}
              </h2>
              <p>
                <strong>Customer agrees that they bear sole responsibility for backing up all of their site files,
                databases, and email data.</strong> Vibe Hosting will not be responsible or liable if data loss occurs
                for any reason.
              </p>
              <p>
                For Shared hosting plans, Vibe Hosting provides automated daily backup snapshots for emergency restoration;
                however, we do not guarantee the completeness, accessibility, or integrity of these backups. Customers
                are strongly encouraged to schedule regular off-site database and file dumps.
              </p>
              <div className="tos-alert danger">
                <strong>Backup Exclusions:</strong> To prevent resource degradation, Vibe Hosting does NOT back up or
                store files of the following types:
                <div style={{ marginTop: "0.5rem", fontFamily: "monospace", fontSize: "0.85rem", color: "var(--text)" }}>
                  *.pdf, *.bak, *.sql, *.zip, *.rar, *.mov, *.avi, *.tar, *.gzip, *.gz, *.mp3, *.wma, *.wmv, *.wav, *.log, *.mp4, *.iso, *.psd, *.tmp, *.tmp.*
                </div>
              </div>
            </section>

            {/* Content Section */}
            <section id="content" className="tos-section">
              <h2>
                <ShieldAlert className="section-header-icon" />
                {t("tosSec9")}
              </h2>
              <p>
                Customer is solely responsible for all content, code, data, and applications uploaded to, stored on, or
                distributed by Customer via Vibe Hosting.
              </p>
              <p>
                We do not allow our hosting service to be used for illegal or high-bandwidth distribution sites. The following
                types of sites and content are strictly prohibited:
              </p>
              <ul className="tos-list">
                <li>Adult or pornographic content of any nature.</li>
                <li>Mass media sharing, file hosting, or file-sharing sites.</li>
                <li>Mass file download portals or software mirror hosting.</li>
                <li>Using our hosting service strictly as an online backup repository, hard drive storage, or file cache.</li>
                <li>Sites promoting illegal activities, containing malware, phishing links, or intellectual property violations.</li>
              </ul>
              <p>
                Each shared hosting account can be used by a maximum of **10 different companies** or distinct entities.
                If you are looking to resell our services to external clients, you must sign up for a dedicated Reseller Plan.
              </p>
            </section>

            {/* Termination Section */}
            <section id="termination" className="tos-section">
              <h2>
                <FolderLock className="section-header-icon" />
                {t("tosSec10")}
              </h2>
              <p>
                <strong>Cancellation:</strong> If you wish to cancel your service, you must submit a cancellation request
                via the Support Portal inside your Control Panel. Cancellations take effect once processed by our accounting department
                (Cancellation Date).
              </p>
              <div className="tos-alert danger">
                <strong>Data Destruction Notice:</strong> Immediately upon cancellation, all customer files, databases,
                and emails remaining on Vibe Hosting servers will be destroyed and rendered completely unrecoverable for
                security and privacy reasons.
              </div>
              <p style={{ marginTop: "1rem" }}>
                <strong>Non-Payment:</strong> All payments are due on your monthly anniversary date.
              </p>
              <ul className="tos-list">
                <li><strong>After 10 days</strong> of consecutive non-payment: Public access to your websites and services will be suspended.</li>
                <li><strong>After 25 days</strong> of consecutive non-payment: Your hosting resources will be reclaimed and all customer data will be permanently destroyed.</li>
                <li>For VPS or Dedicated Nodes, data will be destroyed after **5 days** of non-payment.</li>
              </ul>
              <p>
                <strong>Billing Disputes:</strong> Customers must resolve billing errors by opening a ticket with support.
                You agree not to issue chargebacks. Any chargeback initiated will result in immediate termination of all accounts,
                data deletion, and a <strong>$150.00 administrative fee</strong>.
              </p>
            </section>

            {/* Legal Section */}
            <section id="legal" className="tos-section">
              <h2>
                <Scale className="section-header-icon" />
                {t("tosSec11")}
              </h2>
              <p>
                THE SERVICES ARE PROVIDED ON AN &quot;AS IS, AS AVAILABLE&quot; BASIS. VIBE HOSTING EXPRESSLY DISCLAIMS
                ALL WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p>
                VH DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE, NOR DOES IT MAKE ANY WARRANTIES
                AS TO THE ACCURACY OR RELIABILITY OF THE INFORMATION TRANSFERRED.
              </p>
              <p>
                <strong>Limitation of Liability:</strong> Under no circumstances, including negligence, shall Vibe Hosting,
                its officers, employees, or directors be liable for any indirect, incidental, special, consequential, or
                punitive damages, or loss of profits, revenue, or data.
              </p>
              <p>
                IN NO EVENT SHALL VIBE HOSTING'S TOTAL AGGREGATE LIABILITY EXCEED THE TOTAL FEES ACTUALLY PAID TO VIBE HOSTING
                BY CUSTOMER DURING THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
              </p>
              <p>
                <strong>Governing Law:</strong> This agreement and all disputes arising from it shall be governed by the laws of
                the State of California, USA, without regard to conflict of law rules. Both parties submit to personal
                jurisdiction in California.
              </p>
            </section>
          </article>
        </div>
      </main>
    </LayoutShell>
  );
}
