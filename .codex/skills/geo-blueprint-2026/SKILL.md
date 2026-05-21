---
name: geo-blueprint-2026
description: Apply Generative Engine Optimization for AI citations, answer engines, and agentic search surfaces. Use when optimizing a website for ChatGPT, Google AI Mode or AI Overviews, Gemini, Perplexity, Claude, Copilot, llms.txt, schema.org JSON-LD, AI crawler access, answer objects, local business booking, agent-readable pricing/catalog endpoints, or GEO audits.
---

# GEO Blueprint 2026

## Quick Start

Treat the website as a verifiable entity plus machine-readable action surface, not only a set of pages. Add crawl access, structured data, answer objects, freshness signals, and an agent-readable catalog before chasing prose rewrites.

For a full implementation checklist, read `references/geo-implementation-checklist.md`.

## Workflow

1. **Map the entity**
   - Identify the canonical business name, legal name, ABN or registration ID, phone, email, service area, logo, primary domain, and primary action.
   - Keep claims consistent across footer, contact page, schema, `llms.txt`, and any catalog endpoint.
   - Do not invent `sameAs`, awards, reviews, ratings, credentials, or external authority sources.

2. **Open crawler and freshness surfaces**
   - Add or audit `robots.txt` for Googlebot, OAI-SearchBot, ChatGPT-User, GPTBot, Claude, Perplexity, Bingbot, and relevant retrieval agents.
   - Add `sitemap.xml` with accurate `lastModified` or `lastmod`.
   - Expose visible "Last updated" dates for important service, pricing, guide, and FAQ content.

3. **Add structured data**
   - Use JSON-LD, server-rendered where possible.
   - Prefer `Organization` or `LocalBusiness`, `WebSite`, `Service`, `OfferCatalog`, `FAQPage`, `BreadcrumbList`, `Article`, and `Dataset` only when the page actually supports those claims.
   - For service businesses, include `areaServed`, contact action, service catalog, indicative price ranges, and service URLs.

4. **Build answer objects**
   - Add question-shaped H2/H3 sections for high-intent prompts.
   - Put a 40-60 word direct answer immediately after the heading.
   - Follow with tables, bullets, FAQs, process steps, and caveats.
   - Use named sources only when they are real and verifiable.

5. **Publish LLM-facing references**
   - Add `/llms.txt` with canonical facts, URLs, services, contact, and pricing.
   - Add `/llms-full.txt` when the site has enough detail to justify a longer model reference.
   - Keep both concise, factual, and updated with the same date as schema/sitemap.

6. **Expose an agent action surface**
   - Add a JSON endpoint such as `/api/agent/catalog` for services, prices, availability assumptions, quote URL, contact details, and answer objects.
   - Ensure quote/contact buttons lead to a working request path and registered email.
   - For booking-heavy businesses, scope a future MCP or booking API around services, availability, price bands, and contact/booking actions.

7. **Verify**
   - Run the repo's typecheck/build command.
   - Smoke-test `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, and agent catalog routes.
   - Check rendered JSON-LD for invalid JSON, broken URLs, invented facts, and mismatched dates.

## Output Standard

Lead with implementation, not theory. Report the exact files changed, the machine-readable surfaces added, and the verification commands/results. Include residual risks only when something could not be verified locally.
