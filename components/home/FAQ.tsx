"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn, PHONE_DISPLAY, PHONE_HREF } from "@/lib/utils";

const faqs = [
  {
    q: "Can every concrete slab be polished?",
    a: "Most slabs can be improved, but not every slab should be polished to the same finish. We assess hardness, moisture, cracks, previous coatings, aggregate depth, and edge conditions before recommending a system.",
  },
  {
    q: "What is the difference between polished concrete and grind and seal?",
    a: "Mechanical polish refines and hardens the concrete itself. Grind and seal flattens the slab and protects it with a coating. Both can be useful, but they age and maintain differently.",
  },
  {
    q: "How long does a typical residential floor take?",
    a: "A 150 to 250 m² home usually takes around one to two weeks depending on exposure, repairs, edges, coating cure windows, and access around other trades.",
  },
  {
    q: "How much does polished concrete cost in Perth?",
    a: "As a planning guide, mechanical polished concrete is about $160 to $220 per m², honed concrete is $120 to $160 per m², grind and seal is $65 to $95 per m², and epoxy flake systems start from $75 to $100 per m². Final pricing follows site inspection.",
  },
  {
    q: "Does Perth Concrete Care provide epoxy flooring?",
    a: "Yes. We provide epoxy and polyaspartic coating systems for Perth garages, workshops, commercial kitchens, plant rooms, marked work zones, and other working floors that need cleanability, chemical resistance, slip awareness, or fast return to use.",
  },
  {
    q: "Do you work on new builds and existing homes?",
    a: "Yes. New builds allow better planning and protection. Existing homes need careful dust control, protection, and sequencing. We scope both before pricing.",
  },
  {
    q: "Is polished concrete slippery?",
    a: "Dry polished concrete has a comparable feel to many hard flooring surfaces. Wet areas, external zones, and commercial spaces may require honed finishes, additives, or specified slip ratings.",
  },
  {
    q: "Where do you work?",
    a: "Our core area is Perth metro and roughly 100 km from the CBD, including Fremantle, Joondalup, Midland, Rockingham, Mandurah, Welshpool, and surrounding suburbs.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-pad-tight bg-[var(--color-bone)]"
      aria-labelledby="faq-heading"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <p className="t-eyebrow text-[var(--color-text-muted)]">09 / FAQ</p>
            </Reveal>
            <Reveal stagger={80}>
              <h2 id="faq-heading" className="t-display-sm mt-4 text-[var(--color-text-primary)]">
                Questions worth asking before work starts.
              </h2>
            </Reveal>
            <Reveal stagger={160}>
              <p className="t-caption mt-6 max-w-[34ch] text-[var(--color-text-muted)]">
                Need a direct answer? Call{" "}
                <a href={PHONE_HREF} className="link-underline text-[var(--color-text-primary)]">
                  {PHONE_DISPLAY}
                </a>
                .
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <ul className="border-t border-[var(--hairline)]">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <li key={faq.q} className="border-b border-[var(--hairline)]">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="flex gap-4">
                        <span className="t-mono mt-[6px] shrink-0 text-[11px] text-[var(--color-text-muted)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="t-subhead text-[var(--color-text-primary)]">
                          {faq.q}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "relative mt-[10px] h-3 w-3 shrink-0 transition-transform duration-300",
                          isOpen && "rotate-45"
                        )}
                      >
                        <span className="absolute left-1/2 top-1/2 block h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-current" />
                        <span className="absolute left-1/2 top-1/2 block h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
                      </span>
                    </button>
                    <div
                      className="grid overflow-hidden transition-all duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                    >
                      <div className="min-h-0">
                        <p className="t-body max-w-[62ch] pb-6 pl-[calc(11px+16px)] pr-8 text-[var(--color-text-muted)]">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
