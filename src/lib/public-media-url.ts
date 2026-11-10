export function publicMediaUrl(path: string | null | undefined): string | null {
  if (!path || /^(?:https?:|\/\/)/i.test(path) || path.startsWith("/") || path.includes("..")) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  const clean = path.replace(/^school-public\//, "");
  return url + "/storage/v1/object/public/school-public/" + clean.split("/").map(encodeURIComponent).join("/");
}
