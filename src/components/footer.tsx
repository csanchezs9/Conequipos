import Link from "next/link";
import { Logo } from "@/components/logo";
import { EMAIL, PHONE, WHATSAPP_DISPLAY, waLink } from "@/lib/utils";
import { categories } from "@/data/catalog";

const EMPRESA = [
  { label: "Equipos", href: "/equipos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Experiencias", href: "/experiencias" },
  { label: "Contacto", href: "/contacto" },
];

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://instagram.com/conequipos_",
    path: "M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm4.9-8.1a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM20 6.9c-.06-1.5-.4-2.83-1.5-3.92C17.4 1.9 16.07 1.56 14.57 1.5 13.02 1.4 10.98 1.4 9.43 1.5 7.93 1.56 6.6 1.9 5.5 2.98 4.41 4.07 4.07 5.4 4 6.9c-.1 1.55-.1 3.59 0 5.14.06 1.5.4 2.83 1.5 3.92 1.1 1.08 2.43 1.42 3.93 1.48 1.55.1 3.59.1 5.14 0 1.5-.06 2.83-.4 3.93-1.48 1.08-1.09 1.42-2.42 1.5-3.92.1-1.55.1-3.59 0-5.14Z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3-5.2 3Z",
  },
  {
    label: "WhatsApp",
    href: waLink("Hola Conequipos, quiero cotizar un equipo."),
    path: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.16c-.25.69-1.44 1.32-1.99 1.36-.51.04-.51.4-3.21-.67-2.7-1.07-4.4-3.81-4.53-3.99-.13-.18-1.08-1.44-1.08-2.75 0-1.3.69-1.95.93-2.21.25-.27.54-.34.72-.34.18 0 .36 0 .51.01.16.01.39-.06.61.47.22.53.76 1.84.83 1.97.07.13.11.29.02.47-.09.18-.13.29-.27.45-.13.16-.28.35-.4.47-.13.13-.27.28-.12.54.16.27.69 1.14 1.49 1.85 1.02.91 1.88 1.19 2.15 1.32.27.13.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.25.09 1.58.74 1.85.88.27.13.45.2.51.31.07.11.07.63-.18 1.32Z",
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#09090b] text-white/70">
      {/* Marca de agua gigante */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-0 w-full select-none text-center font-display text-[16vw] font-extrabold leading-none tracking-tight text-white/[0.03] md:text-[13vw]"
      >
        Conequipos
      </span>

      <div className="container-x relative pt-20 pb-36 md:pt-28 md:pb-48">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
          {/* Marca + redes */}
          <div>
            <Logo className="h-14 w-auto brightness-0 invert md:h-16" />
            <div className="mt-7 flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-colors hover:bg-brand hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Catálogo */}
          <nav>
            <p className="text-sm font-semibold uppercase tracking-wider text-white">Catálogo</p>
            <ul className="mt-6 space-y-4 text-sm">
              {categories.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categoria/${c.slug}`}
                    className="font-medium text-[oklch(0.705_0.015_286.067)] transition-colors hover:text-white"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Empresa */}
          <nav>
            <p className="text-sm font-semibold uppercase tracking-wider text-white">Empresa</p>
            <ul className="mt-6 space-y-4 text-sm">
              {EMPRESA.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    className="font-medium text-[oklch(0.705_0.015_286.067)] transition-colors hover:text-white"
                  >
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white">Contacto</p>
            <ul className="mt-6 space-y-4 text-sm font-medium text-[oklch(0.705_0.015_286.067)]">
              <li>
                <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-white">
                  {EMAIL}
                </a>
              </li>
              <li>
                Fijo <span className="text-white/80">{PHONE}</span>
              </li>
              <li>
                WhatsApp <span className="text-white/80">{WHATSAPP_DISPLAY}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
