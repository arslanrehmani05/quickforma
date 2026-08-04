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

## 🎨 Universal Locked Design System & Immutability Rules

QuickForma uses a strictly **LOCKED Universal Light Enterprise Utility Palette** and typography system designed for high trust, optimal readability, and maximum AdSense revenue. **NO OTHER COLORS, DARK MODES, TOGGLES, OR ALTERNATIVE FONTS ARE EVER PERMITTED IN THIS REPOSITORY.**

### 1. Typography & Font Family (IMMUTABLE)
- **Primary Typography**: `Plus Jakarta Sans` (`font-sans`)
- Google Font Spec: Loaded in `index.html` (Weights: 400, 500, 600, 700, 800)
- CSS Standard: Enforced globally via `src/index.css` (`* { font-family: 'Plus Jakarta Sans', sans-serif; }`).
- Code snippets / output displays: System `font-mono` permitted strictly for raw code, hashes, or JSON strings.

### 2. Color Palette Tokens (IMMUTABLE)
- **App Canvas Background**: Light Slate `#f8fafc` (`bg-slate-50`)
- **Card & Tool Containers**: Pure White `#ffffff` (`bg-white`) with clean borders `#e2e8f0` (`border-slate-200`) & subtle shadow (`shadow-sm`)
- **Primary Action Accent**: Royal Indigo `#4f46e5` (`bg-indigo-600` / `hover:bg-indigo-700` / `text-indigo-600`)
- **Primary Headings & Titles**: Deep Slate 900 `#0f172a` (`text-slate-900` / `font-bold`)
- **Secondary & Subtitle Text**: Medium Slate 600 `#475569` (`text-slate-600`)
- **Form Inputs & Textareas**: Pure White `#ffffff` (`bg-white`) with `border-slate-300`, `text-slate-900`, `focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20`
- **Result Highlight Cards**: Deep Slate `#0f172a` (`bg-slate-900 text-white`) or Light Indigo `#eef2ff` (`bg-indigo-50 border-indigo-100 text-indigo-900`)
- **Trust / Success Badges**: Emerald 600 `#059669` (`text-emerald-700 bg-emerald-50 border-emerald-200`)
- **Warning Badges**: Amber 600 `#d97706` (`text-amber-700 bg-amber-50 border-amber-200`)

---

## 🔗 Clean SEO Path Routing & Interlinking Standards

1. **Clean HTML5 History API URLs**:
   - Every tool view and legal compliance page **MUST** use clean, indexable URL paths (e.g., `quickforma.com/tools/invoice-generator`, `quickforma.com/tools/freelance-hourly-rate-calculator`, `quickforma.com/privacy`).
   - Never use fragment identifier hash routing (`/#/tool`) for tool pages.
2. **Direct SEO Indexing**:
   - Direct visits to `quickforma.com/tools/tool-id` immediately load that specific tool component with unique document titles and meta descriptions.
3. **Internal Interlinking**:
   - Navigating between tools updates the HTML5 history stack (`window.history.pushState`) for seamless bookmarking, social sharing, and search engine crawling.


