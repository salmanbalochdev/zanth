import "server-only";
import { requireAdmin } from "@/lib/admin/access";
import { redirect } from "next/navigation";

export async function requirePermission(permission: string) {
  const ctx = await requireAdmin();
  const { data: role } = await ctx.supabase.from("school_admins").select("role_id").eq("user_id", ctx.user.id).eq("is_active", true).single();
  if (!role) redirect("/admin?error=forbidden");
  const { data: grant } = await ctx.supabase.from("admin_permissions").select("id").eq("role_id", role.role_id).eq("permission", permission).maybeSingle();
  if (!grant) redirect("/admin?error=forbidden");
  return ctx;
}
