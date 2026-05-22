import Link from "next/link";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/utils";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/services/polished", label: "Polished concrete" },
      { href: "/services/honed", label: "Honed concrete" },
      { href: "/services/grind-seal", label: "Grind and seal" },
      { href: "/services/epoxy", label: "Epoxy coatings" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/work", label: "Work" },
      { href: "/#process", label: "Process" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: PHONE_HREF, label: PHONE_DISPLAY },
      { href: `mailto:${EMAIL}`, label: EMAIL },
      { href: "/contact#quote", label: "Request Quote" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-text-inverse)]">
      <div className="container-pcc py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 border-y border-[var(--hairline-dark)] py-12 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-center gap-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-black md:h-24 md:w-24">
              <Image src="/LOGO.png" alt="Perth Concrete Care" fill sizes="96px" className="object-contain p-2" />
            </div>
            <div>
              <p className="text-[15px] font-extrabold uppercase leading-tight tracking-[0.14em]">
                Perth Concrete Care
              </p>
              <p className="mt-2 max-w-[42ch] text-[14px] leading-relaxed text-[var(--color-text-inverse)]/62">
                Polished concrete, honed concrete, grind and seal, and epoxy flooring across Perth.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <LinkButton href="/contact#quote" variant="accent" className="min-h-11 px-4 py-2 text-[12px]">
              Request Quote
            </LinkButton>
            <a href={PHONE_HREF} className="inline-flex min-h-11 items-center justify-center border border-[var(--hairline-dark)] px-4 py-2 text-[13px] font-bold text-[var(--color-text-inverse)]/86 transition-colors hover:border-[var(--color-text-inverse)]">
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-3">
          {columns.map((col, i) => (
            <div key={col.title}>
              <div className="flex items-baseline gap-3">
                <span className="t-mono text-[11px] text-[var(--color-text-inverse)]/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="t-eyebrow text-[var(--color-text-inverse)]/55">
                  {col.title}
                </p>
              </div>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline t-body-sm text-[var(--color-text-inverse)]/72 hover:text-[var(--color-text-inverse)]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--hairline-dark)] pt-6 text-[var(--color-text-inverse)]/46 md:flex-row md:items-center md:justify-between">
          <p className="t-caption">Copyright {new Date().getFullYear()} Perth Concrete Care.</p>
          <p className="t-caption">ABN: 63 775 263 307 / Perth metro / Residential / Commercial / Industrial.</p>
        </div>
      </div>
    </footer>
  );
}
