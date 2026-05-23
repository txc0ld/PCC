import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Quote Calculator",
  description: "Internal on-site quote tool for Perth Commercial Flooring commercial floor systems.",
  robots: { index: false, follow: false },
};

export default function QuotePage() {
  redirect("/contact#quote");
}
