"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories, products } from "@/data/catalog";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STRIP = products.filter((p) => p.image).slice(0, 14);

export function EquiposHero() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!reduce) {
        // Reveal del titular por lineas + meta
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".eh-kicker", { y: 16, opacity: 0, duration: 0.7 })
          .from(
            ".eh-line-in",
            { yPercent: 115, duration: 1.05, stagger: 0.1 },
            "-=0.35"
          )
          .from(".eh-sub", { y: 20, opacity: 0, duration: 0.9 }, "-=0.6")
          .from(".eh-meta", { y: 14, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.6");

        // Contadores
        gsap.utils.toArray<HTMLElement>(".eh-count").forEach((el) => {
          const end = Number(el.dataset.to || "0");
          const obj = { v: 0 };
          gsap.to(obj, {
            v: end,
            duration: 1.6,
            ease: "power2.out",
            delay: 0.5,
            onUpdate: () =>
              (el.textContent = String(Math.round(obj.v)).padStart(2, "0")),
          });
        });
      }

      // Tira de imagenes: loop infinito + arrastre por scroll
      if (track.current) {
        const loop = gsap.to(track.current, {
          xPercent: -50,
          duration: 40,
          ease: "none",
          repeat: -1,
        });
        if (!reduce) {
          ScrollTrigger.create({
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              // acelera/empuja la tira segun la velocidad de scroll
              gsap.to(loop, {
                timeScale: 1 + Math.min(6, Math.abs(self.getVelocity()) / 200),
                duration: 0.4,
                overwrite: true,
              });
            },
          });
        }
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-b border-line pt-36 pb-10 md:pt-44 md:pb-14"
    >
      {/* Grid tecnico de fondo */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%)",
        }}
      />
      {/* Glow verde sutil */}
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 -z-10 h-[55vh] w-[75vw] -translate-x-1/2 rounded-full opacity-[0.1] blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--color-brand) 0%, transparent 65%)",
        }}
      />

      <div className="container-x">
        <div className="flex items-start justify-between gap-6">
          <p className="eh-kicker kicker">Catálogo completo</p>

          {/* Contadores */}
          <div className="eh-meta flex shrink-0 gap-8 text-right">
            <div>
              <div className="font-display text-3xl font-bold leading-none md:text-4xl">
                <span className="eh-count" data-to={products.length}>
                  {String(products.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-widest text-mute">
                Equipos
              </p>
            </div>
            <div>
              <div className="font-display text-3xl font-bold leading-none md:text-4xl">
                <span className="eh-count" data-to={categories.length}>
                  {String(categories.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-widest text-mute">
                Categorías
              </p>
            </div>
          </div>
        </div>

        {/* Titular */}
        <h1 className="mt-6 font-display font-bold display-xl">
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="eh-line-in block">Equipos para</span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="eh-line-in block text-brand">construcción</span>
          </span>
        </h1>

        <p className="eh-sub mt-7 max-w-xl text-balance text-lg text-mute">
          Maquinaria certificada y mantenida, lista para tu obra. Filtra por
          categoría o busca el equipo que necesitas.
        </p>
      </div>

      {/* Tira de imagenes en loop */}
      <div className="mt-12 overflow-hidden md:mt-16">
        <div ref={track} className="flex w-max gap-4 will-change-transform">
          {[...STRIP, ...STRIP].map((p, i) => (
            <div
              key={i}
              className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl border border-line bg-white md:h-32 md:w-48"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image!}
                alt=""
                className="h-full w-full object-contain p-3"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
