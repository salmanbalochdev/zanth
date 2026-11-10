import type { Metadata } from "next";
import { Compass, BookOpen } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { school } from "@/data/site";
export const metadata: Metadata = { title: "Vision & Educational Focus", description: school.vision };
export default function MissionVisionPage() { return <>
  <PageHero eyebrow="Our direction" title="Vision & Educational Focus" description="The school's verified vision and learning priorities." crumbs={[{label:"About",href:"/about"}]}/>
  <section className="py-16 sm:py-24"><Container className="grid gap-6 md:grid-cols-2">
    <article className="rounded-3xl bg-primary p-8 text-white sm:p-12"><Compass size={36} className="text-accent"/><h2 className="mt-6 font-heading text-3xl font-bold">Our Vision</h2><p className="mt-5 text-lg leading-9 text-white/85">{school.vision}</p></article>
    <article className="rounded-3xl bg-mist p-8 sm:p-12"><BookOpen size={36} className="text-secondary"/><h2 className="mt-6 font-heading text-3xl font-bold text-primary">Educational Focus</h2><ul className="mt-5 list-disc space-y-3 pl-5 leading-8 text-slate-700"><li>Behaviour Development</li><li>Reading and Writing Skills</li><li>Comprehension Skills</li><li>Communication Skills</li></ul><p className="mt-6 text-sm text-slate-600">A separate official mission statement has not been supplied.</p></article>
  </Container></section>
</>; }
