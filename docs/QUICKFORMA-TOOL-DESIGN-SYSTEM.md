# QUICKFORMA TOOL DESIGN SYSTEM v1.0 (SPECIFICATION & CONTRACT)

**Status:** Permanent UI/UX Standard  
**Target:** QuickForma Universal Tool Platform (`quickforma.com`)  
**Scope:** Shared UI Primitives (`src/components/ui/*`), Tool Family Templates (`src/components/templates/*`), and 113+ Catalog Tools (`src/components/tools/*`).

---

## 1. DESIGN PHILOSOPHY & ARCHITECTURE

QuickForma operates under a **Strict Layered UI Hierarchy**:

```
GLOBAL QUICKFORMA DESIGN SYSTEM (Plus Jakarta Sans, Slate Backgrounds, Indigo Accent)
              ↓
      SHARED UI PRIMITIVES (src/components/ui/*: InputField, ResultCard, ToolHeader, ModePillsBar, Button)
              ↓
       TOOL FAMILY TEMPLATES (src/components/templates/*: SimpleCalculatorTemplate, MultiModeCalculatorTemplate, etc.)
              ↓
       INDIVIDUAL TOOLS (src/components/tools/*)
```

> **CORE PRINCIPLE: Same product, different instruments.**  
> Functional differences are allowed and encouraged (e.g. GPA tables vs JSON editors). Arbitrary structural or CSS styling divergences between tools of the same functional complexity are prohibited.

---

## 2. SHARED UI PRIMITIVES (`src/components/ui/`)

### A. `<InputField />`
- **Label Typography:** Sentence Case (`text-xs font-semibold text-slate-700 mb-1.5`). UPPERCASE tracking-wider is deprecated.
- **Input Box Styling:** `bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all`.
- **Typography Rule:** Proportional `font-sans` for standard numbers and text. Use `isMono={true}` (`font-mono`) ONLY for code, hashes, tokens, JSON, and technical payloads.
- **Mobile Keyboard:** Must supply appropriate `inputMode="decimal"` or `inputMode="numeric"` for mobile inputs.

### B. `<ResultCard />`
- **Single-Metric Variant (`variant="indigo"`):** `bg-indigo-600 text-white rounded-2xl p-6 shadow-md shadow-indigo-600/10`. Dominant 3xl/5xl white bold output + light indigo contextual subtitle.
- **Multi-Metric Dashboard (`variant="dark"`):** `bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl`. Sub-metric cards use `bg-white/5 border border-white/10 p-4 rounded-2xl`.

### C. `<ToolHeader />`
- Standardized header containing an Indigo icon badge (`bg-indigo-50 border border-indigo-100 text-indigo-600 p-3 rounded-2xl`), H2 title (`text-xl sm:text-2xl font-bold text-slate-900`), description, and optional category badge.

### D. `<ModePillsBar />`
- Standardized horizontal mode switcher container (`bg-slate-100 p-1.5 rounded-2xl`).
- Active pill: `bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-[1.02]`.
- Inactive pill: `text-slate-600 hover:text-slate-900`.

---

## 3. THE 6 TOOL FAMILY TEMPLATES

Every catalog tool MUST inherit exactly one of the 6 canonical Tool Family Templates:

| Family | Layout Template | Key Use Cases |
| :--- | :--- | :--- |
| **Family 1: Simple Calculators** | `SimpleCalculatorTemplate` (2-Column Side-by-Side 50/50 Grid Card) | Discount, Loan Payoff, Sales Tax, CPM, ROI, Break-Even Calculators |
| **Family 2: Multi-Mode Calculators** | `MultiModeCalculatorTemplate` (Mode Pills Bar + Dynamic Input/Result Grid) | Percentage Calculator, Unit Converter, Average Calculator |
| **Family 3: Document Generators** | Form Inputs Left (50%) + Live Document Paper Preview Right (50%) | Invoice, Receipt, Bill of Sale, NDA Generators |
| **Family 4: Complex Dashboards** | `ComplexDashboardTemplate` (Inputs Card + Dark Navy Result Dashboard) | Attendance, GPA, Depreciation, OEE, EOQ Calculators |
| **Family 5: Developer Utilities** | Dual Code Editors (Input / Output) + Monospace Formatting | JSON Validator, JWT Decoder, Base64, Hash Generator |
| **Family 6: Text Utilities** | Auto-Expanding Textarea + Stat Metric Grid | Word Counter, Case Converter, Readability Analyzer |

---

## 4. FUTURE-TOOL CONTRACT (RULES FOR TOOL #114+)

When a developer or AI coding subagent creates a new tool (Tool #114+), it MUST adhere to the following contract:

1. **Page Geometry:** Wrap component in `max-w-4xl mx-auto space-y-6`.
2. **Header:** Use `<ToolHeader icon={Icon} title="..." description="..." />`.
3. **Inputs:** Consume `<InputField label="..." prefix="..." suffix="..." />`. No ad-hoc input styling.
4. **Result Surface:** Consume `<ResultCard variant="indigo" />` (single metric) or `<ResultCard variant="dark" />` (multi-metric analytical dashboard).
5. **Mode Switching:** Multi-mode tools MUST consume `<ModePillsBar options={...} activeMode={...} onSelectMode={...} />`.
6. **Zero Math Logic Mutation:** Business logic, formula engines, and calculation functions must remain isolated in pure utility functions.
7. **Mobile Verification:** Must enforce 44px touch targets and test at 320px viewport without horizontal overflow.
