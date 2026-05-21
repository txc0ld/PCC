import { NextResponse } from "next/server";
import { BASE_URL, BUSINESS, GEO_FAQS, GEO_SERVICES, LAST_UPDATED } from "@/lib/geo";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    name: "Perth Concrete Care agent catalog",
    version: "2026-05-22",
    lastModified: LAST_UPDATED,
    business: {
      name: BUSINESS.name,
      legalName: BUSINESS.legalName,
      abn: BUSINESS.abn,
      url: BUSINESS.url,
      phone: BUSINESS.phone,
      email: BUSINESS.email,
      areaServed: BUSINESS.areaServed,
      description: BUSINESS.description,
    },
    quoteAction: {
      label: "Request Quote",
      url: `${BASE_URL}/contact#quote`,
      email: BUSINESS.email,
      phoneHref: BUSINESS.phoneHref,
    },
    services: GEO_SERVICES.map((service) => ({
      slug: service.slug,
      name: service.name,
      url: service.url,
      serviceType: service.serviceType,
      priceRange: service.priceRange,
      priceCurrency: "AUD",
      unit: "m²",
      lowPrice: service.lowPrice,
      highPrice: service.highPrice,
      bestFor: service.bestFor,
      answer: service.answer,
    })),
    answerObjects: GEO_FAQS,
    machineReadable: {
      llmsTxt: `${BASE_URL}/llms.txt`,
      llmsFullTxt: `${BASE_URL}/llms-full.txt`,
      sitemap: `${BASE_URL}/sitemap.xml`,
    },
  });
}
