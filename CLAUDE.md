# CLAUDE.md

> See [AGENTS.md](./AGENTS.md) for full project specs, zero-API cost architecture, directory layout, and step-by-step tool expansion guidelines.
> See [STRATEGY.md](./STRATEGY.md) for monetization strategy, 90-day $300/mo execution plan, AdSense checklist, RPM math, and traffic growth playbooks.
> See [BRAND_LEGAL_PLAYBOOK.md](./BRAND_LEGAL_PLAYBOOK.md) for QuickForma verified legal clearance records, due diligence proofs, and visa safety guidelines.

## Quick Reference Commands

- **Development Server**: `npm run dev` (starts live HMR dev server at `http://localhost:5173`)
- **Production Build**: `npm run build` (compiles TypeScript via `tsc` & bundles assets via `vite build`)
- **Preview Production Build**: `npm run preview`

## Technical Stack & Locked Design System
- **Framework**: React 18 + TypeScript + Vite
- **Brand**: QuickForma (`quickforma.com`)
- **Typography (Locked)**: `Plus Jakarta Sans` (`font-sans` loaded via Google Fonts in `index.html` & enforced globally in `src/index.css`).
- **Color Palette (Locked)**: Universal Light Enterprise Utility Palette (`bg-slate-50` canvas, `bg-white` card containers with `border-slate-200`, `indigo-600` primary action buttons/accents, `slate-900` primary text, `slate-600` secondary text). No dark mode toggles or ad-hoc colors permitted.
- **Icons**: `lucide-react`
- **Execution Mode**: 100% Client-side, $0 server infrastructure cost.
- **Strict File Isolation**: Every tool/calculator MUST have its own standalone component file in `src/components/tools/` (e.g. `TipCalculator.tsx`, `AgeCalculator.tsx`). NEVER consolidate or bundle multiple tools into a single file.
- **Clean SEO Path Routing**: Uses HTML5 History API (`/tools/tool-name`, `/privacy`, `/about`) for clean, indexable URLs without hash fragment symbols (`/#/`).


