import Link from "next/link";
import { requireAdmin } from "@/lib/admin/access";

export default async function AdminProfile() {
  const { user, admin } = await requireAdmin();
  const role = admin.admin_roles;
  const label = (Array.isArray(role) ? role[0] : role)?.label ?? "Administrator";
  return <main className="mx-auto max-w-3xl px-5 py-12">
    <Link href="/admin" className="font-semibold text-secondary">← Back to dashboard</Link>
    <h1 className="mt-6 font-heading text-3xl font-bold text-primary">Administrator profile</h1>
    <dl className="mt-8 divide-y rounded-2xl border bg-white px-6">
      <div className="py-5"><dt className="text-sm text-slate-600">Display name</dt><dd className="mt-1 font-semibold">{admin.display_name || "Not provided"}</dd></div>
      <div className="py-5"><dt className="text-sm text-slate-600">Email</dt><dd className="mt-1 break-words font-semibold">{user.email || "Unavailable"}</dd></div>
      <div className="py-5"><dt className="text-sm text-slate-600">Assigned role</dt><dd className="mt-1 font-semibold">{label}</dd></div>
    </dl>
    <p className="mt-5 text-sm text-slate-600">Profile information is read from your authenticated account and the school&apos;s admin-role records.</p>
  </main>;
}
