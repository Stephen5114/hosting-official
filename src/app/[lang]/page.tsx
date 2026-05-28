"use client";
import {
  ArrowRight,
  Check,
  Cloud,
  Code2,
  HardDrive,
  Files,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  ServerCog,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CatalogResponse, HostingPlan, fetchCatalog, registerLead } from "../../api";
import { LocalizationProvider, LayoutShell, useLocalization } from "../../components/Shell";

const customerPanelUrl =
  (process.env.NEXT_PUBLIC_CUSTOMER_PANEL_URL as string | undefined) ?? "https://cp.hostvibecoding.com";

const fallbackCatalog: CatalogResponse = {
  plans: [
    {
      slug: "basic",
      name: "Basic",
      description: "Perfect for your first vibe-coded project. One site, zero hassle.",
      recommendedSiteLimit: 1,
      diskLimitMb: 1024,
      fileLimitCount: 50000,
      monthlyPrice: 12.99,
      nodeType: "web",
    },
    {
      slug: "pro",
      name: "Pro",
      description: "Ship multiple projects at once. Ideal for prolific vibe coders and small teams.",
      recommendedSiteLimit: 3,
      diskLimitMb: 5120,
      fileLimitCount: 150000,
      monthlyPrice: 29.99,
      nodeType: "web",
    },
    {
      slug: "enterprise",
      name: "Enterprise",
      description: "For power builders running a portfolio of AI-built apps and client projects.",
      recommendedSiteLimit: 10,
      diskLimitMb: 20480,
      fileLimitCount: 500000,
      monthlyPrice: 89.99,
      nodeType: "web",
    },
  ],
  regions: [{ slug: "global", name: "Global", availableNodeCount: 1, isDefault: true }],
};

export default function App({ params }: { params: { lang: string } }) {
  return (
    <LocalizationProvider lang={params?.lang}>
      <HomeContent />
    </LocalizationProvider>
  );
}

function Typewriter({ text, delay = 50 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);
    
    return () => clearInterval(interval);
  }, [text, delay]);
  
  return <span>{displayedText}</span>;
}

function HomeContent() {
  const router = useRouter();
  const { t, formatPrice } = useLocalization();

  const [catalog, setCatalog] = useState<CatalogResponse>(fallbackCatalog);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 3D Card Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate up to 15 degrees
    const rotateX = ((centerY - y) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Scroll Position tracking for 3D Parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty("--scroll-y", `${scrollY}px`);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll Reveal System (IntersectionObserver)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [catalog.plans]);

  useEffect(() => {
    fetchCatalog()
      .then((response) => setCatalog(normalizeCatalog(response)))
      .catch((error: unknown) =>
        setCatalogError(error instanceof Error ? error.message : "Cannot connect to backend.")
      )
      .finally(() => setLoadingCatalog(false));
  }, []);

  const defaultRegion = useMemo(
    () => catalog.regions.find((r) => r.isDefault) ?? catalog.regions[0],
    [catalog.regions]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setSuccessMessage(null);

    try {
      const result = await registerLead({ email, password });
      const normalizedEmail = email.trim().toLowerCase();
      setSuccessMessage(result.message ? t("submitSuccess") : t("submitSuccess"));
      setEmail("");
      setPassword("");

      if (result.requiresEmailVerification) {
        const params = new URLSearchParams({ email: normalizedEmail });
        if (result.verificationPreviewUrl) {
          params.set("preview", result.verificationPreviewUrl);
        }
        router.push(`/check-email?${params.toString()}`);
        return;
      }

      const loginUrl = new URL(`${customerPanelUrl}/login`);
      if (normalizedEmail) {
        loginUrl.searchParams.set("email", normalizedEmail);
      }
      window.location.href = loginUrl.toString();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : t("submitError"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <LayoutShell>
      <main style={{ position: "relative", overflow: "hidden" }}>
        {/* Futuristic Scrolling Background Ambient Glows */}
        <div className="scroll-bg-glow glow-1" />
        <div className="scroll-bg-glow glow-2" />
        <div className="scroll-bg-glow glow-3" />

        <section className="hero container" id="top">
          <div className="hero-split-wrapper">
            
            {/* Left Pane - Content */}
            <div className="hero-left-pane">
              <div className="hero-badge">
                <span className="dot" />
                {t("builtForVibeCoders")}
              </div>
              <h1>
                {t("heroTitle").split("").map((char, index) => (
                  <span
                    key={index}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    className="reveal-char"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>
              <p className="hero-sub">
                {t("heroSub")}
              </p>
              <div className="tech-stack">
                <span className="tech-pill">.NET / ASP.NET</span>
                <span className="tech-pill">Python</span>
                <span className="tech-pill">PHP</span>
                <span className="tech-pill">Spring Boot</span>
                <span className="tech-pill">{t("staticSites")}</span>
              </div>
              <div className="hero-actions">
                <a className="btn btn-primary btn-lg" href="#launch">
                  {t("startDeploying")} <ArrowRight size={18} />
                </a>
                <a className="btn btn-secondary btn-lg" href={`${customerPanelUrl}/login`} target="_blank" rel="noreferrer">
                  {t("controlPanel")}
                </a>
              </div>
            </div>

            {/* Right Pane - 3D Cyber-Monkey Code Station */}
            <div className="hero-right-pane">
              <div className="wireframe-scroll-grid" />
              <div 
                className="monkey-card-wrapper"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="monkey-card"
                  style={{
                    transform: isHovered
                      ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.03, 1.03, 1.03)`
                      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
                  }}
                >
                  <div className="monkey-card-inner">
                    <img src="/monkey.png" alt="3D Cyber Coding Monkey" className="monkey-image" />
                    <div className="glasses-glow" />
                    <div className="console-screen-glow" />
                    
                    {/* Laser scanning line */}
                    <div className="cyber-scanline" />
                    
                    {/* Rotating HUD circle */}
                    <div className="hud-ring" />
                    
                    {/* Luminous Sparks */}
                    <div className="typing-sparks">
                      <span className="typing-spark spark-1" />
                      <span className="typing-spark spark-2" />
                      <span className="typing-spark spark-3" />
                      <span className="typing-spark spark-4" />
                      <span className="typing-spark spark-5" />
                    </div>

                    {/* Cyber Neon Keyboard */}
                    <div className="cyber-keyboard">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <span key={i} className={`key key-${(i % 5) + 1}`} />
                      ))}
                    </div>

                    {/* Animated Cybernetic Typing Hands */}
                    <svg className="cyber-hand cyber-hand-left" viewBox="0 0 100 80" fill="none" stroke="currentColor">
                      <path d="M10 75 L30 65 L40 68" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M30 65 L45 35 L65 40 L55 68 Z" strokeWidth="2.5" strokeLinejoin="round" />
                      <path d="M30 60 L15 50 L10 42" strokeWidth="2" strokeLinecap="round" />
                      <path d="M45 35 L42 15 L40 5" strokeWidth="2" strokeLinecap="round" />
                      <path d="M52 36 L52 10 L52 0" strokeWidth="2" strokeLinecap="round" />
                      <path d="M58 38 L60 14 L62 4" strokeWidth="2" strokeLinecap="round" />
                      <path d="M64 41 L70 20 L74 12" strokeWidth="2" strokeLinecap="round" />
                    </svg>

                    <svg className="cyber-hand cyber-hand-right" viewBox="0 0 100 80" fill="none" stroke="currentColor">
                      <path d="M90 75 L70 65 L60 68" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M70 65 L55 35 L35 40 L45 68 Z" strokeWidth="2.5" strokeLinejoin="round" />
                      <path d="M70 60 L85 50 L90 42" strokeWidth="2" strokeLinecap="round" />
                      <path d="M55 35 L58 15 L60 5" strokeWidth="2" strokeLinecap="round" />
                      <path d="M48 36 L48 10 L48 0" strokeWidth="2" strokeLinecap="round" />
                      <path d="M42 38 L40 14 L38 4" strokeWidth="2" strokeLinecap="round" />
                      <path d="M36 41 L30 20 L26 12" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Floating Parallax Code Blocks */}
                <div className="floating-code-block block-terminal">
                  <div className="console-header">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                    <span className="console-title">bash</span>
                  </div>
                  <div className="console-content">
                    <div className="cmd-line"><span className="prompt">$</span> vibe deploy --app main-web</div>
                    <div className="cmd-output"><Typewriter text="Deploying Spring Boot application..." delay={40} /></div>
                    <div className="cmd-output green-text"><Typewriter text="✔ Deployment successful!" delay={30} /></div>
                  </div>
                </div>

                <div className="floating-code-block block-json">
                  <div className="console-header">
                    <span className="console-icon">{}</span>
                    <span className="console-title">vibe.json</span>
                  </div>
                  <div className="console-content">
                    <pre>
                      <code>
{`{
  "app": "vibe-host",
  "status": "`}
<span className="green-text"><Typewriter text="online" delay={100} /></span>
{`",
  "regions": ["global"]
}`}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="floating-code-block block-api">
                  <div className="console-header">
                    <span className="console-icon">JS</span>
                    <span className="console-title">server.js</span>
                  </div>
                  <div className="console-content">
                    <code>
                      <span className="purple-text">const</span> express = <span className="blue-text">require</span>(<span className="orange-text">'express'</span>);<br />
                      app.<span className="blue-text">listen</span>(<span className="gold-text">3000</span>, () =&gt; &#123;<br />
                      &nbsp;&nbsp;console.<span className="blue-text">log</span>(<span className="green-text">'<Typewriter text="Live on port 3000!" delay={60} />'</span>);<br />
                      &#125;);
                    </code>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="hero-stats">
            <div className="stat-cell">
              <div className="stat-value">{catalog.plans.length}</div>
              <div className="stat-label">{loadingCatalog ? t("loading") : t("readyPlans")}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-value">
                {defaultRegion?.slug === "global" ? t("globalRegion") : defaultRegion?.name ?? t("globalRegion")}
              </div>
              <div className="stat-label">{t("deployRegion")}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-value">{t("seconds")}</div>
              <div className="stat-label">{t("fromDeployToLive")}</div>
            </div>
          </div>

          {catalogError && (
            <div className="notice warning" style={{ marginTop: 20, textAlign: "left" }}>
              {t("catalogFallback")} {catalogError}
            </div>
          )}
        </section>

        <hr className="section-divider container" />

        <section className="section container" id="plans">
          <div className="section-header scroll-reveal">
            <div className="section-label">
              <Zap size={14} /> {t("pricing")}
            </div>
            <h2>{t("pricingTitle")}</h2>
            <p className="section-desc">
              {t("pricingSub")}
            </p>
          </div>

          <div className="plan-grid">
            {catalog.plans.map((plan, index) => (
              <PlanCard
                key={plan.slug}
                plan={plan}
                featured={plan.slug === "pro"}
                formatPrice={formatPrice}
                t={t}
                className={`scroll-reveal stagger-${index + 1}`}
              />
            ))}
          </div>
        </section>

        <hr className="section-divider container" />

        <section className="section container" id="platform">
          <div className="section-header scroll-reveal">
            <div className="section-label">
              <ServerCog size={14} /> {t("platformTitle")}
            </div>
            <h2>{t("platformSub")}</h2>
            <p className="section-desc">
              {t("platformDesc")}
            </p>
          </div>

          <div className="feature-grid">
            <FeatureCard
              icon={<Layers size={20} />}
              title={t("feat1Title")}
              body={t("feat1Body")}
              className="scroll-reveal stagger-1"
            />
            <FeatureCard
              icon={<ShieldCheck size={20} />}
              title={t("feat2Title")}
              body={t("feat2Body")}
              className="scroll-reveal stagger-2"
            />
            <FeatureCard
              icon={<Cloud size={20} />}
              title={t("feat3Title")}
              body={t("feat3Body")}
              className="scroll-reveal stagger-3"
            />
            <FeatureCard
              icon={<LifeBuoy size={20} />}
              title={t("feat4Title")}
              body={t("feat4Body")}
              className="scroll-reveal stagger-4"
            />
          </div>
        </section>

        <hr className="section-divider container" />

        <section className="section container" id="onboarding">
          <div className="section-header scroll-reveal">
            <div className="section-label">
              <LayoutDashboard size={14} /> {t("timeline")}
            </div>
            <h2>{t("onboarding")}</h2>
          </div>

          <div className="timeline">
            <TimelineItem step="01" title={t("timeline1Title")} body={t("timeline1Body")} className="scroll-reveal stagger-1" />
            <TimelineItem step="02" title={t("timeline2Title")} body={t("timeline2Body")} className="scroll-reveal stagger-2" />
            <TimelineItem step="03" title={t("timeline3Title")} body={t("timeline3Body")} className="scroll-reveal stagger-3" />
            <TimelineItem step="04" title={t("timeline4Title")} body={t("timeline4Body")} className="scroll-reveal stagger-4" />
          </div>
        </section>

        <hr className="section-divider container" />

        <section className="cta-section container" id="launch">
          <div className="cta-wrapper scroll-reveal">
            <div className="cta-copy">
              <div className="section-label">
                <ArrowRight size={14} /> {t("getStarted")}
              </div>
              <h2>{t("shipNext")}</h2>
              <p>
                {t("ctaDesc")}
              </p>
              <ul className="cta-checklist">
                <li><Check size={16} /> {t("ctaCheck1")}</li>
                <li><Check size={16} /> {t("ctaCheck2")}</li>
                <li><Check size={16} /> {t("ctaCheck3")}</li>
                <li><Check size={16} /> {t("ctaCheck4")}</li>
              </ul>
            </div>

            <form className="cta-form" onSubmit={handleSubmit}>
              <label>
                <span>{t("email")}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
                />
              </label>
              <label>
                <span>{t("password")}</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  minLength={8}
                  required
                />
              </label>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? t("submitting") : t("startDeploying")}
              </button>
              {formError && <div className="notice danger">{formError}</div>}
              {successMessage && <div className="notice success">{successMessage}</div>}
              <div className="cta-links">
                <a href={`${customerPanelUrl}/register`} target="_blank" rel="noreferrer">
                  {t("openPortal")}
                </a>
                <a href={`${customerPanelUrl}/login`} target="_blank" rel="noreferrer">
                  {t("signIn")}
                </a>
              </div>
            </form>
          </div>
        </section>
      </main>
    </LayoutShell>
  );
}

function PlanCard({
  plan,
  featured,
  formatPrice,
  t,
  className = "",
}: {
  plan: HostingPlan;
  featured: boolean;
  formatPrice: (usdPrice: number) => React.ReactNode;
  t: (key: string) => string;
  className?: string;
}) {
  const tDescription = () => {
    if (plan.slug === "basic") return t("basic_desc") !== "basic_desc" ? t("basic_desc") : plan.description;
    if (plan.slug === "pro") return t("pro_desc") !== "pro_desc" ? t("pro_desc") : plan.description;
    if (plan.slug === "enterprise") return t("ent_desc") !== "ent_desc" ? t("ent_desc") : plan.description;
    return plan.description;
  };

  return (
    <article className={`plan-card${featured ? " featured" : ""} ${className}`}>
      <span className={`plan-tag ${featured ? "popular" : "default"}`}>
        {featured ? t("mostPopular") : t("starter")}
      </span>
      <div className="plan-name">{plan.slug === "pro" ? t("proPlanName") : plan.slug === "enterprise" ? t("entPlanName") : t("basicPlanName")}</div>
      <div className="plan-description">{tDescription()}</div>
      <div className="plan-price">
        {formatPrice(plan.monthlyPrice)}
      </div>
      <div className="plan-period">{t("perMonth")}</div>
      <div className="plan-features">
        <div className="plan-feature">
          <Check size={16} />
          {formatSiteCount(plan.recommendedSiteLimit, t)}
        </div>
        <div className="plan-feature">
          <HardDrive size={16} />
          {formatDisk(plan.diskLimitMb, t)} {t("storage")}
        </div>
        <div className="plan-feature">
          <Files size={16} />
          {formatFiles(plan.fileLimitCount, t)}
        </div>
        <div className="plan-feature">
          <Code2 size={16} />
          .NET, Python, PHP, Spring Boot
        </div>
      </div>
      <a className={`btn ${featured ? "btn-primary" : "btn-secondary"}`} href="#launch">
        {t("getStarted")} <ArrowRight size={16} />
      </a>
    </article>
  );
}

function FeatureCard({
  icon,
  title,
  body,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <article className={`feature-card ${className}`}>
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function TimelineItem({
  step,
  title,
  body,
  className = "",
}: {
  step: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <article className={`timeline-item ${className}`}>
      <span className="timeline-step">{step}</span>
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </article>
  );
}

function normalizeCatalog(catalog: CatalogResponse): CatalogResponse {
  return {
    ...catalog,
    plans: catalog.plans.map((plan) => ({
      ...plan,
      recommendedSiteLimit:
        plan.recommendedSiteLimit > 0
          ? plan.recommendedSiteLimit
          : (fallbackCatalog.plans.find((item) => item.slug === plan.slug)?.recommendedSiteLimit ?? 1),
      diskLimitMb:
        plan.diskLimitMb > 0
          ? plan.diskLimitMb
          : (fallbackCatalog.plans.find((item) => item.slug === plan.slug)?.diskLimitMb ?? 0),
      fileLimitCount:
        plan.fileLimitCount > 0
          ? plan.fileLimitCount
          : (fallbackCatalog.plans.find((item) => item.slug === plan.slug)?.fileLimitCount ?? 0),
    })),
  };
}

function formatSiteCount(value: number, t: (key: string) => string) {
  return `${value} ${value === 1 ? t("siteLabel") : t("sitesLabel")}`;
}

function formatDisk(value: number, t: (key: string) => string) {
  if (value <= 0) return t("customDisk");
  if (value >= 1024) {
    const gb = value / 1024;
    return `${Number.isInteger(gb) ? gb : gb.toFixed(1)} GB`;
  }
  return `${value} MB`;
}

function formatFiles(value: number, t: (key: string) => string) {
  if (value <= 0) return t("customFiles");
  if (value >= 1000) {
    const scaled = value / 1000;
    return `${Number.isInteger(scaled) ? scaled : scaled.toFixed(1)}k ${t("filesLabel")}`;
  }
  return `${value} ${t("filesLabel")}`;
}

