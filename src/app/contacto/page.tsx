import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { WhatsAppIcon } from "@/components/icons";
import { EMAIL, PHONE, WHATSAPP_DISPLAY, waLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cotiza el alquiler de equipos para construcción. WhatsApp, correo y teléfono. Medellín e Itagüí, Antioquia.",
};

const CHANNELS = [
  { label: "WhatsApp", value: WHATSAPP_DISPLAY, href: waLink("Hola Conequipos, quiero cotizar un equipo.") },
  { label: "Correo", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Teléfono fijo", value: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
  { label: "Ubicación", value: "Itagüí, Antioquia · Colombia", href: undefined },
];

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        kicker="Hablemos"
        title="Cotiza tu equipo hoy"
        description="Respondemos rápido. Cuéntanos qué necesitas y coordinamos disponibilidad, precio y entrega."
      />

      <section className="container-x grid gap-16 py-20 md:grid-cols-2 md:py-28">
        {/* Canales */}
        <div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {CHANNELS.map((c) => {
              const inner = (
                <div className="flex items-center justify-between bg-ink-2 p-6 transition-colors hover:bg-ink-3">
                  <div>
                    <p className="kicker mb-1">{c.label}</p>
                    <p className="font-display text-lg text-bone">{c.value}</p>
                  </div>
                </div>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label}>{inner}</div>
              );
            })}
          </div>

          <a
            href={waLink("Hola Conequipos, quiero cotizar el alquiler de un equipo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-ink transition-colors hover:bg-brand-glow"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Escribir por WhatsApp
          </a>
        </div>

        {/* Bloque horario / promesa */}
        <div className="flex flex-col justify-between rounded-2xl border border-line bg-ink-2 p-8 md:p-10">
          <div>
            <p className="kicker mb-4">Atención</p>
            <h2 className="display-lg text-3xl md:text-4xl">
              Lunes a sábado, en horario de obra
            </h2>
            <p className="mt-5 text-mute">
              Coordinamos entregas y recogidas según el ritmo de tu proyecto.
              Para urgencias, WhatsApp es el canal más rápido.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8">
            <div>
              <dt className="font-mono text-xs text-mute">Cobertura</dt>
              <dd className="mt-1 font-display text-xl">Medellín &amp; Antioquia</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-mute">Respuesta</dt>
              <dd className="mt-1 font-display text-xl">El mismo día</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
