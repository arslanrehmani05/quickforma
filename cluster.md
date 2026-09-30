# CLUSTER.md — QuickForma Sanity CMS & Content Architecture (Frozen v3.0)

This document establishes the master technical specification for QuickForma's production Sanity CMS architecture, content cluster taxonomy, and bi-directional relationship mapping between long-form editorial content and the 64 client-side business tools.

---

## 🏛️ 1. CMS Architecture & Deployment Overview

* **Embedded Studio Route**: Accessible directly at `/studio` on `https://www.quickforma.com/studio` and `http://localhost:5173/studio`.
* **Vite React Mount**: Mounted inside `src/pages/StudioPage.tsx` using `<Studio config={sanityConfig} />` from `sanity` core.
* **Single-Page App SPA Catch-All**: Coexists with Vercel SPA rewrites via negative lookahead regex rules in `vercel.json`.
* **Studio Configuration**: `sanity.config.ts` links active Project ID (`60xo4tvv`) and production dataset (`production`).

---

## 📚 2. Complete Frozen Document Schemas (7 Core Schemas)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          QUICKFORMA CMS SCHEMAS                         │
├───────────────────┬──────────────────────┬──────────────────────────────┤
│ PRIMARY CONTENT   │ EDITORIAL HUBS       │ TAXONOMIES & SYSTEM          │
├───────────────────┼──────────────────────┼──────────────────────────────┤
│ 1. Article        │ 3. Collection        │ 5. Category                  │
│ 2. Playbook       │ 4. Glossary          │ 6. Tag                       │
│                   │                      │ 7. Author                    │
│                   │                      │ 8. SEO Defaults (Singleton)  │
│                   │                      │ 9. Site Settings (Singleton) │
└───────────────────┴──────────────────────┴──────────────────────────────┘
```

### 1. Article (`article`) — Primary Content Type
* **Core Fields**: `title`, `slug`, `excerpt`, `featuredImage` (Hotspot/Crop + Alt/Caption), `body` (Portable Text + Code Blocks + Inline Images).
* **Taxonomy References**: `category` (Ref), `tags` (Array of Refs), `author` (Ref).
* **SEO Engine**: `seoTitle`, `metaDescription`, `canonicalUrl`, `primaryKeyword`, `secondaryKeywords` (Array), `searchIntent` (Transactional, Informational, Instructional, Comparative, Reassurance).
* **Cross-Linking Relationships**:
  - `relatedToolIds` (Array of Tool ID strings matching catalog e.g. `freelance-hourly-rate-calculator`, `invoice-generator`, `paypal-fee-calculator`).
  - `relatedArticles` (Array of References to Articles & Playbooks).
* **Publishing Controls**: `publishedAt`, `updatedAt`, `featured` (Boolean), `draftStatus` (Draft, In Review, Approved, Published).
* **UX & Guidance**: `difficulty` (Beginner, Intermediate, Advanced), `estimatedCompletionTime` (e.g. "15 minutes"), `readTime` (e.g. "7 min read"), `enableTableOfContents` (Boolean).

### 2. Business Playbook (`playbook`) — Operational Workflows
* **Scope**: Comprehensive operational guides covering complete business systems (Freelancing, Ecommerce Ops, Manufacturing KPI Frameworks).
* **Distinct Fields**: Same high-depth fields as Article + **`businessImpact`** outcome classification dropdown (`Revenue Growth`, `Cost Reduction`, `Productivity`, `Operational Efficiency`, `Compliance`, `Decision Making`).

### 3. Collection (`collection`) — Editorial Toolkits
* **Scope**: Strategic editorial landing pages grouping multiple QuickForma tools, articles, and playbooks (e.g. *Freelancer Toolkit*, *Ecommerce Operations Suite*).
* **Fields**: `title`, `slug`, `excerpt`, `featuredImage`, `description` (Portable Text), `relatedToolIds` (Array of strings), `relatedArticles` (Refs), `category` (Ref), `seoTitle`, `metaDescription`, `featured` (Boolean).

### 4. Glossary (`glossary`) — Business Term Definitions
* **Scope**: Individual business definitions and mathematical formulas (e.g. *ROI*, *Markup*, *Contribution Margin*, *Lead Time*, *OEE*).
* **Fields**: `term`, `slug`, `definition`, `detailedExplanation` (Portable Text), `formula` (Equation/Formula string), `relatedToolIds` (Array of strings), `relatedArticles` (Refs), `relatedPlaybooks` (Refs), `category` (Ref), `seoTitle`, `metaDescription`, `featured` (Boolean).

### 5. Category (`category`) — Core Pillar Taxonomies
* **Fields**: `name`, `slug`, `description`, `seoDescription`, `featuredImage` (Hotspot Image for landing pages/OpenGraph), `displayOrder` (Integer for manual sorting).

### 6. Tag (`tag`) — Granular Keywords
* **Fields**: `name`, `slug`, `description` (Short text for landing pages), `displayOrder` (Integer).

### 7. Author (`author`) — Multi-Author Authority Profiles
* **Fields**: `name`, `slug`, `photo` (Hotspot), `role`, `biography`, `socialLinks` (Platform + URL).

### 8. Site Settings (`siteSettings`) — Singleton
* **Fields**: `websiteName`, `logo`, `defaultSocialLinks`, `footerInformation`.

### 9. SEO Defaults (`seoDefaults`) — Singleton
* **Fields**: `defaultSeoTitle`, `defaultMetaDescription`, `defaultOpenGraphImage`, `twitterCardSettings`, `organizationSchemaDefaults` (JSON-LD).

---

## 🗂️ 3. Studio Sidebar Hierarchy (`sanity.config.ts`)

The Studio editor navigation is ordered by editorial frequency:

```
1. Articles
2. Collections
3. Business Playbooks
4. Glossary
5. Categories
6. Authors
7. Tags
────────────────────
8. SEO Defaults  (Singleton)
9. Site Settings (Singleton)
```

---

## 🔗 4. Topic Cluster & Bi-Directional Linking Architecture

QuickForma uses a 2-way content bridge connecting static pSEO tool hubs with dynamic Sanity CMS editorial guides:

```
┌──────────────────────────────────────────────┐
│        ON-PAGE pSEO TOOL HUBS (Local)        │
│   (ToolSeoWrapper.tsx / sampleToolSeoData)   │
└──────────────────────┬───────────────────────┘
                       │
             GROQ Query (getRelatedGuides)
             Matches category OR toolId
                       │
                       ▼
┌──────────────────────────────────────────────┐
│        SANITY CMS EDITORIAL GUIDES           │
│   (Articles, Playbooks, Collections, Terms)  │
└──────────────────────────────────────────────┘
```

1. **Local pSEO $\rightarrow$ Sanity Guides**: `ToolSeoWrapper.tsx` calls `getRelatedGuides(category, toolId)`. Section 11 (*Related Guides*) dynamically fetches and renders matching Sanity articles.
2. **Sanity Guides $\rightarrow$ Local Tools**: Articles, Playbooks, Collections, and Glossary entries store `relatedToolIds` strings matching catalog tool IDs (e.g. `freelance-hourly-rate-calculator`), automatically linking readers back to interactive tools.

---

## 🛡️ 5. Backwards Compatibility & Verification

* **Zero Breakage**: `@sanity/client` integration (`src/lib/sanity.ts`), GROQ queries, `urlFor()`, `sanityClient`, and `VITE_SANITY_PROJECT_ID=60xo4tvv` remain 100% backward-compatible.
* **Build Verification**: `npm run build` runs `python3 scripts/verify_tool_templates.py`, generates `sitemap.xml` (74 URLs), and compiles Vite TypeScript modules with **0 errors**.
