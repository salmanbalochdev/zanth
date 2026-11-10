import type { Metadata } from "next";
import Image from "next/image";
import { PublicPage } from "@/components/shared/public-page";
import { createClient } from "@/lib/supabase/server";
import { publicMediaUrl } from "@/lib/public-media-url";

export const metadata: Metadata = {
  title: "School Gallery",
  description: "Approved photographs from Zanth Public School Jusak.",
};

export default async function Gallery() {
  let media: Array<{id:string; storage_path:string; alt_text:string}> = [];
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    try {
      const db = await createClient();
      const { data, error } = await db.from("gallery_media")
        .select("id,storage_path,alt_text")
        .eq("status", "published")
        .order("sort_order", { ascending: true }).limit(100);
      if (error) throw error;
      media = data ?? [];
    } catch (error) {
      console.error("Gallery content unavailable", error);
    }
  }
  const images = media.map(item => ({...item, url:publicMediaUrl(item.storage_path)})).filter(item => item.url !== null);
  return <PublicPage title="School Gallery" description="Approved school photographs and activities.">
    {images.length === 0
      ? <p className="rounded-2xl bg-mist p-8 text-slate-700">No school photographs have been approved for publication yet.</p>
      : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{images.map(item =>
        <figure key={item.id} className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(7,31,69,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(7,31,69,.12)]">
          <div className="relative aspect-square overflow-hidden bg-mist"><Image src={item.url!} alt={item.alt_text || "School activity"} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" unoptimized/></div>
          {item.alt_text && <figcaption className="border-t border-slate-100 p-5 text-sm font-semibold text-primary">{item.alt_text}</figcaption>}
        </figure>
      )}</div>}
  </PublicPage>;
}
