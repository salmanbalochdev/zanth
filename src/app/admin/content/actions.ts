"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getModule, modulePermission } from "@/lib/admin/modules";
import { requirePermission } from "@/lib/admin/permissions";

export async function saveContent(formData: FormData) {
  const key = String(formData.get("module") ?? "");
  const module = getModule(key);
  if (!module || module.fields.length === 0) redirect("/admin");
  const { supabase } = await requirePermission(modulePermission(key, true));
  const id = String(formData.get("id") ?? "");
  if (id && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) redirect("/admin");
  const values: Record<string, string | number | null> = {};
  for (const field of module.fields) {
    const raw = String(formData.get(field) ?? "").trim();
    if ((module.required as readonly string[]).includes(field) && !raw) redirect("/admin/content/" + key + "?error=required");
    if (raw.length > 20000) redirect("/admin/content/" + key + "?error=invalid");
    if (field === "sort_order") {
      if (raw && !Number.isSafeInteger(Number(raw))) redirect("/admin/content/" + key + "?error=invalid");
      values[field] = raw ? Number(raw) : 0;
    } else if (field.endsWith("_at") || field.endsWith("_on")) values[field] = raw || null;
    else values[field] = raw;
  }
  if ("status" in values && !["draft", "published", "archived"].includes(String(values.status))) redirect("/admin/content/" + key + "?error=invalid");
  const query = id ? supabase.from(module.table).update(values).eq("id", id).select("id") : supabase.from(module.table).insert(values).select("id");
  const { data, error } = await query;
  if (error || !data?.length) redirect("/admin/content/" + key + "?error=save");
  revalidatePath("/admin/content/" + key);
  revalidatePath("/", "layout");
  redirect("/admin/content/" + key + "?saved=1");
}
