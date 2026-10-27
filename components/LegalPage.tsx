import type { ReactNode } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { legal } from "@/lib/content";

// Marco de las páginas legales: título, fecha de actualización y texto con ancho de lectura.
export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <AuthLayout>
      <article className="legal">
        <h1 className="auth-title">{title}</h1>
        <p className="t-label t-soft">Última actualización: {legal.updated}</p>
        {children}
      </article>
    </AuthLayout>
  );
}
