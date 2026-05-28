"use client";

import React from "react";
import {
  Cookie,
  Compass,
  Sliders,
  Link as LinkIcon,
} from "lucide-react";
import { LayoutShell, useLocalization } from "../../../components/Shell";

export default function CookiesContent() {
  const { t } = useLocalization();
  const lastUpdated = "May 27, 2026";

  const sections = [
    { id: "consent", title: t("cookSec1"), icon: <Cookie size={16} /> },
    { id: "whatare", title: t("cookSec2"), icon: <Compass size={16} /> },
    { id: "types", title: t("cookSec3"), icon: <Sliders size={16} /> },
    { id: "manage", title: t("cookSec4"), icon: <Sliders size={16} /> },
    { id: "moreinfo", title: t("cookSec5"), icon: <LinkIcon size={16} /> },
  ];

  return (
    <LayoutShell>
      <main className="tos-shell container">
        {/* Header */}
        <header className="tos-header">
          <span className="tos-badge">Cookies</span>
          <h1>{t("cookiesTitle")}</h1>
          <p className="tos-subtitle">
            {t("cookiesSub")}
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
            {/* Consent Section */}
            <section id="consent" className="tos-section">
              <h2>
                <Cookie className="section-header-icon" />
                {t("cookSec1")}
              </h2>
              <p>
                When you visit or interact with our sites, services, applications, tools, or messaging, we or
                our authorized service providers may use cookies, web beacons, and other similar technologies to
                make your experience better, faster, and safer, for advertising purposes, and to allow us to
                continuously improve our sites, services, applications, and tools.
              </p>
              <p>
                By continuing to use and navigate our sites, services, applications, tools, or messaging, you
                are agreeing to our use of cookies, web beacons, and similar technologies as described herein and
                in our <a href="/privacy">Privacy Policy</a>.
              </p>
              <div className="tos-alert note">
                <strong>Opt-Out Availability:</strong> If you do not wish to accept these technologies in connection
                with your visit to or use of our sites, services, applications, tools, or messaging, you may manage,
                control, or delete them through your browser options as described in Section 4 of this policy.
              </div>
            </section>

            {/* What are Cookies Section */}
            <section id="whatare" className="tos-section">
              <h2>
                <Compass className="section-header-icon" />
                {t("cookSec2")}
              </h2>
              <p>
                These technologies are essentially small data files placed on your computer, tablet, mobile phone,
                or other device that allow us to record information when you visit or interact with our websites,
                services, applications, messaging, and tools. Though often these technologies are generically
                referred to as &quot;Cookies&quot;, each functions slightly differently:
              </p>
              <ul className="tos-list">
                <li><strong>Cookies:</strong> These are small text files placed in the memory of your browser or device when you visit a website or view a message. Cookies allow a website to recognize a particular device or browser. There are several types of cookies:
                  <ul className="tos-inner-list">
                    <li><em>Session cookies</em> expire at the end of your browser session and allow us to link your actions during that particular session.</li>
                    <li><em>Persistent cookies</em> are stored on your device between browser sessions, allowing us to remember your preferences or actions across multiple sites.</li>
                    <li><em>First-party cookies</em> are set directly by the website you are visiting (e.g., Vibe Hosting) to preserve your preferences and settings.</li>
                    <li><em>Third-party cookies</em> are set by a website or domain other than the one you are currently visiting, typically for advertising or analytics integrations.</li>
                  </ul>
                </li>
                <li><strong>Web Beacons:</strong> Small files (also called &quot;pixels&quot;, &quot;image tags&quot;, or &quot;script tags&quot;) loaded on our sites, applications, and tools that work in concert with cookies to identify users and provide anonymized data on their behavior.</li>
                <li><strong>Similar Technologies:</strong> Technologies that store information in your browser or device utilizing local shared objects or local storage, such as Flash cookies, HTML 5 cookies, and other web application software methods. We do not use these technologies for storing information to target advertising to you on or off our sites.</li>
              </ul>
            </section>

            {/* Cookie Categories Section */}
            <section id="types" className="tos-section">
              <h2>
                <Sliders className="section-header-icon" />
                {t("cookSec3")}
              </h2>
              <p>
                Our cookies, web beacons, and similar technologies serve various purposes, but are generally necessary
                or essential to the functioning of our sites, services, applications, tools, or messaging, help us
                improve the performance or provide you extra functionality of the same, or help us to serve relevant
                and targeted advertisements.
              </p>
              <ul className="tos-list">
                <li><strong>Strictly Necessary or Essential:</strong> These cookies, web beacons, and similar technologies let you move around the website and use essential features like secure areas, client panels, and billing setups. Without these technologies, services you have asked for cannot be provided. Accepting these technologies is a condition of using our sites, so if you prevent these from loading, we cannot guarantee your security or how our services will perform during your visit.</li>
                <li><strong>Performance:</strong> These cookies, web beacons, and similar technologies collect anonymized information about how you use our website—such as which pages you visit and if you experience any errors. These do not collect any personally identifiable details and are used solely to improve how our website works, understand user interests, and measure content effectiveness.</li>
                <li><strong>Functionality:</strong> Used to provide extra services or to remember your specific settings (such as layout choices or dashboard preferences) to improve your experience on repeat visits.</li>
                <li><strong>Advertising & Marketing:</strong> First-party or third-party cookies and web beacons may be placed by our sites, applications, or tools in order to deliver promotional content, including product-related advertisements relevant to your specific interests on our sites or third-party sites.</li>
              </ul>
              <div className="tos-alert note">
                <strong>Third-Party Processors:</strong> We utilize third-party service providers (such as Google Analytics or payment processors) to assist us in delivering these functions. These authorized service providers may also place cookies on your device via our services (third-party cookies) and collect information like IP address and device identifiers.
              </div>
            </section>

            {/* Managing Cookies Section */}
            <section id="manage" className="tos-section">
              <h2>
                <Sliders className="section-header-icon" />
                {t("cookSec4")}
              </h2>
              <p>
                You may block cookies by activating the setting on your browser that allows you to refuse the setting of all
                or some cookies. However, if you use your browser settings to block all cookies (including essential cookies)
                it may limit your use of certain features or functions on our website or customer Control Panel.
              </p>
              <p>
                Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies
                as soon as you visit our site. As described in our <a href="/privacy">Privacy Policy</a>, we currently do
                not alter our practices when we receive a &quot;Do Not Track&quot; signal from a visitor's browser.
              </p>
              <p>
                Internet browsers allow you to change your cookie settings. These settings are usually found in the 'options'
                or 'preferences' menu of your internet browser. In order to understand these settings, the following links
                may be helpful:
              </p>
              <ul className="tos-list">
                <li><a title="Cookie settings in Internet Explorer / Edge" href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener nofollow">Cookie settings in Microsoft Internet Explorer / Edge</a></li>
                <li><a title="Cookie settings in Firefox" href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener nofollow">Cookie settings in Mozilla Firefox</a></li>
                <li><a title="Cookie settings in Chrome" href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&amp;hl=en" target="_blank" rel="noopener nofollow">Cookie settings in Google Chrome</a></li>
                <li><a title="Cookie settings in Safari" href="https://support.apple.com/kb/ph19214?locale=en_US" target="_blank" rel="noopener nofollow">Cookie settings in Apple Safari</a></li>
              </ul>
              <p style={{ marginTop: "1rem" }}>
                If you wish to withdraw your consent to our Cookie Policy at any time, you will need to delete your cookies
                manually utilizing your internet browser settings.
              </p>
            </section>

            {/* More Info Section */}
            <section id="moreinfo" className="tos-section">
              <h2>
                <LinkIcon className="section-header-icon" />
                {t("cookSec5")}
              </h2>
              <p>
                To learn more about the legal frameworks, safety settings, and general info regarding tracking cookies,
                the following external resources are highly recommended:
              </p>
              <ul className="tos-list">
                <li><strong>All About Cookies:</strong> Clear, useful information about managing, blocking, or deleting cookies can be found at <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener nofollow">allaboutcookies.org</a>.</li>
                <li><strong>Your Online Choices:</strong> A guide to behavioral advertising and online privacy produced by the internet advertising industry: <a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener nofollow">youronlinechoices.eu</a>.</li>
                <li><strong>International Chamber of Commerce:</strong> Detailed guidelines regarding UK and EU cookie rules: <a href="https://www.iccwbo.org" target="_blank" rel="noopener nofollow">iccwbo.org</a>.</li>
              </ul>
            </section>
          </article>
        </div>
      </main>
    </LayoutShell>
  );
}
