import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import Checkout from "@/components/auth/Checkout";

export const metadata: Metadata = { title: "Comprar — Agus Martín Academy", robots: { index: false } };

export default function Page() {
  return <AuthLayout><Checkout /></AuthLayout>;
}
