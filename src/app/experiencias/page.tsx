import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Experiencias",
  description:
    "Lo que dicen las obras y constructores que trabajan con Conequipos.",
};

const TESTIMONIALS = [
  {
    quote:
      "La logística fue impecable. El equipo llegó a tiempo y el soporte estuvo siempre disponible. Repetiremos.",
    name: "Constructora regional",
    role: "Proyecto residencial · Medellín",
  },
  {
    quote:
      "Cotizaron en minutos y resolvieron una urgencia el mismo día. Maquinaria en perfecto estado.",
    name: "Contratista de obra civil",
    role: "Movimiento de tierra · Itagüí",
  },
  {
    quote:
      "Asesoría real: nos recomendaron el equipo correcto y nos ahorraron costos. Muy profesionales.",
    name: "Ingeniero residente",
    role: "Edificación · Sabaneta",
  },
  {
    quote:
      "Cumplen lo que prometen. Disponibilidad, precio claro y entrega puntual en cada alquiler.",
    name: "Jefe de compras",
    role: "Infraestructura · Rionegro",
  },
];

export default function ExperienciasPage() {
  return (
    <>
      <PageHeader
        kicker="Experiencias"
        title="Obras que confían en nosotros"
        description="Constructores, contratistas e ingenieros que mantienen su obra en movimiento con Conequipos."
      />

      <section className="container-x py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              data-reveal
              data-reveal-delay={(i % 2) * 0.08}
              className="flex flex-col justify-between rounded-2xl border border-line bg-ink-2 p-8 md:p-10"
            >
              <blockquote className="font-display text-2xl leading-snug text-balance md:text-3xl">
                <span className="text-brand">“</span>
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-6">
                <p className="font-semibold text-bone">{t.name}</p>
                <p className="text-sm text-mute">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-glow"
          >
            Quiero trabajar con Conequipos
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
