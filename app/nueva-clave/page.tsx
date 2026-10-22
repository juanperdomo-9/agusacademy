import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import { ResetForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = { title: "Contraseña nueva — Agus Martín Academy", robots: { index: false } };

export default function Page() {
  return <AuthLayout><ResetForm /></AuthLayout>;
}
