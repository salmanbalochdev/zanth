"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requestReset(data: FormData) {
  const email = String(data.get("email") ?? "").trim();
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (email && email.length <= 254 && base) {
    try {
      const parsed = new URL(base);
      if (parsed.protocol === "https:" || (process.env.NODE_ENV !== "production" && parsed.hostname === "localhost")) {
        const supabase = await createClient();
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: new URL("/admin/auth/callback", parsed.origin).toString(),
        });
      }
    } catch {
      // Do not disclose account existence or provider errors.
    }
  }
  redirect("/admin/forgot-password/sent");
}
