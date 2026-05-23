"use client";

import { useEffect } from "react";

function normalizeWheelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
  return event.deltaY;
}

export function WheelScrollGuard() {
  useEffect(() => {
    const isFinePointer =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!isFinePointer) return;

    const unlockScroll = () => {
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "auto";
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "";
      }
      if (document.documentElement.style.overflow === "hidden") {
        document.documentElement.style.overflow = "";
      }
    };

    const onWheel = (event: WheelEvent) => {
      unlockScroll();

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const before = window.scrollY;
      const deltaY = normalizeWheelDelta(event);
      if (deltaY === 0) return;

      requestAnimationFrame(() => {
        const moved = Math.abs(window.scrollY - before) > 0.5;
        if (!moved) {
          window.scrollBy({ top: deltaY, left: event.deltaX, behavior: "auto" });
        }
      });
    };

    unlockScroll();
    window.addEventListener("wheel", onWheel, { capture: true, passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
    };
  }, []);

  return null;
}
