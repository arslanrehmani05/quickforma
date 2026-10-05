import React, { useState } from 'react';
import { useFormValue, useDocumentOperation, useClient, PatchEvent, set } from 'sanity';
import { Card, Stack, TextArea, Button, Text, Badge, Flex, Inline, Box } from '@sanity/ui';
import { parseMasterMarkdownTemplate, ParsedEncyclopediaData } from '../utils/markdownToSanity';

const MASTER_LLM_PROMPT = `CRITICAL OUTPUT MODE — MACHINE-READABLE SOURCE

The QuickForma importer requires RAW MARKDOWN SOURCE.

The completed entry MUST be returned as raw Markdown source, NOT as rendered Markdown.

The ENTIRE completed entry MUST be contained inside EXACTLY ONE fenced Markdown code block.

The literal characters #, ##, and ### are REQUIRED DATA. They MUST physically appear in the generated output exactly as specified by the schema.

The model MUST preserve the Markdown source rather than relying on the interface to render it.

OUTPUT CONTRACT:

1. The first line MUST be exactly the opening Markdown fence \`\`\`markdown with no additional characters.
2. The complete QuickForma Encyclopedia entry MUST appear inside that code block.
3. Every required heading MUST retain its literal #, ##, or ### prefix.
4. The final line MUST be exactly the closing Markdown fence \`\`\` with no additional characters.
5. NOTHING may appear before the opening code fence.
6. NOTHING may appear after the closing code fence.
7. The response MUST contain exactly ONE fenced code block.
8. Do NOT provide a second version of the entry.
9. Do NOT provide explanations, commentary, notes, warnings, or analysis outside the code block.
10. Do NOT convert headings into bold text, plain text, HTML, JSON, or any alternative format.
11. Do NOT remove, hide, escape, or replace any required # characters.
12. Do NOT add colons to headers.
13. Do NOT rename headers.
14. Do NOT reorder headers.
15. Do NOT change heading levels.
16. Do NOT create alternative headers.
17. Do NOT add schema fields that are not present in the template.
18. Do NOT omit schema fields that are present in the template.

IMPORTANT:
The # characters are literal source characters required by the QuickForma importer. Do not treat "include the # characters" as merely a request to create Markdown headings. The actual # characters must remain physically present in the raw output.

CRITICAL FORMATTING INSTRUCTIONS FOR LLM:

Format the following topic or raw notes into the QuickForma Encyclopedia Master Template matching these EXACT markdown headers and heading levels (#, ##, ###).

You MUST include the exact heading hashes (#, ##, ###) at the start of each required heading exactly as shown below.

Do NOT omit the heading hashes (#, ##, ###).
Do NOT add colons (:) to headers.
Do NOT add bold (**) formatting around headers.
Do NOT alter header text.
Do NOT change heading levels.
Do NOT create alternative headings.

# [Concept Name]

### Concept Title
[Concept Name]

### URL Handle
[lowercase-kebab-slug]

### Previous Slugs
None

### Short Direct Definition
[1-3 crisp sentences defining the concept directly]

### E-Category
[Select one: Accounting & Bookkeeping | Business & Management | Career, Work & Freelancing | Conversions & Measurement | Economics | Education & Academia | Finance & Investing | Legal & Contracts | Marketing & Sales | Mathematics & STEM | Operations & Supply Chain | Personal Finance | Retail & E-commerce | Science & Engineering | Statistics & Data | Tax & Compliance | Technology & Digital | Time & Productivity]

### Synonyms / Alternative Names
* [Synonym 1]
* [Synonym 2]

---

## Simple Explanation
[Plain English breakdown explaining the concept intuitively]

## How It Works
[Step-by-step breakdown of mechanics, accounting/operational rules, or workflow]

# Formula / Calculation Method
[Equations, formula definitions, or step-by-step calculation method]

# Worked Example
[Real numeric scenario showing inputs, step-by-step processing, and final output]

# How to Interpret It
[How to interpret calculated results, common traps, limitations, and practical insights]

# Real-World Applications
[Practical industry applications across e-commerce, manufacturing, logistics, tech, etc.]

# Common Mistakes & Misconceptions
* [Mistake 1]
* [Mistake 2]

# Frequently Asked Questions

## 1. [Question 1]?
[Answer 1]

## 2. [Question 2]?
[Answer 2]

---

# 3. Structured Ecosystem Connections

## QuickForma Tools
* [Exact QuickForma Tool Name if applicable, or None]

## Related Encyclopedia Concepts
* [Related Concept Title 1]
* [Related Concept Title 2]

---

# 4. Search Engine Optimization

## SEO Title
[SEO Headline | QuickForma]

## SEO Meta Description
[Compelling search meta description under 160 characters]

FINAL QA BEFORE OUTPUT:

Before producing the final response, internally verify all of the following:

1. The response begins with exactly \`\`\`markdown.
2. The response ends with exactly \`\`\`.
3. There is exactly ONE fenced code block.
4. Every required heading contains its literal #, ##, or ### prefix.
5. The literal heading characters are physically present in the output source.
6. No required heading has been renamed.
7. No required heading has been given a colon.
8. No required heading has been converted to bold.
9. No heading level has been changed.
10. All schema fields are present.
11. Empty fields remain explicitly represented where required.
12. No additional schema fields have been invented.
13. Nothing appears outside the code block.
14. The final response contains ONLY the completed QuickForma Encyclopedia entry.

If any QA condition fails, correct the output before sending the response.`;

export function OneShotImporterInput(props: any) {
  const [rawContent, setRawContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [status, setStatus] = useState<{ message: string; type: 'info' | 'success' | 'error' } | null>(null);

  const client = useClient({ apiVersion: '2026-01-01' });

  const documentId = (useFormValue(['_id']) as string) || '';
  const documentType = (useFormValue(['_type']) as string) || 'encyclopedia';
  const cleanDocId = documentId ? documentId.replace(/^drafts\./, '') : '';

  const { patch } = useDocumentOperation(cleanDocId, documentType);

  const handleCopyPrompt = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(MASTER_LLM_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleImport = async () => {
    if (!rawContent.trim()) {
      setStatus({ message: 'Please paste your content before importing.', type: 'error' });
      return;
    }

    setIsProcessing(true);
    setStatus({ message: 'Parsing content and auto-filling Sanity fields...', type: 'info' });

    try {
      // 1-Shot Local Master Markdown Template Parser
      const parsedData: ParsedEncyclopediaData = parseMasterMarkdownTemplate(rawContent);

      const patchSet: Record<string, any> = {};

      if (parsedData.title) patchSet.title = parsedData.title;
      if (parsedData.slug?.current) patchSet.slug = { _type: 'slug', current: parsedData.slug.current };
      if (parsedData.previousSlugs) patchSet.previousSlugs = parsedData.previousSlugs;
      if (parsedData.shortDefinition) patchSet.shortDefinition = parsedData.shortDefinition;
      if (parsedData.synonyms) patchSet.synonyms = parsedData.synonyms;
      if (parsedData.simpleExplanation) patchSet.simpleExplanation = parsedData.simpleExplanation;
      if (parsedData.howItWorks) patchSet.howItWorks = parsedData.howItWorks;
      if (parsedData.formulaMethod) patchSet.formulaMethod = parsedData.formulaMethod;
      if (parsedData.workedExample) patchSet.workedExample = parsedData.workedExample;
      if (parsedData.interpretation) patchSet.interpretation = parsedData.interpretation;
      if (parsedData.realWorldApplications) patchSet.realWorldApplications = parsedData.realWorldApplications;
      if (parsedData.commonMistakes) patchSet.commonMistakes = parsedData.commonMistakes;
      if (parsedData.faqs) patchSet.faqs = parsedData.faqs.map(f => ({ _type: 'faqItem', _key: `faq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`, question: f.question, answer: f.answer }));
      if (parsedData.relatedTools) patchSet.relatedTools = parsedData.relatedTools;
      if (parsedData.seoTitle) patchSet.seoTitle = parsedData.seoTitle;
      if (parsedData.metaDescription) patchSet.metaDescription = parsedData.metaDescription;

      // Resolve E-Category Reference in Sanity
      if (parsedData.categoryName) {
        try {
          const catName = parsedData.categoryName.trim();
          const catSlug = catName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
          const foundCatId = await client.fetch<string | null>(
            `*[_type == "eCategory" && (lower(name) == lower($catName) || slug.current == $catSlug)][0]._id`,
            { catName, catSlug }
          );
          if (foundCatId) {
            patchSet.categories = [{ _type: 'reference', _ref: foundCatId, _key: `cat_${Date.now()}` }];
          }
        } catch (e) {
          console.warn('Category reference resolution warning:', e);
        }
      }

      // Resolve Related Encyclopedia Concepts References in Sanity
      if (parsedData.relatedConceptsTitles && parsedData.relatedConceptsTitles.length > 0) {
        try {
          const lowerTitles = parsedData.relatedConceptsTitles.map(t => t.toLowerCase());
          const slugs = parsedData.relatedConceptsTitles.map(t => t.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
          const foundConceptIds = await client.fetch<string[]>(
            `*[_type == "encyclopedia" && (lower(title) in $lowerTitles || slug.current in $slugs)]._id`,
            { lowerTitles, slugs }
          );
          if (foundConceptIds && foundConceptIds.length > 0) {
            patchSet.relatedConcepts = foundConceptIds.map((id, idx) => ({
              _type: 'reference',
              _ref: id,
              _key: `rel_${idx}_${Date.now()}`,
            }));
          }
        } catch (e) {
          console.warn('Related concepts reference resolution warning:', e);
        }
      }

      const totalPatched = Object.keys(patchSet).length;

      if (totalPatched === 0) {
        setStatus({ message: 'Could not auto-detect content sections. Make sure text contains standard headings like ### Concept Title or ## Simple Explanation.', type: 'error' });
        setIsProcessing(false);
        return;
      }

      // Apply real-time patch to Sanity Studio form
      if (patch && typeof patch.execute === 'function') {
        patch.execute([{ set: patchSet }]);
      }

      // Update current field value with confirmation log
      props.onChange(PatchEvent.from(set(`Imported ${totalPatched} fields on ${new Date().toLocaleTimeString()}`)));

      setStatus({ message: `✨ Success! Auto-filled ${totalPatched} Sanity fields instantly. Scroll down to review!`, type: 'success' });
    } catch (err: any) {
      console.error('Import issue:', err);
      setStatus({ message: `Import error: ${err.message || 'Failed to parse content'}`, type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card padding={4} radius={3} shadow={1} style={{ backgroundColor: '#0f172a', color: '#f8fafc', border: '1px solid #1e293b' }}>
      <Stack space={4}>
        <Flex justify="space-between" align="center">
          <Inline space={2}>
            <Text weight="bold" style={{ color: '#38bdf8', fontSize: '15px' }}>
              ✨ 1-Shot Content Importer
            </Text>
            <Badge tone="positive" style={{ backgroundColor: '#064e3b', color: '#6ee7b7' }}>
              Auto-Fill All 18 Fields
            </Badge>
          </Inline>

          <Button
            mode="ghost"
            tone="primary"
            onClick={() => setShowPrompt(prev => !prev)}
            text={showPrompt ? 'Hide LLM Prompt' : 'ℹ️ LLM Prompt Template'}
            style={{ color: '#38bdf8' }}
          />
        </Flex>

        {/* Collapsible LLM Prompt Drawer */}
        {showPrompt && (
          <Card padding={3} radius={2} style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
            <Stack space={3}>
              <Flex justify="space-between" align="center">
                <Box>
                  <Text size={1} weight="bold" style={{ color: '#38bdf8' }}>
                    🤖 Master LLM System Prompt Template
                  </Text>
                  <Text size={0} style={{ color: '#94a3b8', marginTop: '2px' }}>
                    Give this prompt to ChatGPT, Claude, or any LLM along with any notes to get 100% formatted markdown.
                  </Text>
                </Box>
                <Button
                  tone="positive"
                  onClick={handleCopyPrompt}
                  text={copied ? '✅ Copied!' : '📋 Copy Prompt'}
                  style={{ backgroundColor: copied ? '#059669' : '#0284c7', color: '#ffffff' }}
                />
              </Flex>
              <TextArea
                rows={10}
                readOnly
                value={MASTER_LLM_PROMPT}
                style={{ backgroundColor: '#0f172a', color: '#cbd5e1', borderColor: '#334155', fontFamily: 'monospace', fontSize: '11px' }}
              />
            </Stack>
          </Card>
        )}

        {/* Content Paste Text Area */}
        <Box>
          <Text size={1} weight="medium" style={{ color: '#cbd5e1', marginBottom: '6px' }}>
            Paste Raw Article / Notes / Markdown Document:
          </Text>
          <TextArea
            rows={7}
            placeholder="Paste your article or markdown content here..."
            value={rawContent}
            onChange={(e) => setRawContent(e.currentTarget.value)}
            style={{ backgroundColor: '#1e293b', color: '#f8fafc', borderColor: '#334155', fontFamily: 'monospace', fontSize: '12px' }}
          />
        </Box>

        {/* Action Buttons */}
        <Flex gap={3} style={{ flexWrap: 'wrap' }}>
          <Button
            tone="primary"
            disabled={isProcessing || !rawContent.trim()}
            onClick={handleImport}
            text={isProcessing ? 'Processing Content...' : '⚡ Instant 1-Shot Import'}
            style={{ backgroundColor: '#4f46e5', color: '#ffffff', fontWeight: 'bold' }}
          />
          {rawContent.trim() && (
            <Button
              tone="critical"
              mode="ghost"
              disabled={isProcessing}
              onClick={() => { setRawContent(''); setStatus(null); }}
              text="Clear Box"
            />
          )}
        </Flex>

        {/* Status Feedback */}
        {status && (
          <Card padding={3} radius={2} style={{
            backgroundColor: status.type === 'success' ? '#064e3b' : status.type === 'error' ? '#7f1d1d' : '#1e293b',
            color: status.type === 'success' ? '#6ee7b7' : status.type === 'error' ? '#fca5a5' : '#93c5fd',
            border: `1px solid ${status.type === 'success' ? '#047857' : status.type === 'error' ? '#991b1b' : '#3b82f6'}`
          }}>
            <Text size={1} weight="bold">
              {status.message}
            </Text>
          </Card>
        )}
      </Stack>
    </Card>
  );
}

// Backward compatibility export alias
export const GeminiImporterInput = OneShotImporterInput;
export default OneShotImporterInput;
