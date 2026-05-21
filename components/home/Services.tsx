import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FLOOR_IMAGES } from "@/lib/images";

const services: Array<{
  slug: string;
  title: string;
  description: string;
  suited: string;
  spec: string;
  image: string;
}> = [
  {
    slug: "polished",
    title: "Polished concrete",
    description: "Mechanically refined, densified, and guarded for internal floors with depth and long service life.",
    suited: "Homes, showrooms, retail, hospitality",
    spec: "Cream to medium exposure",
    image: FLOOR_IMAGES.interior,
  },
  {
    slug: "honed",
    title: "Honed concrete",
    description: "Matte outdoor and transitional finishes with aggregate character, low glare, and practical traction.",
    suited: "Pool surrounds, courtyards, cafes",
    spec: "Satin guard / slip-aware",
    image: FLOOR_IMAGES.honed,
  },
  {
    slug: "grind-seal",
    title: "Grind and seal",
    description: "A controlled grind protected by a coating system for efficient working floors and refurbishments.",
    suited: "Warehouses, workshops, back-of-house",
    spec: "Urethane or polyaspartic",
    image: FLOOR_IMAGES.workGrindSeal,
  },
  {
    slug: "epoxy",
    title: "Epoxy coatings",
    description: "Seamless coating systems for chemical resistance, safety marking, easy cleaning, and fast return to use.",
    suited: "Garages, kitchens, plant rooms",
    spec: "Flake / safety / solid colour",
    image: FLOOR_IMAGES.workshop,
  },
];

export function Services() {
  return (
    <section id="services" className="section-pad bg-[var(--color-paper)]" aria-labelledby="services-heading">
      <Container width="full">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(260px,340px)_minmax(0,1fr)] xl:gap-20">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+40px)] lg:self-start">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">01 / Service finder</p>
              </Reveal>
              <Reveal stagger={80}>
                <h2 id="services-heading" className="mt-4 max-w-[12ch] text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.05] text-[var(--color-text-primary)]">
                  Start with use, not trend.
                </h2>
              </Reveal>
              <Reveal stagger={160}>
                <p className="t-body-sm mt-5 max-w-[34ch] text-[var(--color-text-muted)]">
                  The right floor is selected by traffic, light, moisture,
                  cleaning, exposure, and the slab you already have.
                </p>
              </Reveal>
            </div>

            <div className="border-t border-[var(--hairline-strong)]">
              {services.map((service, i) => (
                <Reveal key={service.slug} stagger={i * 70}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group grid grid-cols-1 gap-4 border-b border-[var(--hairline)] py-6 transition-colors hover:bg-[var(--color-bone)] sm:grid-cols-[32px_112px_1fr] sm:items-start sm:px-3 lg:grid-cols-[40px_132px_minmax(260px,1fr)_minmax(170px,220px)_44px] lg:items-center lg:gap-5 lg:px-5 xl:grid-cols-[40px_148px_minmax(320px,1fr)_minmax(190px,230px)_44px]"
                  >
                    <span className="t-mono pt-1 text-[11px] text-[var(--color-text-muted)] sm:pt-2 lg:pt-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative block aspect-square w-full max-w-[160px] overflow-hidden bg-[var(--color-limestone)] sm:max-w-none">
                      <Image
                        src={service.image}
                        alt={`${service.title} example floor`}
                        fill
                        sizes="(min-width: 1024px) 148px, 160px"
                        className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-default)] group-hover:scale-[1.04]"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block max-w-[15ch] text-[clamp(24px,2vw,34px)] font-extrabold leading-[1.02] text-[var(--color-text-primary)]">
                        {service.title}
                      </span>
                      <span className="mt-3 block max-w-[38ch] text-[14px] leading-[1.5] text-[var(--color-text-muted)]">
                        {service.description}
                      </span>
                    </span>
                    <span className="grid gap-4 border-t border-[var(--hairline)] pt-4 sm:col-start-3 sm:grid-cols-2 lg:col-start-auto lg:block lg:border-t-0 lg:pt-0">
                      <span>
                        <span className="block text-[11px] font-extrabold uppercase leading-tight tracking-[0.08em] text-[var(--color-text-muted)]">Best for</span>
                        <span className="mt-2 block text-[13px] font-semibold leading-[1.35] text-[var(--color-text-primary)]">{service.suited}</span>
                      </span>
                      <span className="lg:mt-5">
                        <span className="block text-[11px] font-extrabold uppercase leading-tight tracking-[0.08em] text-[var(--color-text-muted)]">Spec note</span>
                        <span className="mt-2 block text-[13px] font-semibold leading-[1.35] text-[var(--color-text-primary)]">{service.spec}</span>
                      </span>
                    </span>
                    <span aria-hidden="true" className="hidden h-11 w-11 items-center justify-center justify-self-end border border-[var(--hairline)] text-[15px] text-[var(--color-text-muted)] transition-all group-hover:border-[var(--color-oxide)] group-hover:bg-[var(--color-oxide)] group-hover:text-[var(--color-ink)] lg:flex">
                      {"->"}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
