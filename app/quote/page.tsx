import type { Metadata } from "next";
import { QuoteCalculator } from "@/components/quote/QuoteCalculator";

export const metadata: Metadata = {
  title: "Quote Calculator",
  description: "On-site quote tool for Perth Concrete Care.",
  robots: { index: false, follow: false },
};

export default function QuotePage() {
  return <QuoteCalculator />;
}
