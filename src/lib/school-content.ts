import "server-only";
import { createClient } from "@/lib/supabase/server";

export type PublicSlide = {
  id: string;
  title: string;
  subtitle: string;
  image_path: string | null;
  cta_label: string | null;
  cta_href: string | null;
};
export async function getPublishedSlides(): Promise<PublicSlide[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return [];
  try {
    const db = await createClient();
    const { data, error } = await db.from("hero_slides")
      .select("id,title,subtitle,image_path,cta_label,cta_href")
      .eq("status", "published")
      .order("sort_order", { ascending: true }).limit(12);
    if (error) throw error;
    return (data ?? []) as PublicSlide[];
  } catch (error) {
    console.error("Unable to load published hero slides", error);
    return [];
  }
}
export function publicMediaUrl(path: string | null | undefined): string | null {
  if (!path || /^(?:https?:|\/\/)/i.test(path) || path.startsWith("/") || path.includes("..")) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  const clean = path.replace(/^school-public\//, "");
  return url + "/storage/v1/object/public/school-public/" + clean.split("/").map(encodeURIComponent).join("/");
}
