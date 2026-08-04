# AGENTS.md — QuickForma Technical Architecture & Frozen Page Standards

Welcome! This repository powers **QuickForma** (`quickforma.com`), a standalone network of free, 100% client-side business utilities, financial calculators, developer tools, and document generators.

---

## 🔒 FROZEN TOOL PAGE ARCHITECTURE (v2.0 Standard)

The page layout across ALL tools on QuickForma is **FROZEN**. No structural layout changes are permitted. All future efforts must focus on **tool quality, client-side execution performance, and business pillar expansion**.

Every tool page follows this exact 10-section sequence:

```
────────────────────────────────────────────────────────────
1. Hero (Interactive Tool Component + Breadcrumbs + H1 + Primary CTA)
2. At a Glance (Category, Best For, Privacy, Time Required, Cost, Last Updated)
3. Quick Overview (What, Who, When, Why)
4. Key Features (4–6 core feature bullet cards)
5. How to Use (Step-by-Step 1, 2, 3, 4)
6. Worked Example (Mandatory: Inputs → Process → Final Result → Interpretation)
7. How It Works / Formula (Conditional: Formula, Logic, Assumptions)
8. Frequently Asked Questions (FAQ Accordion + Schema.org JSON-LD Rich Snippets)
9. Related Tools (Internal Linking Grid across Pillar)
10. Related Guides (Sanity CMS — Conditionally hidden if empty)
────────────────────────────────────────────────────────────
```

---

## 🎯 Core Brand Directive: 100% Pure Business Target

QuickForma targets **businesses, business owners, freelancers, e-commerce operators, developers, and professional business problems exclusively**.
- **NO casual consumer tools**. Every tool MUST solve a high-value commercial, financial, operational, technical, or administrative business workflow problem.

---

## 🏛️ The 6 Strategic Business Pillars

1. **Pillar 1 — Business Finance**: Profit, Margin, Markup, ROI, ROAS, CAC, LTV, Burn Rate, Runway, EBITDA, Cash Flow, Budget, Taxes, Loans, Discounts, Pricing, Depreciation.
2. **Pillar 2 — Business Documents**: Invoices, Receipts, Quotes, Estimates, Purchase Orders, Delivery Notes, Packing Slips, Bills of Sale, Credit Notes, Debit Notes, Expense Reports, NDAs, Offer Letters, Service Agreements.
3. **Pillar 3 — Ecommerce Operations**: Shopify, Stripe, PayPal, Etsy, Amazon FBA, Selling Price, Profit, Bundle Pricing, Inventory Turnover, Stock Valuation.
4. **Pillar 4 — Operations & Manufacturing (Unfair Advantage)**: EOQ, Reorder Point, Safety Stock, OEE, Machine Utilization, Production Capacity, Throughput, Cycle Time, Takt Time, Scrap Rate, Yield, Lead Time, Volumetric Weight.
5. **Pillar 5 — Developer & Technical**: JSON, XML, YAML, JWT, UUID, Regex, SQL, HTML, CSS, Cron, Unix Time, MIME Types, Encoders, Hashing.
6. **Pillar 6 — Professional Productivity**: Word Count, Case Converter, Reading Time, Markdown, Meeting Agendas, Decision Matrix, SWOT, Time Zones.

---

## ⚡ Non-Negotiable Core Principles

1. **Zero-API Cost Architecture**: Every tool must execute 100% locally inside the user's web browser using client-side JavaScript/React logic. No external LLM or AI API calls.
2. **Automatic Content Synchronization Rule**: **CRITICAL** — Whenever an agent adds, edits, or enhances any tool feature, the agent MUST automatically update the corresponding pSEO content, worked examples, FAQs, and Schema.org data in `src/data/sampleToolSeoData.ts` to keep the UI widget and on-page content 100% synchronized!
