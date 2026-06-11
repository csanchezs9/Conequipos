"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnetic } from "@/components/magnetic";
import { ArrowRight } from "@/components/icons";
import { waLink } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    src: "/videos/obra-1.mp4",
    kicker: "Alquiler de equipos · Medellín & Antioquia",
    line1: "Maquinaria que",
    line2: "no para tu obra.",
    sub: "Equipos certificados y mantenidos, listos para producir desde el primer día.",
    cta: true,
  },
  {
    src: "/videos/obra-2.mp4",
    kicker: "Logística en obra",
    line1: "Entregamos",
    line2: "donde estés.",
    sub: "Llevamos y recogemos el equipo en tu obra. Tú no mueves un dedo.",
    cta: false,
  },
  {
    src: "/videos/obra-3.mp4",
    kicker: "Soporte experto",
    line1: "Respaldo",
    line2: "permanente.",
    sub: "Asesoría técnica activa durante todo el alquiler. Tu obra no se detiene.",
    cta: false,
  },
];

export function VideoScrolly() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    // Con reduced-motion el pin y el cambio de escenas SIGUEN funcionando
    // (es contenido, no decoracion); solo se elimina el desplazamiento en Y.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shift = reduce ? 0 : 50;

    const ctx = gsap.context((self) => {
      const videos = self.selector!(".vs-video") as HTMLVideoElement[];
      const scenes = self.selector!(".vs-scene") as HTMLElement[];

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.6,
          onUpdate: (st) => {
            const idx = Math.min(2, Math.floor(st.progress * 3));
            const el = root.current?.querySelector(".vs-count");
            if (el) el.textContent = `0${idx + 1}`;
          },
        },
      });

      // Cada escena dura 1 unidad; transicion i-1 -> i alrededor de t=i
      for (let i = 1; i < SCENES.length; i++) {
        tl.to(
          scenes[i - 1],
          { autoAlpha: 0, y: -shift, duration: 0.35, ease: "power2.in" },
          i - 0.4
        )
          .to(videos[i - 1], { autoAlpha: 0, duration: 0.45 }, i - 0.25)
          .to(videos[i], { autoAlpha: 1, duration: 0.45 }, i - 0.25)
          .fromTo(
            scenes[i],
            { autoAlpha: 0, y: shift },
            { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
            i - 0.1
          );
      }
      // respiro final para la ultima escena
      tl.to({}, { duration: 0.7 });

      // Play/pause segun viewport
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => videos.forEach((v) => v.play().catch(() => {})),
        onEnterBack: () => videos.forEach((v) => v.play().catch(() => {})),
        onLeave: () => videos.forEach((v) => v.pause()),
        onLeaveBack: () => videos.forEach((v) => v.pause()),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate h-svh overflow-hidden bg-black">
      {/* Videos apilados — solo el primero visible por defecto (CSS, no JS) */}
      {SCENES.map((s, i) => (
        <video
          key={s.src}
          className="vs-video absolute inset-0 z-0 h-full w-full object-cover"
          style={i > 0 ? { opacity: 0, visibility: "hidden" } : undefined}
          src={s.src}
          muted
          loop
          playsInline
          autoPlay={i === 0}
          preload={i === 0 ? "auto" : "metadata"}
        />
      ))}

      {/* Scrims para legibilidad (texto abajo + header arriba) */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Escenas de texto — apiladas, solo la 1 visible por defecto */}
      <div className="container-x relative z-10 h-full">
        {SCENES.map((s, i) => (
          <div
            key={i}
            className="vs-scene absolute inset-x-0 bottom-16 md:bottom-24"
            style={i > 0 ? { opacity: 0, visibility: "hidden" } : undefined}
          >
            <p className="kicker !text-brand-glow">{s.kicker}</p>
            <h2 className="mt-4 font-display font-bold text-white display-lg">
              <span className="block">{s.line1}</span>
              <span className="block text-brand-glow">{s.line2}</span>
            </h2>
            <p className="mt-5 max-w-md text-balance text-white/75">{s.sub}</p>

            {s.cta && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href={waLink("Hola Conequipos, quiero cotizar el alquiler de un equipo.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-white transition-colors hover:bg-brand-glow"
                  >
                    Cotizar mi equipo
                    <ArrowRight />
                  </a>
                </Magnetic>
                <Link
                  href="/equipos"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition-colors hover:border-brand-glow hover:text-brand-glow"
                >
                  Ver catálogo
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contador minimo */}
      <div className="absolute right-[var(--spacing-gutter)] top-1/2 z-10 hidden -translate-y-1/2 items-center gap-2 font-mono text-xs text-white/60 md:flex">
        <span className="vs-count text-white">01</span>
        <span>/</span>
        <span>03</span>
      </div>

      {/* Hint de scroll */}
      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/50">
        Scroll
      </div>
    </section>
  );
}
