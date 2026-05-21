"use client";

// Momentum-smooth scroll was provided by Lenis per §05, but it was breaking
// wheel input in some browsers. Native scroll works cleanly with GSAP
// ScrollTrigger out of the box, so this component is a no-op for now.
// Reintroduce Lenis here (with a proper ScrollTrigger bridge + preserved
// wheel behavior) if/when a compelling need returns.
export function SmoothScroll() {
  return null;
}
