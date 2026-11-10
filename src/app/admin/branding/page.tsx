import Link from "next/link";
import Image from "next/image";
import { requirePermission } from "@/lib/admin/permissions";
import { getSchoolLogoPath } from "@/lib/school-branding";
import { publicMediaUrl } from "@/lib/public-media-url";
import { saveOfficialLogo } from "./actions";
export default async function BrandingPage({searchParams}:{searchParams:Promise<{saved?:string;error?:string}>}) {
  await requirePermission("settings.manage");
  const q = await searchParams;
  const path = await getSchoolLogoPath();
  const url = publicMediaUrl(path);
  return <section className="mx-auto max-w-3xl px-5 py-12">
    <Link href="/admin" className="font-semibold text-secondary">← Admin overview</Link>
    <h1 className="mt-5 font-heading text-3xl font-bold text-primary">Official school logo</h1>
    <p className="mt-4 leading-7 text-slate-600">Upload the approved eagle-and-shield school logo through Media Uploads, then enter its exact storage path here. Do not use an unrelated or generated logo.</p>
    <Link href="/admin/media" className="mt-4 inline-block font-semibold text-secondary underline">Upload official logo</Link>
    {q.saved && <p role="status" className="mt-5 rounded-lg bg-green-50 p-4 text-green-900">Logo setting saved. The public header and footer will use this path.</p>}
    {q.error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-4 text-red-900">Unable to save the logo path. Check format and settings permissions.</p>}
    {url && <div className="mt-6 rounded-xl bg-mist p-5"><Image src={url} alt="Configured school logo" width={120} height={120} unoptimized className="h-28 w-28 object-contain"/><p className="mt-2 break-all text-sm">{path}</p></div>}
    <form action={saveOfficialLogo} className="mt-7 grid gap-4 rounded-xl border p-6"><label className="font-semibold text-primary">Logo storage path<input name="path" required defaultValue={path ?? ""} placeholder="logo/your-uploaded-file.png" className="mt-2 block w-full rounded-lg border p-3"/></label><p className="text-sm text-slate-600">Use the storage path shown after uploading. This setting does not upload the file itself.</p><button type="submit" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white">Save official logo</button></form>
  </section>;
}
