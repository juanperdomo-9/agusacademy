import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import AdminPanel from "@/components/auth/AdminPanel";

export const metadata: Metadata = { title: "Panel — Agus Martín Academy", robots: { index: false } };

export default function Page() {
  return <AuthLayout><AdminPanel /></AuthLayout>;
}
