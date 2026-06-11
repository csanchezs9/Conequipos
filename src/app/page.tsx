import Link from "next/link";
import { Hero } from "@/components/hero";
import { VideoScrolly } from "@/components/video-scrolly";
import { Marquee } from "@/components/marquee";
import { ProductCard } from "@/components/product-card";
import { StatCounter } from "@/components/stat-counter";
import { Magnetic } from "@/components/magnetic";
import { ArrowRight } from "@/components/icons";
import { categories, products } from "@/data/catalog";
import { waLink } from "@/lib/utils";

const featured = products.filter((p) => p.image).slice(0, 6);

const PROCESS = [
  {
    n: "01",
    t: "Cotiza en minutos",
    d: "Escríbenos el equipo y las fechas. Te enviamos disponibilidad y precio sin vueltas.",
  },
  {
    n: "02",
    t: "Coordinamos la logística",
    d: "Llevamos y recogemos el equipo en tu obra. Tú no mueves un dedo.",
  },
  {
    n: "03",
    t: "Produces sin parar",
    d: "Maquinaria certificada y soporte técnico activo durante todo el alquiler.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <VideoScrolly />

      <Marquee
        className="border-y border-line"
        items={[
          "Elevación",
          "Compactación",
          "Concreto",
          "Generadores",
          "Compresores",
          "Andamios",
          "Iluminación",
        ]}
      />

      {/* CATEGORÍAS */}
      <section className="container-x py-24 md:py-36">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p data-reveal className="kicker mb-4">
              Catálogo
            </p>
            <h2 data-reveal className="display-lg max-w-[16ch]">
              Todo lo que tu obra necesita, en un solo lugar
            </h2>
          </div>
          <Link
            data-reveal
            href="/equipos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all hover:gap-3"
          >
            Ver todos los equipos
            <ArrowRight />
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              data-reveal
              data-reveal-delay={(i % 3) * 0.05}
              className="group relative flex min-h-44 flex-col justify-between bg-ink-2 p-7 transition-colors duration-500 hover:bg-ink-3"
            >
              <span className="font-mono text-xs text-mute">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-2xl text-bone transition-colors group-hover:text-brand">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm text-mute">{c.count} equipos</p>
              </div>
              <ArrowRight className="absolute right-7 top-7 h-5 w-5 text-mute opacity-0 transition-all duration-500 group-hover:text-brand group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="border-y border-line bg-ink-2/40">
        <div className="container-x py-24 md:py-36">
          <div className="mb-14">
            <p data-reveal className="kicker mb-4">
              Más solicitados
            </p>
            <h2 data-reveal className="display-lg max-w-[18ch]">
              Equipos listos para entregar hoy
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-x py-24 md:py-36">
        <div className="grid gap-12 md:grid-cols-3">
          <StatCounter value={95} suffix="%" label="Disponibilidad de equipos" />
          <StatCounter value={9} suffix="+" label="Categorías de maquinaria" />
          <StatCounter value={24} suffix="h" label="Respuesta y despacho" />
        </div>
      </section>

      {/* PROCESO */}
      <section className="border-t border-line">
        <div className="container-x py-24 md:py-36">
          <div className="mb-16 max-w-2xl">
            <p data-reveal className="kicker mb-4">
              Cómo trabajamos
            </p>
            <h2 data-reveal className="display-lg">
              Simple. Rápido. Sin fricción.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {PROCESS.map((s) => (
              <div key={s.n} data-reveal className="bg-ink p-8 md:p-10">
                <span className="font-display text-6xl font-bold text-brand/30">
                  {s.n}
                </span>
                <h3 className="mt-6 font-display text-2xl">{s.t}</h3>
                <p className="mt-3 text-mute">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden border-t border-line">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] blur-[100px]"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 100%, var(--color-brand) 0%, transparent 70%)",
          }}
        />
        <div className="container-x flex flex-col items-center py-28 text-center md:py-40">
          <h2 data-reveal className="display-lg max-w-[16ch] text-balance">
            ¿Listo para mover tu obra a otra velocidad?
          </h2>
          <p data-reveal className="mt-6 max-w-md text-balance text-mute">
            Cuéntanos qué necesitas. Te cotizamos hoy mismo.
          </p>
          <div data-reveal className="mt-10">
            <Magnetic>
              <a
                href={waLink("Hola Conequipos, quiero cotizar el alquiler de un equipo.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-glow"
              >
                Cotizar por WhatsApp
                <ArrowRight />
              </a>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
