import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  ["Assess", "Moisture, hardness, coatings, aggregate depth, edges, access, and expectation gaps are checked before pricing."],
  ["Specify", "Exposure, gloss, guard, coating chemistry, slip needs, repairs, program, and maintenance pathway are selected."],
  ["Protect", "Walls, joinery, adjoining finishes, entries, and trade interfaces are protected before tooling starts."],
  ["Refine", "Diamond tooling, densifier, resin refinement, sealer, or epoxy coats are sequenced around cure windows."],
  ["Handover", "The floor is cleaned, inspected, documented, and handed over with maintenance advice that matches the system."],
  ["Maintain", "Cleaning method, cure limits, reseal timing, and future refresh cycles are made clear before the floor goes into service."],
];

export function Process() {
  return (
    <section id="process" className="section-pad bg-[var(--color-blueprint)]" aria-labelledby="process-heading">
      <Container width="full">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">03 / Method</p>
              </Reveal>
              <Reveal stagger={80}>
                <h2 id="process-heading" className="t-display-sm mt-4 text-[var(--color-text-primary)]">
                  A polished floor is an engineered sequence.
                </h2>
              </Reveal>
            </div>
            <Reveal stagger={160} className="md:col-span-5 md:col-start-8 md:pt-8">
              <p className="t-body text-[var(--color-text-muted)]">
                Most visible failures are process failures: wrong system,
                rushed cure windows, poor edge detail, or a finish that ignores
                the room's actual use.
              </p>
            </Reveal>
          </div>

          <ol className="mt-10 grid grid-cols-1 border border-[var(--hairline-strong)] md:grid-cols-3 xl:grid-cols-6">
            {steps.map(([title, detail], i) => (
              <Reveal
                key={title}
                as="li"
                stagger={i * 80}
                className="flex min-h-[240px] flex-col justify-between border-b border-[var(--hairline)] bg-[rgba(251,247,239,0.44)] p-5 last:border-b-0 md:border-r xl:border-b-0 xl:last:border-r-0"
              >
                <span className="t-mono text-[11px] text-[var(--color-text-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[clamp(24px,2.3vw,34px)] font-extrabold leading-none text-[var(--color-text-primary)]">
                    {title}
                  </h3>
                  <p className="t-body-sm mt-4 text-[var(--color-text-muted)]">
                    {detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
