"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { SpritePhoto } from "@/components/shared/sprite-photo";

export type GalleryItem = {
  id: string;
  alt: string;
  caption: string;
  spriteIndex: number | null;
  url: string | null;
};

export function SchoolGallery({ photos }: { photos: GalleryItem[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);

  const close = () => {
    setSelected(null);
    window.requestAnimationFrame(() => lastTrigger.current?.focus());
  };
  const open = (index: number, button: HTMLButtonElement) => {
    lastTrigger.current = button;
    setSelected(index);
  };
  const shift = (step: number) => setSelected(index => index === null ? null : (index + step + photos.length) % photos.length);

  useEffect(() => {
    if (selected === null) return;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelected(null);
        window.requestAnimationFrame(() => lastTrigger.current?.focus());
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelected(index => index === null ? null : (index + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelected(index => index === null ? null : (index - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, photos.length]);

  return <>
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {photos.map((photo, index) =>
        <button
          key={photo.id}
          type="button"
          onClick={event => open(index, event.currentTarget)}
          aria-label={"View larger: " + photo.alt}
          className={(index === 0 ? "col-span-2 row-span-2 " : "") +
            "group relative aspect-square overflow-hidden rounded-[22px] border border-[#071F45]/10 bg-white text-left shadow-[0_8px_24px_rgba(7,31,69,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(7,31,69,.15)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#f5c518]"}
        >
          {photo.spriteIndex !== null
            ? <SpritePhoto index={photo.spriteIndex} alt={photo.alt} className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105"/>
            : photo.url && <Image src={photo.url} alt={photo.alt} fill sizes={index === 0 ? "(max-width:1024px) 100vw, 50vw" : "(max-width:640px) 50vw, 25vw"} className="object-cover transition duration-500 group-hover:scale-105" unoptimized/>}
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-[#071F45]/95 via-[#071F45]/45 to-transparent px-3 pb-4 pt-12 text-white sm:px-5">
            <span className="text-xs font-extrabold sm:text-sm">{photo.caption}</span>
            <Maximize2 size={18} className="shrink-0 opacity-75"/>
          </span>
        </button>)}
    </div>

    {selected !== null && <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#04132b]/95 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={event => { if (event.target === event.currentTarget) close(); }}
    >
      <div role="dialog" aria-modal="true" aria-label="School photograph viewer" className="relative w-full max-w-[470px] rounded-[26px] bg-white p-3 shadow-2xl sm:p-4">
        <button ref={closeButton} type="button" onClick={close} aria-label="Close photograph viewer" className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-[#071F45]/90 text-white transition hover:bg-[#103A70] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#f5c518]"><X size={20}/></button>
        <div className="relative aspect-square w-full overflow-hidden rounded-[17px] bg-slate-200">
          {photos[selected].spriteIndex !== null
            ? <SpritePhoto index={photos[selected].spriteIndex!} alt={photos[selected].alt} className="h-full w-full"/>
            : photos[selected].url && <Image src={photos[selected].url!} alt={photos[selected].alt} fill sizes="(max-width: 640px) 90vw, 470px" className="object-contain" unoptimized/>}
        </div>
        <div className="flex items-center justify-between gap-3 px-2 py-4 text-[#071F45]">
          <div><p className="text-base font-extrabold">{photos[selected].caption}</p><p className="mt-1 text-xs text-slate-600">{selected + 1} of {photos.length} · Zanth Public School Jusak</p></div>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => shift(-1)} aria-label="Previous photograph" className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#103A70]"><ArrowLeft size={19}/></button>
            <button type="button" onClick={() => shift(1)} aria-label="Next photograph" className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#103A70]"><ArrowRight size={19}/></button>
          </div>
        </div>
      </div>
    </div>}
  </>;
}
