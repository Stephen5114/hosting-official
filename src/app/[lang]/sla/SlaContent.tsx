"use client";

import React from "react";
import {
  Activity,
  CheckCircle,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { LayoutShell, useLocalization } from "../../../components/Shell";

export default function SlaContent() {
  const { t } = useLocalization();
  const lastUpdated = "May 26, 2026";

  const sections = [
    { id: "overview", title: t("slaSec1"), icon: <Activity size={16} /> },
    { id: "uptime", title: t("slaSec2"), icon: <CheckCircle size={16} /> },
    { id: "claims", title: t("slaSec4"), icon: <CreditCard size={16} /> },
    { id: "exclusions", title: t("slaSec5"), icon: <AlertTriangle size={16} /> },
  ];

  return (
    <LayoutShell>
      <main className="tos-shell container">
        {/* Header */}
        <header className="tos-header">
          <span className="tos-badge">Reliability</span>
          <h1>{t("slaTitle")}</h1>
          <p className="tos-subtitle">
            {t("slaSub")}
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
            {/* Overview Section */}
            <section id="overview" className="tos-section">
              <h2>
                <Activity className="section-header-icon" />
                {t("slaSec1")}
              </h2>
              <p>
                To ensure that customers are provided with a high-performance hosting service level consistent
                with the expectations of both <strong>Vibe Hosting</strong> and our developers, we establish this
                Service Level Agreement (SLA).
              </p>
              <p>
                This agreement covers service interruptions related to Vibe Hosting's core managed network routing,
                physical node power systems, hardware host nodes, and virtual web server infrastructures. It establishes
                our commitment to maintaining high operational availability and providing service credits should we fail
                to meet these standards.
              </p>
              <div className="tos-alert note">
                <strong>Scope:</strong> This SLA applies directly to all active Vibe Hosting Shared Hosting and Semi-Dedicated
                Hosting plans registered inside our customer database. VPS and Dedicated Node plans are subject to custom SLAs,
                specifically limiting physical hardware replacements.
              </div>
            </section>

            {/* Uptime Guarantee Section */}
            <section id="uptime" className="tos-section">
              <h2>
                <CheckCircle className="section-header-icon" />
                {t("slaSec2")}
              </h2>
              <p>
                Vibe Hosting guarantees that your website and core server node will maintain a minimum of <strong>99.9% uptime</strong>
                in any given calendar month.
              </p>
              <p>
                If we experience service disruptions that drop our website hosting availability below this 99.9% threshold,
                Vibe Hosting will award service credits to your account.
              </p>
              <p>
                <strong>SLA credits will be calculated and awarded as follows (Applies to Shared/Semi Hosting Plans Only):</strong>
              </p>
              <ul className="tos-list">
                <li>We will credit your account with **1 month of free hosting service** for every **1 hour of continuous downtime** experienced.</li>
                <li>Downtime of less than 1 continuous hour does not qualify for SLA credits.</li>
                <li>The total accumulated SLA credits awarded in a single billing cycle shall not exceed the remaining months of hosting service left in your active customer account.</li>
              </ul>
              <p style={{ marginTop: "1rem" }}>
                Credits are awarded on a **per-service basis**, meaning each distinct hosting node/subscription is treated as a unique service.
                A service interruption experienced on one virtual node or database is considered independent of that on another node and,
                as such, is credited independently of other active services in your Control Panel.
              </p>
            </section>

            {/* Claiming Credits Section */}
            <section id="claims" className="tos-section">
              <h2>
                <CreditCard className="section-header-icon" />
                {t("slaSec4")}
              </h2>
              <p>
                SLA credits are not automatically calculated or applied. No account credit shall be issued until an official SLA credit request
                is made by the client.
              </p>
              <p>
                To receive SLA credits, you must adhere to the following claiming procedure:
              </p>
              <ul className="tos-list">
                <li>All requests for credits must be made by submitting a **billing/accounting ticket** through the Customer Support Portal inside your Control Panel.</li>
                <li>All requests must be made within **five (5) calendar days** of the downtime incident.</li>
                <li>Requests must be submitted after the downtime incident is fully resolved and no further service interruption related to the incident is expected.</li>
                <li>The claim ticket must specify your domain name, virtual node ID, and the exact timestamps of the observed downtime.</li>
              </ul>
              <div className="tos-alert warning">
                <strong>Attention:</strong> Vibe Hosting support representatives will cross-reference all claims with our internal network
                monitoring system logs. If our internal system logs indicate that our server nodes and network routers were responsive and
                available, no credits will be awarded.
              </div>
            </section>

            {/* Exclusions Section */}
            <section id="exclusions" className="tos-section">
              <h2>
                <AlertTriangle className="section-header-icon" />
                {t("slaSec5")}
              </h2>
              <p>
                While we strive for maximum uptime, certain service interruptions are beyond the scope of this SLA.
                No SLA credits will be awarded for downtime caused directly or indirectly by:
              </p>
              <ul className="tos-list">
                <li><strong>Malicious Attacks:</strong> Any service interruption caused by one or more devices on our network being the target or source of a Denial of Service (DoS), Distributed Denial of Service (DDoS), or other malicious security attacks.</li>
                <li><strong>Scheduled Maintenance:</strong> Pre-announced scheduled system maintenance or critical emergency systems/security patching.</li>
                <li><strong>Billing Actions:</strong> Service suspensions resulting from payment failures, expired credit cards, chargeback disputes, or billing system holds. Inactive automated systems (e.g. failed PayPal billing subscriptions) are ineligible for SLA credits.</li>
                <li><strong>Customer Misconfigurations:</strong> Service interruptions caused by the mismanagement, misconfiguration, or deletion of files by the customer (e.g., incorrect directory routing, file permission issues, or faulty network configs inside the IIS/Node setup).</li>
                <li><strong>Coding Errors:</strong> Downtime caused directly by coding errors, memory leaks, unhandled exceptions, database deadlock loops, or scripting bugs within your hosted application code.</li>
                <li><strong>Upstream Providers:</strong> Network outages caused by upstream backbone internet service providers or cloud registry authority routing faults.</li>
              </ul>
            </section>
          </article>
        </div>
      </main>
    </LayoutShell>
  );
}
