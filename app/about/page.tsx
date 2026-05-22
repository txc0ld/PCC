import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FLOOR_IMAGES } from "@/lib/images";

export const metadata = { title: "About" };

const principles = [
  {
    title: "Assess the slab before promising the finish",
    copy: "Hardness, cracking, coating history, moisture, aggregate, and access all change the correct flooring system.",
  },
  {
    title: "Use the right tooling sequence, not shortcuts",
    copy: "A premium concrete finish is the result of preparation, progressive refinement, and patient edge work.",
  },
  {
    title: "Protect the surrounding build as carefully as the floor",
    copy: "Dust control, masking, sequencing, and clean handover matter on occupied homes and commercial sites.",
  },
  {
    title: "Leave clients with clear maintenance guidance",
    copy: "Every finish is handed over with cleaning advice, cure notes, and realistic refresh intervals.",
  },
];

const capabilities = [
  ["Residential", "Polished and honed concrete for renovations, new builds, and architectural interiors."],
  ["Commercial", "Showrooms, cafes, retail, galleries, and public-facing floors with clear maintenance needs."],
  ["Industrial", "Grind and seal, epoxy, traffic coatings, and staged work for operational sites."],
];

const suburbs = [
  "Perth CBD",
  "Fremantle",
  "Cottesloe",
  "Claremont",
  "Subiaco",
  "Mount Lawley",
  "Osborne Park",
  "Joondalup",
  "Mandurah",
  "Rockingham",
  "Midland",
  "Welshpool",
  "Canning Vale",
  "Kewdale",
  "Victoria Park",
  "Scarborough",
];

export default function AboutPage() {
  return (
    <>
      <header className="bg-[var(--color-cream)] pb-14 pt-[calc(var(--nav-h)+72px)] md:pb-20 md:pt-[calc(var(--nav-h)+112px)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">About</p>
              </Reveal>
              <Reveal stagger={80}>
                <h1 className="t-display-md mt-4 max-w-[18ch] text-[var(--color-text-primary)]">
                  Technical concrete flooring with a calm, craft-led finish.
                </h1>
              </Reveal>
            </div>
            <Reveal stagger={160} className="md:col-span-4">
              <p className="t-body-lg max-w-[34ch] text-[var(--color-text-muted)] md:ml-auto">
                Perth Concrete Care works across residential, commercial, and
                industrial projects where the floor needs to be durable,
                specific, and resolved before handover.
              </p>
            </Reveal>
          </div>
        </Container>
      </header>

      <section className="section-pad-tight bg-[var(--color-paper)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <Image
                src={FLOOR_IMAGES.saltPepper}
                alt="Salt and pepper polished concrete finish sample"
                width={1200}
                height={800}
                sizes="(min-width: 768px) 42vw, 100vw"
                className="h-auto w-full"
              />
            </Reveal>
            <div className="md:col-span-7">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">How we work</p>
                <h2 className="t-display-sm mt-4 max-w-[13ch] text-[var(--color-text-primary)]">
                  Practical judgement before polish.
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-px bg-[var(--hairline)]">
                {principles.map((principle, i) => (
                  <Reveal key={principle.title} stagger={i * 70}>
                    <div className="grid gap-4 bg-[var(--color-paper)] p-5 sm:grid-cols-[48px_1fr]">
                      <span className="t-mono text-[11px] text-[var(--color-text-muted)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="t-subhead text-[var(--color-text-primary)]">{principle.title}</p>
                        <p className="t-body-sm mt-2 text-[var(--color-text-muted)]">{principle.copy}</p>
                      </div>
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
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Capability</p>
                <h2 className="t-display-sm mt-4 max-w-[12ch] text-[var(--color-text-primary)]">
                  Built around use, not fashion.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <div className="divide-y divide-[var(--hairline)]">
                {capabilities.map(([label, copy], i) => (
                  <Reveal key={label} stagger={i * 70}>
                    <div className="grid gap-4 py-6 sm:grid-cols-[180px_1fr]">
                      <p className="t-subhead text-[var(--color-text-primary)]">{label}</p>
                      <p className="t-body text-[var(--color-text-muted)]">{copy}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad-tight bg-[var(--color-ink)] text-[var(--color-text-inverse)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-inverse)]/55">Service area</p>
                <h2 className="t-display-sm mt-4 max-w-[16ch] text-[var(--color-text-inverse)]">
                  Perth metro and surrounding suburbs.
                </h2>
              </Reveal>
              <Reveal stagger={120}>
                <p className="t-body mt-6 max-w-[36ch] text-[var(--color-text-inverse)]/70">
                  Regional work is considered by arrangement when the program,
                  scale, and finish specification are a fit.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
                {suburbs.map((suburb, i) => (
                  <Reveal as="li" key={suburb} stagger={(i % 4) * 40}>
                    <span className="t-body block text-[var(--color-text-inverse)]/78">
                      {suburb}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
          <Reveal stagger={160}>
            <div className="mt-12 border-t border-[var(--hairline-dark)] pt-8">
              <LinkButton href="/contact#quote" variant="accent">
                Request Quote
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
