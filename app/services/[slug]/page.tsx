import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StructuredData } from "@/components/StructuredData";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  GEO_SERVICES,
  LAST_UPDATED_DISPLAY,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/geo";
import { FLOOR_IMAGES, HYPER_FLAKE_IMAGES, POLISHED_CONCRETE_IMAGES, ULTRA_FLAKE_IMAGES } from "@/lib/images";

type Svc = {
  title: string;
  lede: string;
  whatItIs: string;
  bestFor: string[];
  priceRange: string;
  image: string;
  outcome: string;
  process: string[];
  options: string[];
  care: string;
};

const db: Record<string, Svc> = {
  polished: {
    title: "Polished concrete",
    lede: "Mechanically refined internal concrete with long service life and a natural finish.",
    whatItIs:
      "We grind the slab with diamond tooling, densify it chemically so the concrete becomes harder, then polish through the specified grit sequence. The reflection comes from the concrete itself, not a film sitting on top.",
    bestFor: ["Showrooms", "Retail", "Hospitality", "Commercial offices"],
    priceRange: "$160 - $220 / m2",
    image: FLOOR_IMAGES.saltPepper,
    outcome: "A clean architectural floor with controlled aggregate exposure, better light return, and no topical coating to peel.",
    process: ["Slab inspection and exposure sample", "Progressive metal-bond grinding", "Grout, densifier, and edge detailing", "Resin polishing to selected sheen", "Guard application and handover"],
    options: ["Salt and pepper, partial, or full exposure", "Matte, satin, or high-gloss sheen", "Joint treatment and edge refinement", "Maintenance plan for commercial cleaning and traffic"],
    care: "Clean with pH-neutral products, avoid harsh acids, and use walk-off mats where sand is tracked inside.",
  },
  honed: {
    title: "Honed concrete",
    lede: "A matte or satin concrete finish with tactile aggregate character and low glare.",
    whatItIs:
      "We grind to the specified exposure and stop at a quieter grit level, then protect the floor with a penetrating guard. It suits spaces that need texture, restraint, and natural variation.",
    bestFor: ["Cafes", "Retail entries", "Courtyards", "Low-glare commercial interiors"],
    priceRange: "$120 - $160 / m2",
    image: FLOOR_IMAGES.honed,
    outcome: "A softer concrete surface with visible aggregate, low reflection, and a natural feel underfoot.",
    process: ["Review slip, drainage, and exposure needs", "Cut to the selected aggregate level", "Refine scratches through the honing sequence", "Apply suitable penetrating protection", "Confirm cleaning method and reseal cycle"],
    options: ["Matte or satin finish", "Internal or covered external areas", "Slip-aware texture selection", "Penetrating or topical protection by use case"],
    care: "Keep grit off the floor, clean spills early, and schedule resealing based on weather and traffic exposure.",
  },
  "grind-seal": {
    title: "Grind and seal",
    lede: "A practical ground concrete finish protected by a coating system.",
    whatItIs:
      "A controlled grind cleans and flattens the floor before a primer and high-wear sealer system are applied. It is efficient for large working floors and back-of-house spaces.",
    bestFor: ["Warehouses", "Workshops", "Back-of-house retail"],
    priceRange: "$65 - $95 / m2",
    image: FLOOR_IMAGES.workGrindSeal,
    outcome: "A cost-effective concrete finish with improved cleanability, clearer light, and a sacrificial coating that can be refreshed.",
    process: ["Check contamination, cracks, and coating history", "Mechanical grind and floor preparation", "Repair local defects where required", "Apply primer and sealer system", "Confirm cure time before return to service"],
    options: ["Clear or tinted sealers", "Matte or satin finish", "Anti-slip additive where required", "Staged work for occupied sites"],
    care: "Use non-abrasive cleaning pads, remove spills quickly, and plan periodic recoat intervals for heavy traffic.",
  },
  epoxy: {
    title: "Epoxy coatings",
    lede: "Seamless resin flooring for harder-working commercial, warehouse, and workshop surfaces.",
    whatItIs:
      "We mechanically prepare the slab, apply primer, build the epoxy layer, and finish with a suitable top coat. Systems can be solid colour, flake, marked, or specified for chemical resistance.",
    bestFor: ["Warehouses", "Workshops", "Food prep areas", "Plant rooms"],
    priceRange: "$75 - $100 / m2",
    image: FLOOR_IMAGES.epoxyGraphite,
    outcome: "A sealed resin floor that handles heavier wear, easier cleaning, and clear zoning or colour requirements.",
    process: ["Moisture, contamination, and adhesion checks", "Diamond grind or shot-blast preparation", "Crack repair and joint planning", "Primer, body coat, and broadcast where specified", "Top coat, cure window, and line marking"],
    options: ["Solid colour, flake, or quartz broadcast", "Polyaspartic top coat for faster return", "Slip resistance levels", "Chemical and hot-tyre resistant specifications"],
    care: "Protect from early traffic during cure, clean with compatible detergents, and avoid dragging sharp steel edges.",
  },
};

export function generateStaticParams() {
  return Object.keys(db).map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const svc = db[slug];
  if (!svc) return { title: "Service" };

  const description = `${svc.lede} Perth Commercial Flooring specifies ${svc.title.toLowerCase()} for ${svc.bestFor
    .join(", ")
    .toLowerCase()} across Perth. Guide range ${svc.priceRange}.`;

  return {
    title: `${svc.title} Perth`,
    description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${svc.title} Perth`,
      description,
      url: absoluteUrl(`/services/${slug}`),
      images: [{ url: svc.image, width: 1200, height: 900, alt: `${svc.title} Perth example floor` }],
    },
  };
}

export default async function ServiceDetail(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const svc = db[slug];
  if (!svc) notFound();
  const structuredData = serviceJsonLd(slug);
  const answerObject = GEO_SERVICES.find((service) => service.slug === slug)?.answer;
  const schema = [
    webPageJsonLd({
      path: `/services/${slug}`,
      name: `${svc.title} Perth`,
      description: answerObject ?? svc.lede,
      image: svc.image,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: svc.title, path: `/services/${slug}` },
    ]),
    ...(structuredData ? [structuredData] : []),
  ];

  return (
    <>
      <StructuredData data={schema} />
      <header className="bg-[var(--color-cream)] pb-14 pt-[calc(var(--nav-h)+72px)] md:pb-20 md:pt-[calc(var(--nav-h)+112px)]">
        <Container>
          <Reveal>
            <Link href="/services" className="link-underline t-caption text-[var(--color-text-primary)]">
              Back to services
            </Link>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal stagger={80}>
                <h1 className="t-display-md max-w-[16ch] text-[var(--color-text-primary)]">
                  {svc.title}
                </h1>
              </Reveal>
              <Reveal stagger={160}>
                <p className="t-body-lg mt-6 max-w-[52ch] text-[var(--color-text-muted)]">
                  {svc.lede}
                </p>
              </Reveal>
              <Reveal stagger={190}>
                <p className="t-eyebrow mt-6 text-[var(--color-text-muted)]">
                  Last updated {LAST_UPDATED_DISPLAY}
                </p>
              </Reveal>
            </div>
            <Reveal stagger={220} className="md:col-span-5">
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={svc.image}
                  alt={`${svc.title} example floor`}
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </header>

      <section className="border-y border-[var(--hairline)] bg-[var(--color-paper)] py-8">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start">
              <div className="md:col-span-4">
                <p className="t-eyebrow text-[var(--color-text-muted)]">Direct answer</p>
                <h2 className="t-headline mt-3 text-[var(--color-text-primary)]">
                  What is {svc.title.toLowerCase()}?
                </h2>
              </div>
              <p className="t-body-lg text-[var(--color-text-primary)] md:col-span-8">
                {answerObject ?? svc.lede}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section-pad-tight bg-[var(--color-paper)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">System</p>
                <h2 className="t-display-sm mt-4 max-w-[10ch] text-[var(--color-text-primary)]">
                  What it is.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal>
                <p className="t-subhead max-w-[58ch] text-[var(--color-text-primary)]">
                  {svc.whatItIs}
                </p>
              </Reveal>
              <Reveal stagger={80}>
                <p className="t-body-lg mt-6 max-w-[52ch] text-[var(--color-text-muted)]">
                  {svc.outcome}
                </p>
              </Reveal>

              <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--hairline)] md:grid-cols-2">
                <Reveal>
                  <div className="h-full bg-[var(--color-paper)] p-6">
                    <p className="t-eyebrow text-[var(--color-text-muted)]">Best for</p>
                    <ul className="mt-5 space-y-3">
                      {svc.bestFor.map((item) => (
                        <li key={item} className="t-subhead text-[var(--color-text-primary)]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal stagger={80}>
                  <div className="h-full bg-[var(--color-paper)] p-6">
                    <p className="t-eyebrow text-[var(--color-text-muted)]">Typical price</p>
                    <p className="t-display-sm mt-5 text-[var(--color-text-primary)]">
                      {svc.priceRange}
                    </p>
                    <p className="t-caption mt-3 text-[var(--color-text-muted)]">
                      Final quote depends on access, slab condition, repairs,
                      exposure, coating specification, and program.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad-tight bg-[var(--color-bone)]">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Process</p>
                <h2 className="t-display-sm mt-4 max-w-[12ch] text-[var(--color-text-primary)]">
                  A finish is built in sequence.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <ol className="divide-y divide-[var(--hairline)]">
                {svc.process.map((step, i) => (
                  <Reveal as="li" key={step} stagger={i * 60}>
                    <div className="grid grid-cols-[48px_1fr] gap-5 py-5">
                      <span className="t-mono pt-1 text-[11px] text-[var(--color-text-muted)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="t-subhead text-[var(--color-text-primary)]">{step}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad-tight bg-[var(--color-paper)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Specification</p>
                <h2 className="t-display-sm mt-4 max-w-[13ch] text-[var(--color-text-primary)]">
                  Decisions to lock in before work starts.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ul className="mt-8 grid gap-px bg-[var(--hairline)]">
                {svc.options.map((option, i) => (
                  <Reveal as="li" key={option} stagger={i * 60}>
                    <p className="t-subhead bg-[var(--color-paper)] p-5 text-[var(--color-text-primary)]">
                      {option}
                    </p>
                  </Reveal>
                ))}
              </ul>
              <Reveal stagger={240}>
                <div className="mt-8 border-t border-[var(--hairline)] pt-6">
                  <p className="t-eyebrow text-[var(--color-text-muted)]">Care note</p>
                  <p className="t-body mt-3 max-w-[56ch] text-[var(--color-text-muted)]">
                    {svc.care}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {slug === "epoxy" && <EpoxyColourSection />}
      {slug === "polished" && <PolishedFinishSection />}

      <section className="section-pad-tight bg-[var(--color-ink)] text-[var(--color-text-inverse)]">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
            <Reveal className="md:col-span-8">
              <p className="t-eyebrow text-[var(--color-text-inverse)]/55">Site inspection</p>
              <h2 className="t-display-sm mt-4 max-w-[18ch] text-[var(--color-text-inverse)]">
                Confirm whether {svc.title.toLowerCase()} is right for your slab.
              </h2>
            </Reveal>
            <Reveal stagger={120} className="md:col-span-4 md:text-right">
              <LinkButton href="/contact#quote" variant="accent">
                Request Quote
              </LinkButton>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

function PolishedFinishSection() {
  return (
    <section className="section-pad-tight bg-[var(--color-bone)]">
      <Container>
        <Reveal>
          <header className="max-w-[760px] border-t border-[var(--hairline-strong)] pt-5">
            <h2 className="t-headline text-[var(--color-text-primary)]">
              Popular polished concrete exposure levels
            </h2>
            <p className="t-body-sm mt-3 text-[var(--color-text-muted)]">
              Exposure changes the amount of stone visible in the finished floor.
              The correct cut depends on the slab, aggregate, design intent and
              tolerance for natural variation.
            </p>
          </header>
        </Reveal>
        <SampleGrid items={POLISHED_CONCRETE_IMAGES} altSuffix="polished concrete finish sample" />
      </Container>
    </section>
  );
}

function EpoxyColourSection() {
  return (
    <section className="section-pad-tight bg-[var(--color-bone)]">
      <Container>
        <Reveal>
          <header className="max-w-[760px] border-t border-[var(--hairline-strong)] pt-5">
            <h2 className="t-headline text-[var(--color-text-primary)]">
              Popular epoxy flake colours in the Ultra Flake range
            </h2>
            <p className="t-body-sm mt-3 text-[var(--color-text-muted)]">
              Below are popular flake blends commonly chosen for Perth workshops,
              warehouses, amenities and plant rooms. Colours may vary slightly on screens
              - we help confirm your choice during the site visit.
            </p>
          </header>
        </Reveal>
        <SampleGrid items={ULTRA_FLAKE_IMAGES} altSuffix="epoxy flake colour sample" />

        <Reveal stagger={120}>
          <header className="mt-10 max-w-[920px] border-t border-[var(--hairline-strong)] pt-5">
            <h3 className="t-headline text-[var(--color-text-primary)]">
              Hyper Flake Range (Premium Blend)
            </h3>
            <p className="t-body-sm mt-3 text-[var(--color-text-muted)]">
              Our Hyper Flake blends offer a denser mix and stronger contrast
              for extra depth and a more premium finish - ideal for feature
              showrooms, workshops and commercial spaces.
            </p>
          </header>
        </Reveal>
        <SampleGrid items={HYPER_FLAKE_IMAGES} altSuffix="premium epoxy flake colour sample" />
      </Container>
    </section>
  );
}

function SampleGrid({
  items,
  altSuffix,
}: {
  items: readonly (readonly [string, string])[];
  altSuffix: string;
}) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {items.map(([name, src], i) => (
        <Reveal key={name} stagger={i * 20}>
          <figure className="overflow-hidden border border-[var(--hairline)] bg-[var(--color-paper)] transition-colors hover:border-[var(--color-pcc-green)]">
            <div className="relative aspect-square">
              <Image
                src={src}
                alt={`${name} ${altSuffix}`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="px-3 py-2 text-[12px] font-bold leading-tight text-[var(--color-text-primary)]">
              {name}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
