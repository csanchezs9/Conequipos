"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories, products } from "@/data/catalog";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STRIP = products.filter((p) => p.image).slice(0, 14);

export function EquiposHero() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!reduce) {
        // Reveal del titular por lineas + meta
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(
            ".eh-line-in",
            { yPercent: 115, duration: 1.05, stagger: 0.1 }
          )
          .from(".eh-sub", { y: 20, opacity: 0, duration: 0.9 }, "-=0.6")
          .from(".eh-meta", { y: 14, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.6");

        // Ken Burns sutil sobre la imagen de fondo
        gsap.to(bg.current, {
          scale: 1.12,
          duration: 18,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

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
      className="relative isolate overflow-hidden border-b border-line pt-36 pb-10 md:pt-44 md:pb-14"
    >
      {/* Imagen de fondo (obra) con Ken Burns */}
      <div ref={bg} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src="/fotos/pexels-pok-rie-33563-1188532.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Velo blanco: imagen visible, texto legible a la izquierda */}
      <div className="absolute inset-0 z-[1] bg-white/15" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-white via-white/60 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white/80 via-transparent to-transparent" />

      {/* Grid tecnico de fondo */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%)",
        }}
      />

      <div className="container-x relative z-10">
        <div className="flex items-start justify-end gap-6">
          {/* Contadores */}
          <div className="eh-meta flex shrink-0 gap-8 text-right">
            <div>
              <div className="font-display text-3xl font-bold leading-none md:text-4xl">
                <span className="eh-count" data-to={products.length}>
                  {String(products.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1 text-[0.72rem] font-medium text-mute">
                Equipos
              </p>
            </div>
            <div>
              <div className="font-display text-3xl font-bold leading-none md:text-4xl">
                <span className="eh-count" data-to={categories.length}>
                  {String(categories.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1 text-[0.72rem] font-medium text-mute">
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
      <div className="relative z-10 mt-12 overflow-hidden md:mt-16">
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
