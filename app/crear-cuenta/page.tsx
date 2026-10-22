import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = { title: "Crear cuenta — Agus Martín Academy", robots: { index: false } };

export default function Page() {
  return <AuthLayout><SignupForm /></AuthLayout>;
}
