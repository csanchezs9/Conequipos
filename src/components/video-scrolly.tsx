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
    // (es contenido, no decoracion); solo se suaviza el movimiento.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shift = reduce ? 0 : 40;

    const ctx = gsap.context((self) => {
      const panels = self.selector!(".vs-panel") as HTMLElement[];
      const videos = self.selector!(".vs-video") as HTMLVideoElement[];
      const scenes = self.selector!(".vs-scene") as HTMLElement[];

      // Posicion inicial via GSAP (unica fuente de transform — un inline
      // translateY se apilaria con el yPercent del tween).
      gsap.set(panels.slice(1), { yPercent: 100, autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1.2,
          onUpdate: (st) => {
            const idx = Math.min(2, Math.floor(st.progress * 3));
            const el = root.current?.querySelector(".vs-count");
            if (el) el.textContent = `0${idx + 1}`;
          },
          // Pausa solo cuando el pin (toda la seccion) sale de vista —
          // no a mitad de las escenas.
          onLeave: () => videos.forEach((v) => v.pause()),
          onLeaveBack: () => videos.forEach((v) => v.pause()),
          onEnter: () => videos.forEach((v) => v.play().catch(() => {})),
          onEnterBack: () => videos.forEach((v) => v.play().catch(() => {})),
        },
      });

      // Cada transicion: el panel siguiente SUBE desde abajo y se superpone,
      // con parallax interno del video. Lenta y pausada (0.85 de 1 unidad).
      for (let i = 1; i < SCENES.length; i++) {
        const at = i;
        tl.fromTo(
          panels[i],
          { yPercent: 100 },
          { yPercent: 0, duration: 0.85, ease: "power2.inOut" },
          at - 0.85
        )
          // parallax interno: el video llega "frenando" dentro del panel
          .fromTo(
            videos[i],
            { yPercent: -10 },
            { yPercent: 0, duration: 0.85, ease: "power2.inOut" },
            at - 0.85
          )
          .to(
            scenes[i - 1],
            { autoAlpha: 0, y: -shift, duration: 0.3, ease: "power1.in" },
            at - 0.8
          )
          .fromTo(
            scenes[i],
            { autoAlpha: 0, y: shift },
            { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
            at - 0.4
          );
      }
      // respiro corto al final
      tl.to({}, { duration: 0.4 });

      // Arranca todos reproduciendo (muted = autoplay permitido)
      videos.forEach((v) => v.play().catch(() => {}));
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-video-hero
      className="relative isolate h-svh overflow-hidden bg-black"
    >
      {/* Paneles de video apilados — los siguientes arrancan abajo (CSS, no JS) */}
      {SCENES.map((s, i) => (
        <div
          key={s.src}
          className="vs-panel absolute inset-0 overflow-hidden will-change-transform"
          style={{ zIndex: i, ...(i > 0 ? { visibility: "hidden" } : {}) }}
        >
          <video
            className="vs-video h-full w-full scale-[1.18] object-cover will-change-transform"
            src={s.src}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
          />
        </div>
      ))}

      {/* Scrims para legibilidad (sobre los paneles) */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-[5] h-28 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Escenas de texto — apiladas, solo la 1 visible por defecto */}
      <div className="container-x relative z-10 h-full">
        {SCENES.map((s, i) => (
          <div
            key={i}
            className="vs-scene absolute inset-x-0 bottom-16 md:bottom-24"
            style={i > 0 ? { opacity: 0, visibility: "hidden" } : undefined}
          >
            <h2 className="font-display font-bold text-white display-lg">
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
