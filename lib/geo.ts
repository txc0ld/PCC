import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/utils";

export const BASE_URL = "https://perthconcretepolishing.com.au";
export const LAST_UPDATED = "2026-05-22";
export const LAST_UPDATED_DISPLAY = "22 May 2026";

export const BUSINESS = {
  name: "Perth Concrete Care",
  legalName: "Perth Concrete Care",
  alternateName: "Perth Concrete Polishing",
  abn: "63 775 263 307",
  url: BASE_URL,
  logo: `${BASE_URL}/LOGO.png`,
  image: `${BASE_URL}/epoxy/hero-concrete-architecture.jpg`,
  phone: PHONE_DISPLAY,
  phoneHref: PHONE_HREF,
  email: EMAIL,
  description:
    "Perth Concrete Care provides concrete polishing, polished concrete, honed concrete, grind and seal, and epoxy flooring for residential, commercial, hospitality, and industrial projects across Perth, Western Australia.",
  areaServed: [
    "Perth",
    "Fremantle",
    "Cottesloe",
    "Subiaco",
    "Osborne Park",
    "Kewdale",
    "Midland",
    "Joondalup",
    "Rockingham",
    "Mandurah",
  ],
};

export const GEO_SERVICES = [
  {
    slug: "polished",
    name: "Polished concrete",
    url: `${BASE_URL}/services/polished`,
    priceRange: "$160 - $220 / m²",
    lowPrice: 160,
    highPrice: 220,
    serviceType: "Mechanical polished concrete flooring",
    bestFor: ["Homes", "Showrooms", "Retail", "Hospitality"],
    answer:
      "Polished concrete is best for internal floors where long service life, light return, and architectural finish matter. Perth Concrete Care mechanically grinds, densifies, refines, guards, and hands over the floor with maintenance advice matched to the slab and room use.",
  },
  {
    slug: "honed",
    name: "Honed concrete",
    url: `${BASE_URL}/services/honed`,
    priceRange: "$120 - $160 / m²",
    lowPrice: 120,
    highPrice: 160,
    serviceType: "Honed concrete flooring",
    bestFor: ["Pool surrounds", "Courtyards", "Cafes", "Low-glare interiors"],
    answer:
      "Honed concrete is a low-glare matte or satin finish for outdoor, transitional, and tactile concrete floors. It exposes aggregate, refines scratches, and uses suitable protection for areas where traction, weather, and restrained appearance matter.",
  },
  {
    slug: "grind-seal",
    name: "Grind and seal",
    url: `${BASE_URL}/services/grind-seal`,
    priceRange: "$65 - $95 / m²",
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
    priceRange: "$75 - $100 / m²",
    lowPrice: 75,
    highPrice: 100,
    serviceType: "Epoxy and polyaspartic floor coatings",
    bestFor: ["Garages", "Workshops", "Plant rooms", "Food preparation areas"],
    answer:
      "Epoxy coatings create seamless resin floors for garages, workshops, plant rooms, and commercial working areas. Perth Concrete Care prepares the slab, repairs defects, applies primer and body coats, then finishes with the specified flake, solid colour, safety, or top-coat system.",
  },
] as const;

export const GEO_FAQS = [
  {
    question: "Can every concrete slab be polished?",
    answer:
      "Most concrete slabs can be improved, but not every slab should be polished to the same finish. The right system depends on hardness, moisture, cracks, previous coatings, aggregate depth, edge conditions, access, and the intended use of the room.",
  },
  {
    question: "What is the difference between polished concrete and grind and seal?",
    answer:
      "Mechanical polish refines and hardens the concrete itself, while grind and seal flattens the slab and protects it with a coating. Both can look clean, but they age, maintain, and refresh differently.",
  },
  {
    question: "How much does polished concrete cost in Perth?",
    answer:
      "As a planning guide, Perth Concrete Care lists mechanical polished concrete at about $160 to $220 per m², honed concrete at $120 to $160 per m², grind and seal at $65 to $95 per m², and epoxy flake systems from $75 to $100 per m². Final pricing follows site inspection.",
  },
  {
    question: "Does Perth Concrete Care provide epoxy flooring?",
    answer:
      "Yes. Perth Concrete Care provides epoxy and polyaspartic coating systems for Perth garages, workshops, commercial kitchens, plant rooms, marked work zones, and other working floors that need cleanability, chemical resistance, slip awareness, or fast return to use.",
  },
];

export const SITE_ROUTES = [
  "/",
  "/services",
  ...GEO_SERVICES.map((service) => `/services/${service.slug}`),
  "/work",
  "/work/cottesloe-residence",
  "/work/osborne-park-showroom",
  "/work/kewdale-warehouse",
  "/work/peppermint-grove-house",
  "/work/north-perth-cafe",
  "/work/fremantle-loft",
  "/work/subiaco-gallery",
  "/work/midland-warehouse",
  "/about",
  "/contact",
] as const;

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${BASE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    alternateName: BUSINESS.alternateName,
    url: BUSINESS.url,
    logo: BUSINESS.logo,
    image: BUSINESS.image,
    description: BUSINESS.description,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: "$$",
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
      "@type": "City",
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Concrete flooring services",
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
          unitText: "m²",
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
        unitText: "m²",
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
