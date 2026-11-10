import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPage } from "@/components/shared/public-page";
import { publishedRows } from "@/lib/public-content";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const n = (await publishedRows("news_articles"))?.find(x => x.slug === slug);
  return { title: n?.title ?? "News not found", description: n?.excerpt };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params; const n = (await publishedRows("news_articles"))?.find(x => x.slug === slug);
  if (!n) notFound();
  return <PublicPage title={n.title} description={n.excerpt} crumbs={[{ label: "News", href: "/news" }]}>
    <article className="mx-auto max-w-4xl"><p className="font-semibold text-secondary">{n.category} · {n.published_at?.slice(0,10)}</p>
    <div className="mt-9 whitespace-pre-wrap leading-8 text-slate-700">{n.body}</div>
    <Link href="/news" className="mt-9 inline-flex min-h-11 items-center font-semibold text-secondary">Back to news</Link></article>
  </PublicPage>;
}
