import Link from "next/link";
import { VideoScrolly } from "@/components/video-scrolly";
import { Marquee } from "@/components/marquee";
import { ProductCard } from "@/components/product-card";
import { StatCounter } from "@/components/stat-counter";
import { Magnetic } from "@/components/magnetic";
import { ArrowRight, CategoryIcon } from "@/components/icons";
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
        <div className="mb-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="max-w-2xl">
            <p data-reveal className="kicker mb-4">
              Catálogo por especialidad
            </p>
            <h2 data-reveal className="display-lg text-balance">
              Cada frente de tu obra,{" "}
              <span className="text-brand">con su equipo listo</span>
            </h2>
            <p data-reveal className="mt-5 max-w-md text-mute">
              {categories.length} categorías y {products.length} equipos
              certificados, mantenidos y disponibles para despachar. Elige una
              especialidad y cotiza en minutos.
            </p>
          </div>
          <Link
            data-reveal
            href="/equipos"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-bone transition-colors hover:border-brand hover:text-brand"
          >
            Ver todo el catálogo
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              data-reveal
              data-reveal-delay={(i % 3) * 0.05}
              className="group relative isolate flex min-h-52 flex-col justify-between overflow-hidden bg-ink-2 p-7"
            >
              {/* Wipe de marca: sube desde abajo en hover */}
              <span className="absolute inset-0 -z-10 translate-y-full bg-brand transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-y-0" />

              <div className="flex items-start justify-between">
                <CategoryIcon
                  slug={c.slug}
                  className="text-brand transition-colors duration-500 group-hover:text-white"
                />
                <span className="font-mono text-xs text-mute transition-colors duration-500 group-hover:text-white/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl leading-tight text-bone transition-colors duration-500 group-hover:text-white">
                  {c.name}
                </h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-mute transition-colors duration-500 group-hover:text-white/85">
                  {c.count} {c.count === 1 ? "equipo" : "equipos"}
                  <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </p>
              </div>
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
