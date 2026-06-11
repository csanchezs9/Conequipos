import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StatCounter } from "@/components/stat-counter";
import { Magnetic } from "@/components/magnetic";
import { ArrowRight } from "@/components/icons";
import { waLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conequipos: alquiler y venta de maquinaria para construcción con logística ágil y soporte experto en Antioquia.",
};

const VALUES = [
  {
    t: "Disponibilidad real",
    d: "Mantenemos una flota amplia y revisada para responder cuando tu obra lo exige, sin esperas.",
  },
  {
    t: "Logística que rinde",
    d: "Entregamos y recogemos en sitio. Coordinamos tiempos para que el equipo llegue justo cuando lo necesitas.",
  },
  {
    t: "Soporte experto",
    d: "Asesoría técnica antes y durante el alquiler. Te ayudamos a elegir el equipo correcto para cada tarea.",
  },
  {
    t: "Maquinaria certificada",
    d: "Cada equipo pasa mantenimiento y control. Trabajas con seguridad y rendimiento garantizado.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        kicker="Quiénes somos"
        title="Movemos la construcción de Antioquia"
        description="Desde Itagüí, conectamos obras con la maquinaria que necesitan. Equipos certificados, logística ágil y un equipo humano que responde."
      />

      {/* Manifiesto */}
      <section className="container-x py-24 md:py-36">
        <p
          data-reveal
          className="display-lg max-w-[20ch] text-3xl leading-tight md:text-5xl"
        >
          No alquilamos máquinas.{" "}
          <span className="text-mute">
            Entregamos tiempo, productividad y tranquilidad para que tu obra no
            se detenga.
          </span>
        </p>
      </section>

      {/* Stats */}
      <section className="border-y border-line bg-ink-2/40">
        <div className="container-x grid gap-12 py-20 md:grid-cols-3">
          <StatCounter value={95} suffix="%" label="Disponibilidad de equipos" />
          <StatCounter value={9} suffix="+" label="Categorías de maquinaria" />
          <StatCounter value={100} suffix="%" label="Equipos con mantenimiento" />
        </div>
      </section>

      {/* Valores */}
      <section className="container-x py-24 md:py-36">
        <div className="mb-16">
          <p data-reveal className="kicker mb-4">
            Cómo trabajamos
          </p>
          <h2 data-reveal className="display-lg max-w-[16ch]">
            Cuatro razones para confiar tu obra en Conequipos
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {VALUES.map((v, i) => (
            <div key={v.t} data-reveal className="bg-ink p-8 md:p-12">
              <span className="font-mono text-sm text-brand">
                0{i + 1}
              </span>
              <h3 className="mt-5 font-display text-2xl md:text-3xl">{v.t}</h3>
              <p className="mt-3 text-mute">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <div className="container-x flex flex-col items-start gap-8 py-24 md:flex-row md:items-end md:justify-between md:py-32">
          <h2 data-reveal className="display-lg max-w-[14ch]">
            Hablemos de tu próximo proyecto
          </h2>
          <Magnetic>
            <a
              href={waLink("Hola Conequipos, quiero conocer más sobre sus equipos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 font-semibold text-ink transition-colors hover:bg-brand-glow"
            >
              Contáctanos
              <ArrowRight />
            </a>
          </Magnetic>
        </div>
      </section>
    </>
  );
}
