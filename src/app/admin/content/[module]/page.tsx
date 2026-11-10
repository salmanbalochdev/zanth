import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule, modulePermission } from "@/lib/admin/modules";
import { requirePermission } from "@/lib/admin/permissions";
import { saveContent, deleteContent } from "../actions";

export default async function ModulePage({ params, searchParams }: { params: Promise<{ module: string }>; searchParams: Promise<{ error?: string; saved?: string; deleted?: string; edit?: string }> }) {
  const { module: key } = await params;
  const mod = getModule(key);
  if (!mod) notFound();
  const { supabase } = await requirePermission(modulePermission(key));
  const { error: queryError, data } = await supabase.from(mod.table).select("*").order("created_at", { ascending: false }).limit(100);
  const q = await searchParams;
  const selected = q.edit ? data?.find(x => x.id === q.edit) : null;
  const editable = mod.fields.length > 0;
  return <section className="mx-auto max-w-6xl px-5 py-12">
    <Link href="/admin" className="text-sm font-semibold text-secondary">← Admin overview</Link>
    <h1 className="mt-5 font-heading text-3xl font-bold text-primary">{mod.title}</h1>
    {q.deleted && <p role="status" className="mt-5 rounded-lg bg-green-50 p-3 text-green-900">Record deleted.</p>}
    {q.saved && <p role="status" className="mt-5 rounded-lg bg-green-50 p-3 text-green-900">Changes saved.</p>}
    {q.error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-red-800">Unable to save. Check required fields, permissions and database constraints.</p>}
    {queryError && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-red-800">Unable to load records. Check database permissions.</p>}
    {editable && <form action={saveContent} className="mt-8 grid gap-4 rounded-2xl border bg-white p-6 sm:grid-cols-2">
      <input type="hidden" name="module" value={key}/><input type="hidden" name="id" value={selected?.id ?? ""}/>
      <h2 className="sm:col-span-2 text-xl font-bold">{selected ? "Edit record" : "New record"}</h2>
      {mod.fields.map(field => <label key={field} className="block text-sm font-medium text-slate-700">{field.replaceAll("_", " ")}
        {field === "status" ? <select name={field} defaultValue={String(selected?.[field] ?? "draft")} className="mt-2 w-full rounded-lg border p-3"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select>
        : ["body","description","biography","answer","summary"].includes(field) ? <textarea name={field} rows={4} required={(mod.required as readonly string[]).includes(field)} defaultValue={String(selected?.[field] ?? "")} className="mt-2 w-full rounded-lg border p-3"/>
        : <input name={field} type={field === "sort_order" ? "number" : field.endsWith("_at") ? "datetime-local" : field.endsWith("_on") ? "date" : "text"} required={(mod.required as readonly string[]).includes(field)} defaultValue={String(selected?.[field] ?? "")} className="mt-2 w-full rounded-lg border p-3"/>}
      </label>)}
      <div className="sm:col-span-2"><button type="submit" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white">Save record</button></div>
    </form>}
    {editable && selected && <form action={deleteContent} className="mt-4 flex flex-wrap items-end gap-3 rounded-xl border border-red-200 bg-red-50 p-4"><input type="hidden" name="module" value={key}/><input type="hidden" name="id" value={selected.id}/><label className="text-sm font-semibold text-red-900">Type DELETE to permanently remove this record<input name="confirm" required pattern="DELETE" autoComplete="off" className="mt-2 block rounded-lg border border-red-300 bg-white p-2"/></label><button type="submit" className="rounded-lg bg-red-800 px-5 py-3 font-semibold text-white">Delete selected record</button></form>}
    <div className="mt-10 overflow-x-auto rounded-2xl border"><table className="w-full min-w-[580px] text-left text-sm"><thead className="bg-mist"><tr><th className="p-4">Record</th><th className="p-4">Status</th><th className="p-4">Created</th><th className="p-4">Action</th></tr></thead><tbody>{(data ?? []).map(record => <tr key={record.id} className="border-t"><td className="p-4">{String(record.title ?? record.name ?? record.full_name ?? record.question ?? record.applicant_name ?? record.email ?? record.id)}</td><td className="p-4">{String(record.status ?? "—")}</td><td className="p-4">{String(record.created_at ?? "").slice(0,10)}</td><td className="p-4">{editable ? <Link className="font-semibold text-secondary" href={`/admin/content/${key}?edit=${record.id}`}>Edit</Link> : "Read only"}</td></tr>)}</tbody></table>{!data?.length && !queryError && <p className="p-6 text-slate-600">No records found.</p>}</div>
  </section>;
}
