import { QuoteForm } from "@/components/home/QuoteForm";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/utils";

export const metadata = { title: "Contact" };

const intake = [
  ["1", "Send the basics", "Suburb, approximate area, finish interest, timing, and whether the slab is new or existing."],
  ["2", "Site inspection", "We check access, hardness, cracks, moisture risk, coating history, and exposure expectations."],
  ["3", "Fixed-scope quote", "You receive a clear scope, inclusions, finish assumptions, and program notes before work starts."],
];

const usefulDetails = [
  "Plans, photos, or a short video of the current slab",
  "Approximate square metres and access constraints",
  "Preferred finish: polished, honed, grind and seal, or epoxy",
  "Required handover date or business downtime window",
];

export default function ContactPage() {
  return (
    <>
      <header className="bg-[var(--color-cream)] pb-14 pt-[calc(var(--nav-h)+72px)] md:pb-20 md:pt-[calc(var(--nav-h)+112px)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Contact</p>
              </Reveal>
              <Reveal stagger={80}>
                <h1 className="t-display-md mt-4 max-w-[18ch] text-[var(--color-text-primary)]">
                  Request a quote or talk through the floor first.
                </h1>
              </Reveal>
            </div>
            <Reveal stagger={160} className="md:col-span-4">
              <p className="t-body-lg max-w-[34ch] text-[var(--color-text-muted)] md:ml-auto">
                A useful quote starts with slab condition, intended use,
                desired finish, and timing. Send what you have and we will
                narrow it down.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--hairline)] md:grid-cols-2">
            <Reveal stagger={200}>
              <div className="bg-[var(--color-cream)] p-6">
                <p className="t-eyebrow text-[var(--color-text-muted)]">Direct line</p>
                <a
                  href={PHONE_HREF}
                  className="t-display-sm mt-3 block break-words text-[var(--color-text-primary)]"
                >
                  {PHONE_DISPLAY}
                </a>
                <p className="t-caption mt-3 text-[var(--color-text-muted)]">
                  Monday to Friday, 7am to 5pm AWST.
                </p>
              </div>
            </Reveal>
            <Reveal stagger={260}>
              <div className="bg-[var(--color-cream)] p-6">
                <p className="t-eyebrow text-[var(--color-text-muted)]">Email</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="t-subhead mt-4 block break-words text-[var(--color-text-primary)]"
                >
                  {EMAIL}
                </a>
                <p className="t-caption mt-3 text-[var(--color-text-muted)]">
                  Replies within one working day.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </header>

      <section className="section-pad-tight bg-[var(--color-paper)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Quote path</p>
                <h2 className="t-display-sm mt-4 max-w-[11ch] text-[var(--color-text-primary)]">
                  What happens next.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ol className="grid gap-px bg-[var(--hairline)]">
                {intake.map(([number, title, copy], i) => (
                  <Reveal as="li" key={title} stagger={i * 70}>
                    <div className="grid gap-4 bg-[var(--color-paper)] p-5 sm:grid-cols-[48px_180px_1fr] md:p-6">
                      <span className="t-mono text-[11px] text-[var(--color-text-muted)]">{number.padStart(2, "0")}</span>
                      <p className="t-subhead text-[var(--color-text-primary)]">{title}</p>
                      <p className="t-body text-[var(--color-text-muted)]">{copy}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad-tight bg-[var(--color-bone)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <p className="t-eyebrow text-[var(--color-text-muted)]">Useful to include</p>
                <h2 className="t-display-sm mt-4 max-w-[14ch] text-[var(--color-text-primary)]">
                  Better inputs make a better first answer.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <ul className="divide-y divide-[var(--hairline)]">
                {usefulDetails.map((detail, i) => (
                  <Reveal as="li" key={detail} stagger={i * 60}>
                    <p className="t-subhead py-5 text-[var(--color-text-primary)]">{detail}</p>
                  </Reveal>
                ))}
              </ul>
              <Reveal stagger={220}>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <LinkButton href="#quote" variant="primary">
                    Request Quote
                  </LinkButton>
                  <a href={PHONE_HREF} className="link-underline t-subhead w-fit self-start py-3 text-[var(--color-text-primary)] sm:self-center">
                    Call {PHONE_DISPLAY}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <QuoteForm />
    </>
  );
}
