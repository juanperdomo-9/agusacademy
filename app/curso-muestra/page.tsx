import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import CoursePlayer from "@/components/auth/CoursePlayer";

// Muestra del curso por dentro, sin cuenta, para revisar el diseño. No se enlaza ni se indexa.
export const metadata: Metadata = { title: "Muestra del curso — Agus Martín Academy", robots: { index: false } };

export default function Page() {
  return <AuthLayout><CoursePlayer /></AuthLayout>;
}
