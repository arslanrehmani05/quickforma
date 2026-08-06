# AGENTS.md — QuickForma Technical Architecture & Content Ownership Rules

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

## ✍️ CONTENT OWNERSHIP & AUTOMATIC SYNC RULES

1. **On-Page pSEO Content (AGENT OWNED)**:
   - The AI agent owns 100% of the On-Page pSEO content in `src/data/sampleToolSeoData.ts` rendered via `<ToolSeoWrapper>`.
   - **AUTOMATIC SYNC RULE**: Whenever a tool widget's inputs, calculation logic, or features are refined or modified, the agent MUST automatically update the corresponding worked examples, formulas, step-by-step instructions, and FAQs in `sampleToolSeoData.ts` in the exact same turn!

2. **Sanity CMS Editorial Guides (USER OWNED)**:
   - The User independently writes long-form editorial guides in Sanity CMS using SEMrush research.
   - The On-Page pSEO system operates completely independently of the Sanity CMS strategy.

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
2. **Automated Verification Pipeline**: `npm run build` runs `python3 scripts/verify_tool_templates.py` to audit 100% template compliance before Vite bundling.

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
