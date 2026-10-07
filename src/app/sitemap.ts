import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/obchodni-podminky`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/ochrana-osobnich-udaju`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
