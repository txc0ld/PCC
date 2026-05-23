import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WORK_EXAMPLE_IMAGES } from "@/lib/images";

const featuredExamples = WORK_EXAMPLE_IMAGES.slice(0, 8);

export function Gallery() {
  return (
    <section id="gallery" className="section-pad bg-[var(--color-bone)]" aria-labelledby="gallery-heading">
      <Container width="full">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <p className="t-eyebrow text-[var(--color-text-muted)]">05 / Gallery</p>
          </Reveal>

          <Reveal stagger={80}>
            <header className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
              <h2 id="gallery-heading" className="t-display-sm max-w-[14ch] text-[var(--color-text-primary)] md:col-span-5">
                Project evidence, not stock flooring.
              </h2>
              <p className="t-body max-w-[58ch] text-[var(--color-text-muted)] md:col-span-6 md:col-start-7">
                Recent polished concrete, honed concrete, grind and seal, and
                epoxy coating examples from Perth commercial and industrial spaces.
              </p>
            </header>
          </Reveal>

          <WorkGrid items={featuredExamples} className="mt-10" />
        </div>
      </Container>
    </section>
  );
}

function WorkGrid({
  items,
  className,
}: {
  items: readonly (readonly [string, string])[];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4 md:gap-6">
        {items.map(([name, src], i) => (
          <Reveal
            key={name}
            stagger={i * 30}
            className={i === 0 || i === 5 ? "md:col-span-2" : ""}
          >
            <figure className="group">
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
                <Image
                  src={src}
                  alt={`${name} commercial flooring by Perth Commercial Flooring`}
                  fill
                  sizes={i === 0 || i === 5 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
                  className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-default)] group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3 border-t border-[var(--hairline)] pt-3 text-[12px] font-bold leading-tight text-[var(--color-text-primary)]">
                {name}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
