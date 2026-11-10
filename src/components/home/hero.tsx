"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { PublicSlide } from "@/lib/school-content";
import { publicMediaUrl } from "@/lib/public-media-url";
import Link from "next/link";

export function Hero({ slides }: { slides: PublicSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const hasMultiple = slides.length > 1;
  useEffect(() => {
    if (paused || reduced || !hasMultiple) return;
    const timer = window.setInterval(() => setActive(i => (i + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, reduced, hasMultiple, slides.length]);
  const slide = slides[active] ?? null;
  const image = slide ? publicMediaUrl(slide.image_path) : null;
  const move = (direction: number) => setActive(i => (i + direction + slides.length) % slides.length);

  return (
    <section aria-label="Zanth Public School introduction" aria-roledescription={hasMultiple ? "carousel" : undefined}
      className="relative isolate flex min-h-[460px] overflow-hidden rounded-[18px] bg-primary text-white sm:min-h-[540px] lg:min-h-[620px]"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)}
      >
      {image && (
        <AnimatePresence initial={false}>
          <motion.div key={slide?.id} className="absolute inset-0 -z-20" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced ? 0 : .65}}>
            <Image src={image} alt={slide?.title || "Zanth Public School"} fill priority={active===0} sizes="(max-width: 768px) 100vw, 95vw" className="object-cover object-center" unoptimized/>
          </motion.div>
        </AnimatePresence>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071526]/95 via-[#071F45]/70 to-[#071F45]/20" aria-hidden="true"/>
      <div className="relative flex w-full items-center px-6 pb-24 pt-20 sm:px-12 lg:px-[7%]">
        <div className="max-w-[570px]">
          <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[.22em] text-accent sm:text-xs">Let&apos;s Educate</p>
          <h1 className="school-display text-[clamp(3.8rem,8vw,7.5rem)] uppercase leading-[.83] text-white">Zanth<br/>Public<br/>School</h1>
          <p className="mt-6 text-sm font-semibold tracking-wide text-white/85 sm:text-base">Jusak, Turbat, Kech</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-primary transition hover:bg-[#D9AA0B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Enquire Now</Link>
            <Link href="/about" className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-primary transition hover:bg-[#F7F5EF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">About Us</Link>
          </div>
        </div>
      </div>
      {hasMultiple && <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between gap-3 sm:left-12 sm:right-12">
        <div className="flex items-center gap-2" aria-label="Choose school image">{slides.map((s,i)=><button key={s.id} type="button" onClick={()=>setActive(i)} aria-label={`Show image ${i+1}`} aria-current={i===active?"true":undefined} className={`h-11 min-w-11 rounded-full border border-white/30 px-4 text-xs font-bold transition ${i===active?"bg-accent text-primary":"bg-black/20 text-white hover:bg-white/20"}`}>{String(i+1).padStart(2,"0")}</button>)}</div>
        <div className="flex gap-2">
          <button type="button" aria-label={paused?"Resume slideshow":"Pause slideshow"} onClick={()=>setPaused(!paused)} className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/20 hover:bg-white/20">{paused?<Play size={16}/>:<Pause size={16}/>}</button>
          <button type="button" aria-label="Previous image" onClick={()=>move(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/20 hover:bg-white/20"><ArrowLeft size={16}/></button>
          <button type="button" aria-label="Next image" onClick={()=>move(1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/20 hover:bg-white/20"><ArrowRight size={16}/></button>
        </div>
      </div>}
    </section>
  );
}
