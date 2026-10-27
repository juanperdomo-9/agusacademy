import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agus Martín Academy — Curso online de barbería",
  description: "El método completo de Agus Martín para dominar el fade, la tijera y la terminación.",
  metadataBase: new URL(site.url),
  // Lo que se ve al compartir el link (WhatsApp, Instagram, Facebook, X).
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Agus Martín Academy",
    title: "Agus Martín Academy — Curso online de barbería",
    description: "Cortá con método, no de oído. El método completo de Agus Martín, filmado corte por corte.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Agus Martín Academy: cortá con método, no de oído." }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  // Íconos con dirección limpia (sin ?query): Render no servía /icon.png?icon...
  icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={archivo.variable} suppressHydrationWarning>
      <head>
        {/* Antes de pintar: si el hero va a ser animado, se arranca en su estado inicial (sin parpadeo). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(location.pathname==='/'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('hero-live');d.dataset.heroLogo='3d'}}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
