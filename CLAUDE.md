# CLAUDE.md — Quick Reference & Development Guidelines

> See [AGENTS.md](./AGENTS.md) for full project specs, zero-API cost architecture, directory layout, frozen v2.0 page standards, content ownership rules, and tool expansion guidelines.
> See [STRATEGY.md](./STRATEGY.md) for monetization strategy, 90-day execution plan, AdSense checklist, RPM math, and traffic growth playbooks.
> See [BRAND_LEGAL_PLAYBOOK.md](./BRAND_LEGAL_PLAYBOOK.md) for QuickForma verified legal clearance records and due diligence proofs.

## Quick Reference Commands

- **Development Server**: `npm run dev` (starts live HMR dev server at `http://localhost:5173`)
- **Production Build**: `npm run build` (runs `verify_tool_templates.py`, `tsc` & `vite build`)
- **Template Audit**: `npm run verify`

## Content Ownership Division
- **Agent Ownership (On-Page pSEO)**: The AI agent manages 100% of On-Page pSEO content in `src/data/sampleToolSeoData.ts`.
- **User Ownership (Sanity CMS)**: User writes SEMrush-researched long-form blog guides in Sanity CMS.
- **Automatic Sync Rule**: Whenever any tool widget is modified or refined, the agent MUST automatically update worked examples, formulas, step-by-step instructions, and FAQs in `sampleToolSeoData.ts`.
