import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const primaryPrices = [
  ["Ultra Flake epoxy", "$75 - $85", "Workshops, amenities, plant rooms and service areas"],
  ["Hyper Flake epoxy", "$90 - $100", "Premium blend for showrooms, retail and commercial spaces"],
  ["Grind and seal", "$65 - $95", "Working floors, warehouses and back-of-house"],
  ["Honed concrete", "$120 - $160", "Low-glare hospitality, entries and commercial courtyards"],
  ["Mechanical polish", "$160 - $220", "Showrooms, retail, hospitality and offices"],
] as const;

const quoteFactors = [
  ["Exposure", "Cream, salt and pepper, medium or full aggregate"],
  ["Smoothness", "Basic grind, honed, 400, 800, 1500 or 3000 grit"],
  ["Slab condition", "Prep, levelling, cracks, patching and coating history"],
  ["Site logistics", "Access, power, dust removal, travel and program pressure"],
] as const;

export function Pricing() {
  return (
    <section id="pricing" className="section-pad-tight bg-[var(--color-paper)]" aria-labelledby="pricing-heading">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="t-eyebrow text-[var(--color-text-muted)]">08 / Price guide</p>
            </Reveal>
            <Reveal stagger={80}>
              <h2 id="pricing-heading" className="mt-4 max-w-[13ch] text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.05] text-[var(--color-text-primary)]">
                Clear ranges. Fixed scope after inspection.
              </h2>
            </Reveal>
          </div>
          <Reveal stagger={140} className="md:col-span-6 md:col-start-7 md:pt-8">
            <p className="t-body text-[var(--color-text-muted)]">
              Use these as planning numbers. The final quote confirms the
              system, finish level, slab preparation, exclusions, GST treatment
              and timing after we inspect the floor.
            </p>
            <p className="t-eyebrow mt-4 text-[var(--color-text-primary)]">
              Indicative / site inspected / GST confirmed in quote
            </p>
          </Reveal>
        </div>

        <Reveal stagger={200}>
          <div className="mt-10 border-y border-[var(--hairline-strong)]">
            <div className="hidden grid-cols-[48px_minmax(220px,1fr)_180px_minmax(260px,1fr)] gap-4 border-b border-[var(--hairline)] py-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-text-muted)] lg:grid">
              <span />
              <span>System</span>
              <span>Guide range</span>
              <span>Best for</span>
            </div>
            {primaryPrices.map(([label, range, bestFor], i) => (
              <div
                key={label}
                className="grid gap-4 border-b border-[var(--hairline)] py-5 last:border-b-0 lg:grid-cols-[48px_minmax(220px,1fr)_180px_minmax(260px,1fr)] lg:items-center"
              >
                <p className="t-mono text-[11px] text-[var(--color-text-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-[clamp(20px,1.6vw,28px)] font-extrabold leading-tight text-[var(--color-text-primary)]">
                  {label}
                </h3>
                <p className="text-[clamp(24px,2vw,34px)] font-extrabold leading-none text-[var(--color-text-primary)]">
                  {range}
                  <span className="ml-2 align-middle text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    / m2
                  </span>
                </p>
                <p className="t-body-sm text-[var(--color-text-muted)]">{bestFor}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal stagger={260}>
          <div className="mt-8 grid grid-cols-1 gap-px bg-[var(--hairline)] md:grid-cols-4">
            {quoteFactors.map(([title, copy]) => (
              <div key={title} className="bg-[var(--color-paper)] p-5">
                <p className="text-[14px] font-extrabold text-[var(--color-text-primary)]">{title}</p>
                <p className="t-body-sm mt-3 text-[var(--color-text-muted)]">{copy}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal stagger={320}>
          <div className="mt-8 flex flex-col justify-between gap-5 border-t border-[var(--hairline)] pt-6 md:flex-row md:items-center">
            <p className="t-caption max-w-[58ch] text-[var(--color-text-muted)]">
              Pricing is indicative and subject to site inspection. We quote the
              actual floor, not a generic package.
            </p>
            <LinkButton href="/contact#quote" variant="primary">
              Request Quote
            </LinkButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
