import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ButtonArrow, LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, breadcrumbJsonLd, webPageJsonLd } from "@/lib/geo";
import { FLOOR_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Commercial Flooring Services Perth",
  description:
    "Compare commercial polished concrete, honed concrete, grind and seal, and epoxy coating systems for Perth warehouses, showrooms, retail, hospitality, workshops, and plant rooms.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Commercial Flooring Services Perth",
    description:
      "Compare commercial polished concrete, honed concrete, grind and seal, and epoxy coating systems across Perth.",
    url: absoluteUrl("/services"),
    images: [{ url: FLOOR_IMAGES.honed, width: 1200, height: 900, alt: "Honed concrete finish sample" }],
  },
};

const services: Array<{
  slug: string;
  title: string;
  desc: string;
  suitable: string;
  spec: string;
  image: string;
}> = [
  {
    slug: "polished",
    title: "Polished concrete",
    desc: "Mechanically ground, densified, and refined for satin to high-gloss internal floors.",
    suitable: "Retail floors, showrooms, hospitality, commercial offices",
    spec: "Full mechanical polish",
    image: FLOOR_IMAGES.saltPepper,
  },
  {
    slug: "honed",
    title: "Honed concrete",
    desc: "Matte or satin finishes with natural aggregate character and a quieter feel underfoot.",
    suitable: "Cafes, retail entries, hospitality, low-glare interiors",
    spec: "Honed and guarded",
    image: FLOOR_IMAGES.honed,
  },
  {
    slug: "grind-seal",
    title: "Grind and seal",
    desc: "Ground concrete protected with a practical coating system for working spaces.",
    suitable: "Warehouses, workshops, commercial back-of-house",
    spec: "Ground and sealed",
    image: FLOOR_IMAGES.workGrindSeal,
  },
  {
    slug: "epoxy",
    title: "Epoxy coatings",
    desc: "Seamless epoxy and polyaspartic systems for warehouses, workshops, plant rooms, and commercial floors.",
    suitable: "Workshops, plant rooms, food prep, marked work zones",
    spec: "Resin coating system",
    image: FLOOR_IMAGES.epoxyGraphite,
  },
];

const decisions = [
  {
    label: "New slab",
    copy: "We review mix, curing, flatness, joints, and exposure expectations before the concrete is poured.",
  },
  {
    label: "Existing slab",
    copy: "We test hardness, coating history, cracking, moisture risk, and contamination before recommending a finish.",
  },
  {
    label: "Working floor",
    copy: "We specify for traffic, cleaning, slip resistance, chemical exposure, and downtime.",
  },
];

const comparisons = [
  ["Highest natural refinement", "Polished concrete"],
  ["Lower glare and tactile aggregate", "Honed concrete"],
  ["Efficient refresh for larger areas", "Grind and seal"],
  ["Colour, flake, line marking, or chemical resistance", "Epoxy coatings"],
];

export default function ServicesIndex() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            path: "/services",
            name: "Commercial Flooring Services Perth",
            description:
              "A guide to commercial polished concrete, honed concrete, grind and seal, and epoxy coating systems for Perth projects.",
            type: "CollectionPage",
            image: FLOOR_IMAGES.honed,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <header className="bg-[var(--color-cream)] pb-14 pt-[calc(var(--nav-h)+72px)] md:pb-20 md:pt-[calc(var(--nav-h)+112px)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Services</p>
              </Reveal>
              <Reveal stagger={80}>
                <h1 className="t-display-md mt-4 max-w-[18ch] text-[var(--color-text-primary)]">
                  Commercial flooring systems chosen from the slab up.
                </h1>
              </Reveal>
            </div>
            <Reveal stagger={160} className="md:col-span-4">
              <p className="t-body-lg max-w-[34ch] text-[var(--color-text-muted)] md:ml-auto">
                The right finish depends on aggregate, wear, glare, cleaning,
                moisture, and the way the room will be used every day.
              </p>
            </Reveal>
          </div>
        </Container>
      </header>

      <section className="section-pad-tight bg-[var(--color-paper)]">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Selection</p>
                <h2 className="t-display-sm mt-4 max-w-[10ch] text-[var(--color-text-primary)]">
                  Start with the constraint.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ul className="grid gap-px bg-[var(--hairline)]">
                {decisions.map((item, i) => (
                  <Reveal as="li" key={item.label} stagger={i * 70}>
                    <div className="grid gap-4 bg-[var(--color-paper)] p-5 sm:grid-cols-[180px_1fr] md:p-6">
                      <p className="t-subhead text-[var(--color-text-primary)]">{item.label}</p>
                      <p className="t-body text-[var(--color-text-muted)]">{item.copy}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad-tight bg-[var(--color-bone)]">
        <Container>
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <div>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Systems</p>
                <h2 className="t-display-sm mt-4 max-w-[16ch] text-[var(--color-text-primary)]">
                  Four practical ways to finish concrete.
                </h2>
              </div>
            </Reveal>
            <Reveal stagger={100}>
              <LinkButton href="/contact#quote" variant="ghost">
                Request Quote
              </LinkButton>
            </Reveal>
          </div>

          <ul className="border-t border-[var(--hairline-strong)]">
            {services.map((service, i) => (
              <Reveal as="li" key={service.slug} stagger={i * 70}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid grid-cols-1 gap-5 border-b border-[var(--hairline)] py-6 transition-colors hover:bg-[var(--color-paper)] sm:grid-cols-[44px_180px_1fr] sm:px-4 lg:grid-cols-[52px_220px_minmax(280px,1fr)_minmax(220px,280px)_44px] lg:items-center"
                >
                  <span className="t-mono text-[11px] text-[var(--color-text-muted)] sm:pt-2 lg:pt-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative block aspect-[4/3] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={`${service.title} example floor`}
                      fill
                      sizes="(min-width: 1024px) 220px, 180px"
                      className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-default)] group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[clamp(24px,2vw,34px)] font-extrabold leading-[1.02] text-[var(--color-text-primary)]">
                      {service.title}
                    </span>
                    <span className="t-body-sm mt-3 block text-[var(--color-text-muted)]">
                      {service.desc}
                    </span>
                  </span>
                  <span className="grid gap-4 border-t border-[var(--hairline)] pt-4 sm:col-start-3 sm:grid-cols-2 lg:col-start-auto lg:block lg:border-t-0 lg:pt-0">
                    <span>
                      <span className="block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Best for</span>
                      <span className="mt-2 block text-[13px] font-semibold leading-[1.35] text-[var(--color-text-primary)]">{service.suitable}</span>
                    </span>
                    <span className="lg:mt-5">
                      <span className="block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Spec</span>
                      <span className="mt-2 block text-[13px] font-semibold leading-[1.35] text-[var(--color-text-primary)]">{service.spec}</span>
                    </span>
                  </span>
                  <span aria-hidden="true" className="hidden h-11 w-11 items-center justify-center justify-self-end border border-[var(--hairline)] text-[15px] text-[var(--color-text-muted)] transition-all group-hover:border-[var(--color-oxide)] group-hover:bg-[var(--color-oxide)] group-hover:text-[var(--color-ink)] lg:flex">
                    <ButtonArrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-pad-tight bg-[var(--color-paper)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={FLOOR_IMAGES.honed}
                  alt="Honed concrete specification sample"
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div className="md:col-span-7">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Quick guide</p>
                <h2 className="t-display-sm mt-4 max-w-[14ch] text-[var(--color-text-primary)]">
                  A simpler way to choose.
                </h2>
              </Reveal>
              <div className="mt-8 divide-y divide-[var(--hairline)]">
                {comparisons.map(([need, answer], i) => (
                  <Reveal key={need} stagger={i * 60}>
                    <div className="grid gap-3 py-5 sm:grid-cols-[1fr_220px]">
                      <p className="t-body text-[var(--color-text-muted)]">{need}</p>
                      <p className="t-subhead text-[var(--color-text-primary)]">{answer}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
