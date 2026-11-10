import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPage } from "@/components/shared/public-page";
import { publishedRows } from "@/lib/public-content";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const a = (await publishedRows("announcements"))?.find(x => x.slug === slug);
  return { title: a?.title ?? "Announcement not found", description: a?.summary };
}
export default async function AnnouncementPage({ params }: Props) {
  const { slug } = await params; const a = (await publishedRows("announcements"))?.find(x => x.slug === slug);
  if (!a) notFound();
  return <PublicPage title={a.title} description={a.summary} crumbs={[{ label: "Announcements", href: "/announcements" }]}>
    <article className="mx-auto max-w-4xl"><p className="font-semibold text-secondary">{a.category} · {a.published_at?.slice(0,10)}</p>
    <div className="mt-9 whitespace-pre-wrap leading-8 text-slate-700">{a.body}</div>
    <Link href="/announcements" className="mt-9 inline-flex min-h-11 items-center font-semibold text-secondary">Back to announcements</Link></article>
  </PublicPage>;
}
