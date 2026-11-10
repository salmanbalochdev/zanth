import "server-only";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/access";

// This is a server-side precheck matching the seeded Phase 8 role permissions.
// Supabase RLS is the final authority for every read and write.
const rolePermissions: Record<string, string[]> = {
  owner: ["*"],
  super_admin: ["*"],
  admin: ["settings.manage", "content.read", "content.write", "content.publish", "admissions.read", "admissions.write", "inquiries.read", "inquiries.write", "media.manage", "audit.read"],
  editor: ["content.read", "content.write", "content.publish", "media.manage"],
  content_manager: ["content.read", "content.write", "content.publish", "media.manage"],
  admissions_officer: ["admissions.read", "admissions.write"],
  viewer: ["content.read"],
};
export async function requirePermission(permission: string) {
  const ctx = await requireAdmin();
  const role = ctx.admin.admin_roles;
  const code = (Array.isArray(role) ? role[0] : role)?.code ?? "";
  const allowed = rolePermissions[code] ?? [];
  if (!allowed.includes("*") && !allowed.includes(permission)) redirect("/admin?error=forbidden");
  return ctx;
}
