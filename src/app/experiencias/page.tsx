import type { Metadata } from "next";
import { ScrollPaintText } from "@/components/scroll-paint-text";

export const metadata: Metadata = {
  title: "Experiencias",
  description:
    "Lo que dicen las obras y constructores que mantienen su producción en movimiento con Conequipos.",
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  sector: string;
  equipo: string;
  year: string;
  initials: string;
  /** Foto de la persona. */
  photo: string;
  /** Acento de la tarjeta. */
  accent?: "brand" | "hazard";
};

// Reseñas destacadas — par de citas que abren la sección.
const FEATURED: {
  quote: string;
  name: string;
  role: string;
  photo: string;
  accent: "brand" | "hazard";
  logo: "vertice" | "acero";
}[] = [
  {
    quote:
      "Teníamos una fundida a primera hora y el vibrador nos falló la noche anterior. Llamamos a Conequipos, mandaron reemplazo a la obra antes de las 6 a.m. y no perdimos el vaciado. Eso no se paga.",
    name: "Carlos Restrepo",
    role: "Director de obra · Sabaneta",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    accent: "brand",
    logo: "vertice",
  },
  {
    quote:
      "Metimos a Conequipos en tres obras al tiempo y respondieron parejo en todas. Precio claro, entrega puntual y nunca tuvimos que rogar por una máquina. Así se trabaja tranquilo.",
    name: "Marcela Ospina",
    role: "Gerente de proyecto · Medellín",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    accent: "hazard",
    logo: "acero",
  },
];

// Cifras de respaldo — número arriba, contexto abajo.
const CASE_STUDIES = [
  {
    stat: "06:00",
    label: "Reemplazo en obra antes del vaciado",
    title: "Cómo salvamos una fundida en Sabaneta",
    image: "/testimonials/card1.webp",
  },
  {
    stat: "0",
    label: "Días de obra perdidos por falla de equipo",
    title: "Disponibilidad que sostiene el cronograma",
    image: "/testimonials/card2.webp",
  },
  {
    stat: "+15",
    label: "Años moviendo obras del Valle de Aburrá",
    title: "De una bodega a flota propia de alquiler",
    image: "/testimonials/card3.webp",
  },
];

// Logos inventados de constructoras clientes.
function ClientLogo({ logo }: { logo: "vertice" | "acero" }) {
  if (logo === "vertice") {
    return (
      <span className="flex items-center gap-2 text-mute">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M12 3 22 20H2L12 3Z" />
          <path d="M12 11 17 20H7l5-9Z" fill="currentColor" stroke="none" opacity="0.35" />
        </svg>
        <span className="font-display text-lg font-bold tracking-tight text-bone">Vértice</span>
      </span>
    );
  }
  return (
    <span className="flex items-center gap-2 text-mute">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <rect x="3" y="4" width="18" height="3.2" rx="1" />
        <rect x="3" y="10.4" width="13" height="3.2" rx="1" opacity="0.6" />
        <rect x="3" y="16.8" width="8" height="3.2" rx="1" opacity="0.35" />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight text-bone">Acero<span className="text-mute">Obra</span></span>
    </span>
  );
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "La logística fue impecable. El equipo llegó a tiempo y el soporte estuvo siempre disponible. Ya vamos por el cuarto alquiler.",
    name: "Marcela Ospina",
    role: "Gerente de proyecto",
    location: "Residencial · Medellín",
    sector: "Vivienda",
    equipo: "Torregrúa + montacargas",
    year: "2025",
    initials: "MO",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    accent: "brand",
  },
  {
    quote:
      "Cotizaron en minutos y resolvieron una urgencia el mismo día. Maquinaria en perfecto estado, sin sorpresas.",
    name: "Jhon Gómez",
    role: "Contratista de obra civil",
    location: "Movimiento de tierra · Itagüí",
    sector: "Infraestructura",
    equipo: "Compactador + minicargador",
    year: "2024",
    initials: "JG",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    accent: "hazard",
  },
  {
    quote:
      "Nos recomendaron el equipo correcto en vez del más caro. Esa asesoría nos ahorró plata real en el presupuesto.",
    name: "Ingeniera residente",
    role: "Coordinación técnica",
    location: "Edificación · Sabaneta",
    sector: "Edificación",
    equipo: "Generador 60 kVA",
    year: "2024",
    initials: "IR",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    accent: "brand",
  },
  {
    quote:
      "Cumplen lo que prometen. Disponibilidad, precio claro y entrega puntual en cada alquiler. Sin letra menuda.",
    name: "Diego Henao",
    role: "Jefe de compras",
    location: "Infraestructura · Rionegro",
    sector: "Vías",
    equipo: "Compresor + martillos",
    year: "2025",
    initials: "DH",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    accent: "brand",
  },
  {
    quote:
      "Trabajamos con varios proveedores y Conequipos es el único que contesta a la primera. Para una obra, eso lo es todo.",
    name: "Laura Cardona",
    role: "Superintendente",
    location: "Comercial · Envigado",
    sector: "Comercial",
    equipo: "Plataforma de elevación",
    year: "2023",
    initials: "LC",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    accent: "hazard",
  },
  {
    quote:
      "Pedimos andamiaje un viernes en la tarde y el lunes ya estaba armándose. Ese ritmo nos mantiene el cronograma.",
    name: "Andrés Mejía",
    role: "Maestro de obra",
    location: "Vivienda · La Estrella",
    sector: "Vivienda",
    equipo: "Andamios multidireccionales",
    year: "2025",
    initials: "AM",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    accent: "brand",
  },
];

// Foto de la persona — anillo sutil con el acento de la tarjeta.
function Avatar({
  photo,
  name,
  size = "md",
  accent = "brand",
}: {
  photo: string;
  name: string;
  size?: "md" | "lg";
  accent?: "brand" | "hazard";
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo}
      alt={name}
      loading="lazy"
      className={`${size === "lg" ? "size-14" : "size-11"} shrink-0 rounded-full object-cover ring-2 ${
        accent === "hazard" ? "ring-hazard/30" : "ring-brand/30"
      }`}
    />
  );
}

function Meta({ t }: { t: Testimonial }) {
  return (
    <figcaption className="mt-6 flex items-center gap-3">
      <Avatar photo={t.photo} name={t.name} accent={t.accent} />
      <div className="min-w-0">
        <p className="truncate font-semibold text-bone">{t.name}</p>
        <p className="truncate text-sm text-mute">
          {t.role} · {t.location.split("·").pop()?.trim()}
        </p>
      </div>
    </figcaption>
  );
}

export default function ExperienciasPage() {
  return (
    <>
      {/* RESEÑA DESTACADA — encabezado + quote editorial */}
      <section className="container-x pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="mb-12">
          <span className="kicker">Testimonios</span>
          <ScrollPaintText
            as="h2"
            className="display-lg mt-4 text-balance"
            segments={[
              { text: "No es lo que decimos." },
              { text: "Es lo que cuentan ellos.", to: "#128a3c" },
            ]}
          />
        </div>

        {/* Par de reseñas con logo de cliente */}
        <div data-reveal="scale" className="grid gap-5 lg:grid-cols-2">
          {FEATURED.map((f) => (
            <figure
              key={f.name}
              className="flex flex-col justify-between rounded-3xl border border-line bg-ink-2 p-6 md:p-7"
            >
              <blockquote className="text-base leading-relaxed text-bone">
                {f.quote}
              </blockquote>
              <div className="mt-6 flex items-center justify-between gap-4">
                <figcaption className="flex items-center gap-3">
                  <Avatar photo={f.photo} name={f.name} accent={f.accent} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-bone">{f.name}</p>
                    <p className="truncate text-sm text-mute">{f.role}</p>
                  </div>
                </figcaption>
                <ClientLogo logo={f.logo} />
              </div>
            </figure>
          ))}
        </div>

        {/* Tres cifras de respaldo */}
        <div data-reveal="scale" className="mt-5 grid gap-5 md:grid-cols-3">
          {CASE_STUDIES.map((c) => (
            <figure
              key={c.title}
              className="group relative min-h-[17rem] overflow-hidden rounded-3xl border border-line"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
              <div className="relative flex h-full min-h-[17rem] flex-col justify-between p-6">
                <div>
                  <p className="font-display text-4xl font-bold tabular-nums text-white">
                    {c.stat}
                  </p>
                  <p className="mt-1.5 max-w-[13rem] text-sm leading-snug text-white/75">
                    {c.label}
                  </p>
                </div>
                <figcaption className="text-sm font-semibold leading-snug text-white">
                  {c.title}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* MASONRY DE RESEÑAS — columnas limpias, foto + cita */}
      <section className="container-x pb-20 md:pb-28">
        <div className="mb-10 flex items-end justify-between gap-6">
          <ScrollPaintText
            as="h3"
            className="font-display text-2xl font-bold text-balance md:text-3xl"
            segments={[
              { text: "Más obras" },
              { text: "que no se detuvieron.", to: "#128a3c" },
            ]}
          />
          <span className="hidden shrink-0 text-sm text-mute sm:block">
            Valle de Aburrá · 2023 a 2025
          </span>
        </div>
        <div className="gap-5 sm:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              data-reveal="scale"
              className="mb-5 break-inside-avoid rounded-2xl border border-line bg-ink-2 p-7 transition-colors duration-500 hover:border-brand/40 md:p-8"
            >
              <blockquote className="text-lg leading-relaxed text-bone">
                {t.quote}
              </blockquote>
              <Meta t={t} />
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
