# AGENTS.md — QuickForma / Utility Tools Venture Architecture & Guidelines

Welcome AI Assistants (Gemini, Claude, Cursor, Copilot, ChatGPT). This document outlines the vision, technical standards, project structure, and expansion playbook for this standalone utility tools network.

---

## 🎯 Core Philosophy & Business Strategy

1. **100% Client-Side Engine (Zero-API Cost Policy)**:
   - Every tool on this platform must perform calculations, file conversions, text formatting, and document generation **entirely inside the client's browser** (React, Web Crypto API, HTML5 Canvas, SVG, client-side JS).
   - **No LLM/AI API calls**: AI API costs scale with traffic, whereas ad revenue pays cents per visit. At volume, AI tools lose money precisely when they succeed. Client-side tools have $0 server cost at 1 user or 10,000,000 users.

2. **Frictionless User Experience (The Anti-SaaS Moat)**:
   - No user sign-up required.
   - No paywalls or forced email collection for basic utility.
   - Sub-millisecond instant calculation and file downloads.

3. **Ad-Monetized Ecosystem ("Utility Factory" Model)**:
   - Single high-performance React + TypeScript codebase.
   - Dedicated SEO pages per tool targeting specific high-intent search terms.
   - AdSense / Premium Ad Network placements positioned non-intrusively below the functional tool widget.

4. **Strict Modular Architecture (1 Tool = 1 Dedicated File)**:
   - **MANDATORY RULE FOR ALL AI ASSISTANTS / LLMS**: Every single tool or calculator MUST have its own dedicated, isolated file inside `src/components/tools/` (e.g., `TipCalculator.tsx`, `AgeCalculator.tsx`, `InvoiceGenerator.tsx`).
   - **NEVER** combine multiple tools, calculators, or utility widgets into a shared or single file.
   - Each tool component must remain completely self-contained, modular, and cleanly decoupled to support dedicated SEO landing pages, independent state management, and maintenance safety.

---

## 🛠️ Project Structure

```
UtilityToolsVenture/
├── index.html                   # SEO Meta Tags, Fonts, Root container
├── package.json                 # Dependencies (React 18, Vite, Tailwind CSS, Lucide Icons)
├── tsconfig.json                # Strict TypeScript configuration
├── vite.config.ts               # Vite build settings
├── tailwind.config.js           # Theme tokens (Dark Slate #0a0d14, Indigo #6366f1)
├── src/
│   ├── main.tsx                 # React DOM root entrypoint
│   ├── App.tsx                  # Core app router, catalog registry, Cmd+K search modal
│   ├── index.css                # Tailwind directives & glassmorphism utilities
│   ├── types/
│   │   └── index.ts             # Tool metadata & state interfaces
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Header with Cmd+K search trigger & category links
│   │   │   ├── Footer.tsx       # Internal linking SEO hub & privacy badge
│   │   │   └── ToolCard.tsx     # Homepage grid card component
│   │   └── tools/
│   │       ├── InvoiceGenerator.tsx # PDF invoice builder with tax & logo support
│   │       ├── QRCodeGenerator.tsx  # Canvas QR generator (PNG download)
│   │       ├── WordCounter.tsx      # Real-time text analysis & case transforms
│   │       ├── PasswordGenerator.tsx# Cryptographic entropy password generator
│   │       ├── TipCalculator.tsx    # Restaurant bill splitter
│   │       ├── AgeCalculator.tsx    # Exact age & birthday countdown
│   │       └── UnitConverter.tsx    # Bi-directional metric/imperial converter
│   └── pages/
│       └── HomePage.tsx         # Hero banner, category tabs, SEO content section
```

---

## 🚀 How to Add a New Tool to this Repository

When tasked with adding a new client-side tool:
1. **Create the Tool Component**: Place inside `src/components/tools/NewToolName.tsx`. Use Tailwind CSS and glassmorphism styling (`glass-card`, `glass-panel`).
2. **Register in Catalog**: Open `src/App.tsx` and add a new entry to `TOOLS_CATALOG` with unique `id`, `name`, `category`, `description`, `iconName`, `metaTitle`, and `metaDescription`.
3. **Add Routing Case**: Update `renderToolComponent()` inside `src/App.tsx`.
4. **Build Check**: Verify zero TypeScript errors with `npm run build`.

---

## 📈 SEO & Quality Guidelines (Anti-Vibecode Protocol)

- **1 Tool = 1 Isolated File**: Every single tool must be built inside its own dedicated component file in `src/components/tools/ToolName.tsx`.
- **Zero Input Glitches**: All tool widgets must handle empty inputs cleanly without displaying `NaN`, `undefined`, or unformatted text.
- **Mobile First**: All tool widgets must be fully responsive across 320px screens up to 4K displays.
- **Accessibility & Contrast**: High contrast text on dark backgrounds (`#0a0d14` background, `slate-100` body text, `indigo-400` primary accents).
- **Print Optimization**: For document generators (e.g., Invoice, Receipt, NDA), include `.no-print` classes on UI controls so `window.print()` outputs clean documents.
- **Restrained Ad Placements**: Place ad units beneath the main functional tool widget so users get immediate value above the fold.
- **Full Catalog Roadmap**: Refer to `STRATEGY.md` for the complete 50-tool roadmap across 6 categories (Financial, Legal/Business, Converters, Developers, Content, Productivity).

