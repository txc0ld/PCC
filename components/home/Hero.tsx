import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-[var(--color-ink)] pt-[var(--nav-h)] text-[var(--color-text-inverse)]">
      <Image
        src="/epoxy/hero-concrete-architecture.jpg"
        alt="Architectural concrete interior with a ribbed ceiling, bright vertical screen, and polished concrete floor"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,16,14,0.26)_0%,rgba(16,16,14,0.50)_42%,rgba(16,16,14,0.88)_100%)] md:bg-[linear-gradient(90deg,rgba(16,16,14,0.82)_0%,rgba(16,16,14,0.48)_44%,rgba(16,16,14,0.12)_100%)]" />

      <div className="container-pcc relative z-10 flex min-h-[calc(92svh-var(--nav-h))] items-end py-12 md:py-16">
        <div className="max-w-[960px]">
          <p className="t-eyebrow max-w-[30ch] text-[var(--color-text-inverse)]/62 md:max-w-none">
            Commercial flooring / Perth WA
          </p>
          <h1 className="mt-4 max-w-[13ch] font-[var(--font-display)] text-[clamp(42px,8.2vw,108px)] font-extrabold leading-[0.94] tracking-normal text-[var(--color-text-inverse)]">
            Commercial floors built for traffic.
          </h1>
          <p className="hero-copy mt-5 text-[16px] leading-[1.65] text-[var(--color-text-inverse)]/78 md:text-[18px]">
            <span className="block md:inline">Polished concrete, grind and seal, </span>
            <span className="block md:inline">and epoxy coating systems for warehouses, </span>
            <span className="block md:inline">showrooms, hospitality, workshops, </span>
            <span className="block md:inline">plant rooms, and high-traffic Perth sites.</span>
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <LinkButton href="/contact#quote" variant="accent">
              Request Quote
            </LinkButton>
            <LinkButton href="#services" variant="ghost" className="!border-[var(--hairline-dark)] !bg-transparent !text-[var(--color-text-inverse)] hover:!bg-[var(--color-text-inverse)] hover:!text-[var(--color-ink)]">
              Explore systems
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
