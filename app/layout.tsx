import type { Metadata } from "next";
import { plusJakarta } from "./fonts";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SectionIndex } from "@/components/SectionIndex";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WheelScrollGuard } from "@/components/WheelScrollGuard";
import { StructuredData } from "@/components/StructuredData";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/geo";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Perth Concrete Care - Polished concrete and epoxy flooring Perth",
    template: "%s - Perth Concrete Care",
  },
  description:
    "Professional polished concrete, honed concrete, grind and seal, and epoxy flooring for residential, commercial, and industrial projects across Perth, Western Australia.",
  metadataBase: new URL("https://perthconcretecare.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Perth Concrete Care",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={plusJakarta.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-text-inverse)]"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <WheelScrollGuard />
        <Nav />
        <SectionIndex />
        <StructuredData data={[localBusinessJsonLd(), websiteJsonLd()]} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
