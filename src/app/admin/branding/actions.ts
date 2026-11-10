"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requirePermission } from "@/lib/admin/permissions";
export async function saveOfficialLogo(form: FormData) {
  const {supabase} = await requirePermission("settings.manage");
  const path = String(form.get("path") ?? "").trim();
  if (!/^logo\/[a-zA-Z0-9._/-]+\.(png|jpe?g|webp|avif)$/i.test(path) || path.includes("..")) redirect("/admin/branding?error=invalid");
  const {data:existing,error:readError} = await supabase.from("school_settings").select("id").eq("key","official_logo").limit(1).maybeSingle();
  if (readError) redirect("/admin/branding?error=database");
  const value = {path};
  const result = existing
    ? await supabase.from("school_settings").update({value}).eq("id",existing.id).select("id")
    : await supabase.from("school_settings").insert({key:"official_logo",value,description:"Approved official school logo storage path"}).select("id");
  if (result.error || result.data?.length !== 1) redirect("/admin/branding?error=database");
  revalidatePath("/", "layout");
  redirect("/admin/branding?saved=1");
}
