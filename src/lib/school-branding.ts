import "server-only";
import { createClient } from "@/lib/supabase/server";
export async function getSchoolLogoPath(): Promise<string|null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return null;
  try {
    const db = await createClient();
    const { data, error } = await db.from("school_settings").select("value").eq("key","official_logo").limit(1).maybeSingle();
    if (error) return null;
    const value: unknown = data?.value;
    if (!value || typeof value !== "object" || !("path" in value)) return null;
    const path = (value as {path:unknown}).path;
    return typeof path === "string" && /^logo\/[a-zA-Z0-9._/-]+\.(png|jpe?g|webp|avif)$/i.test(path) && !path.includes("..") ? path : null;
  } catch { return null; }
}
