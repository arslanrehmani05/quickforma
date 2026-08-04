# AGENTS.md — QuickForma Technical Architecture & Strategic Directives

Welcome! This repository powers **QuickForma** (`quickforma.com`), a standalone network of free, 100% client-side business utilities, financial calculators, developer tools, and document generators.

---

## 🎯 Core Brand Directive: 100% Pure Business Target

**NON-NEGOTIABLE CORE POSITIONING**:
QuickForma targets **businesses, business owners, freelancers, e-commerce operators, developers, and professional business problems exclusively**.
- **NO casual consumer tools** (e.g. no horoscope, no party games, no general fun quizzes).
- Every tool MUST solve a high-value commercial, financial, operational, technical, or administrative business workflow problem.

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
2. **Authority Tool Page Template v1.0 Standard**: EVERY tool page MUST render the **15-Section Authority Template** beneath the interactive widget via `<ToolSeoWrapper>`.
3. **Automatic Content Synchronization Rule**: **CRITICAL** — Whenever an agent adds, edits, or enhances any tool feature, the agent MUST automatically update the corresponding pSEO content, worked examples, FAQs, and Schema.org data in `src/data/sampleToolSeoData.ts` to keep the UI widget and on-page content 100% synchronized!
