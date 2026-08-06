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

---

# AGENTS.md — Setup and Placement Instructions

This file is meant to be placed so it loads automatically before any AI agent touches project code, in every session, without needing to be manually pointed to. Place it at your global agent configuration path so it applies across every project you build — both manufacturing ERPs, ecommerce platforms, QuickForma, ops apps, Vanthrope, Belhide, and any future client work — rather than needing to be re-added project by project.

Install this file in the appropriate global instruction location for the active coding agent — for example, Claude Code, Gemini/Antigravity, or another supported agent. If the location is uncertain, determine it from the agent's current documentation or local configuration before installation, rather than assuming a single fixed path across every tool and operating system.

Every project's own CLAUDE.md should include a short line referring back to this file, so the connection is explicit even though AGENTS.md loads automatically — for example: "This project follows LEARNING-PROTOCOL.md (in AGENTS.md) for how every code change is explained. Follow it without exception alongside this project's own architecture and security standards." This keeps every project's CLAUDE.md self-documenting about which global standards govern it, even for someone opening the project fresh months later.

This protocol runs alongside, and does not replace, any project-specific files such as CLAUDE.md, DATABASE-SECURITY.md, or SYSTEM-ALERT.md. Those govern architecture, security, and error handling for their specific project. This protocol governs how everything is explained to Arslan, in every project, always — it is the teaching layer sitting above whatever technical standards each individual project follows.

Once placed correctly, no agent can begin a code edit in any session, on any project, without this teaching protocol already loaded into its instructions before a single line of project code is read.

---

# LEARNING-PROTOCOL.md

This governs how every code change is explained to Arslan, who is building deep technical literacy in parallel with shipping real projects. This is a teaching requirement, not optional documentation. A change is not "done" until this protocol has been followed, in every session, regardless of how narrow or specific the initial task was — a small bug fix can still touch a new concept, and the protocol still applies from the very first message of a session. This runs alongside any project-specific files such as CLAUDE.md, DATABASE-SECURITY.md, or SYSTEM-ALERT.md — it does not replace them. Those govern architecture, security, and error handling for their specific project. This protocol governs how everything is explained to Arslan, always.

THE RULE: After writing or changing code, before moving to the next step, explain the change directly in the chat or terminal output — visibly, in the conversation itself, every time a new or not-yet-mastered concept is involved. This is never silently deferred to a file.

MASTERY TRACKING — THE CORE FILTER: Mastery must be determined from LEARNING-LOG.md whenever practical. Do not rely solely on conversational memory, since session memory may be incomplete or unavailable across different agents, different sessions, and different machines. A new or not-yet-mastered concept gets a full explanation, every time, following the structure below. A previously mastered concept — evidenced by its tag appearing three or more times with a full explanation already given in LEARNING-LOG.md, in any project, since mastery is tracked globally, not per-project — gets only a one-line reference, such as "using a dictionary here again for O(1) lookup, same pattern as before," unless Arslan explicitly asks for a deeper explanation. The three-entry mark is evidence of familiarity, not an automatic declaration of mastery — some concepts, like a basic variable, need only one explanation ever, while others, like distributed transactions, may warrant deeper explanation even after many prior appearances. Use engineering judgment on top of the log's evidence when deciding whether a concept still deserves a fuller explanation. This filter is what keeps the protocol usable for years instead of becoming noise. When uncertain whether something is mastered, err toward a brief reference, not a full re-explanation — Arslan will ask if he needs more. When uncertain whether LEARNING-LOG.md has been checked this session, check it before assuming a concept is new.

THE REQUIRED EXPLANATION STRUCTURE, for new or unmastered concepts only:

One, what changed — one or two sentences in plain English, no jargon yet.

Two, difficulty — rated Beginner, Intermediate, or Advanced.

Three, concept importance — rated one to five stars, indicating how central this concept is to becoming a strong engineer versus being a minor syntax detail.

Four, frequency — rated Daily, Weekly, Rare, or Almost Never, indicating how often this concept will actually reappear across real work, so Arslan knows where to spend attention.

Five, syntax introduced versus concept introduced, kept as two separate, clearly labeled lists — for example, syntax introduced might be async, await, def, while the concept introduced is asynchronous execution and concurrency. Syntax is the specific notation used in this specific language. Concept is the underlying idea that exists independent of any language. Keeping these separated is what makes the learning transferable rather than tied to memorizing one language's punctuation.

Six, why this approach specifically, including alternatives — state the decision made, the reason for it, at least one alternative that was considered, and the real tradeoff of the choice made, in the form: Decision, Reason, Alternative considered, Tradeoff.

Seven, where this fits in the system — identify whether this change belongs to the frontend, backend, database, authentication, API, infrastructure, or AI pipeline layer, so individual pieces connect into a real mental model of the whole system rather than remaining isolated facts.

Eight, where else this concept appears — name two to four other real contexts, other languages, other frameworks, or other parts of the stack, where this same underlying concept shows up, so the learning transfers rather than staying tied to one language.

Nine, the general engineering principle — go beyond describing what was done in this specific instance to the transferable lesson a working engineer carries forward from it. This is the step that turns a specific fix into durable, reusable understanding.

Ten, the CS50 or roadmap.sh link, if one applies — name the direct connection to a specific concept, week, or topic from that material.

Eleven, prerequisites — name the underlying concepts someone would need to already understand for this explanation to make sense, for example Functions, Objects, HTTP. This builds a real dependency graph over time in LEARNING-LOG.md, showing not just what was learned but what it was built on top of.

Twelve, what breaks if this is done wrong — give one brief, concrete example of a common mistake with this pattern and what actually happens as a result, since this cements the concept by showing its edges, not just its center.

Thirteen, Remember This — end every full explanation with one single, standalone sentence capturing the core insight in a form built to be remembered years later, independent of the surrounding detail. For example: "Hash maps trade memory for fast lookup." This is the sentence that survives long after the rest of the explanation is forgotten, and it should be written with that in mind.

AFTER THE EXPLANATION, LOG IT: Append a compressed, tagged entry to LEARNING-LOG.md, kept as one running log across all projects so mastery tracking and searchability work globally rather than being siloed per project. Each entry records the date, the project, a one-line description of what changed, a set of consistent hashtags covering every concept touched, the importance rating, the frequency rating, the syntax introduced and the concept introduced as two separate lists, the prerequisites, the decision made, the reason for it, the alternative considered, the tradeoff accepted, the general principle in one sentence, the CS50 or roadmap link if applicable, the Remember This sentence, and the full explanation exactly as given in the conversation, not summarized. The tags matter because, years from now, searching a single tag should instantly surface every real project where that concept was encountered, converting the log into a genuine, queryable record of Arslan's own accumulated engineering experience rather than a diary nobody rereads.

WHY THIS FILE EXISTS: Every line of AI-written code, in every project, is a teaching opportunity with real stakes already attached — Vanthrope, QuickForma, Belhide, TextileMode, and any client work — rather than a toy exercise. Concepts anchored to real, cared-about work stick better than the same concepts taught in isolation, which is what makes every hour already spent building also an hour spent learning.

THE ACTUAL GOAL — OPTIMIZE FOR CONCEPTS, NOT SYNTAX: Success is not the ability to recite syntax. Success is that, months from now, encountering dependency injection, idempotency, hash maps, transactions, asynchronous execution, caching, composition, or authentication in any language — Python, TypeScript, Go, or Java — produces instant recognition of what is happening and why. Syntax is the surface. The concept underneath is the actual asset being built, and it transfers to every language and every project that comes after this one.

THE STANDARD FOR DONE: A change is not complete until every new or unmastered concept touched by it has been explained live in the conversation, following the full structure above, and logged with complete tags in LEARNING-LOG.md. If Arslan ever asks what something meant, that is a direct signal the explanation was not specific enough for that concept's actual mastery level, and the correct response is to go deeper, never to assume a familiarity that has not actually been earned yet.



