import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export const dynamic = "force-static";

// Solo las páginas públicas; las de cuenta, compra y panel no se indexan.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "tienda/", "portfolio/", "terminos/", "privacidad/", "arrepentimiento/"];
  return pages.map((p) => ({ url: `${site.url}/${p}`, changeFrequency: "weekly", priority: p === "" ? 1 : 0.5 }));
}
