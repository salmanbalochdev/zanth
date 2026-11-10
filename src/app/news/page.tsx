import type { Metadata } from "next";
import { PublicPage } from "@/components/shared/public-page";
import { ContentBrowser } from "@/components/shared/content-browser";
import { publishedRows } from "@/lib/public-content";
export const metadata: Metadata = { title: "Latest News & Updates", description: "Verified school news and updates." };
export default async function NewsPage() {
  const rows = await publishedRows("news_articles");
  const items = (rows ?? []).map(n => ({ slug: n.slug, title: n.title, category: n.category, date: n.published_at?.slice(0,10) ?? "", description: n.excerpt, href: `/news/${n.slug}` }));
  return <PublicPage title="Latest News & Updates" description="Official school stories and academic updates."><ContentBrowser kind="news" items={items} emptyTitle="No school news published yet" emptyDescription="Approved news stories will appear here after publication."/></PublicPage>;
}
