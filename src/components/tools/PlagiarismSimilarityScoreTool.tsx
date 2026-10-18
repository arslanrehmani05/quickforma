import React, { useState } from "react";
import { FileSearch, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PlagiarismSimilarityScoreTool: React.FC = () => {
  const [originalText, setOriginalText] = useState<string>(
    "The rapid growth of ecommerce platforms has transformed international retail supply chains and consumer fulfillment expectations globally."
  );
  const [suspectText, setSuspectText] = useState<string>(
    "The rapid growth of ecommerce platforms has drastically changed international retail supply chains and consumer delivery expectations across the world."
  );

  const tokenize = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);

  const tokens1 = tokenize(originalText);
  const tokens2 = tokenize(suspectText);

  const hasData = tokens1.length > 0 && tokens2.length > 0;

  // Set-based Jaccard similarity
  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  const jaccardScore = hasData && union.size > 0 ? (intersection.size / union.size) * 100 : 0;

  // Exact 3-gram phrase overlap
  const getNGrams = (tokens: string[], n: number) => {
    const ngrams = new Set<string>();
    for (let i = 0; i <= tokens.length - n; i++) {
      ngrams.add(tokens.slice(i, i + n).join(" "));
    }
    return ngrams;
  };

  const ngrams1 = getNGrams(tokens1, 3);
  const ngrams2 = getNGrams(tokens2, 3);
  const ngramMatch = new Set([...ngrams1].filter((x) => ngrams2.has(x)));
  const phraseMatchScore = hasData && ngrams1.size > 0 ? (ngramMatch.size / ngrams1.size) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileSearch}
            title="Text Similarity & Plagiarism Overlap Analyzer"
            description="Client-side token overlap analyzer computing Jaccard vocabulary similarity and 3-gram contiguous phrase matching."
          />
          <ResetButton onReset={() => {
            setOriginalText("The rapid growth of ecommerce platforms has transformed international retail supply chains and consumer fulfillment expectations globally.");
            setSuspectText("The rapid growth of ecommerce platforms has drastically changed international retail supply chains and consumer delivery expectations across the world.");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Original Reference Source
            </label>
            <textarea
              rows={4}
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste original source text..."
              className="w-full text-xs font-sans p-2 rounded-lg border border-slate-200 bg-white"
            />
            <p className="text-[11px] text-slate-500 mt-1">{tokens1.length} word(s) | {set1.size} unique term(s)</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Comparison / Suspect Draft
            </label>
            <textarea
              rows={4}
              value={suspectText}
              onChange={(e) => setSuspectText(e.target.value)}
              placeholder="Paste draft or student essay to compare..."
              className="w-full text-xs font-sans p-2 rounded-lg border border-slate-200 bg-white"
            />
            <p className="text-[11px] text-slate-500 mt-1">{tokens2.length} word(s) | {set2.size} unique term(s)</p>
          </div>
        </div>

        <ResultCard variant="dark" title="Lexical Overlap Findings">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Vocabulary Match</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {hasData ? `${jaccardScore.toFixed(1)}%` : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Jaccard Token Index</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Phrase Match (3-grams)</span>
              <p className="text-4xl font-extrabold text-white mt-1">
                {hasData ? `${phraseMatchScore.toFixed(1)}%` : "—"}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">{ngramMatch.size} matched triplet(s)</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Shared Unique Words</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">
                {hasData ? intersection.size : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">out of {union.size} total unique</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Plagiarism Risk</span>
              <p className={`text-sm font-bold mt-1 ${!hasData ? "text-slate-400" : jaccardScore > 50 || phraseMatchScore > 30 ? "text-amber-300" : "text-emerald-300"}`}>
                {!hasData ? "Enter text in both boxes" : jaccardScore > 50 || phraseMatchScore > 30 ? "Moderate / High Overlap" : "Low Risk / Original"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
