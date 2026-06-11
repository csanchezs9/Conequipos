"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@/components/icons";
import type { Product } from "@/data/catalog";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function CatalogIndex({ products }: { products: Product[] }) {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);
  const rTo = useRef<((v: number) => void) | null>(null);
  const lastX = useRef(0);
  const [active, setActive] = useState<Product | null>(null);

  // Seguidor del cursor (quickTo = inercia suave)
  useEffect(() => {
    const el = preview.current;
    if (!el) return;
    xTo.current = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3" });
    rTo.current = gsap.quickTo(el, "rotation", { duration: 0.7, ease: "power3" });
  }, []);

  function onMove(e: React.MouseEvent) {
    const vx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    xTo.current?.(e.clientX);
    yTo.current?.(e.clientY);
    rTo.current?.(gsap.utils.clamp(-14, 14, vx * 0.6));
  }

  function show(p: Product) {
    setActive(p);
    gsap.to(preview.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.5,
      ease: "expo.out",
      overwrite: true,
    });
  }
  function hide() {
    gsap.to(preview.current, {
      autoAlpha: 0,
      scale: 0.85,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });
  }

  // Reveal por scroll con stagger (re-corre al cambiar el set filtrado)
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.set(".equipo-row", { opacity: 0, y: 26 });
      ScrollTrigger.batch(".equipo-row", {
        start: "top 94%",
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.05,
            ease: "expo.out",
            overwrite: true,
          }),
      });
    }, root);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [products]);

  return (
    <div ref={root} onMouseMove={onMove} className="relative">
      {/* Preview flotante */}
      <div
        ref={preview}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-4/3 w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-line bg-ink-3 opacity-0 shadow-2xl will-change-transform lg:block"
        style={{ transformOrigin: "center" }}
      >
        {active?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={active.image}
            alt=""
            className="h-full w-full object-contain p-4"
          />
        ) : null}
      </div>

      <ul className="border-t border-line">
        {products.map((p, i) => (
          <li key={p.id} className="equipo-row border-b border-line">
            <Link
              href={`/equipos/${p.slug}`}
              onMouseEnter={() => show(p)}
              onMouseLeave={hide}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 md:grid-cols-[3.5rem_1fr_14rem_auto] md:py-7"
            >
              <span className="font-mono text-xs text-mute md:text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="flex items-center gap-4">
                {/* Thumb inline solo en móvil */}
                {p.image && (
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-line bg-ink-3 lg:hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt="" className="h-full w-full object-contain p-1" />
                  </span>
                )}
                <span className="font-display text-xl leading-tight text-bone transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-2 group-hover:text-brand md:text-3xl">
                  {p.name}
                </span>
              </span>

              <span className="hidden font-mono text-xs uppercase tracking-widest text-mute md:block">
                {p.categoryNames[0] ?? ""}
              </span>

              <ArrowRight className="h-5 w-5 text-mute transition-all duration-500 group-hover:translate-x-1 group-hover:text-brand" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
