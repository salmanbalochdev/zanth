import type { Metadata } from "next";
import { BookOpen, MessageCircle, PenLine, HeartHandshake } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
const focus = [
  { title: "Behaviour Development", icon: HeartHandshake },
  { title: "Reading and Writing Skills", icon: PenLine },
  { title: "Comprehension Skills", icon: BookOpen },
  { title: "Communication Skills", icon: MessageCircle },
];
export const metadata: Metadata = { title: "Academics", description: "Educational focus and evening English Language & Coaching Classes at Zanth Public School Jusak." };
export default function AcademicsPage() { return <>
  <PageHero eyebrow="Learning" title="Academics" description="Developing behaviour, literacy, comprehension and communication skills."/>
  <section id="programs" className="scroll-mt-32 py-16 sm:py-24"><Container><h2 className="font-heading text-3xl font-bold text-primary">Educational Focus</h2><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{focus.map(item => <article key={item.title} className="rounded-2xl bg-mist p-7"><item.icon className="text-secondary" size={30}/><h3 className="mt-5 font-heading text-lg font-bold text-primary">{item.title}</h3></article>)}</div></Container></section>
  <section className="bg-mist py-16 sm:py-24"><Container><h2 className="font-heading text-3xl font-bold text-primary">Zanth English Language &amp; Coaching Classes</h2><p className="mt-5 max-w-3xl leading-8 text-slate-700">English language and coaching classes are offered in the evening shift. Contact the school for current schedules, eligibility and enrollment information.</p></Container></section>
</>; }
