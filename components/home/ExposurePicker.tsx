"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { FLOOR_IMAGES } from "@/lib/images";

const finishes: Array<{
  name: string;
  depth: string;
  image: string;
  copy: string;
}> = [
  { name: "Cream", depth: "Nil exposure", image: FLOOR_IMAGES.nilExposure, copy: "Soft and minimal. Best when the slab surface is consistent and a quieter finish is preferred." },
  { name: "Salt and pepper", depth: "Light exposure", image: FLOOR_IMAGES.saltPepper, copy: "Fine sand and small flecks. The most balanced residential polished concrete look." },
  { name: "Medium aggregate", depth: "3 to 5 mm", image: FLOOR_IMAGES.mediumExposure, copy: "More stone character with a strong architectural read across larger rooms." },
  { name: "Full aggregate", depth: "5 to 8 mm", image: FLOOR_IMAGES.fullStone, copy: "A terrazzo-like finish. Best planned before the pour when aggregate choice matters." },
];

export function ExposurePicker() {
  const [active, setActive] = useState(1);
  const finish = finishes[active];

  return (
    <section id="exposure" className="section-pad bg-[var(--color-paper)]" aria-labelledby="exposure-heading">
      <Container width="full">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 lg:grid-cols-[0.46fr_1fr]">
          <div>
            <Reveal>
              <p className="t-eyebrow text-[var(--color-text-muted)]">04 / Exposure selector</p>
            </Reveal>
            <Reveal stagger={80}>
              <h2 id="exposure-heading" className="t-display-sm mt-4 max-w-[12ch] text-[var(--color-text-primary)]">
                The cut decides the room.
              </h2>
            </Reveal>
            <Reveal stagger={160}>
              <p className="t-body mt-6 max-w-[42ch] text-[var(--color-text-muted)]">
                Use the exposure selector like a material sample: not every
                slab can produce every look, and the right answer is often the
                one that ages with least fuss.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 border border-[var(--hairline-strong)] bg-[var(--hairline)] lg:grid-cols-[1fr_280px]">
            <Reveal stagger={120}>
              <figure className="bg-[var(--color-paper)]">
                <div className="relative aspect-[4/3] min-h-[280px] overflow-hidden lg:aspect-square">
                  <Image
                    src={finish.image}
                    alt={`${finish.name} polished concrete finish`}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-[var(--hairline)] p-4">
                  <p className="t-eyebrow text-[var(--color-text-muted)]">{finish.depth}</p>
                  <h3 className="t-headline mt-2 text-[var(--color-text-primary)]">{finish.name}</h3>
                  <p className="t-body-sm mt-3 max-w-[52ch] text-[var(--color-text-muted)]">{finish.copy}</p>
                </figcaption>
              </figure>
            </Reveal>

            <div className="grid gap-px bg-[var(--hairline)]">
              {finishes.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    "min-h-20 bg-[var(--color-paper)] p-4 text-left transition-colors",
                    active === i && "bg-[var(--color-ink)] text-[var(--color-text-inverse)]"
                  )}
                >
                  <p className="text-[18px] font-extrabold leading-tight">{item.name}</p>
                  <p className={cn("t-eyebrow mt-2", active === i ? "text-[var(--color-text-inverse)]/55" : "text-[var(--color-text-muted)]")}>
                    {item.depth}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
