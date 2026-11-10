import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, MessageCircle, PenLine, HeartHandshake } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { school } from "@/data/site";
const focus = [
  { title: "Behaviour Development", icon: HeartHandshake, text: "Supporting positive behaviour and personal development." },
  { title: "Reading and Writing Skills", icon: PenLine, text: "Developing essential reading and writing skills." },
  { title: "Comprehension Skills", icon: BookOpen, text: "Strengthening understanding and comprehension." },
  { title: "Communication Skills", icon: MessageCircle, text: "Building confidence in communication." },
];
export const metadata: Metadata = { title: "About Our School", description: "Learn about Zanth Public School Jusak in Turbat, District Kech, and its educational focus." };
export default function AboutPage() { return <>
  <PageHero eyebrow="About us" title={school.name} description={school.tagline}/>
  <section className="py-16 sm:py-24"><Container className="grid gap-8 lg:grid-cols-2">
    <div><h2 className="font-heading text-3xl font-bold text-primary">Our School</h2><p className="mt-5 leading-8 text-slate-700">{school.name} is located in {school.address}. Our educational focus includes behaviour development, reading and writing, comprehension and communication skills.</p><p className="mt-5 leading-8 text-slate-700">The school also offers Zanth English Language &amp; Coaching Classes in an evening shift.</p></div>
    <div className="rounded-3xl bg-mist p-8"><h2 className="font-heading text-2xl font-bold text-primary">Our Vision</h2><p className="mt-5 text-lg leading-8 text-slate-700">{school.vision}</p><Link href="/about/mission-vision" className="mt-6 inline-block font-semibold text-secondary hover:underline">Read more about our vision</Link></div>
  </Container></section>
  <section className="bg-mist py-16 sm:py-24"><Container><h2 className="font-heading text-3xl font-bold text-primary">Educational Focus</h2><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{focus.map(item => <article key={item.title} className="rounded-2xl bg-white p-6 shadow-soft"><item.icon className="text-secondary" size={30}/><h3 className="mt-5 font-heading text-lg font-bold text-primary">{item.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p></article>)}</div></Container></section>
</>; }
