# AGENTS.md — QuickForma Technical Architecture & Development Guidelines

Welcome! This repository powers **QuickForma** (`quickforma.com`), a standalone network of free, 100% client-side business utilities, financial calculators, developer tools, and document generators.

---

## ⚡ Zero-API Cost Philosophy (Non-Negotiable Core Principle)

1. **Zero Third-Party AI / LLM API Dependencies**: Every tool must execute 100% locally inside the user's web browser using client-side JavaScript/React logic.
2. **Zero Server Overhead**: The entire platform compiles into static HTML/JS/CSS assets deployed on Vercel's global CDN ($0 server maintenance).
3. **Strict Data Privacy**: User inputs, PDF invoice data, QR codes, and text counters are processed in-browser. Nothing is transmitted to external servers.

---

## 🛠️ Tech Stack & Directory Structure

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Pure Monochrome Light Mode Design System (`src/index.css`)
- **Icons**: `lucide-react`
- **Analytics**: Google Analytics 4 (`G-YF1E8G3EDE`) + Microsoft Clarity (`xx23wojkqo`)
- **Sitemap**: `public/sitemap.xml` (Auto-indexed by Google Search Console & Bing Webmaster)

```
/src
  /components
    /common      -> Shared UI (CopyButton, ResetButton, Callouts)
    /layout      -> Header Navbar, Footer, ToolCard
    /legal       -> PrivacyPolicy, TermsOfService, AboutUs, ContactUs
    /seo         -> ToolSeoWrapper, Overview, HowItWorks, FAQSection, etc.
    /tools       -> 42 Flagship Client-Side Tool Components
  /data          -> toolsCatalog.ts (42 tools metadata), sampleToolSeoData.ts
  /pages         -> HomePage.tsx (Categorized Grid, Search Modal, SEO Hero)
  /types         -> index.ts, seo.ts
```

---

## 🚀 The 42 Live Flagship Tools

1. **Financial Calculators (14)**: Tip & Bill Splitter, Freelancer Hourly Rate, Break-Even Point, Payroll Tax Estimator, Mortgage Calculator, Compound Interest, Loan Payoff, ROI Calculator, Discount Calculator, Sales Tax, Markup & Margin, CPM Ad Cost, Customer LTV, Salary/Hourly Converter.
2. **Business & Legal Document Generators (9)**: Instant Invoice Generator, NDA Template, Freelance Contract, Bill of Sale, Bill of Lading, Promissory Note, Receipt Generator, Rent Receipt, Meeting Minutes, Cover Letter Formatter.
3. **Utilities & Developer Tools (14)**: QR Code Generator, Password Generator, Unit Converter, JSON Formatter & Validator, Base64 Encoder/Decoder, URL Encoder/Decoder, Hash Generator, Color Picker/Converter, Image Resizer, Glassmorphism CSS Generator, Barcode Generator, PDF Page Counter, Timezone Converter.
4. **Text & Content Tools (5)**: Word & Character Counter, Lorem Ipsum Generator, Case Converter, Slug Generator, Business Name Generator, Slogan Generator.
5. **Productivity & Daily Utilities (5)**: Age Calculator & Birthday Fact, Pomodoro Timer, Date Difference, Aspect Ratio Calculator, Random Name Picker, Text Diff Checker.

---

## 📋 How to Add a New Tool (Step-by-Step)

When adding a new tool to QuickForma:
1. **Component**: Create `src/components/tools/YourToolName.tsx` using 100% client-side calculation logic and pure monochrome Tailwind styling.
2. **Metadata**: Add the tool definition to `TOOLS_CATALOG` in `src/data/toolsCatalog.ts`.
3. **SEO Wrapper**: Wrap tool with `<ToolSeoWrapper>` in `App.tsx` for rich Schema.org structured data and FAQ accordion.
4. **Sitemap**: Add entry to `public/sitemap.xml`.
