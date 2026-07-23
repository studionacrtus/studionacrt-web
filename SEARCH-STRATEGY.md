# Studio NACRT US — Search Strategy (SEO / GEO / AEO / LLMO / SXO)

This document explains how the site is structured for organic search, generative-engine
answers, and AI discovery, and what must be verified before certain upgrades ship. It is a
working reference, not a guarantee of rankings — see the note at the end.

## 1. Entity & positioning

- **Primary entity:** Studio NACRT US — the U.S. branch of Studio NACRT (Belgrade, founded 2014).
- **Alternate names used consistently:** NACRT US, NACRT Miami.
- **What it is:** one interior design studio with a shared team, not a franchise or a separate firm.
- **Canonical domain — DECIDED (final):** `https://studionacrt.us` is the primary, canonical domain.
  `https://nacrt.us` remains a 301 alias only (redirect at Porkbun). All canonicals, `og:url`, sitemap,
  and JSON-LD `url`/`@id` values stay on `https://studionacrt.us`. This is settled — no remaining
  either/or decision. DNS is not altered from this repo.
- **Master positioning (blended):** *Material-led interiors, visualized before they are built.* Proof:
  one shared Studio NACRT team shapes stone, wood, concrete, glass, and light, using photoreal 3D to
  resolve decisions before execution. Copy uses design, visualization, documentation, and execution-
  coordination language and avoids overclaiming contracting/installation responsibility.
- **Offer ladder (five existing pages, no thin pages added):**
  1. Full interior design + furnishings — HNW residential / condo / penthouse (`/services/residential`,
     `/services/condo-penthouse`).
  2. Multifamily / developer packages — model units, amenities, finish systems
     (`/services/multifamily-commercial`).
  3. Hospitality / condo-hotel (`/services/hospitality`).
  4. Standalone 3D visualization / rendering for architects, developers, brokers
     (`/services/3d-visualization`).
  5. Selected commercial interiors only where aligned with luxury positioning (folded into
     `/services/multifamily-commercial`).
- **Service area (not a physical NAP):** Miami and South Florida. No U.S. street address or phone
  number is published because none is verified. Email (info@studionacrt.us) is the contact.
- **Truthful lineage framing:** the studio works with one shared international design team; the body of
  work shown was completed by that team, with actual locations in Serbia, Croatia, Slovenia, Montenegro,
  Austria, and Switzerland identified only where verified. Copy does not advertise the U.S. entity as
  brand-new or weak, does not imply that international projects were delivered by the U.S. entity, and
  never claims fabricated U.S. project locations, U.S. years of operation, awards, testimonials, client
  names, or pricing.

## 2. Page → primary query map

| Page | URL | Primary query intent | Secondary |
|------|-----|----------------------|-----------|
| Home | `/` | miami luxury interior designer | luxury interior design miami, interior design firm miami |
| Residential | `/services/residential` | luxury residential interior design miami | penthouse/villa interior design |
| Condo & Penthouse | `/services/condo-penthouse` | luxury condo interior design miami; penthouse interior design miami | condo renovation design miami |
| Multifamily & Commercial | `/services/multifamily-commercial` | multifamily interior design florida; commercial interior design miami | model unit / amenity design |
| Hospitality & Condo-Hotel | `/services/hospitality` | hospitality interior design miami | restaurant / hotel / condo-hotel interior design |
| 3D Visualization | `/services/3d-visualization` | 3d architectural visualization miami; interior rendering | photoreal rendering service |
| Projects | `/projects` | studio nacrt portfolio / interior design projects | category browsing (villas, apartments, hotels, restaurants) |
| About | `/about` | studio nacrt / who is studio nacrt us | studio nacrt belgrade, the team |
| Insights hub | `/insights` | interior design guides | brand/topical authority |
| Insight: condo process | `/insights/miami-luxury-condo-interior-design-process` | luxury condo interior design process | what to expect / stages |
| Insight: renovation planning | `/insights/planning-a-south-florida-condo-renovation` | planning a condo renovation south florida | renovation scope / building rules |
| Insight: visualization value | `/insights/how-3d-visualization-reduces-decision-risk` | why use 3d visualization interior design | decision risk / before build |
| Contact | `/contact` | contact studio nacrt us / start a project | inquiry |

## 3. Schema / structured-data plan

Implemented (JSON-LD, matching visible text only):

- **Organization** (`/#organization`) on Home and About — name, alternateName, areaServed (cities +
  South Florida + Florida), knowsAbout, email, `sameAs` limited to the one verified profile
  (Instagram), and `parentOrganization` (Studio NACRT, 2014, Belgrade).
- **WebSite** (`/#website`) on Home.
- **Service** on each of the five service pages, `provider` referencing `/#organization`.
- **BreadcrumbList** on every non-home page.
- **FAQPage** on Home and each service page — every Q&A also appears as visible `<details>` text.
- **Article** + **BreadcrumbList** on each insight article; **CollectionPage** on the insights hub.
- **AboutPage** on the About page.

Deliberately **removed**: `ProfessionalService` / `LocalBusiness` — these imply a verifiable
physical location, which we do not have. See blockers.

## 4. Content & accuracy rules (applied)

- One descriptive `<h1>` per page; brand shown separately as visual text, not as the H1.
- Original copy only; no verbatim competitor or parent-site text.
- No fabricated NAP, testimonials, review stars, awards, or pricing.
- **No pricing or minimum signal anywhere (confirmed):** no budgets, minimums, price ranges, hourly
  rates, or "starting at" language appears on any page or in any schema. Qualification happens through
  the intake form and a discovery call, not published price gates. The contact form intentionally has
  **no budget field**; it captures name, email, optional phone, project type, location, timeframe, and
  message only.
- Avoids the regulated title "registered interior designer" (Florida F.S. 481.229 exempts
  residential/condo/multifamily interior design from registration; the repo has no proof of
  registration, so no legal/credential claims are made).
- Execution-coordination phrasing ("coordinating execution on site", "from concept through
  documentation and execution coordination") is used instead of claims that the studio itself performs
  contracting or installation; "turnkey" is avoided.
- Image `alt` text describes the work and attributes "by Studio NACRT"; the one project with an
  unverifiable location (Mimet) has its city removed rather than guessed.

## 5. AI discovery (LLMO / AEO)

- `llms.txt` at root summarizes the entity, services, key pages, and — importantly — explicit
  "notes for accurate representation" so LLMs don't invent branches, locations, or endorsements.
- FAQ answer blocks are crawlable HTML (not JS-injected) and mirror the FAQPage schema.
- Answer-first phrasing in intros and FAQ so extractive engines can quote clean, correct sentences.

## 6. Technical SEO (implemented)

- Canonicals + sitemap + `og:url` all on `https://studionacrt.us` (nacrt.us redirects at Porkbun; not
  changed here).
- Clean pretty URLs via `netlify.toml` 200-rewrites for all new pages (condo-penthouse, insights hub,
  three articles).
- Custom `404.html` (noindex) with navigation back into the site.
- `sitemap.xml` updated with all new URLs; `robots.txt` allows all and points to the sitemap.
- Security + cache headers already present in `netlify.toml`.
- Performance: no framework, minimal JS; hero videos `preload="metadata"`, below-fold video lazy-loaded,
  images lazy where appropriate with width/height to limit CLS; `prefers-reduced-motion` disables
  reveal animations and the scroll-hint bob.
- SXO: accessible form labels (`for`/`id`), honeypot + `form-name` for spam resistance, AJAX submit with
  visible success/error states via an `aria-live` region.

## 7. Blockers — require the client before shipping

1. **Verified NAP → GBP / LocalBusiness upgrade trigger.** The site is built to accept this with a small,
   well-defined change once a real, verified U.S. business name + street address + phone exist. The exact
   upgrade, to apply *only after* NAP is verified:
   - Add a JSON-LD `LocalBusiness` / `InteriorDesignBusiness` node (or extend `/#organization`) on Home,
     About, and Contact with `name`, `address` (`PostalAddress`: street, city `Miami`, region `FL`,
     postal code, `US`), `telephone` (E.164), `geo` (lat/lng), `openingHoursSpecification`, `image`, and
     `url` = `https://studionacrt.us`.
   - Add the same NAP as **visible** text in the footer and on Contact (schema must mirror visible text).
   - Create the Google Business Profile, then add its URL to the Organization `sameAs` array.
   Until every element is verified, add **no** placeholder address, phone, geo, or hours — the current
   `Organization`-only + service-area model stays as-is. `ProfessionalService`/`LocalBusiness` remain
   deliberately absent until this trigger fires.
2. **Google Business Profile URL** — needed for local pack visibility and as a `sameAs` (part of the
   trigger above).
3. **Official social/profile URLs** — confirm the correct Instagram handle and any LinkedIn/Houzz/
   Pinterest profiles before adding them to `sameAs`.
4. **U.S. project proof** — any verified U.S. project (location, name, photos with permission) can seed a
   genuinely local portfolio. Carl has confirmed rights to the shared team's photos, so the current work
   is shown as the shared international team's body of work; U.S.-specific locations are added only once a
   U.S. project is verified.
5. **Real OG image + logo files** — confirm `/og-image.jpg` and `/logo-mark.png` render correctly.

## 8. Measurement plan

- **Google Search Console:** verify property; submit `sitemap.xml`; track impressions/clicks/position
  for the query clusters in §2; watch Coverage and Enhancements (FAQ, Breadcrumb) reports.
- **GA4:** track sessions by landing page and the contact-form submission event (success state).
- **Google Business Profile** (after blocker #1/#2): track calls, direction requests, and profile views.
- **Rich-results validation:** re-run Google Rich Results Test / Schema validator on Home, a service
  page, an article, and Contact after each content change.
- **Cadence:** baseline at launch, then monthly review of the query map and a quarterly content refresh
  of the Insights hub.

## 9. No-guarantee statement

Search rankings depend on factors outside any site's direct control (competitor activity, search-engine
algorithm changes, domain age/authority, and query demand). This strategy applies current best practices
for technical SEO, structured data, content quality, and AI discoverability to maximize the site's
*eligibility* to rank and to be represented accurately by AI systems. It does **not** guarantee any
specific ranking, traffic volume, lead count, or position, and no such guarantees should be made to
clients.
