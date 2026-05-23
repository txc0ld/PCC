import type { Metadata } from "next";
import { plusJakarta } from "./fonts";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SectionIndex } from "@/components/SectionIndex";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WheelScrollGuard } from "@/components/WheelScrollGuard";
import { StructuredData } from "@/components/StructuredData";
import { BASE_URL, BUSINESS, localBusinessJsonLd, websiteJsonLd } from "@/lib/geo";
import "./globals.css";

const defaultTitle = "Commercial Flooring Perth | Epoxy & Polished Concrete";
const defaultDescription =
  "Perth Commercial Flooring installs commercial polished concrete, grind and seal, honed concrete, epoxy coatings, and polyaspartic floor systems for Perth warehouses, showrooms, retail, hospitality, workshops, and plant rooms.";

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s | ${BUSINESS.name}`,
  },
  description: defaultDescription,
  keywords: [
    "commercial flooring Perth",
    "commercial concrete flooring Perth",
    "warehouse flooring Perth",
    "showroom flooring Perth",
    "commercial epoxy flooring Perth",
    "industrial floor coatings Perth",
    "polished concrete Perth",
    "epoxy flooring Perth",
    "honed concrete Perth",
    "grind and seal Perth",
    "concrete grinding Perth",
    "polyaspartic flooring Perth",
  ],
  metadataBase: new URL(BASE_URL),
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: BASE_URL }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "Concrete flooring contractor",
  icons: {
    icon: [{ url: "/LOGO.png", type: "image/png" }],
    apple: [{ url: "/LOGO.png", type: "image/png" }],
  },
  alternates: { canonical: "/" },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: BASE_URL,
    type: "website",
    locale: "en_AU",
    siteName: BUSINESS.name,
    images: [
      {
        url: "/epoxy/hero-concrete-architecture.jpg",
        width: 1920,
        height: 1256,
        alt: "Architectural concrete interior with a polished concrete floor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/epoxy/hero-concrete-architecture.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "AU-WA",
    "geo.placename": "Perth",
    "business:contact_data:country_name": "Australia",
    "business:contact_data:region": "Western Australia",
    "business:contact_data:email": BUSINESS.email,
  },
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
