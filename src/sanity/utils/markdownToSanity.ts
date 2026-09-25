import { TOOLS_CATALOG } from '../../data/toolsCatalog';

export interface ParsedEncyclopediaData {
  title?: string;
  slug?: { current: string };
  previousSlugs?: string[];
  shortDefinition?: string;
  categoryName?: string;
  synonyms?: string[];
  simpleExplanation?: any[];
  howItWorks?: any[];
  formulaMethod?: any[];
  workedExample?: any[];
  interpretation?: any[];
  realWorldApplications?: any[];
  commonMistakes?: any[];
  faqs?: Array<{ question: string; answer: string }>;
  relatedTools?: string[];
  seoTitle?: string;
  metaDescription?: string;
}

/**
 * Convert a plain markdown block into Sanity PortableText blocks.
 * Handles headings (h1, h2, h3, h4), bullet lists, numbered lists, and bold text spans.
 */
export function convertMarkdownToPortableText(markdown: string): any[] {
  if (!markdown || !markdown.trim()) return [];

  const lines = markdown.trim().split(/\r?\n/);
  const blocks: any[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) continue;

    // Horizontal rule divider
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') continue;

    let style = 'normal';
    let listItem: string | undefined = undefined;
    let lineContent = rawLine;

    if (trimmed.startsWith('# ')) {
      style = 'h1';
      lineContent = trimmed.replace(/^#\s+/, '');
    } else if (trimmed.startsWith('## ')) {
      style = 'h2';
      lineContent = trimmed.replace(/^##\s+/, '');
    } else if (trimmed.startsWith('### ')) {
      style = 'h3';
      lineContent = trimmed.replace(/^###\s+/, '');
    } else if (trimmed.startsWith('#### ')) {
      style = 'h4';
      lineContent = trimmed.replace(/^####\s+/, '');
    } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      listItem = 'bullet';
      lineContent = trimmed.replace(/^[*|-]\s+/, '');
    } else if (/^\d+\.\s+/.test(trimmed)) {
      listItem = 'number';
      lineContent = trimmed.replace(/^\d+\.\s+/, '');
    }

    const children = parseInlineSpans(lineContent);

    const block: any = {
      _type: 'block',
      _key: `block_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      style,
      children,
      markDefs: [],
    };

    if (listItem) {
      block.listItem = listItem;
      block.level = 1;
    }

    blocks.push(block);
  }

  return blocks;
}

/**
 * Helper to parse inline markdown formatting (such as **bold** text) into PortableText spans.
 */
function parseInlineSpans(text: string): any[] {
  const spans: any[] = [];
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;

    const key = `span_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    if (part.startsWith('**') && part.endsWith('**')) {
      spans.push({
        _type: 'span',
        _key: key,
        text: part.slice(2, -2),
        marks: ['strong'],
      });
    } else if (part.startsWith('*') && part.endsWith('*')) {
      spans.push({
        _type: 'span',
        _key: key,
        text: part.slice(1, -1),
        marks: ['em'],
      });
    } else {
      spans.push({
        _type: 'span',
        _key: key,
        text: part,
        marks: [],
      });
    }
  }

  if (spans.length === 0) {
    spans.push({
      _type: 'span',
      _key: `span_empty_${Date.now()}`,
      text: '',
      marks: [],
    });
  }

  return spans;
}

/**
 * Deterministic Section Parser for QuickForma Master Markdown Templates
 */
export function parseMasterMarkdownTemplate(rawText: string): ParsedEncyclopediaData {
  const data: ParsedEncyclopediaData = {};

  if (!rawText || !rawText.trim()) return data;

  // 1. Concept Title
  const titleMatch = rawText.match(/###\s*Concept Title\s*\n+\s*\*\*?(.*?)\*\*?(\n|$)/i) ||
                     rawText.match(/^#\s+(.*?)$/m);
  if (titleMatch && titleMatch[1]) {
    data.title = titleMatch[1].trim().replace(/^\**|\**$/g, '');
  }

  // 2. Slug / URL Handle
  const slugMatch = rawText.match(/###\s*URL Handle\s*\n+\s*\*\*?(.*?)\*\*?(\n|$)/i);
  if (slugMatch && slugMatch[1]) {
    const slugStr = slugMatch[1].trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    if (slugStr && slugStr !== 'none') {
      data.slug = { current: slugStr };
    }
  } else if (data.title) {
    const slugStr = data.title.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    data.slug = { current: slugStr };
  }

  // 3. Previous Slugs
  const prevSlugMatch = rawText.match(/###\s*Previous Slugs\s*\n+\s*\*\*?(.*?)\*\*?(\n|$)/i);
  if (prevSlugMatch && prevSlugMatch[1] && prevSlugMatch[1].trim().toLowerCase() !== 'none') {
    data.previousSlugs = prevSlugMatch[1].split(',').map(s => s.trim()).filter(Boolean);
  }

  // 4. Short Direct Definition
  const shortDefMatch = rawText.match(/###\s*Short Direct Definition\s*\n+\s*\*\*?(.*?)\*\*?(\n\n|\n#|$)/is);
  if (shortDefMatch && shortDefMatch[1]) {
    data.shortDefinition = shortDefMatch[1].trim().replace(/^\**|\**$/g, '').replace(/\n+/g, ' ');
  }

  // 5. Category Name
  const catMatch = rawText.match(/###\s*E-Category\s*\n+\s*\*\*?(.*?)\*\*?(\n|$)/i);
  if (catMatch && catMatch[1]) {
    data.categoryName = catMatch[1].trim().replace(/^\**|\**$/g, '');
  }

  // 6. Synonyms
  const synonymsBlock = rawText.match(/###\s*Synonyms \/ Alternative Names\s*\n+(.*?)(?=\n#|\n---|$)/is);
  if (synonymsBlock && synonymsBlock[1]) {
    const lines = synonymsBlock[1].split(/\r?\n/);
    const syns: string[] = [];
    for (const l of lines) {
      const clean = l.replace(/^[*|-]\s+/, '').replace(/^\**|\**$/g, '').trim();
      if (clean && clean.toLowerCase() !== 'none') {
        syns.push(clean);
      }
    }
    if (syns.length > 0) data.synonyms = syns;
  }

  // Helper to extract markdown sections by header name
  const extractSection = (headingRegex: RegExp, endRegex: RegExp): string => {
    const match = rawText.match(headingRegex);
    if (!match) return '';
    const startIndex = match.index! + match[0].length;
    const rest = rawText.slice(startIndex);
    const endMatch = rest.match(endRegex);
    const content = endMatch ? rest.slice(0, endMatch.index) : rest;
    return content.trim();
  };

  const endSectionRegex = /\n(?=#\s|##\s|###\s|---|\n#)/;

  // 7. Simple Explanation
  const simpleText = extractSection(/##\s*Simple Explanation\s*\n/i, endSectionRegex);
  if (simpleText) data.simpleExplanation = convertMarkdownToPortableText(simpleText);

  // 8. How It Works
  const howText = extractSection(/##\s*How It Works\s*\n/i, endSectionRegex);
  if (howText) data.howItWorks = convertMarkdownToPortableText(howText);

  // 9. Formula Method
  const formulaText = extractSection(/#\s*Formula \/ Calculation Method\s*\n/i, /\n(?=#\s[1-4]\.|\n#\s|---)/i);
  if (formulaText) data.formulaMethod = convertMarkdownToPortableText(formulaText);

  // 10. Worked Example
  const workedText = extractSection(/#\s*Worked Example\s*\n/i, /\n(?=#\s[1-4]\.|\n#\s|---)/i);
  if (workedText) data.workedExample = convertMarkdownToPortableText(workedText);

  // 11. Interpretation
  const interpText = extractSection(/#\s*How to Interpret It\s*\n/i, /\n(?=#\s[1-4]\.|\n#\s|---)/i);
  if (interpText) data.interpretation = convertMarkdownToPortableText(interpText);

  // 12. Real World Applications
  const appText = extractSection(/#\s*Real-World Applications\s*\n/i, /\n(?=#\s[1-4]\.|\n#\s|---)/i);
  if (appText) data.realWorldApplications = convertMarkdownToPortableText(appText);

  // 13. Common Mistakes
  const mistakesText = extractSection(/#\s*Common Mistakes & Misconceptions\s*\n/i, /\n(?=#\s[1-4]\.|\n#\s|---)/i);
  if (mistakesText) data.commonMistakes = convertMarkdownToPortableText(mistakesText);

  // 14. FAQs
  const faqSection = extractSection(/#\s*Frequently Asked Questions\s*\n/i, /\n(?=#\s[1-4]\.|\n#\s|---)/i);
  if (faqSection) {
    const faqBlocks = faqSection.split(/##\s*\d+\.\s*/).filter(Boolean);
    const faqs: Array<{ question: string; answer: string }> = [];

    for (const b of faqBlocks) {
      const firstLineEnd = b.indexOf('\n');
      if (firstLineEnd !== -1) {
        const question = b.slice(0, firstLineEnd).trim().replace(/^\**|\**$/g, '');
        const answer = b.slice(firstLineEnd).trim().replace(/\n+/g, ' ');
        if (question && answer) {
          faqs.push({ question, answer });
        }
      }
    }
    if (faqs.length > 0) data.faqs = faqs;
  }

  // 15. Related Tools
  const toolsSection = extractSection(/##\s*QuickForma Tools\s*\n/i, endSectionRegex);
  if (toolsSection) {
    const toolLines = toolsSection.split(/\r?\n/).map(l => l.replace(/^[*|-]\s+/, '').trim()).filter(Boolean);
    const matchedToolIds: string[] = [];

    for (const tLine of toolLines) {
      if (tLine.toLowerCase() === 'none') continue;
      const found = TOOLS_CATALOG.find(t =>
        t.name.toLowerCase() === tLine.toLowerCase() ||
        t.id.toLowerCase() === tLine.toLowerCase().replace(/[^a-z0-9-]/g, '-')
      );
      if (found) {
        matchedToolIds.push(found.id);
      }
    }
    if (matchedToolIds.length > 0) data.relatedTools = matchedToolIds;
  }

  // 16. SEO Title
  const seoTitleMatch = rawText.match(/##\s*SEO Title\s*\n+\s*\*\*?(.*?)\*\*?(\n|$)/i);
  if (seoTitleMatch && seoTitleMatch[1]) {
    data.seoTitle = seoTitleMatch[1].trim().replace(/^\**|\**$/g, '');
  }

  // 17. SEO Meta Description
  const metaDescMatch = rawText.match(/##\s*SEO Meta Description\s*\n+\s*\*\*?(.*?)\*\*?(\n|$)/i);
  if (metaDescMatch && metaDescMatch[1]) {
    data.metaDescription = metaDescMatch[1].trim().replace(/^\**|\**$/g, '');
  }

  return data;
}

/**
 * Call Gemini API to parse raw text into structured Sanity Encyclopedia JSON
 */
export async function callGeminiApi(apiKey: string, rawText: string): Promise<ParsedEncyclopediaData> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const prompt = `You are an expert financial and business content structured JSON parser.
Analyze the following document and parse it into a JSON object matching this TypeScript interface:

{
  "title": string, // Main concept name
  "slug": string, // lowercase url slug e.g. "depreciation"
  "shortDefinition": string, // 1-3 crisp sentences
  "categoryName": string, // e.g. "Accounting & Bookkeeping"
  "synonyms": string[], // Alternative names
  "simpleExplanationMarkdown": string, // Markdown text for simple explanation
  "howItWorksMarkdown": string, // Markdown text for how it works
  "formulaMethodMarkdown": string, // Markdown text for formula calculation method
  "workedExampleMarkdown": string, // Markdown text for worked example scenario
  "interpretationMarkdown": string, // Markdown text for interpretation
  "realWorldApplicationsMarkdown": string, // Markdown text for real world applications
  "commonMistakesMarkdown": string, // Markdown text for common mistakes
  "faqs": Array<{ "question": string, "answer": string }>,
  "relatedTools": string[], // Matched tool names or IDs
  "seoTitle": string,
  "metaDescription": string
}

Return ONLY valid JSON. Do not include markdown code block ticks (\`\`\`json).

Document:
${rawText}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API call failed (${res.status}): ${errText}`);
  }

  const jsonRes = await res.json();
  const textOutput = jsonRes?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleanJsonText = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();

  const parsed = JSON.parse(cleanJsonText);

  // Convert markdown fields from Gemini response into PortableText blocks
  return {
    title: parsed.title,
    slug: parsed.slug ? { current: parsed.slug } : undefined,
    shortDefinition: parsed.shortDefinition,
    categoryName: parsed.categoryName,
    synonyms: parsed.synonyms,
    simpleExplanation: parsed.simpleExplanationMarkdown ? convertMarkdownToPortableText(parsed.simpleExplanationMarkdown) : undefined,
    howItWorks: parsed.howItWorksMarkdown ? convertMarkdownToPortableText(parsed.howItWorksMarkdown) : undefined,
    formulaMethod: parsed.formulaMethodMarkdown ? convertMarkdownToPortableText(parsed.formulaMethodMarkdown) : undefined,
    workedExample: parsed.workedExampleMarkdown ? convertMarkdownToPortableText(parsed.workedExampleMarkdown) : undefined,
    interpretation: parsed.interpretationMarkdown ? convertMarkdownToPortableText(parsed.interpretationMarkdown) : undefined,
    realWorldApplications: parsed.realWorldApplicationsMarkdown ? convertMarkdownToPortableText(parsed.realWorldApplicationsMarkdown) : undefined,
    commonMistakes: parsed.commonMistakesMarkdown ? convertMarkdownToPortableText(parsed.commonMistakesMarkdown) : undefined,
    faqs: parsed.faqs,
    relatedTools: parsed.relatedTools,
    seoTitle: parsed.seoTitle,
    metaDescription: parsed.metaDescription,
  };
}
