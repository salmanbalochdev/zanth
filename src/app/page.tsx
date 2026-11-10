import { ArrowUpRight, BookOpenText, CalendarDays, ClipboardList, MapPin, PhoneCall, Sparkles } from "lucide-react";
import Link from "next/link";
import { getPublishedSlides } from "@/lib/school-content";
import { Hero } from "@/components/home/hero";
import { HomeSections } from "@/components/home/sections";
import { Container } from "@/components/shared/container";
import { school } from "@/data/site";

const quick = [
  { number: "01", title: "Admissions", description: "Find admission information and guidance for families.", href: "/admissions", icon: ClipboardList },
  { number: "02", title: "Academics", description: "Discover our educational focus and evening classes.", href: "/academics", icon: BookOpenText },
  { number: "03", title: "School Calendar", description: "Explore the school calendar and upcoming information.", href: "/academics/calendar", icon: CalendarDays },
  { number: "04", title: "Contact the School", description: "Reach our team or find our campus in Jusak.", href: "/contact", icon: PhoneCall },
];

export default async function Home() {
  const slides = await getPublishedSlides();
  return (
    <>
      <Hero slides={slides} />
      <section aria-labelledby="quick-heading" className="relative z-10 bg-[#f7f8fa] pb-20 pt-14 sm:pb-24 sm:pt-20">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-secondary">
                <Sparkles size={15} aria-hidden="true" /> Explore Zanth
              </p>
              <h2 id="quick-heading" className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
                Everything you need, <span className="text-secondary">in one place.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">A simple starting point for parents, students and visitors.</p>
            </div>
            <Link href="/about" className="group inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-bold text-primary transition hover:border-secondary hover:text-secondary">
              Get to know us <ArrowUpRight size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quick.map(item => (
              <Link key={item.title} href={item.href} className="group relative flex min-h-[245px] flex-col overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-7 shadow-[0_10px_35px_rgba(20,45,80,.035)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:shadow-[0_20px_50px_rgba(20,45,80,.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary">
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/[.06] text-primary transition-colors group-hover:bg-secondary group-hover:text-white"><item.icon size={25} strokeWidth={1.7} aria-hidden="true" /></span>
                  <span className="font-heading text-sm font-bold text-slate-300">{item.number}</span>
                </div>
                <h3 className="mt-8 font-heading text-xl font-extrabold tracking-tight text-primary">{item.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-7 text-slate-600">{item.description}</p>
                <span className="mt-auto flex items-center justify-between pt-7 text-xs font-bold uppercase tracking-widest text-secondary">Explore <ArrowUpRight size={19} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#dce5ee] bg-[#edf3f7] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3"><MapPin size={20} className="mt-1 shrink-0 text-secondary" aria-hidden="true" /><div><p className="font-heading font-bold text-primary">Visit Zanth Public School Jusak</p><p className="mt-1 text-sm leading-6 text-slate-600">{school.address}</p></div></div>
            <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-bold text-secondary hover:underline">Contact us <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </Container>
      </section>
      <HomeSections />
    </>
  );
}
