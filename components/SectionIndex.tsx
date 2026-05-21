"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string };

const defaultItems: Item[] = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "exposure", label: "Finishes" },
  { id: "gallery", label: "Collections" },
  { id: "compare", label: "Compare" },
  { id: "voices", label: "Stories" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
  { id: "quote", label: "Quote" },
];

export function SectionIndex({ items = defaultItems }: { items?: Item[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) return;
        const top = visibleEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0];
        setActive(top.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Section index"
      data-section-index
      className={cn(
        "fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 select-none xl:block",
        "transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      style={{ mixBlendMode: "difference", color: "#fffaf0" }}
    >
      <ol className="space-y-[14px]">
        {items.map((it, i) => {
          const isActive = active === it.id;
          return (
            <li key={it.id} className="group relative flex h-[14px] items-center">
              <a
                href={`#${it.id}`}
                className="flex items-center gap-3"
                aria-current={isActive ? "location" : undefined}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-px transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    isActive
                      ? "w-6 bg-[var(--color-oxide)]"
                      : "w-3 bg-current opacity-60 group-hover:w-5 group-hover:opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[10px] leading-none tabular-nums transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-55 group-hover:opacity-100"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "absolute left-[72px] whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] leading-none transition-opacity duration-200",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}
                >
                  {it.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
