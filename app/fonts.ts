import { Plus_Jakarta_Sans } from "next/font/google";

/**
 * Body and UI type. Plus Jakarta Sans gives the redesign a sharper,
 * architectural service-product feel while staying readable in dense controls.
 */
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body-stack",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
});

/**
 * Display stack remains tokenized so a licensed local display face can replace
 * the system fallback without touching component code.
 */
export const displayVar = "--font-display-stack";
