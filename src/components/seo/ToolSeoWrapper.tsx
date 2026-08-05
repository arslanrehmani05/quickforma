import React from 'react';
import { ToolSeoData } from '../../types/seo';
import { AtAGlance } from './AtAGlance';
import { ToolOverview } from './ToolOverview';
import { KeyFeatures } from './KeyFeatures';
import { HowToUse } from './HowToUse';
import { WorkedExample } from './WorkedExample';
import { HowItWorks } from './HowItWorks';
import { InterpretResults } from './InterpretResults';
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
  // Generate fallback SEO data if explicit data object is not passed
  const fallbackSeoData: ToolSeoData = {
    atAGlance: {
      heading: "At a Glance",
      categoryLabel: category || "Business Utility",
      bestFor: "Business Professionals, Developers & Creators",
      privacy: "100% Client-Side RAM",
      timeRequired: "Instant",
      cost: "Free Forever",
      lastUpdated: "August 2026"
    },
    overview: {
      heading: "Quick Overview",
      whatItDoes: `${toolName || 'This tool'} provides instant, zero-latency calculation and output directly inside your web browser with zero server data storage.`,
      whoShouldUseIt: "Business owners, freelancers, software developers, agency founders, and administrative professionals.",
      whenToUseIt: "Use whenever you need fast, private, reliable processing without installing desktop software or creating user accounts.",
      whyItIsUseful: "Calculations run 100% client-side in browser memory. Your data never leaves your computer, ensuring complete privacy and sub-50ms speed."
    },
    keyFeatures: {
      heading: "Key Features",
      features: [
        { title: "Instant Client-Side Execution", description: "Processes calculations locally with sub-50ms response times." },
        { title: "Strict Data Privacy", description: "Inputs and generated assets remain strictly in browser RAM memory." },
        { title: "Zero Registration Required", description: "Access full utility capabilities with no signups or paywalls." },
        { title: "Mobile & Desktop Optimized", description: "Responsive layout designed for desktop workstations and smartphone browsers." }
      ]
    },
    howToUse: {
      heading: "How to Use",
      steps: [
        { stepNumber: 1, title: "Enter Parameters", description: "Input your target values, data, or configuration options into the widget above." },
        { stepNumber: 2, title: "Review Live Output", description: "View real-time calculated results updated instantaneously." },
        { stepNumber: 3, title: "Export or Copy", description: "Use the copy or download action to export your calculated data." }
      ]
    },
    faqs: {
      heading: "Frequently Asked Questions",
      faqs: [
        { question: `Is ${toolName || 'this tool'} free to use?`, answer: `Yes. ${toolName || 'QuickForma utilities'} are 100% free with no usage caps, registration, or subscriptions.` },
        { question: "Is my data private and secure?", answer: "Yes. All processing occurs locally within your browser's JavaScript engine. No data is sent to external servers." }
      ]
    }
  };

  const activeSeoData = seoData || fallbackSeoData;

  const currentUrl = `https://quickforma.com/tools/${toolId || ''}`;

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
  const howToSchema = activeSeoData.howToUse?.steps ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Use ${toolName || 'QuickForma Tool'}`,
    step: activeSeoData.howToUse.steps.map((s) => ({
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

      {/* 2. At a Glance Summary */}
      {activeSeoData.atAGlance && <AtAGlance data={activeSeoData.atAGlance} />}

      {/* 3. Quick Overview */}
      {activeSeoData.overview && <ToolOverview data={activeSeoData.overview} />}

      {/* 4. Key Features */}
      {activeSeoData.keyFeatures && <KeyFeatures data={activeSeoData.keyFeatures} />}

      {/* 5. How to Use (Step-by-Step) */}
      {activeSeoData.howToUse && <HowToUse data={activeSeoData.howToUse} />}

      {/* 6. Worked Example (Mandatory: Inputs -> Process -> Result -> Interpretation) */}
      {activeSeoData.workedExample && <WorkedExample data={activeSeoData.workedExample} />}

      {/* 7. How It Works / Formula (Conditional: Formula, Logic, Assumptions) */}
      {activeSeoData.howItWorks && <HowItWorks data={activeSeoData.howItWorks} />}

      {/* 8. Interpret Your Results (Evaluating Outputs & Actionable Benchmarks) */}
      {activeSeoData.interpretResults && <InterpretResults data={activeSeoData.interpretResults} />}

      {/* 9. Frequently Asked Questions (FAQ Accordion + Schema.org JSON-LD) */}
      {activeSeoData.faqs && <FAQSection data={activeSeoData.faqs} toolName={toolName} />}

      {/* 10. Related Tools (Internal Linking Grid across Pillar) */}
      <RelatedTools toolIds={activeSeoData.relatedToolIds} currentCategory={category} currentToolId={toolId} />

      {/* 11. Related Guides (Sanity CMS - Conditionally Hidden If Empty) */}
      {activeSeoData.relatedGuides && activeSeoData.relatedGuides.guides && activeSeoData.relatedGuides.guides.length > 0 && (
        <RelatedGuides guides={activeSeoData.relatedGuides.guides} />
      )}
    </article>
  );
};
