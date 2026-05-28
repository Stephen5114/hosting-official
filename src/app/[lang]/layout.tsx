import "../../styles.css";

export const metadata = {
  title: "Vibe Hosting | You vibe it. We host it.",
  description: "The fastest way to go from AI-generated code to a live website. Ship .NET, Python, PHP, and Spring Boot apps — no DevOps, no friction.",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params?.lang || "en";
  return (
    <html lang={lang}>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
