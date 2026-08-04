# AGENTS.md — QuickForma Technical Architecture & Authority Tool Page Standards

Welcome! This repository powers **QuickForma** (`quickforma.com`), a standalone network of free, 100% client-side business utilities, financial calculators, developer tools, and document generators.

---

## ⚡ Non-Negotiable Principles

1. **Zero-API Cost Architecture**: Every tool must execute 100% locally inside the user's web browser using client-side JavaScript/React logic. No external LLM or AI API calls.
2. **Authority Tool Page Template v1.0 Standard**: EVERY tool page MUST render the **15-Section Authority Template** beneath the interactive widget via `<ToolSeoWrapper>`.
3. **Automatic Content Synchronization Rule**: **CRITICAL** — Whenever an agent adds, edits, or enhances any tool feature, the agent MUST automatically update the corresponding pSEO content, worked examples, FAQs, and Schema.org data in `src/data/sampleToolSeoData.ts` to keep the UI widget and on-page content 100% synchronized!

---

## 📐 QuickForma Authority Tool Page Template v1.0

Every tool page follows this exact 15-section layout:

```
────────────────────────────────────────────────────────────
1. Hero & Interactive Tool Widget (ALWAYS FIRST)
   - Breadcrumbs, H1 Title, Subtitle, Interactive Tool Component, Primary CTA / Reset / Copy
────────────────────────────────────────────────────────────
2. At a Glance Summary Box
   - Category, Best For, Privacy (100% Client-side), Time Required, Cost ($0), Last Updated
────────────────────────────────────────────────────────────
3. Quick Overview
   - What it does, Who should use it, When to use it, Why it matters (2–3 concise paragraphs)
────────────────────────────────────────────────────────────
4. Key Features
   - Instant results, Privacy-first, Mobile friendly, No registration, Free, Professional export
────────────────────────────────────────────────────────────
5. How to Use (Step-by-Step)
   - Visual numbered instructions (Step 1, Step 2, Step 3, Step 4)
────────────────────────────────────────────────────────────
6. Worked Example (Inputs → Process → Result → Interpretation)
   - Real-world scenario with concrete inputs and outputs
────────────────────────────────────────────────────────────
7. How It Works (Technical Logic / Formula)
   - Mathematical formula, conversion logic, or algorithm explanation
────────────────────────────────────────────────────────────
8. Best Practices
   - Professional recommendations and industry standards
────────────────────────────────────────────────────────────
9. Common Mistakes & Pitfalls
   - Mistakes, why they happen, and how to avoid them (EEAT signal)
────────────────────────────────────────────────────────────
10. Industry Use Cases
    - Audience-specific cards (Freelancers, Agencies, Small Businesses, Devs, Health, Legal)
────────────────────────────────────────────────────────────
11. Related Questions (AI-First Answer Engine Content)
    - 50–120 word targeted answers for Google AI Overviews, ChatGPT, Gemini, Perplexity
────────────────────────────────────────────────────────────
12. Frequently Asked Questions (FAQ Accordion + JSON-LD Schema)
    - 8–12 comprehensive FAQs with embedded Schema.org JSON-LD for rich Google snippets
────────────────────────────────────────────────────────────
13. Continue Your Workflow (Next Business Task)
    - Sequential workflow progression (e.g. Freelance Rate → Invoice → Contract → Tax)
────────────────────────────────────────────────────────────
14. Related Tools (Internal Linking Grid)
    - Contextual links to 6–8 related QuickForma tools
────────────────────────────────────────────────────────────
15. Interpret Your Results (Optional / Conditional for Calculators)
    - Explains what the output means, benchmarks, and actionable next steps
```

---

## 🛠️ Codebase Structure

```
/src
  /components
    /common      -> Shared UI (CopyButton, ResetButton, Callouts)
    /layout      -> Header Navbar, Footer, ToolCard
    /legal       -> PrivacyPolicy, TermsOfService, AboutUs, ContactUs
    /seo         -> ToolSeoWrapper, Overview, HowItWorks, FAQSection, WorkedExample, etc.
    /tools       -> Standalone Tool Components (1 Tool = 1 Component File)
  /data          -> toolsCatalog.ts (Metadata), sampleToolSeoData.ts (pSEO Content Hubs)
  /pages         -> HomePage.tsx (Categorized Grid, Search Modal, SEO Hero)
  /types         -> index.ts, seo.ts
```

---

## 📋 How to Add or Update a Tool (Agent Protocol)

1. **Create Tool File**: Build `src/components/tools/YourToolName.tsx` with pure monochrome Tailwind styling.
2. **SEO Content Hub**: Create the matching `YOUR_TOOL_SEO` object in `src/data/sampleToolSeoData.ts` with all 15 sections filled out.
3. **Render `<ToolSeoWrapper>`**: At the bottom of `YourToolName.tsx`, render `<ToolSeoWrapper seoData={YOUR_TOOL_SEO} ... />`.
4. **Catalog & Routing**: Register metadata in `src/data/toolsCatalog.ts`, add routing switch in `src/App.tsx`, and add entry to `public/sitemap.xml`.
5. **Feature Update Protocol**: If you ever modify a tool's inputs, logic, or exports, **you MUST update `sampleToolSeoData.ts` in the same commit!**
