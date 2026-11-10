"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { PublicSlide } from "@/lib/school-content";
import { publicMediaUrl } from "@/lib/public-media-url";
import { schoolPhotos } from "@/data/school-photos";
import { SpritePhoto } from "@/components/shared/sprite-photo";

type HeroItem = {
  id: string;
  title: string;
  alt: string;
  spriteIndex: number | null;
  url: string | null;
};

export function Hero({ slides }: { slides: PublicSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const items: HeroItem[] = [
    ...schoolPhotos.map(photo => ({
      id: photo.id,
      title: photo.caption,
      alt: photo.alt,
      spriteIndex: photo.index,
      url: null,
    })),
    ...slides.flatMap(slide => {
      const url = publicMediaUrl(slide.image_path);
      return url ? [{
        id: slide.id,
        title: slide.title || "School highlights",
        alt: slide.title || "Zanth Public School activity",
        spriteIndex: null,
        url,
      }] : [];
    }),
  ];
  const hasMultiple = items.length > 1;
  const selected = items[active] ?? items[0];
  useEffect(() => {
    if (paused || reduced || !hasMultiple) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % items.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused, reduced, hasMultiple, items.length]);

  const move = (direction: number) => setActive(current => (current + direction + items.length) % items.length);

  return (
    <section
      aria-label="Zanth Public School introduction and student photo slideshow"
      aria-roledescription={hasMultiple ? "carousel" : undefined}
      className="relative isolate min-h-[580px] overflow-hidden rounded-[18px] bg-[#071F45] text-white sm:min-h-[620px] lg:min-h-[610px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_36%,#1d5487_0%,#103A70_31%,#071F45_75%)]"/>
      <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full border border-white/10 sm:h-[460px] sm:w-[460px]" aria-hidden="true"/>
      <div className="pointer-events-none absolute -right-10 top-4 h-52 w-52 rounded-full border border-[#f5c518]/20 sm:h-[360px] sm:w-[360px]" aria-hidden="true"/>

      <div className="relative grid min-h-[580px] items-center gap-8 px-6 pb-28 pt-14 sm:min-h-[620px] sm:px-12 lg:min-h-[610px] lg:grid-cols-[1.12fr_.88fr] lg:gap-4 lg:px-[6.5%] lg:pb-24 lg:pt-16">
        <div className="relative z-10">
          <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[.26em] text-[#f5c518] sm:text-xs">Let&apos;s Educate · Aim High</p>
          <h1 className="school-display max-w-[600px] text-[clamp(3.8rem,7vw,7.1rem)] uppercase leading-[.88] tracking-[-.015em] text-white">
            Zanth<br/>Public<br/>School
          </h1>
          <p className="mt-6 text-sm font-semibold tracking-wide text-white/85 sm:text-base">Jusak, Turbat, District Kech</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/admissions" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f5c518] px-7 py-3 text-xs font-extrabold uppercase tracking-wide text-[#071F45] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#ffdb54] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Admission</Link>
            <Link href="/about" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/50 bg-white/10 px-7 py-3 text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">About Us</Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[370px] lg:ml-auto lg:mr-0 lg:max-w-[400px]">
          <div className="pointer-events-none absolute -inset-3 rotate-3 rounded-[34px] border-2 border-[#f5c518]/60" aria-hidden="true"/>
          <div className="relative overflow-hidden rounded-[26px] border-[5px] border-white/85 bg-white shadow-[0_25px_65px_rgba(0,0,0,.3)]">
            <div className="relative aspect-square overflow-hidden bg-[#dbe5ed]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selected.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.4 }}
                >
                  {selected.spriteIndex !== null
                    ? <SpritePhoto index={selected.spriteIndex} alt={selected.alt} className="h-full w-full"/>
                    : selected.url && <Image src={selected.url} alt={selected.alt} fill sizes="(max-width: 1024px) 90vw, 400px" className="object-cover" unoptimized/>}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex min-h-14 items-center justify-between gap-3 bg-white px-4 py-3 text-[#071F45] sm:px-5">
              <span className="text-sm font-extrabold">{selected.title}</span>
              <span className="shrink-0 text-xs font-bold tabular-nums text-slate-500">{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            </div>
          </div>
          <span className="absolute -bottom-4 -left-4 rotate-[-8deg] rounded-full bg-[#f5c518] px-5 py-2 text-xs font-black uppercase tracking-widest text-[#071F45] shadow-lg sm:-left-7">Life at Zanth</span>
        </div>
      </div>

      {hasMultiple && <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-2 sm:left-12 sm:right-12">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1" aria-label="Select school photograph">
          {items.map((item, index) =>
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={"Show photograph " + (index + 1) + ": " + item.title}
              aria-current={index === active ? "true" : undefined}
              className={index === active
                ? "h-2.5 w-8 shrink-0 rounded-full bg-[#f5c518] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                : "h-2.5 w-4 shrink-0 rounded-full bg-white/45 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"}
            />
          )}
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" aria-label={paused ? "Resume slideshow" : "Pause slideshow"} onClick={() => setPaused(!paused)} className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-[#071F45]/60 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">{paused ? <Play size={16}/> : <Pause size={16}/>}</button>
          <button type="button" aria-label="Previous photograph" onClick={() => move(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-[#071F45]/60 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><ArrowLeft size={17}/></button>
          <button type="button" aria-label="Next photograph" onClick={() => move(1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-[#071F45]/60 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><ArrowRight size={17}/></button>
        </div>
      </div>}
    </section>
  );
}
