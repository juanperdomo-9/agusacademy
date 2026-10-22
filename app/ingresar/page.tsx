import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = { title: "Ingresar — Agus Martín Academy", robots: { index: false } };

export default function Page() {
  return <AuthLayout><LoginForm /></AuthLayout>;
}
