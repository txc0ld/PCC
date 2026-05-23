import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/utils";

export const BASE_URL = "https://perthcommercialfloors.com.au";
export const LAST_UPDATED = "2026-05-23";
export const LAST_UPDATED_DISPLAY = "23 May 2026";

export const BUSINESS = {
  name: "Perth Commercial Flooring",
  legalName: "Perth Commercial Flooring",
  alternateName: "Perth Commercial Flooring",
  abn: "63 775 263 307",
  url: BASE_URL,
  logo: `${BASE_URL}/LOGO.png`,
  image: `${BASE_URL}/epoxy/hero-concrete-architecture.jpg`,
  phone: PHONE_DISPLAY,
  phoneInternational: PHONE_HREF.replace("tel:", ""),
  phoneHref: PHONE_HREF,
  email: EMAIL,
  description:
    "Perth Commercial Flooring provides commercial polished concrete, grind and seal, honed concrete, epoxy coatings, polyaspartic systems, and concrete surface preparation for warehouses, showrooms, retail, hospitality, workshops, plant rooms, and industrial facilities across Perth, Western Australia.",
  areaServed: [
    "Perth",
    "Subiaco",
    "Osborne Park",
    "Kewdale",
    "Midland",
    "Welshpool",
    "Malaga",
    "Canning Vale",
    "Wangara",
    "Bibra Lake",
    "Henderson",
  ],
};

export const GEO_SERVICES = [
  {
    slug: "polished",
    name: "Polished concrete",
    url: `${BASE_URL}/services/polished`,
    priceRange: "$160 - $220 / m2",
    lowPrice: 160,
    highPrice: 220,
    serviceType: "Mechanical polished concrete flooring",
    bestFor: ["Showrooms", "Retail", "Hospitality", "Commercial offices"],
    answer:
      "Polished concrete is best for showrooms, retail, hospitality, offices, and customer-facing floors where long service life, light return, and architectural finish matter. Perth Commercial Flooring mechanically grinds, densifies, refines, guards, and hands over the floor with maintenance advice matched to traffic and cleaning requirements.",
  },
  {
    slug: "honed",
    name: "Honed concrete",
    url: `${BASE_URL}/services/honed`,
    priceRange: "$120 - $160 / m2",
    lowPrice: 120,
    highPrice: 160,
    serviceType: "Honed concrete flooring",
    bestFor: ["Hospitality", "Retail entries", "Courtyards", "Low-glare commercial interiors"],
    answer:
      "Honed concrete is a low-glare matte or satin finish for hospitality, retail entries, courtyards, and transitional commercial floors. It exposes aggregate, refines scratches, and uses suitable protection for areas where traction, weather, and restrained appearance matter.",
  },
  {
    slug: "grind-seal",
    name: "Grind and seal",
    url: `${BASE_URL}/services/grind-seal`,
    priceRange: "$65 - $95 / m2",
    lowPrice: 65,
    highPrice: 95,
    serviceType: "Grind and seal concrete flooring",
    bestFor: ["Warehouses", "Workshops", "Back-of-house retail"],
    answer:
      "Grind and seal is a practical concrete floor system where the slab is mechanically ground and protected with a sealer or coating. It suits warehouses, workshops, and back-of-house spaces that need improved cleanability and efficient return to service.",
  },
  {
    slug: "epoxy",
    name: "Epoxy coatings",
    url: `${BASE_URL}/services/epoxy`,
    priceRange: "$75 - $100 / m2",
    lowPrice: 75,
    highPrice: 100,
    serviceType: "Epoxy and polyaspartic floor coatings",
    bestFor: ["Warehouses", "Workshops", "Plant rooms", "Food preparation areas"],
    answer:
      "Epoxy coatings create seamless resin floors for warehouses, workshops, plant rooms, food preparation areas, and commercial working zones. Perth Commercial Flooring prepares the slab, repairs defects, applies primer and body coats, then finishes with the specified flake, solid colour, safety, or top-coat system.",
  },
] as const;

export const GEO_FAQS = [
  {
    question: "What commercial flooring systems does Perth Commercial Flooring install?",
    answer:
      "Perth Commercial Flooring installs commercial polished concrete, grind and seal, honed concrete, epoxy coatings, flake systems, polyaspartic top coats, and concrete surface preparation for warehouses, showrooms, hospitality venues, retail spaces, workshops, commercial kitchens, and plant rooms.",
  },
  {
    question: "What is best for a warehouse floor?",
    answer:
      "Most warehouse floors suit grind and seal or epoxy coating depending on traffic, cleaning, chemical exposure, downtime, and whether line marking is required. Perth Commercial Flooring inspects slab hardness, contamination, cracks, joints, and coating history before specifying the system.",
  },
  {
    question: "How much do commercial concrete floors cost in Perth?",
    answer:
      "As a planning guide, Perth Commercial Flooring lists mechanical polished concrete at about $160 to $220 per m2, honed concrete at $120 to $160 per m2, grind and seal at $65 to $95 per m2, and epoxy flake systems from $75 to $100 per m2. Final pricing follows site inspection.",
  },
  {
    question: "Does Perth Commercial Flooring provide commercial epoxy flooring?",
    answer:
      "Yes. Perth Commercial Flooring provides epoxy and polyaspartic coating systems for Perth warehouses, workshops, commercial kitchens, plant rooms, marked work zones, and other working floors that need cleanability, chemical resistance, slip awareness, or fast return to use.",
  },
];

export const SITE_ROUTES = [
  "/",
  "/services",
  ...GEO_SERVICES.map((service) => `/services/${service.slug}`),
  "/work",
  "/work/osborne-park-showroom",
  "/work/kewdale-warehouse",
  "/work/north-perth-cafe",
  "/work/subiaco-gallery",
  "/work/midland-warehouse",
  "/about",
  "/contact",
] as const;

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    alternateName: BUSINESS.alternateName,
    url: BUSINESS.url,
    logo: BUSINESS.logo,
    image: BUSINESS.image,
    description: BUSINESS.description,
    slogan: "Commercial flooring systems specified from the slab up.",
    telephone: BUSINESS.phoneInternational,
    email: BUSINESS.email,
    priceRange: "$$",
    currenciesAccepted: "AUD",
    paymentAccepted: "Cash, bank transfer, card",
    knowsAbout: [
      "Commercial concrete polishing",
      "Commercial polished concrete",
      "Commercial honed concrete",
      "Grind and seal concrete",
      "Commercial epoxy floor coatings",
      "Polyaspartic top coats",
      "Concrete grinding",
      "Concrete surface preparation",
    ],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "ABN",
      value: BUSINESS.abn,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Perth",
      addressRegion: "WA",
      addressCountry: "AU",
    },
    areaServed: BUSINESS.areaServed.map((name) => ({
      "@type": "Place",
      name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Western Australia",
      },
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: BUSINESS.phoneInternational,
      email: BUSINESS.email,
      areaServed: "AU-WA",
      availableLanguage: ["en-AU"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Commercial concrete flooring services",
      itemListElement: GEO_SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          serviceType: service.serviceType,
          url: service.url,
          areaServed: "Perth, Western Australia",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "AUD",
          minPrice: service.lowPrice,
          maxPrice: service.highPrice,
          unitText: "m2",
        },
      })),
    },
    potentialAction: {
      "@type": "ContactAction",
      name: "Request Quote",
      target: `${BASE_URL}/contact#quote`,
    },
    dateModified: LAST_UPDATED,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: BUSINESS.name,
    url: BASE_URL,
    publisher: { "@id": `${BASE_URL}/#business` },
    inLanguage: "en-AU",
    potentialAction: {
      "@type": "ContactAction",
      name: "Request Quote",
      target: `${BASE_URL}/contact#quote`,
    },
    dateModified: LAST_UPDATED,
  };
}

export function serviceJsonLd(slug: string) {
  const service = GEO_SERVICES.find((item) => item.slug === slug);
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${service.url}#service`,
    name: service.name,
    serviceType: service.serviceType,
    description: service.answer,
    provider: { "@id": `${BASE_URL}/#business` },
    areaServed: "Perth, Western Australia",
    url: service.url,
    offers: {
      "@type": "Offer",
      priceCurrency: "AUD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        minPrice: service.lowPrice,
        maxPrice: service.highPrice,
        priceCurrency: "AUD",
        unitText: "m2",
      },
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/contact#quote`,
    },
    dateModified: LAST_UPDATED,
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GEO_FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    dateModified: LAST_UPDATED,
  };
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function webPageJsonLd({
  path,
  name,
  description,
  type = "WebPage",
  image,
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-AU",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#business` },
    primaryImageOfPage: image
      ? {
          "@type": "ImageObject",
          url: absoluteUrl(image),
        }
      : undefined,
    dateModified: LAST_UPDATED,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
