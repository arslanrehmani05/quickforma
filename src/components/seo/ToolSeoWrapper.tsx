import React from 'react';
import { ToolSeoData } from '../../types/seo';
import { ToolOverview } from './ToolOverview';
import { HowToUse } from './HowToUse';
import { WorkedExample } from './WorkedExample';
import { FormulaSection } from './FormulaSection';
import { BestPractices } from './BestPractices';
import { CommonMistakes } from './CommonMistakes';
import { IndustryUseCases } from './IndustryUseCases';
import { RelatedQuestions } from './RelatedQuestions';
import { FAQSection } from './FAQSection';
import { RelatedTools } from './RelatedTools';
import { RelatedGuides } from './RelatedGuides';

interface ToolSeoWrapperProps {
  seoData?: ToolSeoData;
  toolName?: string;
  category?: string;
  toolId?: string;
}

export const ToolSeoWrapper: React.FC<ToolSeoWrapperProps> = ({
  seoData,
  toolName,
  category,
  toolId,
}) => {
  if (!seoData) return null;

  return (
    <article className="mt-16 pt-12 border-t border-slate-200 space-y-16 max-w-5xl mx-auto">
      {/* Section 1 — Quick Overview */}
      <ToolOverview data={seoData.overview} />

      {/* Section 2 — How to Use */}
      <HowToUse steps={seoData.howToUse} />

      {/* Section 3 — Worked Example */}
      <WorkedExample data={seoData.workedExample} />

      {/* Section 4 — Formula / How It Works */}
      <FormulaSection data={seoData.formula} />

      {/* Section 5 — Best Practices */}
      <BestPractices practices={seoData.bestPractices} />

      {/* Section 6 — Common Mistakes */}
      <CommonMistakes mistakes={seoData.commonMistakes} />

      {/* Section 7 — Industry Use Cases */}
      <IndustryUseCases useCases={seoData.industryUseCases} />

      {/* Section 8 — Related Questions (AEO AI Answers) */}
      <RelatedQuestions questions={seoData.relatedQuestions} />

      {/* Section 9 — FAQ (Accordions + JSON-LD Schema) */}
      <FAQSection faqs={seoData.faqs} toolName={toolName} />

      {/* Section 10 — Related Tools */}
      <RelatedTools toolIds={seoData.relatedToolIds} currentCategory={category} currentToolId={toolId} />

      {/* Section 11 — Related Guides (Future CMS Placeholder) */}
      <RelatedGuides guides={seoData.relatedGuides} />
    </article>
  );
};
