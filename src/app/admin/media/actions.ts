"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requirePermission } from "@/lib/admin/permissions";

const allowed: Record<string,string> = {
  "image/jpeg":"jpg", "image/png":"png", "image/webp":"webp",
  "image/avif":"avif", "application/pdf":"pdf",
};
export async function uploadSchoolMedia(data: FormData) {
  const { supabase } = await requirePermission("media.manage");
  const file = data.get("file");
  const folder = String(data.get("folder") ?? "");
  if (!(file instanceof File) || !["logo","banners","gallery","documents"].includes(folder)) redirect("/admin/media?error=invalid");
  const ext = allowed[file.type];
  if (!ext || file.size < 1 || file.size > 10 * 1024 * 1024) redirect("/admin/media?error=invalid");
  const buffer = new Uint8Array(await file.arrayBuffer());
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
  const isWebp = String.fromCharCode(...buffer.slice(0,4)) === "RIFF" && String.fromCharCode(...buffer.slice(8,12)) === "WEBP";
  const isAvif = String.fromCharCode(...buffer.slice(4,12)).includes("ftypavif") || String.fromCharCode(...buffer.slice(4,16)).includes("ftypavis");
  const isPdf = String.fromCharCode(...buffer.slice(0,5)) === "%PDF-";
  const validSignature = (ext === "jpg" && isJpeg) || (ext === "png" && isPng) || (ext === "webp" && isWebp) || (ext === "avif" && isAvif) || (ext === "pdf" && isPdf);
  if (!validSignature) redirect("/admin/media?error=invalid");
  const path = folder + "/" + crypto.randomUUID() + "." + ext;
  const { error } = await supabase.storage.from("school-public").upload(path, buffer, { contentType: file.type, upsert: false });
  if (error) redirect("/admin/media?error=upload");
  revalidatePath("/admin/media");
  redirect("/admin/media?uploaded=" + encodeURIComponent(path));
}
