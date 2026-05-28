"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Globe2, Cookie, Zap, Check, ArrowRight, ArrowLeft, LayoutDashboard, ServerCog, ShieldCheck, Cloud, LifeBuoy, HardDrive, Files, Code2, Layers } from "lucide-react";
import { LANGUAGES, EXCHANGE_RATES, TRANSLATIONS } from "./i18n";

type LocalizationContextType = {
  currentLang: string;
  currentCurrency: string;
  t: (key: string) => string;
  formatPrice: (usdPrice: number) => React.ReactNode;
  openLangModal: () => void;
};

const LocalizationContext = createContext<LocalizationContextType | null>(null);

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
}

const customerPanelUrl =
  (process.env.NEXT_PUBLIC_CUSTOMER_PANEL_URL as string | undefined) ?? "https://cp.hostvibecoding.com";

export function LocalizationProvider({ children, lang }: { children: React.ReactNode; lang?: string }) {
  const initialLang = lang && LANGUAGES[lang.toUpperCase()] ? lang.toUpperCase() : "EN";
  const [currentLang, setCurrentLang] = useState<string>(initialLang);
  const [currentCurrency, setCurrentCurrency] = useState<string>("USD");
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [tempLang, setTempLang] = useState<string>(initialLang);
  const [tempCurrency, setTempCurrency] = useState<string>("USD");

  const [cookieConsent, setCookieConsent] = useState<string | null>("loading");
  const [isDismissing, setIsDismissing] = useState(false);

  // Sync state if lang prop changes (e.g. client router transitions)
  useEffect(() => {
    if (lang && LANGUAGES[lang.toUpperCase()]) {
      setCurrentLang(lang.toUpperCase());
      setTempLang(lang.toUpperCase());
    }
  }, [lang]);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("vibe-hosting-currency");
    if (savedCurrency && EXCHANGE_RATES[savedCurrency]) {
      setCurrentCurrency(savedCurrency);
      setTempCurrency(savedCurrency);
    }

    const storedCookie = localStorage.getItem("vibe-hosting-cookie-consent");
    setCookieConsent(storedCookie || null);
  }, []);

  const handleOpenLangModal = () => {
    setTempLang(currentLang);
    setTempCurrency(currentCurrency);
    setIsLangModalOpen(true);
  };

  const handleSaveLangSettings = () => {
    setCurrentLang(tempLang);
    setCurrentCurrency(tempCurrency);
    localStorage.setItem("vibe-hosting-lang", tempLang);
    localStorage.setItem("vibe-hosting-currency", tempCurrency);

    // Save language to a 7-day valid cookie
    document.cookie = `vibe-hosting-lang=${tempLang.toLowerCase()}; path=/; max-age=604800; SameSite=Lax`;

    setIsLangModalOpen(false);

    // Smooth redirect/navigation to update URL language prefix
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const segments = pathname.split("/");
      const locales = ["en", "zh", "es", "ja"];
      if (locales.includes(segments[1])) {
        segments[1] = tempLang.toLowerCase();
      } else {
        segments.splice(1, 0, tempLang.toLowerCase());
      }
      const newPathname = segments.join("/");
      const search = window.location.search;
      const hash = window.location.hash;
      window.location.href = `${newPathname}${search}${hash}`;
    }
  };

  const handleAcceptCookies = () => {
    localStorage.setItem("vibe-hosting-cookie-consent", "accepted");
    setIsDismissing(true);
    setTimeout(() => {
      setCookieConsent("accepted");
      setIsDismissing(false);
    }, 400);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem("vibe-hosting-cookie-consent", "declined");
    setIsDismissing(true);
    setTimeout(() => {
      setCookieConsent("declined");
      setIsDismissing(false);
    }, 400);
  };

  const t = (key: string) => {
    return TRANSLATIONS[currentLang]?.[key] ?? TRANSLATIONS["EN"]?.[key] ?? key;
  };

  const formatPrice = (usdPrice: number) => {
    const config = EXCHANGE_RATES[currentCurrency] || EXCHANGE_RATES["USD"];
    const converted = usdPrice * config.rate;
    return (
      <>
        <span className="currency">{config.symbol}</span>
        {converted.toFixed(2)}
      </>
    );
  };

  const value = useMemo(
    () => ({
      currentLang,
      currentCurrency,
      t,
      formatPrice,
      openLangModal: handleOpenLangModal,
    }),
    [currentLang, currentCurrency]
  );

  return (
    <LocalizationContext.Provider value={value}>
      <div className="site-shell">
        <div className="bg-grid" />
        <div className="bg-glow" />

        {/* Global Layout Shell wrapping children */}
        {children}

        {/* Language Selection Modal */}
        {isLangModalOpen && (
          <div className="lang-modal-overlay" onClick={() => setIsLangModalOpen(false)}>
            <div className="lang-modal-box" onClick={(e) => e.stopPropagation()}>
              <div>
                <h3 className="lang-modal-title">{t("langCurrency")}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  {t("customizeExp")}
                </p>
              </div>

              <div className="lang-modal-section">
                <label className="lang-modal-label">{t("selectLang")}</label>
                <select
                  className="lang-modal-select"
                  value={tempLang}
                  onChange={(e) => setTempLang(e.target.value)}
                >
                  {Object.entries(LANGUAGES).map(([key, lang]) => (
                    <option key={key} value={key}>
                      {lang.label} ({key})
                    </option>
                  ))}
                </select>
              </div>

              <div className="lang-modal-section">
                <label className="lang-modal-label">{t("selectCurr")}</label>
                <select
                  className="lang-modal-select"
                  value={tempCurrency}
                  onChange={(e) => setTempCurrency(e.target.value)}
                >
                  {Object.entries(EXCHANGE_RATES).map(([key, curr]) => (
                    <option key={key} value={key}>
                      {curr.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lang-modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsLangModalOpen(false)}>
                  {t("cancel")}
                </button>
                <button className="btn btn-primary" onClick={handleSaveLangSettings}>
                  {t("save")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cookie Consent Banner */}
        {cookieConsent === null && (
          <div className={`cookie-banner${isDismissing ? " dismissed" : ""}`}>
            <div className="cookie-banner-content">
              <div className="cookie-banner-icon">
                <Cookie size={24} />
              </div>
              <div className="cookie-banner-text">
                {t("cookieText")}
                <a href="/cookies">{t("cookiePolicy")}</a>.
              </div>
            </div>
            <div className="cookie-banner-actions">
              <button className="btn btn-decline" onClick={handleDeclineCookies}>
                {t("decline")}
              </button>
              <button className="btn btn-primary" onClick={handleAcceptCookies}>
                {t("accept")}
              </button>
            </div>
          </div>
        )}
      </div>
    </LocalizationContext.Provider>
  );
}

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const { currentLang, currentCurrency, t, openLangModal } = useLocalization();
  const [isNotHome, setIsNotHome] = useState(false);
  const [contactEmail, setContactEmail] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsNotHome(window.location.pathname !== "/");
  }, []);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>, email: string) => {
    e.preventDefault();
    setContactEmail(email);
    setCopied(false);
  };

  const handleCopyEmail = () => {
    if (contactEmail) {
      navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const developingLink = "/" + currentLang.toLowerCase() + "/developing";

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-inner">
          <a className="brand" href="/">
            <span className="brand-mark">
              <Zap size={16} fill="currentColor" />
            </span>
            <span className="brand-text">Vibe Hosting</span>
          </a>
          <div className="nav-links">
            <a href="/#plans">{t("pricing")}</a>
            <a href="/#platform">{t("platform")}</a>
            <a href="/#onboarding">{t("timeline")}</a>
            <a href="/#launch">{t("getStarted")}</a>
          </div>
          <div className="nav-actions">
            <button className="nav-lang-selector" onClick={openLangModal} aria-label="Select Language and Currency">
              <Globe2 size={15} />
              <span>
                {currentLang} / {currentCurrency} ({EXCHANGE_RATES[currentCurrency]?.symbol || "$"})
              </span>
            </button>
            {isNotHome ? (
              <a className="btn btn-ghost btn-sm" href="/">
                <ArrowLeft size={16} /> {t("backHome")}
              </a>
            ) : (
              <a className="btn btn-ghost btn-sm" href={customerPanelUrl} target="_blank" rel="noreferrer">
                {t("signIn")}
              </a>
            )}
            <a className="btn btn-primary btn-sm" href="/#launch">
              {t("startFree")}
            </a>
          </div>
        </div>
      </nav>

      {children}

      <footer className="footer" id="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1 – Our Services */}
            <div className="footer-col">
              <h4 className="footer-heading">{t("ourServices")}</h4>
              <ul className="footer-list">
                <li><a href="/#plans">{t("netHosting")}</a></li>
                <li><a href="/#plans">{t("pyHosting")}</a></li>
                <li><a href="/#plans">{t("phpHosting")}</a></li>
                <li><a href="/#plans">{t("springHosting")}</a></li>
                <li><a href="/#plans">{t("staticHosting")}</a></li>
                <li><a href="/#plans">{t("domains")}</a></li>
                <li><a href="/#plans">{t("sslCert")}</a></li>
              </ul>
            </div>

            {/* Column 2 – Help & Support */}
            <div className="footer-col">
              <h4 className="footer-heading">{t("helpSupport")}</h4>
              <ul className="footer-list">
                <li><a href="#" onClick={(e) => handleEmailClick(e, "support@hostvibecoding.com")}>{t("emailSupport")}</a></li>
                <li><a href={developingLink}>{t("knowBase")}</a></li>
                <li><a href="#" onClick={(e) => handleEmailClick(e, "contact@hostvibecoding.com")}>{t("contactUs")}</a></li>
                <li><a href={developingLink}>{t("platStatus")}</a></li>
              </ul>
            </div>

            {/* Column 3 – User Area */}
            <div className="footer-col">
              <h4 className="footer-heading">{t("userArea")}</h4>
              <ul className="footer-list">
                <li><a href={customerPanelUrl} target="_blank" rel="noreferrer">{t("controlPanelLogin")}</a></li>
                <li><a href={`${customerPanelUrl}/register`} target="_blank" rel="noreferrer">{t("createAccount")}</a></li>
                <li><a href="/privacy">{t("privacyPolicy")}</a></li>
                <li><a href="/tos">{t("tosText")}</a></li>
                <li><a href="/sla">{t("slaText")}</a></li>
                <li><a href="/cookies">{t("cookiePolicy")}</a></li>
              </ul>
            </div>

            {/* Column 4 – Connect */}
            <div className="footer-col">
              <h4 className="footer-heading">{t("connectUs")}</h4>
              <div className="footer-socials">
                <a href={developingLink} aria-label="Facebook" className="footer-social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href={developingLink} aria-label="Twitter / X" className="footer-social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href={developingLink} aria-label="GitHub" className="footer-social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
                <a href={developingLink} aria-label="Discord" className="footer-social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                  </svg>
                </a>
              </div>
              <p className="footer-tagline">{t("footerTagline")}</p>
              <div className="footer-brand-badge">
                <span className="brand-mark">
                  <Zap size={16} fill="currentColor" />
                </span>
                <span>Vibe Hosting</span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <span className="footer-copy">
              &copy; {new Date().getFullYear()} Vibe Hosting. {t("rightsReserved")}
            </span>
            <div className="footer-bottom-links">
              <a href="/privacy">{t("privacyLabel")}</a>
              <a href="/tos">{t("termsLabel")}</a>
              <a href="/sla">{t("slaLabel")}</a>
              <a href={customerPanelUrl} target="_blank" rel="noreferrer">
                {t("customerPanelLabel")}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Email Dialog Modal */}
      {contactEmail && (
        <div className="lang-modal-overlay" onClick={() => setContactEmail(null)}>
          <div className="lang-modal-box" style={{ maxWidth: "440px", width: "90%", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div className="contact-glow-icon" style={{
                display: "inline-grid",
                placeItems: "center",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(56, 189, 248, 0.1)",
                color: "#38bdf8",
                boxShadow: "0 0 20px rgba(56, 189, 248, 0.2)",
                border: "1px solid rgba(56, 189, 248, 0.3)"
              }}>
                <Globe2 size={24} />
              </div>
              <h3 className="lang-modal-title" style={{ margin: 0 }}>
                {contactEmail === "support@hostvibecoding.com" ? t("emailSupport") : t("contactUs")}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
                {t("contactDesc")}
              </p>
            </div>

            <div className="contact-email-container" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "12px 16px",
              margin: "16px 0",
              gap: "12px"
            }}>
              <span className="mono-email" style={{
                fontFamily: "Consolas, Monaco, monospace",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--text)",
                wordBreak: "break-all"
              }}>{contactEmail}</span>
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ minWidth: "70px", height: "32px", padding: "0 10px", margin: 0 }}
                onClick={handleCopyEmail}
              >
                {copied ? "✔" : t("copy")}
              </button>
            </div>

            {copied && (
              <div className="success-copy-text" style={{
                fontSize: "0.82rem",
                color: "var(--green)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                marginTop: "-8px"
              }}>
                <Check size={14} /> {t("copiedSuccess")}
              </div>
            )}

            <div className="lang-modal-actions" style={{ marginTop: "24px", justifyContent: "center", width: "100%" }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setContactEmail(null)}>
                {t("close")}
              </button>
              <a 
                className="btn btn-primary" 
                style={{ flex: 1, textDecoration: "none", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "6px" }} 
                href={`mailto:${contactEmail}`}
                onClick={() => setContactEmail(null)}
              >
                {t("openMailApp")} <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
