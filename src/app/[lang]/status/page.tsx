"use client";
import React, { useEffect, useState } from "react";
import { ShieldCheck, Check, Server, Database, LayoutDashboard, Globe } from "lucide-react";
import { LocalizationProvider, LayoutShell, useLocalization } from "../../../components/Shell";

export default function StatusPage({ params }: { params: { lang: string } }) {
  return (
    <LocalizationProvider lang={params?.lang}>
      <StatusContent />
    </LocalizationProvider>
  );
}

function StatusContent() {
  const { t } = useLocalization();
  const [dots, setDots] = useState<boolean[]>([]);

  // Generate 24 live ticks for each component timeline
  useEffect(() => {
    setDots(Array.from({ length: 24 }, () => true));
  }, []);

  return (
    <LayoutShell>
      <main className="followup-shell" style={{ minHeight: "85vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 1rem", position: "relative" }}>
        
        {/* Ambient scrolling background glows */}
        <div className="scroll-bg-glow glow-1" style={{ top: "10%" }} />
        <div className="scroll-bg-glow glow-2" style={{ top: "30%" }} />

        <section className="followup-card" style={{ maxWidth: "680px", width: "100%", padding: "2.5rem 2rem", margin: "0 auto" }}>
          
          {/* Header - Overall Platform Status */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ 
              display: "inline-flex", 
              padding: "1rem", 
              borderRadius: "50%", 
              background: "rgba(34, 197, 94, 0.1)", 
              border: "1px solid rgba(34, 197, 94, 0.25)",
              color: "var(--green)", 
              boxShadow: "0 0 25px rgba(34, 197, 94, 0.2)",
              marginBottom: "1rem",
              position: "relative"
            }}>
              <ShieldCheck size={36} style={{ animation: "pulse 2s infinite" }} />
              <span className="dot-glowing-pulse" style={{
                position: "absolute",
                top: "4px",
                right: "4px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--green)",
                boxShadow: "0 0 8px var(--green)",
                animation: "pulse 1.2s infinite alternate"
              }} />
            </div>
            
            <p className="section-label" style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}>{t("statusTitle")}</p>
            
            <h1 style={{ 
              fontSize: "2.4rem", 
              fontWeight: "900", 
              letterSpacing: "-0.035em",
              background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)", 
              WebkitBackgroundClip: "text", 
              WebkitTextFillColor: "transparent", 
              margin: "0.8rem 0 0.5rem" 
            }}>
              {t("allSystemsOperational")}
            </h1>
            
            <p style={{ 
              color: "var(--text-secondary)", 
              fontSize: "1.1rem",
              fontWeight: 500,
              lineHeight: "1.6", 
              margin: 0
            }}>
              {t("allServicesRunningNormally")}
            </p>
          </div>

          {/* Component list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
            
            {/* Component item 1: Global Web Nodes */}
            <StatusComponentItem 
              icon={<Globe size={18} />} 
              name={t("componentWeb")} 
              statusText={t("operational")} 
              dots={dots} 
            />

            {/* Component item 2: Database Cluster */}
            <StatusComponentItem 
              icon={<Database size={18} />} 
              name={t("componentDb")} 
              statusText={t("operational")} 
              dots={dots} 
            />

            {/* Component item 3: Control Panel */}
            <StatusComponentItem 
              icon={<LayoutDashboard size={18} />} 
              name={t("componentCp")} 
              statusText={t("operational")} 
              dots={dots} 
            />

            {/* Component item 4: API & Routing */}
            <StatusComponentItem 
              icon={<Server size={18} />} 
              name={t("componentApi")} 
              statusText={t("operational")} 
              dots={dots} 
            />

          </div>

          {/* Incident History / 90 days log */}
          <div style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "1.2rem 1.5rem",
            textAlign: "left"
          }}>
            <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--text)", margin: "0 0 0.5rem" }}>
              {t("recentIncidents")}
            </h4>
            <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "var(--green)" }} />
              {t("noIncidents")}
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2.5rem" }}>
            <a className="btn btn-primary" href="/">
              {t("backHome")}
            </a>
          </div>

        </section>
      </main>
    </LayoutShell>
  );
}

function StatusComponentItem({
  icon,
  name,
  statusText,
  dots
}: {
  icon: React.ReactNode;
  name: string;
  statusText: string;
  dots: boolean[];
}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.6rem",
      paddingBottom: "1.2rem",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600, fontSize: "0.95rem", color: "var(--text)" }}>
          <span style={{ color: "#38bdf8" }}>{icon}</span>
          {name}
        </div>
        <span style={{ 
          fontSize: "0.8rem", 
          fontWeight: 700, 
          color: "var(--green)", 
          background: "rgba(34, 197, 94, 0.08)", 
          padding: "4px 8px", 
          borderRadius: "4px",
          border: "1px solid rgba(34, 197, 94, 0.15)"
        }}>
          {statusText}
        </span>
      </div>

      {/* Visual Uptime Ticks */}
      <div style={{ display: "flex", gap: "3px", width: "100%", height: "8px", marginTop: "4px" }}>
        {dots.map((_, index) => (
          <span 
            key={index} 
            style={{ 
              flex: 1, 
              height: "100%", 
              background: "linear-gradient(to top, rgba(34, 197, 94, 0.65), rgba(34, 197, 94, 0.95))", 
              borderRadius: "1.5px",
              opacity: 0.9,
              transition: "transform 0.1s ease",
              animation: `pulse-uptime 1.5s infinite alternate ${index * 0.04}s ease-in-out`
            }} 
            title="90 days ago: 100% Operational"
          />
        ))}
      </div>
      
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-tertiary)", fontWeight: 500 }}>
        <span>90 days ago</span>
        <span style={{ color: "rgba(255,255,255,0.4)" }}>100% uptime</span>
        <span>Today</span>
      </div>
    </div>
  );
}
