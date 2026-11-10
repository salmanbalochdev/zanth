import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) redirect("/admin/login");
  const { data: admin, error } = await supabase
    .from("school_admins")
    .select("id,display_name,is_active,admin_roles(code,label)")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();
  if (error || !admin) redirect("/admin/login?error=unauthorized");
  return { supabase, user, admin };
}
