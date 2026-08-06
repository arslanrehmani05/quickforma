# QUICKFORMA TOOL CONTENT SYSTEM v2.0
# The complete, standing standard for every tool page's on-page 
# content. Read this before writing, editing, or regenerating 
# ANY tool's content. This governs the content beneath the tool 
# widget — the 10-section template — for every one of the 64+ 
# tools, present and future. When a tool's logic changes, this 
# document is what determines how the surrounding content 
# updates in response.

═══════════════════════════════════════════════
PART I — FOUNDATIONS
═══════════════════════════════════════════════

## 1. Purpose of This Document
This document exists so that every tool page — regardless of 
which tool, which pillar, or when it was built — reads as if 
written by the same disciplined, expert hand. It is the 
difference between "64 pages a script generated" and "64 pages 
a real business built." Gemini reads this file in full before 
generating or editing any tool's content, and every output is 
checked against it before publishing.

## 2. Mission
Every QuickForma tool page should be the single best page on 
the internet for answering the specific problem that brought 
the visitor there — not the flashiest, not the longest, the 
most genuinely useful. A visitor should never need to open a 
second tab.

## 3. Content Philosophy
QuickForma does not write content to satisfy Google. It writes 
content to satisfy the person standing in front of a real 
business problem, and in doing so, satisfies Google as a 
byproduct. Every sentence must answer the question: "does this 
help someone actually solve their problem, or does it exist 
because a template said this section should have words in it." 
If a sentence fails that test, cut it.

## 4. Core Principles
- Specificity beats generality. "Businesses typically save 
  8-12 hours weekly" beats "businesses save significant time."
- One page, every intent. A visitor might want the number, the 
  formula, the reasoning, or an example — the page serves all 
  four without forcing anyone to read past what they need.
- No filler. If a section would repeat what another section 
  already said, cut it or merge them.
- Correctness is non-negotiable. A wrong formula or a wrong 
  worked-example calculation destroys trust instantly and is a 
  worse outcome than a thin page — verify every number.
- Content updates with the tool. A tool's logic and its 
  surrounding content are never allowed to drift out of sync — 
  see Part IV's Update Process.

## 5. Understanding Search Intent
Every keyword a tool targets carries multiple layered intents, 
and the page must satisfy the ones that are actually present 
for THAT specific tool — not force all of them if they don't 
apply:
- **Transactional intent**: "I need the answer right now" — 
  served by the tool widget itself, always first, always 
  above the fold.
- **Informational intent**: "I want to understand this concept" 
  — served by Quick Overview, How It Works.
- **Instructional intent**: "I want to know how to do this" — 
  served by How to Use, Worked Example.
- **Comparative/evaluative intent**: "I want to know if my 
  number is good or bad" — served by Interpret Your Results.
- **Reassurance intent**: "I want to know this is trustworthy 
  and I'm using it right" — served by FAQ, At a Glance 
  (privacy/cost/time signals).
Before writing any tool's content, identify which of these 
five intents genuinely apply to that specific tool — not every 
tool carries all five with equal weight, and forcing weak 
content into an intent that doesn't fit the tool produces 
filler, which Principle 4 forbids.

## 6. Understanding Business Intent
Beyond search intent, every visitor arrived because of an 
underlying business situation. A person using the Break-Even 
Calculator isn't curious about break-even math — they're 
deciding whether to launch a product, and are anxious about 
it. Content should acknowledge and speak to that underlying 
situation, not just the mechanical question. This is what 
separates content that feels understanding from content that 
feels generated. Every tool's Quick Overview section should 
include one sentence naming the real business situation behind 
the calculation.

## 6.5 Implementation Verification
Before writing or updating any tool page, inspect the current 
implementation.

The implementation is always the source of truth.

Verify:
- Inputs accepted by the tool
- Outputs produced
- Validation rules
- Supported options
- Available features
- Export functionality
- Copy/share capabilities
- Limitations
- Error handling

Never describe functionality that does not exist.
Never omit functionality that does exist.

If the implementation has changed since the last content update, 
regenerate every section affected by that change before publishing.
The generated content must accurately reflect the current version 
of the tool.

═══════════════════════════════════════════════
PART II — THE TOOL PAGE SYSTEM
═══════════════════════════════════════════════

## 7. Universal Tool Page Architecture
Every tool page follows the frozen 10-section structure, in 
this exact order, without exception:
1. Hero  2. At a Glance  3. Quick Overview  4. Key Features  
5. How to Use  6. Worked Example  7. How It Works  
8. Interpret Your Results  9. FAQ  10. Related Tools + Related Guides

No tool skips a section. If a section genuinely has minimal 
content for a specific tool (e.g., a very simple converter's 
"How It Works" may be brief), it is shortened, never removed — 
removing a section breaks the structural consistency that both 
users and Google's crawlers learn to expect from the site.

## 8. Section Standards
Every section, regardless of tool:
- Has its own clear subheading (H2), never relies on visual 
  spacing alone to separate from the prior section
- Is scannable — short paragraphs (2-4 sentences), bullet 
  points where a list is genuinely a list, bold text used 
  sparingly to mark the single most important phrase per 
  paragraph, never more
- Never repeats a sentence, statistic, or explanation already 
  given in an earlier section on the same page

## 9. Writing Standards
- Second person ("you," "your business") — the visitor is 
  being spoken to directly, not lectured about "users" in the 
  abstract
- Active voice by default — "This calculates your break-even 
  point" not "Your break-even point is calculated by this tool"
- No hedging language ("might," "could potentially," "in some 
  cases may") unless the underlying fact genuinely is 
  conditional — false confidence and false uncertainty are both 
  errors
- Numbers stated precisely where precision is knowable, ranges 
  stated honestly where it isn't
- Zero marketing language ("revolutionary," "game-changing," 
  "the ultimate") — this is a utility site, not a startup 
  landing page; trust comes from restraint, not enthusiasm
- Sentence and paragraph length varied deliberately across a 
  page — uniform rhythm reads as generated, human writing 
  naturally varies

### Never Invent
Never fabricate:
- statistics
- benchmark values
- percentages
- adoption figures
- customer behavior
- legal requirements
- accounting rules
- medical guidance
- performance claims

If a claim cannot be verified from implementation or authoritative 
sources, do not include it. Prefer explaining uncertainty rather 
than presenting speculation as fact.

## 10. User Experience Standards
- The tool widget is always usable without reading a single 
  word of surrounding content — the content supports, never 
  gates, the core function
- Every section must be skippable — a returning user who just 
  wants the tool should never feel forced past content to reach 
  it (tool stays above all ten sections, always)
- Mobile readability checked explicitly per page — line length, 
  font size, and tap targets on the FAQ accordion and Related 
  Tools grid specifically, since these are the most 
  interaction-heavy sections

## 11. SEO Standards
- One H1 per page, matching real search phrasing (verified via 
  keyword research per Part IV), never keyword-stuffed
- H2s for each of the 10 sections, H3s only where a section 
  genuinely needs sub-structure (e.g., multiple FAQ 
  sub-topics)
- Primary target keyword appears naturally in: H1, first 100 
  words of Quick Overview, at least one FAQ question, meta 
  title, meta description — never forced into a sentence where 
  it reads unnaturally
- Secondary/related keywords woven into How It Works and FAQ 
  sections naturally, sourced from real "People Also Ask" and 
  related-search research, not guessed
- Meta title under 60 characters, meta description under 155, 
  both written for click-through, not just keyword inclusion
- Canonical tag present on every page

## 12. AI Search Standards
Every tool page is also written to be easily extracted and 
cited by AI answer engines (ChatGPT, Perplexity, Gemini, AI 
Overviews), which increasingly source direct answers rather 
than sending a click:
- Every FAQ question is phrased as a complete, natural-language 
  question a person would actually type or ask aloud ("How is 
  ROI calculated?" not "ROI Formula")
- Every FAQ answer opens with a direct, complete, self-
  contained answer in the first sentence — a system extracting 
  just that sentence should get a correct, useful answer with 
  no missing context
- How It Works sections state formulas explicitly and clearly, 
  labeled, not buried in prose — "ROI = (Net Profit / Cost of 
  Investment) × 100" as its own visually distinct line, not 
  woven into a paragraph
- Worked Examples are structured as clear input → step → 
  output sequences, not narrative prose, since this structure 
  is what extracts cleanly into an AI-generated answer

## 13. EEAT Standards (Experience, Expertise, Authoritativeness, Trustworthiness)
- Every "At a Glance" section states genuinely verifiable 
  facts (100% client-side/private, $0 cost, no signup) — these 
  are trust signals precisely because they're checkable, not 
  claimed
- Formulas and calculations must be independently verifiable 
  against a standard authoritative source (a standard 
  accounting/finance definition) — never invented or simplified 
  in a way that produces a wrong answer
- No unverifiable authority claims ("trusted by thousands," 
  "the #1 tool for X") anywhere on any page — QuickForma's 
  trust is built through genuine content quality and correct 
  math, never asserted credibility

## 13.5 Competitive Differentiation
QuickForma does not attempt to match competing pages.
Every page should intentionally exceed the strongest competing pages.
Before generating content, identify gaps across the highest-ranking results.

Priority areas include:
- Better explanations
- Better worked examples
- Better interpretation
- Better business context
- Better FAQs
- Better workflow guidance
- Better edge-case coverage

Every completed authority page should contain at least three 
meaningful improvements that competing pages do not provide.

═══════════════════════════════════════════════
PART III — SECTION SPECIFICATIONS
═══════════════════════════════════════════════

## 14. Hero
Contains: the interactive tool widget itself, breadcrumb 
navigation (Home > Category > Tool), H1 title tag matching 
target search phrasing exactly. Nothing else — no marketing 
copy above the tool, the tool is the hero, literally and 
structurally.

## 15. At a Glance
A compact, scannable strip of 4-5 facts: Category, Privacy 
(e.g. "100% client-side, nothing leaves your browser"), Time 
Required ("Instant"), Cost ("$0, no signup"), Last Updated 
date. Builds immediate trust before any reading is required.

## 16. Quick Overview
3-5 sentences answering: what this tool does, who uses it, 
when you'd need it, and — per Principle 6 — the real business 
situation underneath the search. This is the section most 
responsible for making the page feel understanding rather than 
mechanical.

## 17. Key Features
4-6 bullet points, each one short (under 15 words), each 
describing a genuine, specific capability — never generic 
("Easy to use") always specific ("Handles both markup and 
margin calculations from the same inputs").

## 18. How to Use
Numbered steps (3-5 typically), each one action-oriented and 
specific to the actual tool's interface ("Enter your total 
revenue for the period" not "Input your data"). This section 
also captures Google's HowTo schema eligibility — steps must 
be genuinely sequential and distinct, not padding a single 
action into three steps.

## 19. Worked Example (Mandatory, Never Skipped)
A complete, realistic business scenario: Sample Inputs → 
Calculation Steps (shown explicitly, not summarized) → Final 
Output → Actionable Interpretation (what should this business 
actually do with this result). The scenario must use a 
plausible, specific business context ("A freelance graphic 
designer billing $85/hour...") not abstract numbers with no 
story. This is consistently the highest-value section for both 
user trust and AI-extraction quality.

## 20. How It Works / Formula
States the underlying formula explicitly and visually 
distinct (per Section 12's AI Search Standards), defines every 
variable used, and explains any assumptions or edge cases 
(e.g., how the tool handles negative inputs, rounding rules). 
Conditional — brief for simple converters, fuller for financial 
calculators with real formulas behind them.

## 21. Interpret Your Results
The section most competitors skip entirely, and the one most 
directly tied to Principle 6 (business intent). After getting 
a number, a visitor's real question is "is this good?" This 
section gives context: typical ranges/benchmarks where genuine 
industry standards exist, what a high or low result might 
indicate, and next-step guidance — never definitive financial 
advice, always framed as general context.

## 22. FAQ
3-6 questions, each phrased as natural language per Section 12, 
each answered with a direct, self-contained first sentence. 
Sourced from real "People Also Ask" data (see Part IV), never 
invented questions nobody actually asks. Backed by FAQPage 
JSON-LD schema, verified valid via Google's Rich Results Test 
before publishing.

## 23. Related Tools + Related Guides
Related Tools: 3-4 tools from the same business pillar, each 
with a one-line reason for the connection ("Once you know your 
margin, calculate your break-even point"), never a bare link 
list. Related Guides: dynamic container, populated only when 
genuine editorial content exists that relates — never shown 
empty or with placeholder content; conditionally hidden per 
the existing build until real guides land.

═══════════════════════════════════════════════
PART IV — RESEARCH WORKFLOW
═══════════════════════════════════════════════

## Keyword Workflow
Before writing or updating any tool's content:
1. Identify the primary target term (what the tool's own name/
   function naturally matches)
2. Pull Google's autocomplete suggestions and "People Also Ask" 
   results for that term — free, sufficient at this scale
3. Note 3-5 genuinely related secondary terms/phrasings 
   appearing across autocomplete and PAA
4. Confirm the primary term's actual search intent matches what 
   Section 5 predicts — if PAA results reveal an intent not yet 
   covered on the page, that becomes a new FAQ question
5. **KEYWORD LOGGING**: Record all primary terms, secondary terms, 
   PAA questions, and intent classifications in KEYWORDS.md.

## Competitor Analysis
For each tool, before writing:
1. Search the primary term, open the top 3-5 ranking results
2. Note what they cover and — more importantly — what they 
   DON'T cover (per the earlier "thin competition" finding, 
   this is usually significant)
3. Note their formula/worked-example quality specifically — 
   this is the most common weak point across competitors and 
   QuickForma's clearest differentiation opportunity

## Gap Analysis
From the competitor pass, explicitly list: what question do 
real searchers have (per PAA) that NONE of the top results 
answer well? That gap becomes the page's strongest FAQ entry 
or a dedicated Interpret Your Results insight — this is the 
single highest-leverage step in the entire research workflow, 
since it's where QuickForma pages outright beat every existing 
result rather than just matching them.

## SERP Analysis
Note whether the current top results include a featured 
snippet, an AI Overview, a "People Also Ask" box, or any rich 
result — this indicates what structured content format Google 
is already choosing to reward for this specific query, and the 
page should be structured to be eligible for the same 
treatment (matching heading structure, schema type).

## Entity Research
For any tool touching a defined business/financial concept 
(margin, depreciation, ROI), confirm the definition and formula 
used matches standard, authoritative usage (standard accounting 
definitions) — never a simplified or non-standard version, 
even if simpler math would be easier to explain. Correctness 
protects EEAT (Section 13) and prevents a wrong-answer 
reputation.

═══════════════════════════════════════════════
PART V — QUALITY STANDARDS & MAINTENANCE
═══════════════════════════════════════════════

## Review Checklist (Arslan reviews every Gemini-generated update against this before approving)
□ All 10 sections present, in correct order
□ Worked Example math independently verified correct
□ Formula in How It Works matches standard, authoritative usage
□ FAQ questions are real (sourced from PAA), not invented
□ FAQ answers open with a direct, self-contained first sentence
□ No repeated sentences/facts across sections
□ No marketing language, no hedging language, no unverifiable claims
□ Primary keyword present naturally in H1, Quick Overview opening, meta title, meta description
□ Related Tools links are genuinely relevant, each with a reason, not a bare list
□ Reads as written by a consistent, expert voice — not visibly generated

## Publishing Checklist
□ Meta title under 60 characters, meta description under 155
□ Canonical tag present
□ FAQPage and HowTo schema present and validated via Google's Rich Results Test
□ Page tested on mobile — FAQ accordion and Related Tools grid specifically
□ Page added to/already covered by sitemap.xml
□ Zero console errors on the page

## Update Process (Deterministic Rules)
Triggered whenever a tool's underlying logic, inputs, outputs, or features change:

1. Identify every section whose content depends on the changed logic.
2. Determine exact affected sections:
   - **New input field** → Update: Quick Overview, Key Features, How to Use, Worked Example, FAQ
   - **New calculation logic** → Update: Worked Example, How It Works, Interpret Your Results, FAQ
   - **New export feature** → Update: Key Features, How to Use, FAQ
   - **Validation changes** → Update: How to Use, FAQ, Worked Example (if applicable)
   - **UI-only changes with no functional impact** → Do not regenerate content unless instructions or terminology changed.
3. Regenerate ONLY the affected sections — sections unrelated to the change are never touched, to avoid introducing drift.
4. Re-verify the Worked Example's math against the new logic explicitly.
5. Re-run the Review Checklist on the full page.
6. Update "Last Updated" date in the At a Glance section.

## Content Regeneration Policy
QuickForma content is implementation-driven.
Whenever a tool changes, regenerate only the sections whose accuracy depends on the modified functionality.
Do not rewrite unaffected sections.

Preserve:
- writing style
- internal links
- examples
- FAQs
- terminology

unless those sections become inaccurate because of the implementation change.
The goal is incremental maintenance rather than unnecessary regeneration.

## Version Control
Every tool's content file records its own last-updated date and a one-line changelog note (what changed and why) at the top of its content data, separate from the page's own visible "Last Updated" — this is an internal record for you, not user-facing, so that six months from now it's clear why any given page's content looks the way it does.

═══════════════════════════════════════════════
GOVERNING RULE
═══════════════════════════════════════════════
Before Gemini generates or edits any tool's content, it reads 
this file in full. Before Arslan approves any generated 
content, it passes the Review Checklist. No tool page ships or 
updates without both steps completed. This is what keeps 64 
tools — and however many follow — reading like one disciplined 
body of work instead of 64 independent, inconsistent outputs.
