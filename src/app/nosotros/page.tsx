import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollPaintText } from "@/components/scroll-paint-text";
import { StatCounter } from "@/components/stat-counter";
import { ArrowRight } from "@/components/icons";
import { waLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conequipos: alquiler y venta de maquinaria para construcción con logística ágil y soporte experto en Antioquia.",
};

export default function NosotrosPage() {
  return (
    <>
      {/* Manifiesto */}
      <section className="container-x pt-36 pb-24 md:pt-44 md:pb-36">
        <ScrollPaintText
          text="No alquilamos máquinas. Entregamos tiempo, productividad y tranquilidad para que tu obra no se detenga."
          className="display-lg max-w-[20ch] text-3xl leading-tight md:text-5xl"
        />
      </section>

      {/* Sobre nosotros — historia con fotos (estilo editorial, columnas
          asimétricas con offset) */}
      <section className="container-x pb-24 md:pb-36">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Columna izquierda */}
          <div data-reveal>
            <span className="kicker">Quiénes somos</span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] md:text-5xl">
              Nacimos en la obra, no en una oficina
            </h2>
            <p className="mt-6 max-w-prose text-lg text-mute">
              Conequipos arrancó en Itagüí resolviendo algo simple: que a
              ninguna obra le falte el equipo cuando lo necesita. Llevamos años
              moviendo maquinaria por todo el Valle de Aburrá, y seguimos
              contestando el teléfono nosotros mismos.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-line bg-white">
                <Image
                  src="/pexels-pok-rie-33563-1188532.jpg"
                  alt="Obra en construcción"
                  fill
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-ink-2">
                  <Image
                    src="/pexels-construccion-total-2464540-6106878.jpg"
                    alt="Equipo trabajando en obra"
                    fill
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-ink-2">
                  <Image
                    src="/pexels-ehma-15794732.jpg"
                    alt="Maquinaria en construcción"
                    fill
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha — desfasada hacia abajo */}
          <div data-reveal className="lg:mt-24">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-ink-2">
                  <Image
                    src="/pexels-lucaspezeta-2333694.jpg"
                    alt="Obra en construcción"
                    fill
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-line bg-white">
                  <Image
                    src="/pexels-mehmet-aksoy-374584031-16764815.jpg"
                    alt="Grúa torre en obra"
                    fill
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-line bg-ink-2">
                <Image
                  src="/pexels-rahibyaqubov-23978113.jpg"
                  alt="Maquinaria pesada en obra"
                  fill
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-2xl font-bold md:text-3xl">
                En la obra es donde se nota
              </h3>
              <p className="mt-4 text-mute">
                Cada equipo sale revisado y mantenido. No prometemos catálogos
                bonitos; prometemos que la máquina prende y rinde el día que
                llega.
              </p>
              <p className="mt-4 text-mute">
                Si algo falla, respondemos rápido. Tu obra no puede parar y
                nosotros tampoco.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-line bg-ink-2/40">
        <div className="container-x grid gap-12 py-20 md:grid-cols-3">
          <StatCounter value={95} suffix="%" label="Disponibilidad de equipos" />
          <StatCounter value={9} suffix="+" label="Categorías de maquinaria" />
          <StatCounter value={100} suffix="%" label="Equipos con mantenimiento" />
        </div>
      </section>

      {/* Por qué nosotros — bloque zigzag (imagen + texto alternados) */}
      <section className="container-x py-24 md:py-36">
        <div data-reveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="kicker">Por qué nosotros</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] md:text-5xl">
            Lo que tu obra gana con Conequipos
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Columna izquierda: imagen arriba, texto abajo */}
          <div data-reveal className="flex flex-col gap-8">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-line bg-ink-2">
              <Image
                src="/pexels-betongsmcsg-37121347.jpg"
                alt="Equipo de Conequipos en obra"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold md:text-3xl">
                Flota lista cuando la obra la pide
              </h3>
              <p className="mt-4 text-mute">
                Mantenemos una flota amplia y revisada para responder sin
                esperas. Cada equipo pasa mantenimiento y control antes de
                salir, para que trabajes con seguridad y rendimiento desde el
                primer día.
              </p>
              <Link
                href="/equipos"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-glow"
              >
                Ver equipos
                <ArrowRight />
              </Link>
            </div>
          </div>

          {/* Columna derecha: texto arriba, imagen abajo, desfasada */}
          <div data-reveal className="flex flex-col gap-8 lg:translate-y-16">
            <div>
              <h3 className="font-display text-2xl font-bold md:text-3xl">
                Logística y soporte que no fallan
              </h3>
              <p className="mt-4 text-mute">
                Entregamos y recogemos en sitio, coordinando los tiempos para
                que el equipo llegue justo cuando lo necesitas. Y te asesoramos
                antes y durante el alquiler para elegir la máquina correcta para
                cada tarea.
              </p>
              <a
                href={waLink("Hola Conequipos, quiero asesoría para elegir un equipo.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-semibold transition-colors hover:border-brand"
              >
                Hablar con un asesor
                <ArrowRight />
              </a>
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-line bg-ink-2">
              <Image
                src="/pexels-the-jd-darshan-solanki-215282-11959308.jpg"
                alt="Maquinaria de construcción en obra"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cierre — el equipo (estilo perfil: headline + foto + bio) */}
      <section className="container-x border-t border-line py-24 md:py-36">
        <div data-reveal className="max-w-3xl">
          <span className="kicker">El equipo</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] md:text-5xl">
            Detrás de cada entrega hay gente que conoce la obra
          </h2>
        </div>

        {/* Foto a lo ancho */}
        <div
          data-reveal
          className="relative mt-12 aspect-16/8 w-full overflow-hidden rounded-2xl border border-line bg-ink-2"
        >
          <Image
            src="/pexels-mikael-blomkvist-8961260.jpg"
            alt="Equipo de Conequipos en obra"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Dos columnas: identidad/ubicación + bio */}
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <div data-reveal>
            <p className="font-display text-xl font-bold">Conequipos S.A.S.</p>
            <p className="mt-2 flex items-center gap-2 text-mute">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-4 w-4 shrink-0 text-brand"
                aria-hidden
              >
                <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Itagüí, Antioquia · Colombia
            </p>
          </div>
          <div data-reveal className="md:col-span-2">
            <p className="text-lg text-mute">
              Somos un equipo que mueve maquinaria todos los días por el Valle de
              Aburrá. Conocemos la obra porque vivimos de ella: sabemos qué
              equipo necesitas, cuándo lo necesitas y cómo hacértelo llegar sin
              complicaciones. Cuando llamas, te contesta alguien que entiende de
              qué hablas.
            </p>
          </div>
        </div>

        {/* Segunda foto */}
        <div
          data-reveal
          className="relative mt-12 aspect-16/7 w-full overflow-hidden rounded-2xl border border-line bg-ink-2"
        >
          <Image
            src="/pexels-screeny42-12032961.jpg"
            alt="Maquinaria de Conequipos en sitio"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>
    </>
  );
}
