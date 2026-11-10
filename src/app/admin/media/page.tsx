import Link from "next/link";
import { requirePermission } from "@/lib/admin/permissions";
import { uploadSchoolMedia } from "./actions";
import { publicMediaUrl } from "@/lib/public-media-url";

export default async function MediaPage({searchParams}:{searchParams:Promise<{error?:string;uploaded?:string}>}) {
  await requirePermission("media.manage");
  const q = await searchParams;
  const uploaded = q.uploaded && /^(logo|banners|gallery|documents)\/[a-f0-9-]+\.(jpg|png|webp|avif|pdf)$/.test(q.uploaded) ? q.uploaded : null;
  return <section className="mx-auto max-w-3xl px-5 py-12">
    <Link href="/admin" className="text-sm font-semibold text-secondary">← Admin overview</Link>
    <h1 className="mt-5 font-heading text-3xl font-bold text-primary">School media uploads</h1>
    <p className="mt-4 leading-7 text-slate-600">Upload approved school media to the existing public storage bucket. Files uploaded here are publicly accessible by URL, even before you add them to a page. Do not upload private admissions documents or unapproved photos of children.</p>
    {q.error && <p role="alert" className="mt-6 rounded-xl bg-red-50 p-4 text-red-900">Upload failed. Check the file type, 10 MB limit, permissions and bucket policies.</p>}
    {uploaded && <div role="status" className="mt-6 rounded-xl bg-green-50 p-4 text-green-900"><p className="font-semibold">File uploaded successfully.</p><p className="mt-2 break-all text-sm">Storage path: {uploaded}</p>{publicMediaUrl(uploaded) && <a className="mt-2 inline-block font-semibold underline" href={publicMediaUrl(uploaded)!} target="_blank" rel="noopener noreferrer">View uploaded file</a>}<p className="mt-3 text-sm">Copy the storage path into an appropriate content record in the admin dashboard. Uploading alone does not publish a gallery or homepage slide.</p></div>}
    <form action={uploadSchoolMedia} className="mt-8 grid gap-5 rounded-2xl border bg-white p-6">
      <label className="font-semibold text-primary">Folder<select name="folder" required className="mt-2 block w-full rounded-xl border p-3"><option value="logo">Official logo</option><option value="banners">Homepage banners</option><option value="gallery">Gallery photos</option><option value="documents">Public documents</option></select></label>
      <label className="font-semibold text-primary">Image or PDF (maximum 10 MB)<input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/avif,application/pdf" required className="mt-2 block w-full rounded-xl border p-3"/></label>
      <button type="submit" className="min-h-11 rounded-xl bg-primary px-6 py-3 font-semibold text-white">Upload media</button>
    </form>
  </section>;
}
