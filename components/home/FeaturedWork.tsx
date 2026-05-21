import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FLOOR_IMAGES } from "@/lib/images";

const projects: Array<{
  slug: string;
  title: string;
  sector: string;
  location: string;
  finish: string;
  metric: string;
  image: string;
}> = [
  {
    slug: "cottesloe-residence",
    title: "Cottesloe Residence",
    sector: "Residential",
    location: "Cottesloe",
    finish: "Salt and pepper mechanical polish",
    metric: "180 m2",
    image: FLOOR_IMAGES.workCottesloe,
  },
  {
    slug: "osborne-park-showroom",
    title: "Osborne Park Showroom",
    sector: "Commercial",
    location: "Osborne Park",
    finish: "Medium exposure polish",
    metric: "Satin guard",
    image: FLOOR_IMAGES.workOsbornePark,
  },
  {
    slug: "kewdale-warehouse",
    title: "Kewdale Warehouse",
    sector: "Industrial",
    location: "Kewdale",
    finish: "Grind and seal system",
    metric: "Forklift traffic",
    image: FLOOR_IMAGES.workKewdale,
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="section-pad bg-[var(--color-ink)] text-[var(--color-text-inverse)]" aria-labelledby="work-heading">
      <Container width="full">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-inverse)]/56">02 / Selected floors</p>
              </Reveal>
              <Reveal stagger={80}>
                <h2 id="work-heading" className="t-display-sm mt-4 max-w-[13ch] text-[var(--color-text-inverse)]">
                  Quiet finishes. Hard numbers.
                </h2>
              </Reveal>
            </div>
            <Reveal stagger={160} className="md:col-span-4 md:col-start-9 md:pt-8">
              <p className="t-body text-[var(--color-text-inverse)]/68">
                A more useful portfolio than mood shots: sector, surface system,
                constraints, and the outcome each floor had to support.
              </p>
              <Link href="/work" className="t-caption link-underline mt-6 text-[var(--color-text-inverse)]">
                View all work
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 border border-[var(--hairline-dark)] md:grid-cols-12">
            <Reveal className="border-b border-[var(--hairline-dark)] md:col-span-7 md:border-b-0 md:border-r">
              <Project project={projects[0]} index="01" large />
            </Reveal>
            <div className="grid md:col-span-5">
              {projects.slice(1).map((project, i) => (
                <Reveal key={project.slug} stagger={(i + 1) * 90} className="border-b border-[var(--hairline-dark)] last:border-b-0">
                  <Project project={project} index={String(i + 2).padStart(2, "0")} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Project({
  project,
  index,
  large = false,
}: {
  project: (typeof projects)[number];
  index: string;
  large?: boolean;
}) {
  return (
    <Link href={`/work/${project.slug}`} className="group block h-full bg-[rgba(255,248,236,0.02)] p-4 transition-colors hover:bg-[rgba(255,248,236,0.07)] md:p-6">
      <figure>
        <div className="relative overflow-hidden bg-[var(--color-charcoal)]" style={{ aspectRatio: large ? "16/11" : "16/10" }}>
          <Image
            src={project.image}
            alt={`${project.title} concrete flooring project`}
            fill
            sizes={large ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
            className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-default)] group-hover:scale-[1.02]"
          />
        </div>
        <figcaption className="mt-3 flex items-center justify-between gap-4 text-[var(--color-text-inverse)]/56">
          <span className="t-eyebrow">{project.sector} / {project.location}</span>
          <span className="t-mono text-[11px]">{index}</span>
        </figcaption>
      </figure>
      <div className="mt-5 grid gap-5 border-t border-[var(--hairline-dark)] pt-4 md:grid-cols-[1fr_auto]">
        <div>
          <h3 className="t-headline text-[var(--color-text-inverse)]">{project.title}</h3>
          <p className="t-caption mt-2 text-[var(--color-text-inverse)]/60">{project.finish}</p>
        </div>
        <div className="flex items-center justify-between gap-4 md:block md:text-right">
          <p className="t-eyebrow text-[var(--color-text-inverse)]/42">Constraint</p>
          <p className="t-caption mt-1 text-[var(--color-text-inverse)]">{project.metric}</p>
        </div>
      </div>
    </Link>
  );
}
