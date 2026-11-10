import type { ReactNode } from "react";
import Link from "next/link";
import { modules } from "@/lib/admin/modules";
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-slate-50"><nav aria-label="Admin modules" className="border-b bg-white px-5 py-3"><div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 text-sm"><Link href="/admin" className="font-bold text-primary">School admin</Link>{Object.entries(modules).map(([key, mod])=><Link key={key} href={`/admin/content/${key}`} className="rounded-lg px-2 py-1 text-slate-700 hover:bg-mist">{mod.title}</Link>)}</div></nav>{children}</div>;
}
