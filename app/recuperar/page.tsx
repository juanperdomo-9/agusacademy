import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import { ForgotForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = { title: "Recuperar contraseña — Agus Martín Academy", robots: { index: false } };

export default function Page() {
  return <AuthLayout><ForgotForm /></AuthLayout>;
}
