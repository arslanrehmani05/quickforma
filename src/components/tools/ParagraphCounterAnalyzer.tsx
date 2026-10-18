import React, { useState } from "react";
import { AlignLeft, BookOpen, Clock, FileText, CheckCircle2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ParagraphCounterAnalyzer: React.FC = () => {
  const sampleContent = `Client-side web applications represent a fundamental architectural paradigm shift for modern business data processing. By executing computation entirely inside the V8 engine or WebAssembly environment of the user's browser, companies eliminate the substantial cloud infrastructure compute costs and cold-start latency associated with serverless microservices.

Furthermore, this architecture delivers an uncompromising privacy guarantee. Sensitive enterprise data—such as financial capitalization tables, employee payroll figures, and intellectual property agreements—never crosses the network wire to third-party servers.

Finally, client-side tools provide exceptional operational resilience. Once cached via progressive service workers, critical business utilities remain fully operational during field outages or airline transit without requiring an active internet connection.`;

  const [textContent, setTextContent] = useState<string>(sampleContent);

  const rawParagraphs = textContent
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const paragraphCount = rawParagraphs.length;
  const wordCount = textContent.trim() ? textContent.trim().split(/\s+/).length : 0;
  const sentenceCount = textContent.trim() ? (textContent.match(/[.!?]+(\s|$)/g) || []).length : 0;

  const avgWordsPerParagraph = paragraphCount > 0 ? (wordCount / paragraphCount).toFixed(1) : "0.0";
  const avgSentencesPerParagraph = paragraphCount > 0 ? (sentenceCount / paragraphCount).toFixed(1) : "0.0";
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={AlignLeft}
            title="Paragraph Counter & Text Density Analyzer"
            description="Measure paragraph count, average sentence length, words per block, and content readability metrics in real time."
          />
          <ResetButton onReset={() => setTextContent(sampleContent)} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Source Text Content</label>
          <textarea
            rows={7}
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-sans"
            placeholder="Paste text here to analyze paragraphs..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ResultCard
            variant="light"
            title="Total Paragraphs"
            value={paragraphCount.toLocaleString()}
            subtitle="Separated by line breaks"
          />
          <ResultCard
            variant="light"
            title="Avg Words / Paragraph"
            value={avgWordsPerParagraph}
            subtitle="Optimal: 40 - 75 words"
          />
          <ResultCard
            variant="light"
            title="Total Sentences"
            value={sentenceCount.toLocaleString()}
            subtitle={`${avgSentencesPerParagraph} per paragraph`}
          />
          <ResultCard
            variant="light"
            title="Est. Reading Time"
            value={`${readingTimeMinutes} min`}
            subtitle={`Based on ${wordCount} total words`}
          />
        </div>
      </div>
    </div>
  );
};
