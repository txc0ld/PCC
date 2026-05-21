"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  className?: string;
};

export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  stagger = 0,
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setReady(true);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const totalDelay = delay + stagger;
  const style = totalDelay > 0 ? { transitionDelay: `${totalDelay}ms` } : undefined;

  return (
    <Tag ref={ref} className={cn(ready && "reveal", className)} style={style}>
      {children}
    </Tag>
  );
}
