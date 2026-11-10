import Link from "next/link";
import { modules } from "@/lib/admin/modules";
import { requireAdmin } from "@/lib/admin/access";
import { logout } from "./login/actions";

const stats = [
  ["Faculty", "faculty_members"],
  ["Academic programs", "academic_programs"],
  ["Admissions", "admission_applications"],
  ["Contact inquiries", "contact_inquiries"],
  ["News articles", "news_articles"],
  ["Events", "school_events"],
  ["Announcements", "announcements"],
  ["Gallery media", "gallery_media"],
] as const;

export default async function AdminOverview() {
  const { supabase, admin } = await requireAdmin();
  const counts = await Promise.all(stats.map(async ([label, table]) => {
    const { count, error } = await supabase.from(table).select("id", { count: "exact", head: true });
    return { label, count, error: error?.message };
  }));
  return <section className="mx-auto max-w-6xl px-5 py-12">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div><h1 className="text-3xl font-bold">Admin overview</h1><p className="mt-2 text-slate-600">Welcome, {admin.display_name || "Administrator"}.</p></div>
      <form action={logout}><button className="rounded-lg border px-4 py-2">Sign out</button></form>
    </div>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {counts.map(item => <article key={item.label} className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-600">{item.label}</p>
        <p className="mt-2 text-3xl font-semibold">{item.error ? "Unavailable" : item.count ?? 0}</p>
        {item.error && <p className="mt-2 text-xs text-red-700">Permission or query error</p>}
      </article>)}
    </div>
    <section className="mt-10"><h2 className="text-2xl font-bold text-primary">Manage school website</h2><p className="mt-2 text-sm text-slate-600">Manage approved content and upload school media. Permissions and database RLS apply to every operation.</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><Link href="/admin/branding" className="rounded-xl border border-secondary bg-mist p-5 font-semibold text-primary hover:shadow-md">Official school logo</Link><Link href="/admin/media" className="rounded-xl border border-secondary bg-mist p-5 font-semibold text-primary hover:shadow-md">Upload school images and PDFs</Link>{Object.entries(modules).map(([key,mod])=><Link key={key} href={`/admin/content/${key}`} className="rounded-xl border bg-white p-5 font-semibold text-primary hover:bg-mist">{mod.title}</Link>)}</div></section>
  </section>;
}
