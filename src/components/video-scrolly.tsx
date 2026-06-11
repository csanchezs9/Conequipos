"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    src: "/videos/obra-1.mp4",
    kicker: "Alquiler certificado",
    line1: "Maquinaria",
    line2: "que rinde.",
    sub: "Equipos revisados y mantenidos, listos para producir desde el primer día.",
  },
  {
    src: "/videos/obra-2.mp4",
    kicker: "Logística en obra",
    line1: "Entregamos",
    line2: "donde estés.",
    sub: "Llevamos y recogemos el equipo en tu obra. Tú no mueves un dedo.",
  },
  {
    src: "/videos/obra-3.mp4",
    kicker: "Soporte experto",
    line1: "Respaldo",
    line2: "permanente.",
    sub: "Asesoría técnica activa durante todo el alquiler. Tu obra no se detiene.",
  },
];

export function VideoScrolly() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const videos = gsap.utils.toArray<HTMLVideoElement>(".vs-video");
      const scenes = gsap.utils.toArray<HTMLElement>(".vs-scene");

      // Estado inicial: solo la escena 0 visible
      gsap.set(videos, { autoAlpha: 0 });
      gsap.set(videos[0], { autoAlpha: 1 });
      scenes.forEach((s, i) => {
        gsap.set(s.querySelectorAll(".vs-el"), {
          autoAlpha: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 40,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const idx = Math.min(2, Math.floor(self.progress * 3));
            const el = root.current?.querySelector(".vs-count");
            if (el) el.textContent = `0${idx + 1}`;
          },
        },
      });

      // Transicion 1 -> 2 (en t=1) y 2 -> 3 (en t=2); cada escena dura 1
      for (let i = 1; i < SCENES.length; i++) {
        const at = i;
        tl.to(
          scenes[i - 1].querySelectorAll(".vs-el"),
          { autoAlpha: 0, y: -40, duration: 0.35, stagger: 0.04, ease: "power2.in" },
          at - 0.35
        )
          .to(videos[i - 1], { autoAlpha: 0, duration: 0.4 }, at - 0.2)
          .to(videos[i], { autoAlpha: 1, duration: 0.4 }, at - 0.2)
          .to(
            scenes[i].querySelectorAll(".vs-el"),
            { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" },
            at - 0.05
          );
      }
      // relleno para que la ultima escena respire
      tl.to({}, { duration: 0.6 });

      // Solo reproducir videos cuando la seccion esta en viewport
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
      {/* Videos apilados */}
      {SCENES.map((s) => (
        <video
          key={s.src}
          className="vs-video absolute inset-0 z-0 h-full w-full object-cover"
          src={s.src}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ))}

      {/* Scrim para legibilidad */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/35 to-black/30" />

      {/* Escenas de texto */}
      <div className="container-x relative z-10 flex h-full items-end pb-16 md:pb-24">
        {SCENES.map((s, i) => (
          <div
            key={i}
            className="vs-scene absolute inset-x-[var(--spacing-gutter)] bottom-16 md:bottom-24"
          >
            <p className="vs-el kicker !text-brand-glow">{s.kicker}</p>
            <h2 className="mt-4 font-display font-bold text-white display-lg">
              <span className="vs-el block">{s.line1}</span>
              <span className="vs-el block text-brand-glow">{s.line2}</span>
            </h2>
            <p className="vs-el mt-5 max-w-md text-balance text-white/75">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Contador minimo */}
      <div className="absolute right-[var(--spacing-gutter)] top-1/2 z-10 hidden -translate-y-1/2 items-center gap-2 font-mono text-xs text-white/60 md:flex">
        <span className="vs-count text-white">01</span>
        <span>/</span>
        <span>03</span>
      </div>
    </section>
  );
}
