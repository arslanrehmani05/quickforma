import React from 'react';
import { ToolSeoData } from '../../types/seo';
import { AtAGlance } from './AtAGlance';
import { ToolOverview } from './ToolOverview';
import { KeyFeatures } from './KeyFeatures';
import { HowToUse } from './HowToUse';
import { WorkedExample } from './WorkedExample';
import { HowItWorks } from './HowItWorks';
import { BestPractices } from './BestPractices';
import { CommonMistakes } from './CommonMistakes';
import { IndustryUseCases } from './IndustryUseCases';
import { FAQSection } from './FAQSection';
import { RelatedQuestions } from './RelatedQuestions';
import { RelatedTools } from './RelatedTools';
import { RelatedGuides } from './RelatedGuides';
import { WorkflowProgression } from './WorkflowProgression';

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
  const currentUrl = `https://quickforma.com/tools/${toolId || ''}`;

  // Dynamically update document head canonical tag to protect against duplicate indexing
  React.useEffect(() => {
    if (!toolId) return;

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);
  }, [toolId, currentUrl]);

  if (!seoData) return null;

  // 1. WebApplication Schema
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolName || 'QuickForma Web Utility',
    url: currentUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://quickforma.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category || 'Tools',
        item: `https://quickforma.com#${category || 'all'}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: toolName || 'Utility Tool',
        item: currentUrl,
      },
    ],
  };

  // 3. HowTo Schema (if HowToUse steps exist)
  const howToSchema = seoData.howToUse?.steps ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Use ${toolName || 'QuickForma Tool'}`,
    step: seoData.howToUse.steps.map((s) => ({
      '@type': 'HowToStep',
      position: s.stepNumber,
      name: s.title,
      text: s.description,
    })),
  } : null;

  return (
    <article className="mt-16 pt-12 border-t border-slate-200 space-y-16 max-w-5xl mx-auto">
      {/* Dynamic Schema Injections */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      )}

      {/* 2. At a Glance ⭐ (NEW) */}
      <AtAGlance data={seoData.atAGlance} />

      {/* 3. Quick Overview */}
      <ToolOverview data={seoData.overview} />

      {/* 4. Key Features ⭐ (NEW) */}
      <KeyFeatures data={seoData.keyFeatures} />

      {/* 5. How to Use */}
      <HowToUse data={seoData.howToUse} />

      {/* 6. Worked Example */}
      <WorkedExample data={seoData.workedExample} />

      {/* 7. How It Works ⭐ (Renamed from Formula) */}
      <HowItWorks data={seoData.howItWorks} />

      {/* 8. Best Practices */}
      <BestPractices data={seoData.bestPractices} />

      {/* 9. Common Mistakes */}
      <CommonMistakes data={seoData.commonMistakes} />

      {/* 10. Industry Use Cases */}
      <IndustryUseCases data={seoData.industryUseCases} />

      {/* 11. FAQ */}
      <FAQSection data={seoData.faqs} toolName={toolName} />

      {/* 12. Related Questions (AEO AI Answers) */}
      <RelatedQuestions data={seoData.relatedQuestions} />

      {/* 13. Related Tools */}
      <RelatedTools toolIds={seoData.relatedToolIds} currentCategory={category} currentToolId={toolId} />

      {/* 14. Related Guides (Hidden if empty) */}
      {seoData.relatedGuides && seoData.relatedGuides.guides && seoData.relatedGuides.guides.length > 0 && (
        <RelatedGuides guides={seoData.relatedGuides.guides} />
      )}

      {/* 15. Continue Your Workflow ⭐ (NEW - Task-Oriented Next Steps) */}
      <WorkflowProgression data={seoData.workflowProgression} />
    </article>
  );
};
