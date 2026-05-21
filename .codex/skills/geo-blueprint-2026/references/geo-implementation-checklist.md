# GEO Implementation Checklist

## Foundation

- Confirm production canonical domain and `metadataBase`.
- Confirm business identity: name, legal name, ABN or registration ID, phone, email, service area, logo URL, primary quote/contact path.
- Confirm contact details are reused from shared constants where the repo has them.
- Keep NAP and business descriptors identical across footer, contact page, schema, `llms.txt`, and catalog endpoint.
- Render important facts server-side or statically; avoid client-only facts for crawl-critical content.

## Machine-Readable Surfaces

- `/robots.txt`: allow intended retrieval/citation crawlers and include sitemap URL.
- `/sitemap.xml`: include important pages with current `lastModified`.
- `/llms.txt`: short canonical map of facts, URLs, services, quote action, and pricing.
- `/llms-full.txt`: longer model reference with answer objects, FAQs, service descriptions, examples, and pricing caveats.
- `/api/agent/catalog`: JSON endpoint for agents to retrieve current business facts, services, price ranges, and quote action.

## Schema Priorities

- Site-wide: `LocalBusiness` or `Organization`, `WebSite`.
- Services: `Service` with `provider`, `areaServed`, `offers`, price currency, unit, and quote URL.
- FAQ pages: `FAQPage` matching visible page content.
- Articles/guides: `Article` with author and `dateModified` only when the page is actually an article.
- Avoid fake reviews, fake aggregate ratings, unsupported opening hours, or unverifiable credentials.

## Answer Objects

Use this structure for citation-friendly passages:

```md
## What does [service/question] mean?
[40-60 word direct answer that stands alone, names the entity, and avoids hype.]

[Supporting details: table, steps, caveats, pricing assumptions, or links.]
```

Good answer objects:

- Answer the exact question in the first sentence.
- Include service area when local relevance matters.
- Mention pricing as indicative and explain what changes it.
- Use tables for comparisons and steps for process.
- Avoid marketing phrases that cannot be verified.

## Agentic Search Readiness

- Quote action has a stable URL and registered email.
- Service catalog includes names, slugs, URLs, price ranges, unit, best-fit use cases, and direct answers.
- Pricing copy states inclusions/exclusions and inspection caveats.
- Future MCP/booking API can be derived from the catalog endpoint without scraping.

## Measurement Backlog

- Create a prompt panel for key buyer prompts across ChatGPT, Gemini/AI Mode, Perplexity, Claude, and Copilot.
- Track: cited/not cited, source URL, competitor cited, sentiment/framing, and action suggested.
- Re-test after adding answer objects, structured data, and fresh service/pricing pages.

## Verification

- Typecheck or build passes.
- `robots.txt`, sitemap, `llms.txt`, `llms-full.txt`, and agent catalog return `200`.
- JSON-LD parses and does not include unverified claims.
- Dates match across schema, sitemap, and LLM reference files.
- Contact and quote CTAs route to the same active request path.
