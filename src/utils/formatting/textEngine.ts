/**
 * Pure client-side Text, Formatting & Productivity Engine powering QuickForma academic tools
 */

export interface ReadabilityMetrics {
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  gunningFog: number;
  colemanLiau: number;
  wordCount: number;
  sentenceCount: number;
  syllableCount: number;
  readingTimeMin: number;
  speakingTimeMin: number;
}

export function countSyllablesInWord(word: string): number {
  let w = word.toLowerCase().trim().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  w = w.replace(/(?:meaning|ful|less|ly|ed|es|e)$/, '');
  const matches = w.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

export function calculateReadability(text: string): ReadabilityMetrics {
  if (!text || !text.trim()) {
    return {
      fleschReadingEase: 0,
      fleschKincaidGrade: 0,
      gunningFog: 0,
      colemanLiau: 0,
      wordCount: 0,
      sentenceCount: 0,
      syllableCount: 0,
      readingTimeMin: 0,
      speakingTimeMin: 0,
    };
  }

  const cleanText = text.trim();
  const words = cleanText.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;

  const sentences = cleanText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = Math.max(1, sentences.length);

  let syllableCount = 0;
  let complexWordsCount = 0;
  let letterCount = 0;

  words.forEach((w) => {
    const letters = w.replace(/[^a-zA-Z]/g, '');
    letterCount += letters.length;

    const syl = countSyllablesInWord(w);
    syllableCount += syl;
    if (syl >= 3) complexWordsCount++;
  });

  const avgSentenceLength = wordCount / sentenceCount;
  const avgSyllablesPerWord = syllableCount / wordCount;

  // Flesch Reading Ease: 206.835 - 1.015(total words/total sentences) - 84.6(total syllables/total words)
  const fleschReadingEase = 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;

  // Flesch-Kincaid Grade Level: 0.39(total words/total sentences) + 11.8(total syllables/total words) - 15.59
  const fleschKincaidGrade = 0.39 * avgSentenceLength + 11.8 * avgSyllablesPerWord - 15.59;

  // Gunning Fog Index: 0.4 * [ (words/sentences) + 100 * (complex words / words) ]
  const gunningFog = 0.4 * (avgSentenceLength + 100 * (complexWordsCount / wordCount));

  // Coleman-Liau: 0.0588 * L - 0.296 * S - 15.8 (L = avg letters per 100 words, S = avg sentences per 100 words)
  const L = (letterCount / wordCount) * 100;
  const S = (sentenceCount / wordCount) * 100;
  const colemanLiau = 0.0588 * L - 0.296 * S - 15.8;

  const readingTimeMin = Math.ceil(wordCount / 225); // avg 225 wpm reading
  const speakingTimeMin = Math.ceil(wordCount / 130); // avg 130 wpm speaking

  return {
    fleschReadingEase: Math.round(Math.max(0, Math.min(100, fleschReadingEase)) * 10) / 10,
    fleschKincaidGrade: Math.round(Math.max(0, fleschKincaidGrade) * 10) / 10,
    gunningFog: Math.round(Math.max(0, gunningFog) * 10) / 10,
    colemanLiau: Math.round(Math.max(0, colemanLiau) * 10) / 10,
    wordCount,
    sentenceCount,
    syllableCount,
    readingTimeMin,
    speakingTimeMin,
  };
}

/**
 * Calculates Printed Pages from Word Count
 */
export function calculateEssayPages(
  wordCount: number,
  fontSize: 10 | 11 | 12 = 12,
  spacing: 'single' | '1.5' | 'double' = 'double',
  fontFamily: 'Times New Roman' | 'Arial' | 'Calibri' = 'Times New Roman'
): { estimatedPages: number; wordsPerPage: number } {
  let baseWordsPerPage = 250; // Standard 12pt Times double-spaced

  if (spacing === 'single') baseWordsPerPage = 500;
  else if (spacing === '1.5') baseWordsPerPage = 375;
  else baseWordsPerPage = 250;

  if (fontSize === 10) baseWordsPerPage *= 1.2;
  else if (fontSize === 11) baseWordsPerPage *= 1.1;

  if (fontFamily === 'Arial') baseWordsPerPage *= 0.95;

  const wordsPerPage = Math.round(baseWordsPerPage);
  const estimatedPages = Math.round((wordCount / wordsPerPage) * 10) / 10;

  return { estimatedPages: Math.max(0.1, estimatedPages), wordsPerPage };
}

export interface CitationSource {
  style: 'APA' | 'MLA' | 'Chicago' | 'IEEE';
  sourceType: 'Journal' | 'Book' | 'Website';
  authorLastName: string;
  authorFirstName: string;
  title: string;
  containerTitle: string; // Journal name, Book title, Website name
  year: string;
  volume?: string;
  issue?: string;
  pages?: string;
  urlOrDoi?: string;
  publisher?: string;
}

/**
 * Formats Academic Citations (APA 7th, MLA 9th, Chicago 17th, IEEE)
 */
export function formatCitation(source: CitationSource): { inText: string; fullBibliographic: string } {
  const { style, sourceType, authorLastName, authorFirstName, title, containerTitle, year, volume, issue, pages, urlOrDoi, publisher } = source;
  const initial = authorFirstName ? authorFirstName.trim().charAt(0).toUpperCase() + '.' : '';

  let fullBibliographic = '';
  let inText = '';

  if (style === 'APA') {
    inText = `(${authorLastName || 'Anonymous'}, ${year || 'n.d.'})`;
    if (sourceType === 'Journal') {
      fullBibliographic = `${authorLastName}, ${initial} (${year || 'n.d.'}). ${title}. ${containerTitle}${volume ? `, ${volume}` : ''}${issue ? `(${issue})` : ''}${pages ? `, ${pages}` : ''}.${urlOrDoi ? ` https://doi.org/${urlOrDoi.replace(/https?:\/\/(dx\.)?doi\.org\//, '')}` : ''}`;
    } else if (sourceType === 'Book') {
      fullBibliographic = `${authorLastName}, ${initial} (${year || 'n.d.'}). *${title}*${publisher ? `. ${publisher}` : ''}.`;
    } else {
      fullBibliographic = `${authorLastName}, ${initial} (${year || 'n.d.'}). ${title}. *${containerTitle}*. ${urlOrDoi || ''}`;
    }
  } else if (style === 'MLA') {
    inText = `(${authorLastName || 'Anonymous'} ${pages || ''})`.trim();
    if (sourceType === 'Journal') {
      fullBibliographic = `${authorLastName}, ${authorFirstName}. "${title}." *${containerTitle}*, vol. ${volume || '1'}, no. ${issue || '1'}, ${year || '2026'}, pp. ${pages || '1-10'}.`;
    } else {
      fullBibliographic = `${authorLastName}, ${authorFirstName}. *${title}*. ${publisher || containerTitle}, ${year || '2026'}.`;
    }
  } else if (style === 'IEEE') {
    inText = `[1]`;
    fullBibliographic = `[1] ${initial} ${authorLastName}, "${title}," *${containerTitle}*, vol. ${volume || '1'}, pp. ${pages || '1-10'}, ${year || '2026'}.`;
  } else {
    // Chicago
    inText = `(${authorLastName} ${year})`;
    fullBibliographic = `${authorLastName}, ${authorFirstName}. "${title}." *${containerTitle}* ${volume || ''} (${year}): ${pages || ''}.`;
  }

  return { inText, fullBibliographic };
}

/**
 * Calculates Recommended Weekly Study Hours
 */
export function calculateStudyHoursNeeded(
  creditHours: number,
  difficultyFactor: 1 | 1.5 | 2 = 1.5
): { totalWeeklyStudyHours: number; dailyStudyHours: number } {
  const baseHours = creditHours * 2; // Standard 2 hours study per credit hour rule
  const totalWeeklyStudyHours = Math.round(baseHours * difficultyFactor);
  const dailyStudyHours = Math.round((totalWeeklyStudyHours / 7) * 10) / 10;
  return { totalWeeklyStudyHours, dailyStudyHours };
}
