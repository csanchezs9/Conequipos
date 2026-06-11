import Link from "next/link";
import { Logo } from "@/components/logo";
import { EMAIL, PHONE, WHATSAPP_DISPLAY, waLink } from "@/lib/utils";
import { categories } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink">
      <div className="container-x py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="text-xl" />
            <p className="mt-5 max-w-sm text-balance text-mute">
              Alquiler y venta de maquinaria certificada para construcción.
              Medellín · Itagüí · Antioquia.
            </p>
            <a
              href={waLink("Hola Conequipos, quiero cotizar un equipo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-glow"
            >
              Hablemos por WhatsApp
            </a>
          </div>

          <div>
            <p className="kicker mb-5">Categorías</p>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categoria/${c.slug}`}
                    className="text-mute transition-colors hover:text-bone"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker mb-5">Contacto</p>
            <ul className="space-y-2.5 text-sm text-mute">
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-bone">
                  {EMAIL}
                </a>
              </li>
              <li>Fijo · {PHONE}</li>
              <li>WhatsApp · {WHATSAPP_DISPLAY}</li>
            </ul>
            <div className="mt-5 flex gap-3 text-sm text-mute">
              <a href="https://instagram.com/conequipos_" className="hover:text-bone">
                Instagram
              </a>
              <a href="#" className="hover:text-bone">
                Facebook
              </a>
              <a href="#" className="hover:text-bone">
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 text-xs text-mute md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Conequipos S.A.S. Todos los derechos reservados.</p>
          <p className="font-mono">Hecho con precisión industrial.</p>
        </div>
      </div>
    </footer>
  );
}
