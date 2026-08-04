# CLAUDE.md — Quick Reference & Development Guidelines

> See [AGENTS.md](./AGENTS.md) for full project specs, zero-API cost architecture, directory layout, frozen v2.0 page standards, and tool expansion guidelines.
> See [STRATEGY.md](./STRATEGY.md) for monetization strategy, 90-day execution plan, AdSense checklist, RPM math, and traffic growth playbooks.
> See [BRAND_LEGAL_PLAYBOOK.md](./BRAND_LEGAL_PLAYBOOK.md) for QuickForma verified legal clearance records and due diligence proofs.

## Quick Reference Commands

- **Development Server**: `npm run dev` (starts live HMR dev server at `http://localhost:5173`)
- **Production Build**: `npm run build` (compiles TypeScript via `tsc` & bundles assets via `vite build`)
- **Preview Production Build**: `npm run preview`

## Frozen Tool Page Architecture (v2.0 Standard)
1. Hero (Interactive Tool)
2. At a Glance Summary
3. Quick Overview
4. Key Features
5. How to Use (Step-by-Step)
6. Worked Example (Mandatory: Inputs -> Process -> Result -> Interpretation)
7. How It Works / Formula (Conditional)
8. Frequently Asked Questions (FAQ Accordion + Schema.org JSON-LD)
9. Related Tools (Pillar Internal Linking Grid)
10. Related Guides (Sanity CMS — Conditionally hidden if empty)

**Rule**: Whenever tool features are added or changed, the agent MUST update `src/data/sampleToolSeoData.ts` to keep on-page pSEO content in 100% sync.
