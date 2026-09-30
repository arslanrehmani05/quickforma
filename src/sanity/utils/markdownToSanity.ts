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
  relatedConceptsTitles?: string[];
  seoTitle?: string;
  metaDescription?: string;
}

/**
 * Clean markdown asterisks, backticks, bold/italic syntax wrappers from string values
 */
function cleanMarkdownString(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .replace(/^[\s*_`]+|[\s*_`]+$/g, '')
    .replace(/\s+/g, ' ');
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
 * Robust Section Parser for QuickForma Master Markdown Templates
 */
export function parseMasterMarkdownTemplate(rawText: string): ParsedEncyclopediaData {
  const data: ParsedEncyclopediaData = {};

  if (!rawText || !rawText.trim()) return data;

  // Helper to extract a single plain-text value under a header (e.g. ### Concept Title)
  const extractFieldValue = (headerRegex: RegExp): string => {
    const match = rawText.match(headerRegex);
    if (!match) return '';
    const startIndex = match.index! + match[0].length;
    const rest = rawText.slice(startIndex);
    const nextHeaderMatch = rest.match(/\n(?=#{1,3}\s|---|\n#)/);
    const rawVal = nextHeaderMatch ? rest.slice(0, nextHeaderMatch.index) : rest;
    return cleanMarkdownString(rawVal);
  };

  // Helper to extract a major content section up to the NEXT major section header or ---
  // Note: NEVER terminates at sub-headers (### 1. Step) that belong inside the section!
  const extractMajorSection = (headerRegex: RegExp): string => {
    const match = rawText.match(headerRegex);
    if (!match) return '';
    const startIndex = match.index! + match[0].length;
    const rest = rawText.slice(startIndex);
    const nextMajorMatch = rest.match(/\n(?=#[^#]|##[^#]|---|\n#[^#]|\n##[^#])/);
    const content = nextMajorMatch ? rest.slice(0, nextMajorMatch.index) : rest;
    return content.trim();
  };

  // 1. Concept Title
  const titleVal = extractFieldValue(/###\s*Concept Title/i);
  if (titleVal) {
    data.title = titleVal;
  } else {
    const fallbackTitle = rawText.match(/^#\s+(.*?)$/m);
    if (fallbackTitle && fallbackTitle[1]) {
      data.title = cleanMarkdownString(fallbackTitle[1]);
    }
  }

  // 2. Slug / URL Handle
  const slugVal = extractFieldValue(/###\s*URL Handle/i);
  if (slugVal && slugVal.toLowerCase() !== 'none') {
    const cleanSlug = slugVal.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    if (cleanSlug) data.slug = { current: cleanSlug };
  } else if (data.title) {
    const cleanSlug = data.title.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    data.slug = { current: cleanSlug };
  }

  // 3. Previous Slugs
  const prevVal = extractFieldValue(/###\s*Previous Slugs/i);
  if (prevVal && prevVal.toLowerCase() !== 'none') {
    const prevArr = prevVal.split(',').map(s => cleanMarkdownString(s)).filter(s => s && s.toLowerCase() !== 'none');
    if (prevArr.length > 0) data.previousSlugs = prevArr;
  }

  // 4. Short Direct Definition
  const shortDefVal = extractFieldValue(/###\s*Short Direct Definition/i);
  if (shortDefVal) {
    data.shortDefinition = shortDefVal;
  }

  // 5. Category Name
  const catVal = extractFieldValue(/###\s*E-Category/i);
  if (catVal && catVal.toLowerCase() !== 'none') {
    data.categoryName = catVal;
  }

  // 6. Synonyms / Alternative Names
  const synsMatch = rawText.match(/###\s*Synonyms \/ Alternative Names\s*\n+(.*?)(?=\n#{1,3}\s|\n---|$)/is);
  if (synsMatch && synsMatch[1]) {
    const lines = synsMatch[1].split(/\r?\n/);
    const syns: string[] = [];
    for (const l of lines) {
      const clean = cleanMarkdownString(l.replace(/^[*|-]\s+/, ''));
      if (clean && clean.toLowerCase() !== 'none') {
        syns.push(clean);
      }
    }
    if (syns.length > 0) data.synonyms = syns;
  }

  // 7. Simple Explanation
  const simpleText = extractMajorSection(/##\s*Simple Explanation/i);
  if (simpleText) data.simpleExplanation = convertMarkdownToPortableText(simpleText);

  // 8. How It Works
  const howText = extractMajorSection(/##\s*How It Works/i);
  if (howText) data.howItWorks = convertMarkdownToPortableText(howText);

  // 9. Formula Method
  const formulaText = extractMajorSection(/#\s*Formula \/ Calculation Method/i);
  if (formulaText) data.formulaMethod = convertMarkdownToPortableText(formulaText);

  // 10. Worked Example
  const workedText = extractMajorSection(/#\s*Worked Example/i);
  if (workedText) data.workedExample = convertMarkdownToPortableText(workedText);

  // 11. Interpretation
  const interpText = extractMajorSection(/#\s*How to Interpret It/i);
  if (interpText) data.interpretation = convertMarkdownToPortableText(interpText);

  // 12. Real World Applications
  const appText = extractMajorSection(/#\s*Real-World Applications/i);
  if (appText) data.realWorldApplications = convertMarkdownToPortableText(appText);

  // 13. Common Mistakes
  const mistakesText = extractMajorSection(/#\s*Common Mistakes & Misconceptions/i);
  if (mistakesText) data.commonMistakes = convertMarkdownToPortableText(mistakesText);

  // 14. FAQs
  const faqMatch = rawText.match(/#\s*Frequently Asked Questions/i);
  let faqSection = '';
  if (faqMatch) {
    const startIndex = faqMatch.index! + faqMatch[0].length;
    const rest = rawText.slice(startIndex);
    // Terminate at divider (---), or next major section (e.g. # 3. Structured Ecosystem Connections or ## QuickForma Tools)
    const nextSectionMatch = rest.match(/\n(?=---\s*|\n#\s*[34]\.|\n#\s*Structured|\n#\s*Search|\n##\s*QuickForma Tools)/i);
    faqSection = nextSectionMatch ? rest.slice(0, nextSectionMatch.index) : rest;
    faqSection = faqSection.trim();
  }

  if (faqSection) {
    const faqBlocks = faqSection.split(/\n(?=(?:##|###)?\s*\d+\.\s+|##\s+|###\s+)/i).filter(Boolean);
    const faqs: Array<{ question: string; answer: string }> = [];

    for (const b of faqBlocks) {
      const cleanBlock = b.trim();
      if (!cleanBlock) continue;
      const firstLineEnd = cleanBlock.indexOf('\n');
      if (firstLineEnd !== -1) {
        const qLine = cleanBlock.slice(0, firstLineEnd).replace(/^(?:##|###)?\s*\d+\.\s*/, '').replace(/^(?:##|###)\s*/, '').trim();
        const aLine = cleanBlock.slice(firstLineEnd).trim();
        const cleanQ = cleanMarkdownString(qLine);
        const cleanA = cleanMarkdownString(aLine);
        if (cleanQ && cleanA) {
          faqs.push({ question: cleanQ, answer: cleanA });
        }
      }
    }
    if (faqs.length > 0) data.faqs = faqs;
  }

  // 15. Related Tools
  const toolsSection = extractMajorSection(/##\s*QuickForma Tools/i);
  if (toolsSection) {
    const toolLines = toolsSection.split(/\r?\n/).map(l => cleanMarkdownString(l.replace(/^[*|-]\s+/, ''))).filter(Boolean);
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

  // 15b. Related Concepts
  const conceptsSection = extractMajorSection(/##\s*Related Encyclopedia Concepts/i);
  if (conceptsSection) {
    const conceptLines = conceptsSection.split(/\r?\n/).map(l => cleanMarkdownString(l.replace(/^[*|-]\s+/, ''))).filter(Boolean);
    const conceptTitles = conceptLines.filter(l => l.toLowerCase() !== 'none');
    if (conceptTitles.length > 0) data.relatedConceptsTitles = conceptTitles;
  }

  // 16. SEO Title
  const seoTitleVal = extractFieldValue(/##\s*SEO Title/i);
  if (seoTitleVal) {
    data.seoTitle = seoTitleVal;
  }

  // 17. SEO Meta Description
  const metaDescVal = extractFieldValue(/##\s*SEO Meta Description/i);
  if (metaDescVal) {
    data.metaDescription = metaDescVal;
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
  "title": string,
  "slug": string,
  "shortDefinition": string,
  "categoryName": string,
  "synonyms": string[],
  "simpleExplanationMarkdown": string,
  "howItWorksMarkdown": string,
  "formulaMethodMarkdown": string,
  "workedExampleMarkdown": string,
  "interpretationMarkdown": string,
  "realWorldApplicationsMarkdown": string,
  "commonMistakesMarkdown": string,
  "faqs": Array<{ "question": string, "answer": string }>,
  "relatedTools": string[],
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

/**
 * Call secure Vercel serverless endpoint (/api/gemini-import) which uses process.env.GEMINI_API_KEY secret
 */
export async function callServerlessGeminiImport(rawText: string): Promise<ParsedEncyclopediaData> {
  const res = await fetch('/api/gemini-import', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rawText }),
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error || `Serverless Gemini import failed (${res.status})`);
  }

  const parsed = await res.json();

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
