"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { PHONE_DISPLAY, PHONE_HREF, cn } from "@/lib/utils";

const links = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const solid = scrolled || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[border-color,background] duration-300",
          solid
            ? "border-b border-[var(--hairline)] bg-[rgba(251,247,239,0.98)]"
            : "border-b border-[var(--hairline-dark)] bg-[rgba(16,16,14,0.56)] text-[var(--color-text-inverse)]"
        )}
      >
        <div className="container-pcc flex h-[var(--nav-h)] items-center justify-between gap-5">
          <Link href="/" aria-label="Perth Concrete Care home" className="flex items-center gap-3">
            <span className="leading-none">
              <span className={cn("block text-[12px] font-extrabold uppercase tracking-[0.14em]", solid ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-inverse)]")}>
                Perth Concrete Care
              </span>
              <span className={cn("mt-1 hidden text-[11px] uppercase tracking-[0.14em] sm:block", solid ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-inverse)]/58")}>
                Surface systems / WA
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "t-caption link-underline",
                  solid ? "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]" : "text-[var(--color-text-inverse)]/70 hover:text-[var(--color-text-inverse)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a href={PHONE_HREF} className={cn("t-caption link-underline", solid ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-inverse)]/72")}>
              {PHONE_DISPLAY}
            </a>
            <LinkButton href="/contact#quote" variant={solid ? "primary" : "accent"} className="min-h-10 px-4 py-2 text-[12px]">
              Request Quote
            </LinkButton>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className={cn(
              "relative ml-auto h-11 w-11 shrink-0 border md:hidden",
              solid
                ? "border-[var(--hairline-strong)] bg-[rgba(251,247,239,0.82)] text-[var(--color-text-primary)]"
                : "border-[rgba(255,248,236,0.34)] bg-[rgba(16,16,14,0.18)] text-[var(--color-text-inverse)]"
            )}
          >
            <span className={cn("absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 bg-current transition-transform", open ? "rotate-45" : "-translate-y-1.5")} />
            <span className={cn("absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 bg-current transition-transform", open ? "-rotate-45" : "translate-y-1.5")} />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 overflow-y-auto bg-[var(--color-ink)] pt-[var(--nav-h)] text-[var(--color-text-inverse)] transition-[opacity,clip-path] duration-400 md:hidden",
          open ? "pointer-events-auto opacity-100 [clip-path:inset(0)]" : "pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0)]"
        )}
      >
        <nav aria-label="Mobile" className="container-pcc grid gap-px bg-[var(--hairline-dark)] py-6">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="grid min-h-16 grid-cols-[44px_1fr] items-center bg-[var(--color-ink)] p-4"
            >
              <span className="t-mono text-[11px] text-[var(--color-text-inverse)]/45">{String(i + 1).padStart(2, "0")}</span>
              <span className="t-headline text-[var(--color-text-inverse)]">{link.label}</span>
            </Link>
          ))}
          <Link
            href="/contact#quote"
            onClick={() => setOpen(false)}
            className="t-subhead bg-[var(--color-oxide)] p-5 text-[var(--color-ink)]"
          >
            Request Quote
          </Link>
          <a href={PHONE_HREF} className="t-subhead bg-[var(--color-ink)] p-5 text-[var(--color-text-inverse)]">
            {PHONE_DISPLAY}
          </a>
        </nav>
      </div>
    </>
  );
}
