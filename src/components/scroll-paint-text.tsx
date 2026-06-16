"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Segment = { text: string; to?: string };

// Pinta el texto palabra por palabra, de claro a su color final, a medida que
// se scrollea (efecto scrolly). Soporta segmentos con color destino propio
// (p.ej. un acento de marca) y un color de partida configurable.
export function ScrollPaintText({
  text,
  segments,
  from = "#c9ccc4",
  to = "#0c0e0d",
  as: Tag = "p",
  className,
}: {
  /** Texto simple (un solo color destino `to`). */
  text?: string;
  /** O segmentos con color destino por tramo. */
  segments?: Segment[];
  from?: string;
  to?: string;
  as?: "p" | "h2" | "h3";
  className?: string;
}) {
  const root = useRef<HTMLElement>(null);

  const segs: Segment[] = segments ?? [{ text: text ?? "", to }];

  // Palabras aplanadas con su color destino.
  const words: { w: string; to: string }[] = [];
  segs.forEach((seg, si) => {
    const ws = seg.text.split(" ").filter(Boolean);
    ws.forEach((w) => words.push({ w, to: seg.to ?? to }));
    if (si < segs.length - 1) words.push({ w: " ", to: seg.to ?? to });
  });

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wordEls = el.querySelectorAll<HTMLElement>(".sp-word");

    // Con reduce o en mobile (scrub poco fiable en touch) dejamos el texto
    // ya en su color final, sin scrubbing.
    if (reduce || window.innerWidth < 1024) {
      wordEls.forEach((w) => {
        w.style.color = w.dataset.to || to;
      });
      return;
    }

    // Si el texto ya está en viewport al montar (p.ej. primer bloque de la
    // página), no hay recorrido de scroll para pintarlo: lo pintamos una vez,
    // temporizado. Si está bajo el fold, se pinta con el scroll (scrub).
    const rect = el.getBoundingClientRect();
    const inViewOnMount =
      rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

    const ctx = gsap.context(() => {
      if (inViewOnMount) {
        const tl = gsap.timeline({ delay: 0.15 });
        wordEls.forEach((w, i) => {
          tl.fromTo(
            w,
            { color: from },
            { color: w.dataset.to || to, ease: "none", duration: 0.6 },
            i * 0.08 // ola suave on-load
          );
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 70%",
          scrub: 1.5,
        },
      });
      wordEls.forEach((w, i) => {
        tl.fromTo(
          w,
          { color: from },
          { color: w.dataset.to || to, ease: "none", duration: 1 },
          i * 0.25 // stagger solapado -> ola suave
        );
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={root as never} className={className}>
      {words.map((it, i) => (
        <span key={i} className="sp-word" data-to={it.to}>
          {it.w === " " ? " " : it.w}
          {it.w !== " " && i < words.length - 1 && words[i + 1].w !== " "
            ? " "
            : ""}
        </span>
      ))}
    </Tag>
  );
}
