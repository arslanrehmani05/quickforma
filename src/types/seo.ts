export interface BaseSectionProps {
  heading?: string;
  subheading?: string;
}

export interface AtAGlanceItem {
  label: string;
  value: string;
  iconName?: string;
}

export interface AtAGlanceData extends BaseSectionProps {
  categoryLabel?: string;
  bestFor?: string;
  privacy?: string;
  timeRequired?: string;
  cost?: string;
  lastUpdated?: string;
  customItems?: AtAGlanceItem[];
}

export interface KeyFeatureItem {
  title: string;
  description?: string;
  iconName?: string;
}

export interface KeyFeaturesData extends BaseSectionProps {
  features: KeyFeatureItem[];
}

export interface ToolOverviewData extends BaseSectionProps {
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

export interface HowToUseData extends BaseSectionProps {
  steps: HowToUseStep[];
}

export interface WorkedExampleData extends BaseSectionProps {
  title: string;
  scenarioDescription: string;
  sampleInputs: { label: string; value: string }[];
  stepsExplanation: string[];
  finalOutput: { label: string; value: string };
  summary: string;
}

export interface HowItWorksData extends BaseSectionProps {
  type: 'math' | 'logic' | 'conversion' | 'technical' | 'algorithm';
  explanation: string;
  formulaText?: string;
  codeSnippet?: string;
  variables?: { symbol: string; description: string }[];
}

export interface BestPracticeItem {
  title: string;
  description: string;
}

export interface BestPracticesData extends BaseSectionProps {
  practices: BestPracticeItem[];
}

export interface CommonMistakeItem {
  mistake: string;
  whyItHappens: string;
  howToAvoid: string;
}

export interface CommonMistakesData extends BaseSectionProps {
  mistakes: CommonMistakeItem[];
}

export interface IndustryUseCaseItem {
  industry: string;
  description: string;
  benefit: string;
}

export interface IndustryUseCasesData extends BaseSectionProps {
  useCases: IndustryUseCaseItem[];
}

export interface RelatedQuestionItem {
  question: string;
  answer: string;
}

export interface RelatedQuestionsData extends BaseSectionProps {
  questions: RelatedQuestionItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionData extends BaseSectionProps {
  faqs: FAQItem[];
}

export interface RelatedGuideItem {
  id: string;
  title: string;
  description: string;
  readTime: string;
  url: string;
  category: string;
}

export interface RelatedGuidesData extends BaseSectionProps {
  guides: RelatedGuideItem[];
}

export interface WorkflowStepItem {
  toolId: string;
  toolName: string;
  description: string;
  categoryLabel?: string;
  actionPrompt?: string;
}

export interface WorkflowProgressionData extends BaseSectionProps {
  introText?: string;
  steps: WorkflowStepItem[];
}

export interface ToolSeoData {
  atAGlance?: AtAGlanceData;
  overview?: ToolOverviewData;
  keyFeatures?: KeyFeaturesData;
  howToUse?: HowToUseData;
  workedExample?: WorkedExampleData;
  howItWorks?: HowItWorksData;
  bestPractices?: BestPracticesData;
  commonMistakes?: CommonMistakesData;
  industryUseCases?: IndustryUseCasesData;
  faqs?: FAQSectionData;
  relatedQuestions?: RelatedQuestionsData;
  relatedToolIds?: string[];
  relatedGuides?: RelatedGuidesData;
  workflowProgression?: WorkflowProgressionData;
}
