import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const stories = [
  {
    quote: "They specified a lower-sheen polish that worked under strong showroom lighting and still felt premium.",
    name: "Anna Richardson",
    role: "Commercial designer, showroom fitout",
  },
  {
    quote: "The warehouse floor now cleans properly and the line marking has stayed sharp through forklift traffic.",
    name: "Mark Dutton",
    role: "Operations, Kewdale facility",
  },
  {
    quote: "A quiet site, clear program, and a finish that matched the approved sample.",
    name: "Joss Taylor",
    role: "Owner, Osborne Park showroom",
  },
];

export function Testimonials() {
  const [lead, ...rest] = stories;

  return (
    <section
      id="voices"
      className="section-pad-tight bg-[var(--color-cream)]"
      aria-labelledby="voices-heading"
    >
      <Container>
        <Reveal>
          <p className="t-eyebrow text-[var(--color-text-muted)]">07 / Client stories</p>
        </Reveal>
        <h2 id="voices-heading" className="sr-only">
          Client stories
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal stagger={80} className="md:col-span-7">
            <figure>
              <blockquote className="t-display-sm max-w-[17ch] text-[var(--color-text-primary)]">
                "{lead.quote}"
              </blockquote>
              <figcaption className="mt-8 border-t border-[var(--hairline)] pt-4">
                <p className="t-caption text-[var(--color-text-primary)]">{lead.name}</p>
                <p className="t-eyebrow mt-2 text-[var(--color-text-muted)]">{lead.role}</p>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid border border-[var(--hairline-strong)] md:col-span-5">
            {rest.map((story, i) => (
              <Reveal key={story.name} stagger={160 + i * 80}>
                <figure className="border-b border-[var(--hairline)] bg-[var(--color-cream)] p-6 last:border-b-0">
                  <blockquote className="t-subhead text-[var(--color-text-primary)]">
                    "{story.quote}"
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="t-caption text-[var(--color-text-primary)]">{story.name}</p>
                    <p className="t-eyebrow mt-2 text-[var(--color-text-muted)]">{story.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
