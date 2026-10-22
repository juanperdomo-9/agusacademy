import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import StudentArea from "@/components/auth/StudentArea";

export const metadata: Metadata = { title: "Mi curso — Agus Martín Academy", robots: { index: false } };

export default function Page() {
  return <AuthLayout><StudentArea /></AuthLayout>;
}
