import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Quote Calculator",
  description: "On-site quote tool for Perth Concrete Care.",
  robots: { index: false, follow: false },
};

export default function QuotePage() {
  redirect("/contact#quote");
}
