import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function publishedRows(table: "news_articles" | "announcements") {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return null;
  try {
    const client = await createClient();
    const { data, error } = await client.from(table).select("*").eq("status", "published").order("published_at", { ascending: false }).limit(100);
    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error("Published content query failed", error);
    return null;
  }
}
