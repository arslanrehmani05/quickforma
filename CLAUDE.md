# CLAUDE.md — Quick Reference & Development Guidelines

> See [AGENTS.md](./AGENTS.md) for full project specs, zero-API cost architecture, directory layout, and step-by-step tool expansion guidelines.
> See [STRATEGY.md](./STRATEGY.md) for monetization strategy, 90-day $300/mo execution plan, AdSense checklist, RPM math, and traffic growth playbooks.
> See [BRAND_LEGAL_PLAYBOOK.md](./BRAND_LEGAL_PLAYBOOK.md) for QuickForma verified legal clearance records, due diligence proofs, and visa safety guidelines.

## Quick Reference Commands

- **Development Server**: `npm run dev` (starts live HMR dev server at `http://localhost:5173`)
- **Production Build**: `npm run build` (compiles TypeScript via `tsc` & bundles assets via `vite build`)
- **Preview Production Build**: `npm run preview`

## Standard Tool Architecture (Authority Template v1.0)
- Every tool MUST render the **15-Section Authority Template** via `<ToolSeoWrapper>` beneath the tool widget.
- **Rule**: Whenever tool features are added or changed, the agent MUST update `src/data/sampleToolSeoData.ts` to keep on-page pSEO content in 100% sync.
- **Tech Stack**: React 18 + TypeScript + Vite + Tailwind CSS (Pure Monochrome Light Mode System)
