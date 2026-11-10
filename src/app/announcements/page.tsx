import type { Metadata } from "next";
import { PublicPage } from "@/components/shared/public-page";
import { ContentBrowser } from "@/components/shared/content-browser";
import { publishedRows } from "@/lib/public-content";
export const metadata: Metadata = { title: "School Announcements", description: "Official school notices and announcements." };
export default async function AnnouncementsPage() {
  const rows = await publishedRows("announcements");
  const items = (rows ?? []).map(a => ({ slug: a.slug, title: a.title, category: a.category, date: a.published_at?.slice(0,10) ?? "", description: a.summary, important: a.important, href: `/announcements/${a.slug}` }));
  return <PublicPage title="School Announcements" description="Important notices and official school updates."><ContentBrowser kind="announcements" items={items} emptyTitle="No official announcements" emptyDescription="The school has not published any notices."/></PublicPage>;
}
