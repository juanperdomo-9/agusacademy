import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agus Martín Academy — Curso online de barbería",
  description: "El método completo de Agus Martín para dominar el fade, la tijera y la terminación.",
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
