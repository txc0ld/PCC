"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function BeforeAfter() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(52);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPct((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => setFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, setFromClientX]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPct((p) => Math.max(0, p - 3));
    if (e.key === "ArrowRight") setPct((p) => Math.min(100, p + 3));
    if (e.key === "Home") setPct(0);
    if (e.key === "End") setPct(100);
  };

  return (
    <section
      id="compare"
      className="section-pad-tight bg-[var(--color-ink)] text-[var(--color-text-inverse)]"
      aria-labelledby="compare-heading"
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="t-eyebrow text-[var(--color-text-inverse)]/55">06 / Transformation</p>
            </Reveal>
            <Reveal stagger={80}>
              <h2 id="compare-heading" className="t-display-sm mt-4 text-[var(--color-text-inverse)]">
                Same slab. Different discipline.
              </h2>
            </Reveal>
          </div>
          <Reveal stagger={160} className="md:col-span-7 md:pt-8">
            <div className="grid grid-cols-3 border border-[var(--hairline-dark)]">
              {[
                ["Program", "12 days"],
                ["Tooling", "6 passes"],
                ["Finish", "Satin guard"],
              ].map(([k, v]) => (
                <div key={k} className="border-r border-[var(--hairline-dark)] p-4 last:border-r-0">
                  <p className="t-eyebrow text-[var(--color-text-inverse)]/45">{k}</p>
                  <p className="t-caption mt-2 text-[var(--color-text-inverse)]">{v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal stagger={220}>
          <div
            ref={frameRef}
            role="slider"
            tabIndex={0}
            aria-label="Drag to compare slab before and after finishing"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pct)}
            onKeyDown={onKey}
            onPointerDown={(e) => {
              setDragging(true);
              setFromClientX(e.clientX);
            }}
            className="relative mt-12 w-full select-none overflow-hidden border border-[var(--hairline-dark)] bg-[#4f4a42] aspect-[4/5] md:aspect-[16/9] xl:aspect-[21/9]"
            style={{ cursor: "col-resize" }}
          >
            <img
              src="/examples/before-1%20(1).avif"
              alt="Concrete slab before finishing"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `inset(0 0 0 ${pct}%)`,
                transition: dragging ? "none" : "clip-path 200ms cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <img
                src="/examples/after-1.avif"
                alt="Concrete slab after finishing"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/10" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0"
              style={{
                left: `calc(${pct}% - 1px)`,
                width: "2px",
                background: "var(--color-oxide)",
                transition: dragging ? "none" : "left 200ms cubic-bezier(0.4,0,0.2,1)",
              }}
            />
            <span className="t-eyebrow absolute bottom-4 left-4 text-[var(--color-text-inverse)]">
              Before
            </span>
            <span className="t-eyebrow absolute bottom-4 right-4 text-[var(--color-text-inverse)]">
              After
            </span>
            <span
              className="t-mono absolute top-4 bg-[rgba(25,24,22,0.72)] px-2 py-1 text-[11px] text-[var(--color-text-inverse)]"
              style={{ left: pct < 82 ? `calc(${pct}% + 12px)` : "auto", right: pct >= 82 ? `calc(${100 - pct}% + 12px)` : "auto" }}
            >
              {Math.round(pct)}%
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
