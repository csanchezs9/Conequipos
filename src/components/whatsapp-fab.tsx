"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/utils";

export function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink("Hola Conequipos, quiero cotizar el alquiler de un equipo.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-brand px-5 py-3.5 font-semibold text-ink shadow-2xl transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:bg-brand-glow ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ink" />
      </span>
      Cotizar
    </a>
  );
}
