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
  title: "Commercial Flooring Projects Perth",
  description:
    "View Perth commercial flooring project examples across showrooms, warehouses, hospitality venues, galleries, workshops, grind and seal, polished concrete, and epoxy systems.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Commercial Flooring Projects Perth",
    description:
      "Project examples from Perth Commercial Flooring across commercial, hospitality, showroom, and industrial floors.",
    url: absoluteUrl("/work"),
    images: [{ url: FLOOR_IMAGES.workOsbornePark, width: 1536, height: 1024, alt: "Osborne Park commercial polished concrete showroom" }],
  },
};

const projects: Array<{
  slug: string;
  title: string;
  cat: string;
  year: string;
  area: string;
  finish: string;
  suburb: string;
  image: string;
}> = [
  { slug: "osborne-park-showroom", title: "Osborne Park Showroom", cat: "Commercial", year: "2024", area: "620 m2", finish: "Full exposure polish", suburb: "Osborne Park", image: FLOOR_IMAGES.workOsbornePark },
  { slug: "kewdale-warehouse", title: "Kewdale Warehouse", cat: "Industrial", year: "2024", area: "1,850 m2", finish: "Grind and seal", suburb: "Kewdale", image: FLOOR_IMAGES.workKewdale },
  { slug: "north-perth-cafe", title: "North Perth Cafe", cat: "Hospitality", year: "2024", area: "140 m2", finish: "Honed and guarded", suburb: "North Perth", image: FLOOR_IMAGES.workNorthPerthCafe },
  { slug: "subiaco-gallery", title: "Subiaco Gallery", cat: "Commercial", year: "2023", area: "420 m2", finish: "Matte polished concrete", suburb: "Subiaco", image: FLOOR_IMAGES.workSubiacoGallery },
  { slug: "midland-warehouse", title: "Midland Warehouse", cat: "Industrial", year: "2023", area: "2,400 m2", finish: "Epoxy traffic coating", suburb: "Midland", image: FLOOR_IMAGES.workMidlandWarehouse },
];

const totals = [
  ["Commercial and hospitality", "3 sites"],
  ["Industrial", "2 floors"],
  ["Operational focus", "Staged access"],
];

export default function WorkIndex() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            path: "/work",
            name: "Commercial Flooring Projects Perth",
            description:
              "A project index of commercial polished concrete, honed concrete, grind and seal, and epoxy flooring work completed across Perth.",
            type: "CollectionPage",
            image: FLOOR_IMAGES.workOsbornePark,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
        ]}
      />
      <header className="bg-[var(--color-cream)] pb-14 pt-[calc(var(--nav-h)+72px)] md:pb-20 md:pt-[calc(var(--nav-h)+112px)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Work</p>
              </Reveal>
              <Reveal stagger={80}>
                <h1 className="t-display-md mt-4 max-w-[18ch] text-[var(--color-text-primary)]">
                  Finished floors across showrooms, hospitality, warehouses, and working sites.
                </h1>
              </Reveal>
            </div>
            <Reveal stagger={160} className="md:col-span-4">
              <p className="t-body-lg max-w-[34ch] text-[var(--color-text-muted)] md:ml-auto">
                A commercial project index focused on practical choices:
                finish, use, traffic, cleaning, downtime, and handover.
              </p>
            </Reveal>
          </div>
        </Container>
      </header>

      <section className="section-pad-tight bg-[var(--color-paper)]">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Index</p>
                <h2 className="t-display-sm mt-4 max-w-[12ch] text-[var(--color-text-primary)]">
                  Browse by project type.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <div className="grid gap-px bg-[var(--hairline)] sm:grid-cols-3">
                {totals.map(([label, value], i) => (
                  <Reveal key={label} stagger={i * 70}>
                    <div className="bg-[var(--color-paper)] p-5">
                      <p className="t-eyebrow text-[var(--color-text-muted)]">{label}</p>
                      <p className="t-headline mt-4 text-[var(--color-text-primary)]">{value}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad-tight bg-[var(--color-bone)]">
        <Container>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal as="li" key={project.slug} stagger={(i % 2) * 80}>
                <Link href={`/work/${project.slug}`} className="group block" aria-label={project.title}>
                  <figure>
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} commercial flooring project`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-default)] group-hover:scale-[1.02]"
                      />
                    </div>
                    <figcaption className="mt-3 flex items-center justify-between border-t border-[var(--hairline)] pt-3">
                      <span className="t-eyebrow text-[var(--color-text-muted)]">{project.cat}</span>
                      <span className="t-mono text-[11px] text-[var(--color-text-muted)]">
                        {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                      </span>
                    </figcaption>
                  </figure>
                  <div className="mt-5 grid gap-4 border-t border-[var(--hairline)] pt-4 sm:grid-cols-[1fr_auto]">
                    <div>
                      <p className="t-caption text-[var(--color-text-muted)]">
                        {project.suburb} / {project.year} / {project.area}
                      </p>
                      <h2 className="t-headline mt-2 text-[var(--color-text-primary)]">{project.title}</h2>
                    </div>
                    <div className="sm:max-w-[220px] sm:text-right">
                      <p className="t-body-sm text-[var(--color-text-muted)]">{project.finish}</p>
                      <span aria-hidden="true" className="t-caption mt-4 inline-flex items-center gap-2 text-[var(--color-text-primary)] transition-transform group-hover:translate-x-1">
                        View project <ButtonArrow />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-pad-tight bg-[var(--color-ink)] text-[var(--color-text-inverse)]">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
            <Reveal className="md:col-span-8">
              <p className="t-eyebrow text-[var(--color-text-inverse)]/55">Your site</p>
              <h2 className="t-display-sm mt-4 max-w-[18ch] text-[var(--color-text-inverse)]">
                Bring the slab condition, access, traffic, and downtime window. We will advise the system.
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
