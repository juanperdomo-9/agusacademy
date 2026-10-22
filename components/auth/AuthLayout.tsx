import type { ReactNode } from "react";
import { site } from "@/lib/content";

// Marco de las páginas de cuenta: cabecera mínima (sin cuenta regresiva ni índice) y contenido centrado.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="header">
        <a href="/" className="header-brand" aria-label={site.brand}>
          <img className="header-mono" src="/brand/monograma-hueso.png" alt="" width={447} height={427} />
          <span className="t-label header-name">{site.brand}</span>
        </a>
        <a href="/" className="t-label auth-back">Volver a la web</a>
      </header>
      <main className="auth wrap">{children}</main>
    </>
  );
}
