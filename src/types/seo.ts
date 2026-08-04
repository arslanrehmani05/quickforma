import { ToolMetadata } from './index';

export interface ToolOverviewData {
  whatItDoes: string;
  whoShouldUseIt: string;
  whenToUseIt: string;
  whyItIsUseful: string;
}

export interface HowToUseStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface WorkedExampleData {
  title: string;
  scenarioDescription: string;
  sampleInputs: { label: string; value: string }[];
  stepsExplanation: string[];
  finalOutput: { label: string; value: string };
  summary: string;
}

export interface FormulaData {
  title?: string;
  type: 'math' | 'logic' | 'conversion' | 'technical';
  explanation: string;
  formulaText?: string;
  variables?: { symbol: string; description: string }[];
}

export interface BestPracticeItem {
  title: string;
  description: string;
}

export interface CommonMistakeItem {
  mistake: string;
  whyItHappens: string;
  howToAvoid: string;
}

export interface IndustryUseCaseItem {
  industry: string;
  description: string;
  benefit: string;
}

export interface RelatedQuestionItem {
  question: string;
  answer: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedGuideItem {
  id: string;
  title: string;
  description: string;
  readTime: string;
  url: string;
  category: string;
}

export interface ToolSeoData {
  overview?: ToolOverviewData;
  howToUse?: HowToUseStep[];
  workedExample?: WorkedExampleData;
  formula?: FormulaData;
  bestPractices?: BestPracticeItem[];
  commonMistakes?: CommonMistakeItem[];
  industryUseCases?: IndustryUseCaseItem[];
  relatedQuestions?: RelatedQuestionItem[];
  faqs?: FAQItem[];
  relatedToolIds?: string[];
  relatedGuides?: RelatedGuideItem[];
}
