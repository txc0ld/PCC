"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn, PHONE_DISPLAY, PHONE_HREF } from "@/lib/utils";

const faqs = [
  {
    q: "What commercial flooring systems do you install in Perth?",
    a: "We install commercial polished concrete, grind and seal, honed concrete, epoxy coatings, flake systems, polyaspartic top coats, and concrete surface preparation for warehouses, showrooms, hospitality venues, retail spaces, workshops, commercial kitchens, and plant rooms.",
  },
  {
    q: "What is best for a warehouse floor?",
    a: "Most warehouse floors suit grind and seal or epoxy coating depending on traffic, cleaning, chemical exposure, downtime, and whether line marking is required. We inspect slab hardness, contamination, cracks, joints, and coating history before specifying the system.",
  },
  {
    q: "What is best for a showroom or retail floor?",
    a: "Showrooms and retail floors often suit mechanical polished concrete because it provides light return, long service life, and a premium architectural finish. Where stain resistance, colour, or faster return-to-service matter more, epoxy or polyaspartic systems may be better.",
  },
  {
    q: "How long does a commercial floor take?",
    a: "Small commercial floors can often be completed in a few days. Larger warehouses, staged tenancies, food preparation areas, or high-build epoxy systems may need a longer program because of preparation, repairs, cure windows, and business access requirements.",
  },
  {
    q: "How much do commercial concrete floors cost in Perth?",
    a: "As a planning guide, grind and seal is usually $65 to $95 per m2, epoxy flake systems are typically $75 to $100 per m2, honed concrete is $120 to $160 per m2, and mechanical polished concrete is about $160 to $220 per m2. Final pricing follows site inspection.",
  },
  {
    q: "Can you work after hours or around business operations?",
    a: "Yes. We can stage commercial flooring works around operating hours, handover dates, tenancy fitouts, stock movement, and access windows. The quote confirms dust control, cure time, exclusion zones, and return-to-service assumptions.",
  },
  {
    q: "Do epoxy floors suit commercial kitchens and plant rooms?",
    a: "Yes, provided the correct preparation, primer, body coat, slip profile, and top coat are specified. Commercial kitchens, plant rooms, and wash-down areas need close attention to moisture, drainage, chemical exposure, cleaning method, and cure timing.",
  },
  {
    q: "Where do you work?",
    a: "Our core area is Perth metro and surrounding commercial and industrial suburbs, including Osborne Park, Kewdale, Welshpool, Malaga, Canning Vale, Wangara, Bibra Lake, Henderson, Midland, Subiaco, Fremantle, Joondalup, Rockingham, and Mandurah.",
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
              <p className="t-eyebrow text-[var(--color-text-muted)]">09 / Commercial FAQ</p>
            </Reveal>
            <Reveal stagger={80}>
              <h2 id="faq-heading" className="t-display-sm mt-4 text-[var(--color-text-primary)]">
                Questions to settle before the floor shuts down a site.
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
