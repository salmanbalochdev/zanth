import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const origin = url.origin;
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const supabase = await createClient();
  let error: unknown;
  if (code) {
    const result = await supabase.auth.exchangeCodeForSession(code);
    error = result.error;
  } else if (tokenHash && type === "recovery") {
    const result = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "recovery" });
    error = result.error;
  } else {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", origin));
  }
  if (error) return NextResponse.redirect(new URL("/admin/login?error=invalid", origin));
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/admin/login?error=invalid", origin));
  const { data: admin } = await supabase.from("school_admins").select("id").eq("user_id", user.id).eq("is_active", true).maybeSingle();
  if (!admin) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/admin/login?error=unauthorized", origin));
  }
  return NextResponse.redirect(new URL("/admin/reset-password", origin));
}
