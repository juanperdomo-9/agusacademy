import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import RevocationForm from "@/components/RevocationForm";

export const metadata: Metadata = {
  title: "Botón de arrepentimiento — Agus Martín Academy",
  description: "Cancelá tu compra dentro de los 10 días corridos, sin dar explicaciones.",
};

export default function Page() {
  return (
    <LegalPage title="Botón de arrepentimiento.">
      <p>Tenés 10 días corridos desde la compra para cancelarla, sin dar explicaciones y sin costo. No hace falta tener cuenta: completá tus datos y te damos un código de trámite.</p>
      <p>Te devolvemos el total por el mismo medio de pago. Si era el curso, se da de baja el acceso; si eran productos, coordinamos la devolución sin cargo.</p>
      <RevocationForm />
    </LegalPage>
  );
}
