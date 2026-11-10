import type { Metadata } from "next";
import { PublicPage } from "@/components/shared/public-page";
import { SchoolGallery, type GalleryItem } from "@/components/gallery/school-gallery";
import { schoolPhotos } from "@/data/school-photos";
import { createClient } from "@/lib/supabase/server";
import { publicMediaUrl } from "@/lib/public-media-url";

export const metadata: Metadata = {
  title: "School Gallery",
  description: "Real photographs of school life, student celebrations and activities at Zanth Public School Jusak.",
};

export default async function Gallery() {
  let published: Array<{ id: string; storage_path: string; alt_text: string }> = [];
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    try {
      const db = await createClient();
      const { data, error } = await db.from("gallery_media")
        .select("id,storage_path,alt_text")
        .eq("status", "published")
        .order("sort_order", { ascending: true })
        .limit(100);
      if (error) throw error;
      published = data ?? [];
    } catch (error) {
      console.error("Additional gallery media unavailable", error);
    }
  }

  const realPhotos: GalleryItem[] = schoolPhotos.map(photo => ({
    id: photo.id,
    alt: photo.alt,
    caption: photo.caption,
    spriteIndex: photo.index,
    url: null,
  }));
  const adminPhotos: GalleryItem[] = published.flatMap(photo => {
    const url = publicMediaUrl(photo.storage_path);
    return url ? [{
      id: "uploaded-" + photo.id,
      alt: photo.alt_text || "School activity",
      caption: photo.alt_text || "School Memories",
      spriteIndex: null,
      url,
    }] : [];
  });

  return <PublicPage title="School Gallery" description="Authentic moments from student life, activities and celebrations at Zanth Public School Jusak.">
    <div className="mb-9 flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[.2em] text-secondary">Life at Zanth</p>
        <h2 className="school-display mt-2 text-3xl uppercase text-primary sm:text-4xl">Our school in pictures</h2>
      </div>
      <p className="rounded-full bg-white px-4 py-2 text-xs font-bold text-primary shadow-sm">{realPhotos.length + adminPhotos.length} photos</p>
    </div>
    <SchoolGallery photos={[...realPhotos, ...adminPhotos]}/>
    <p className="mt-8 text-sm leading-7 text-slate-600">These photographs show school activities and student participation. Select any photograph to view it larger, then use the arrows to browse.</p>
  </PublicPage>;
}
