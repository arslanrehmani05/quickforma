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
 * Safely strip markdown formatting markers (bold **, code ``, orphan **) from plain text strings
 * while preserving legitimate single asterisks (e.g. math operations) and content text.
 */
export function stripMarkdownFormatting(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Convert **bold** -> bold
    .replace(/`([^`]+)`/g, '$1')      // Convert `code` -> code
    .replace(/\*\*/g, '')             // Remove orphan ** syntax
    .trim();
}

/**
 * Clean markdown asterisks, backticks, bold/italic syntax wrappers from string values
 */
function cleanMarkdownString(text: string): string {
  if (!text) return '';
  const stripped = stripMarkdownFormatting(text);
  return stripped
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

    // Check if rawLine is an indented continuation line following a list item
    // (e.g. 2+ spaces or tab, without starting a new heading or list item)
    const isIndented = /^(\s{2,}|\t)\S/.test(rawLine);
    const lastBlock = blocks[blocks.length - 1];

    if (
      isIndented &&
      lastBlock &&
      lastBlock._type === 'block' &&
      (lastBlock.listItem === 'number' || lastBlock.listItem === 'bullet') &&
      !trimmed.startsWith('#') &&
      !trimmed.startsWith('* ') &&
      !trimmed.startsWith('- ') &&
      !/^\d+\.\s+/.test(trimmed)
    ) {
      // Merge continuation text into preceding list item's children/spans
      const continuationSpans = parseInlineSpans(trimmed);
      if (continuationSpans.length > 0) {
        continuationSpans[0].text = '\n' + continuationSpans[0].text;
        lastBlock.children.push(...continuationSpans);
      }
      continue;
    }

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

  // Clean rawText: Strip leading/trailing code fences if user copied outer ```markdown ... ```
  rawText = rawText.trim().replace(/^```(?:markdown)?\s*\r?\n/i, '').replace(/\r?\n```\s*$/i, '');

  const TERMINATOR_PATTERN = /\n(?=(?:#{1,3}\s*)?(?:Concept Title|URL Handle|Previous Slugs|Short Direct Definition|E-Category|Synonyms \/ Alternative Names|Simple Explanation|How It Works|Formula \/ Calculation Method|Worked Example|How to Interpret It|Real-World Applications|Common Mistakes & Misconceptions|Frequently Asked Questions|3\.\s*Structured|QuickForma Tools|Related Encyclopedia Concepts|4\.\s*Search|SEO Title|SEO Meta Description|---))/i;

  // Helper to extract a single plain-text value under a header (e.g. ### Concept Title or Concept Title)
  const extractFieldValue = (headerRegex: RegExp): string => {
    const match = rawText.match(headerRegex);
    if (!match) return '';
    const startIndex = match.index! + match[0].length;
    const rest = rawText.slice(startIndex);
    const nextHeaderMatch = rest.match(TERMINATOR_PATTERN);
    const rawVal = nextHeaderMatch ? rest.slice(0, nextHeaderMatch.index) : rest;
    return cleanMarkdownString(rawVal);
  };

  // Helper to extract a major content section up to the NEXT major section header or ---
  const extractMajorSection = (headerRegex: RegExp): string => {
    const match = rawText.match(headerRegex);
    if (!match) return '';
    const startIndex = match.index! + match[0].length;
    const rest = rawText.slice(startIndex);
    const nextMajorMatch = rest.match(TERMINATOR_PATTERN);
    const content = nextMajorMatch ? rest.slice(0, nextMajorMatch.index) : rest;
    return content.trim();
  };

  // 1. Concept Title
  const titleVal = extractFieldValue(/(?:#{1,3}\s*)?Concept Title:?/i);
  if (titleVal) {
    data.title = titleVal;
  } else {
    const fallbackTitle = rawText.match(/^#?\s*(Concept Title\s*\n+)?(.*?)$/m);
    if (fallbackTitle && fallbackTitle[2]) {
      data.title = cleanMarkdownString(fallbackTitle[2]);
    }
  }

  // 2. Slug / URL Handle
  const slugVal = extractFieldValue(/(?:#{1,3}\s*)?URL Handle:?/i);
  if (slugVal && slugVal.toLowerCase() !== 'none') {
    const cleanSlug = slugVal.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    if (cleanSlug) data.slug = { current: cleanSlug };
  } else if (data.title) {
    const cleanSlug = data.title.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    data.slug = { current: cleanSlug };
  }

  // 3. Previous Slugs
  const prevVal = extractFieldValue(/(?:#{1,3}\s*)?Previous Slugs:?/i);
  if (prevVal && prevVal.toLowerCase() !== 'none') {
    const prevArr = prevVal.split(',').map(s => cleanMarkdownString(s)).filter(s => s && s.toLowerCase() !== 'none');
    if (prevArr.length > 0) data.previousSlugs = prevArr;
  }

  // 4. Short Direct Definition
  const shortDefVal = extractFieldValue(/(?:#{1,3}\s*)?Short Direct Definition:?/i);
  if (shortDefVal) {
    data.shortDefinition = shortDefVal;
  }

  // 5. Category Name
  const catVal = extractFieldValue(/(?:#{1,3}\s*)?E-Category:?/i);
  if (catVal && catVal.toLowerCase() !== 'none') {
    data.categoryName = catVal;
  }

  // 6. Synonyms / Alternative Names
  const synsMatch = rawText.match(/(?:#{1,3}\s*)?Synonyms \/ Alternative Names:?\s*\n+(.*?)(?=\n(?:#{1,3}\s*)?(?:Simple Explanation|How It Works|Formula|Worked Example|---)|$)/is);
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
  const simpleText = extractMajorSection(/(?:#{1,3}\s*)?Simple Explanation:?/i);
  if (simpleText) data.simpleExplanation = convertMarkdownToPortableText(simpleText);

  // 8. How It Works
  const howText = extractMajorSection(/(?:#{1,3}\s*)?How It Works:?/i);
  if (howText) data.howItWorks = convertMarkdownToPortableText(howText);

  // 9. Formula Method
  const formulaText = extractMajorSection(/(?:#{1,3}\s*)?Formula \/ Calculation Method:?/i);
  if (formulaText) data.formulaMethod = convertMarkdownToPortableText(formulaText);

  // 10. Worked Example
  const workedText = extractMajorSection(/(?:#{1,3}\s*)?Worked Example:?/i);
  if (workedText) data.workedExample = convertMarkdownToPortableText(workedText);

  // 11. Interpretation
  const interpText = extractMajorSection(/(?:#{1,3}\s*)?How to Interpret It:?/i);
  if (interpText) data.interpretation = convertMarkdownToPortableText(interpText);

  // 12. Real World Applications
  const appText = extractMajorSection(/(?:#{1,3}\s*)?Real-World Applications:?/i);
  if (appText) data.realWorldApplications = convertMarkdownToPortableText(appText);

  // 13. Common Mistakes
  const mistakesText = extractMajorSection(/(?:#{1,3}\s*)?Common Mistakes & Misconceptions:?/i);
  if (mistakesText) data.commonMistakes = convertMarkdownToPortableText(mistakesText);

  // 14. FAQs
  const faqMatch = rawText.match(/(?:#{1,3}\s*)?Frequently Asked Questions:?/i);
  let faqSection = '';
  if (faqMatch) {
    const startIndex = faqMatch.index! + faqMatch[0].length;
    const rest = rawText.slice(startIndex);
    const nextSectionMatch = rest.match(/\n(?=---\s*|\n(?:#{1,3}\s*)?[34]\.|\n(?:#{1,3}\s*)?Structured|\n(?:#{1,3}\s*)?Search|\n(?:#{1,3}\s*)?QuickForma Tools|\n(?:#{1,3}\s*)?Related Encyclopedia Concepts|\n(?:#{1,3}\s*)?SEO Title)/i);
    faqSection = nextSectionMatch ? rest.slice(0, nextSectionMatch.index) : rest;
    faqSection = faqSection.trim();
  }

  if (faqSection) {
    const faqBlocks = faqSection.split(/\n(?=(?:##|###)?\s*\d+\.\s+|\n?\d+\.\s+)/i).filter(Boolean);
    const faqs: Array<{ question: string; answer: string }> = [];

    for (const b of faqBlocks) {
      const cleanBlock = b.trim();
      if (!cleanBlock) continue;
      const firstLineEnd = cleanBlock.indexOf('\n');
      if (firstLineEnd !== -1) {
        const qLine = cleanBlock.slice(0, firstLineEnd).replace(/^(?:##|###)?\s*\d+\.\s*/, '').replace(/^\d+\.\s*/, '').trim();
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
  const toolsSection = extractMajorSection(/(?:#{1,3}\s*)?QuickForma Tools:?/i);
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
  const conceptsSection = extractMajorSection(/(?:#{1,3}\s*)?Related Encyclopedia Concepts:?/i);
  if (conceptsSection) {
    const conceptLines = conceptsSection.split(/\r?\n/).map(l => cleanMarkdownString(l.replace(/^[*|-]\s+/, ''))).filter(Boolean);
    const conceptTitles = conceptLines.filter(l => l.toLowerCase() !== 'none');
    if (conceptTitles.length > 0) data.relatedConceptsTitles = conceptTitles;
  }

  // 16. SEO Title
  const seoTitleVal = extractFieldValue(/(?:#{1,3}\s*)?SEO Title:?/i);
  if (seoTitleVal) {
    data.seoTitle = seoTitleVal;
  }

  // 17. SEO Meta Description
  const metaDescVal = extractFieldValue(/(?:#{1,3}\s*)?SEO Meta Description:?/i);
  if (metaDescVal) {
    data.metaDescription = metaDescVal;
  }

  return data;
}

