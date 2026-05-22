import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FLOOR_IMAGES } from "@/lib/images";

type Project = {
  title: string;
  category: string;
  year: string;
  area: string;
  location: string;
  finish: string;
  image: string;
  summary: string;
  brief: string;
  scope: string[];
  details: Array<[string, string]>;
  result: string;
};

const projects: Record<string, Project> = {
  "cottesloe-residence": {
    title: "Cottesloe Residence",
    category: "Residential",
    year: "2025",
    area: "240 m²",
    location: "Cottesloe",
    finish: "Satin polished concrete",
    image: FLOOR_IMAGES.workCottesloe,
    summary: "A calm internal polish for a coastal home where glare control and edge detailing mattered as much as sheen.",
    brief: "The client wanted a continuous ground-floor surface that felt refined without becoming glossy or slippery in bright western light.",
    scope: ["Aggregate exposure sample before full grind", "Satin mechanical polish through living areas", "Edge refinement around joinery and thresholds", "Final guard and maintenance handover"],
    details: [["Use", "Open-plan residential"], ["Constraint", "High natural light"], ["Finish", "Satin polish"], ["Program", "Staged around joinery"]],
    result: "A quiet, light-responsive floor that gives the home a single material base without fighting the coastal palette.",
  },
  "osborne-park-showroom": {
    title: "Osborne Park Showroom",
    category: "Commercial",
    year: "2024",
    area: "620 m²",
    location: "Osborne Park",
    finish: "Full exposure polish",
    image: FLOOR_IMAGES.workOsbornePark,
    summary: "A durable showroom floor designed to handle display changes, customer traffic, and strong overhead lighting.",
    brief: "The slab needed enough aggregate character to feel intentional while staying easy to clean and robust under rolling displays.",
    scope: ["Full exposure grind", "Joint cleaning and selected repair", "Densifier and progressive polish", "Low-maintenance guard for retail cleaning"],
    details: [["Use", "Retail showroom"], ["Constraint", "Display load and traffic"], ["Finish", "Full exposure polish"], ["Program", "After-hours stages"]],
    result: "The finished surface reads as part of the showroom fitout rather than a background trade finish.",
  },
  "kewdale-warehouse": {
    title: "Kewdale Warehouse",
    category: "Industrial",
    year: "2024",
    area: "1,850 m²",
    location: "Kewdale",
    finish: "Grind and seal",
    image: FLOOR_IMAGES.workKewdale,
    summary: "A practical working floor upgrade for better light, cleaner traffic paths, and easier daily maintenance.",
    brief: "The priority was return-to-service speed and a finish that would tolerate pallet movement, forklifts, and routine cleaning.",
    scope: ["Mechanical preparation and contamination checks", "Local crack and spall repairs", "Clear sealer system", "Cure planning for staged access"],
    details: [["Use", "Warehouse"], ["Constraint", "Operational downtime"], ["Finish", "Grind and seal"], ["Program", "Staged zones"]],
    result: "A cleaner, brighter slab with a clear maintenance cycle and minimal disruption to operations.",
  },
  "peppermint-grove-house": {
    title: "Peppermint Grove House",
    category: "Residential",
    year: "2024",
    area: "310 m²",
    location: "Peppermint Grove",
    finish: "Low-glare honed concrete",
    image: FLOOR_IMAGES.workPeppermintGrove,
    summary: "A low-glare honed finish selected for a restrained residential interior with natural stone and timber.",
    brief: "The floor needed material depth without a polished reflection, keeping the interior calm through large glazed openings.",
    scope: ["Controlled exposure grind", "Scratch refinement to low-glare finish", "Penetrating guard", "Cleaning and reseal advice"],
    details: [["Use", "Residential interior"], ["Constraint", "Low glare"], ["Finish", "Honed concrete"], ["Program", "Pre-handover"]],
    result: "A grounded concrete surface with texture and restraint, suited to daily family use.",
  },
  "north-perth-cafe": {
    title: "North Perth Cafe",
    category: "Hospitality",
    year: "2024",
    area: "140 m²",
    location: "North Perth",
    finish: "Honed and guarded",
    image: FLOOR_IMAGES.workNorthPerthCafe,
    summary: "A hospitality floor tuned for spill response, morning cleaning, and warm material character.",
    brief: "The cafe needed a finish that could handle chairs, coffee spills, and visible customer areas without feeling industrial.",
    scope: ["Existing slab assessment", "Hone to selected aggregate level", "Guard suited to hospitality cleaning", "Opening-week care instructions"],
    details: [["Use", "Cafe"], ["Constraint", "Food and drink spills"], ["Finish", "Honed and guarded"], ["Program", "Fitout sequence"]],
    result: "A durable, tactile surface that supports the fitout while keeping cleaning straightforward.",
  },
  "fremantle-loft": {
    title: "Fremantle Loft",
    category: "Residential",
    year: "2023",
    area: "180 m²",
    location: "Fremantle",
    finish: "Salt and pepper polish",
    image: FLOOR_IMAGES.workFremantleLoft,
    summary: "A compact residential polish using the slab's natural fleck rather than forcing heavy exposure.",
    brief: "The apartment needed a lighter finish with enough movement to sit comfortably against brick, steel, and old timber.",
    scope: ["Salt and pepper grind", "Densifier and satin polish", "Careful wall and stair edge work", "Final guard"],
    details: [["Use", "Apartment"], ["Constraint", "Existing slab variation"], ["Finish", "Salt and pepper polish"], ["Program", "Renovation"]],
    result: "A bright, efficient finish that works with the building's existing material character.",
  },
  "subiaco-gallery": {
    title: "Subiaco Gallery",
    category: "Commercial",
    year: "2023",
    area: "420 m²",
    location: "Subiaco",
    finish: "Matte polished concrete",
    image: FLOOR_IMAGES.workSubiacoGallery,
    summary: "A matte commercial polish that lets artwork and objects take priority while improving durability.",
    brief: "The floor had to feel refined but visually quiet, with minimal glare under gallery lighting.",
    scope: ["Light exposure grind", "Matte polishing sequence", "Crack review and selective repair", "Guard and cleaning protocol"],
    details: [["Use", "Gallery"], ["Constraint", "Low visual noise"], ["Finish", "Matte polish"], ["Program", "Between exhibitions"]],
    result: "A stable, understated floor that supports the room rather than competing with the work on display.",
  },
  "midland-warehouse": {
    title: "Midland Warehouse",
    category: "Industrial",
    year: "2023",
    area: "2,400 m²",
    location: "Midland",
    finish: "Epoxy traffic coating",
    image: FLOOR_IMAGES.workMidlandWarehouse,
    summary: "A resin traffic coating for clearer circulation, easier cleaning, and heavier warehouse use.",
    brief: "The site needed a stronger coating system with clear zones and a maintenance plan suited to vehicle movement.",
    scope: ["Mechanical preparation", "Primer and epoxy body coat", "Slip-aware top coat", "Traffic zone marking"],
    details: [["Use", "Warehouse"], ["Constraint", "Vehicle movement"], ["Finish", "Epoxy coating"], ["Program", "Weekend possession"]],
    result: "A more legible working floor with clear traffic paths and a coating system matched to use.",
  },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects[slug];
  return { title: project ? project.title : "Project" };
}

export default async function ProjectDetail(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = projects[slug];
  if (!project) notFound();

  return (
    <>
      <header className="bg-[var(--color-cream)] pb-14 pt-[calc(var(--nav-h)+72px)] md:pb-20 md:pt-[calc(var(--nav-h)+112px)]">
        <Container>
          <Reveal>
            <Link href="/work" className="link-underline t-caption text-[var(--color-text-primary)]">
              Back to work
            </Link>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Reveal stagger={80}>
                <p className="t-eyebrow text-[var(--color-text-muted)]">
                  {project.category} / {project.location} / {project.year}
                </p>
              </Reveal>
              <Reveal stagger={140}>
                <h1 className="t-display-md mt-4 max-w-[18ch] text-[var(--color-text-primary)]">
                  {project.title}
                </h1>
              </Reveal>
              <Reveal stagger={200}>
                <p className="t-body-lg mt-6 max-w-[50ch] text-[var(--color-text-muted)]">
                  {project.summary}
                </p>
              </Reveal>
            </div>
            <Reveal stagger={260} className="md:col-span-4 md:text-right">
              <div className="grid gap-px bg-[var(--hairline)] sm:grid-cols-3 md:grid-cols-1">
                {[
                  ["Area", project.area],
                  ["Finish", project.finish],
                  ["Location", project.location],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[var(--color-cream)] p-4">
                    <p className="t-eyebrow text-[var(--color-text-muted)]">{label}</p>
                    <p className="t-caption mt-3 text-[var(--color-text-primary)]">{value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal stagger={320} className="mt-10">
            <Image
              src={project.image}
              alt={`${project.title} concrete flooring project`}
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 1248px, 100vw"
              className="block h-auto w-full"
              priority
            />
          </Reveal>
        </Container>
      </header>

      <section className="section-pad-tight bg-[var(--color-paper)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Brief</p>
                <h2 className="t-display-sm mt-4 max-w-[11ch] text-[var(--color-text-primary)]">
                  What the floor needed to do.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal>
                <p className="t-subhead max-w-[58ch] text-[var(--color-text-primary)]">
                  {project.brief}
                </p>
              </Reveal>

              <div className="mt-12 grid gap-px bg-[var(--hairline)] sm:grid-cols-2">
                {project.details.map(([label, value], i) => (
                  <Reveal key={label} stagger={i * 60}>
                    <div className="bg-[var(--color-paper)] p-5">
                      <p className="t-eyebrow text-[var(--color-text-muted)]">{label}</p>
                      <p className="t-subhead mt-4 text-[var(--color-text-primary)]">{value}</p>
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
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Scope</p>
                <h2 className="t-display-sm mt-4 max-w-[13ch] text-[var(--color-text-primary)]">
                  The work behind the finish.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ol className="mt-8 divide-y divide-[var(--hairline)]">
                {project.scope.map((item, i) => (
                  <Reveal as="li" key={item} stagger={i * 60}>
                    <div className="grid grid-cols-[48px_1fr] gap-5 py-5">
                      <span className="t-mono pt-1 text-[11px] text-[var(--color-text-muted)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="t-subhead text-[var(--color-text-primary)]">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad-tight bg-[var(--color-paper)]">
        <Container width="medium">
          <Reveal>
            <p className="t-eyebrow text-[var(--color-text-muted)]">Result</p>
            <p className="t-display-sm mt-4 text-[var(--color-text-primary)]">
              {project.result}
            </p>
          </Reveal>
          <Reveal stagger={120}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <LinkButton href="/contact#quote" variant="primary">
                Request Quote for Similar Work
              </LinkButton>
              <LinkButton href="/work" variant="ghost">
                View more work
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
