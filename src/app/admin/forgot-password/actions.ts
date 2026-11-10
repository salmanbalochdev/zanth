"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export async function requestReset(data: FormData) {
  const email = String(data.get("email") ?? "").trim();
  if (email) {
    const supabase = await createClient();
    const base = process.env.NEXT_PUBLIC_SITE_URL;
    if (base && /^https:\/\//.test(base)) await supabase.auth.resetPasswordForEmail(email, { redirectTo: base + "/admin/reset-password" });
  }
  redirect("/admin/forgot-password/sent");
}
