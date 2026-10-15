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
};

export const viewport: Viewport = {
  themeColor: "#0f0f0e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
