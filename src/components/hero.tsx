"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Magnetic } from "@/components/magnetic";
import { ArrowDown, ArrowRight } from "@/components/icons";
import { waLink } from "@/lib/utils";

const WORDS = ["Maquinaria", "que", "no", "para", "tu", "obra."];

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-kicker", { y: 20, opacity: 0, duration: 0.8 })
        .from(
          ".hero-word",
          { yPercent: 120, opacity: 0, duration: 1.1, stagger: 0.08 },
          "-=0.5"
        )
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.9 }, "-=0.7")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.6")
        .from(".hero-meta", { opacity: 0, duration: 1 }, "-=0.4");

      // parallax sutil del glow al hacer scroll
      gsap.to(".hero-glow", {
        yPercent: 30,
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-28"
    >
      {/* Glow de fondo */}
      <div
        className="hero-glow pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand) 0%, transparent 65%)",
        }}
      />
      {/* Grid técnico */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container-x">
        <p className="hero-kicker kicker mb-6">
          Alquiler de equipos · Medellín &amp; Antioquia
        </p>

        <h1 className="display-xl max-w-[14ch] font-display font-bold">
          {WORDS.map((w, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden">
              <span
                className={`hero-word inline-block ${
                  w === "no" || w === "para" ? "text-brand" : "text-bone"
                }`}
              >
                {w}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-8 max-w-xl text-balance text-lg text-mute">
          Maquinaria certificada, mantenida y lista para rendir. Logística ágil
          en obra, soporte experto y 95% de disponibilidad real.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href={waLink("Hola Conequipos, quiero cotizar el alquiler de un equipo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-ink transition-colors hover:bg-brand-glow"
            >
              Cotizar mi equipo
              <ArrowRight />
            </a>
          </Magnetic>
          <Link
            href="/equipos"
            className="hero-cta inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 font-semibold text-bone transition-colors hover:border-brand"
          >
            Ver catálogo
          </Link>
        </div>

        <div className="hero-meta mt-20 flex items-center gap-3 text-mute">
          <ArrowDown className="animate-bounce" />
          <span className="font-mono text-xs uppercase tracking-widest">
            Desliza para explorar
          </span>
        </div>
      </div>
    </section>
  );
}
