import React, { useState } from "react";
import { BookOpen, Gauge, CheckCircle2, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ReadingEaseScoreCalculator: React.FC = () => {
  const [text, setText] = useState<string>(
    "QuickForma gives professionals fast, secure business calculators. Everything runs inside your web browser. No private customer information is sent across external networks, ensuring high confidentiality."
  );

  // Robust syllable counter with diphthong, prefix, and silent-e heuristics
  const countSyllables = (word: string): number => {
    word = word.toLowerCase().replace(/[^a-z]/g, "");
    if (word.length <= 2) return 1;

    // Remove common silent endings
    word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, "");
    // Remove starting y
    word = word.replace(/^y/, "");

    // Count vowel sequences
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? Math.max(1, matches.length) : 1;
  };

  const trimmedText = text.trim();
  const words = trimmedText ? trimmedText.match(/\b[a-zA-Z0-9_-]+\b/g) || [] : [];
  const sentences = trimmedText ? trimmedText.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0) : [];

  const hasContent = words.length > 0;
  const wordCount = words.length;
  const sentenceCount = Math.max(1, sentences.length);
  const totalSyllables = words.reduce((sum, w) => sum + countSyllables(w), 0);

  // Flesch Reading Ease Formula:
  // 206.835 - 1.015 * (total_words / total_sentences) - 84.6 * (total_syllables / total_words)
  const fleschEase = hasContent
    ? Math.max(0, Math.min(100, 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (totalSyllables / wordCount)))
    : null;

  // Flesch-Kincaid Grade Level Formula:
  // 0.39 * (total_words / total_sentences) + 11.8 * (total_syllables / total_words) - 15.59
  const fleschKincaid = hasContent
    ? Math.max(0, 0.39 * (wordCount / sentenceCount) + 11.8 * (totalSyllables / wordCount) - 15.59)
    : null;

  const readingTimeSeconds = hasContent ? Math.round((wordCount / 200) * 60) : 0;

  const getReadabilityTier = (score: number | null) => {
    if (score === null) return { label: "No Text Input", color: "text-slate-400" };
    if (score >= 90) return { label: "Very Easy (5th Grade)", color: "text-emerald-400" };
    if (score >= 80) return { label: "Easy (6th Grade)", color: "text-emerald-300" };
    if (score >= 70) return { label: "Fairly Easy (7th Grade)", color: "text-emerald-200" };
    if (score >= 60) return { label: "Standard / Plain English (8th–9th Grade)", color: "text-indigo-200" };
    if (score >= 50) return { label: "Fairly Difficult (10th–12th Grade)", color: "text-amber-300" };
    if (score >= 30) return { label: "Difficult (College Level)", color: "text-rose-300" };
    return { label: "Very Confusing (Graduate / Academic)", color: "text-rose-400" };
  };

  const tier = getReadabilityTier(fleschEase);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BookOpen}
            title="Flesch-Kincaid Readability & Reading Ease Score"
            description="Score content complexity using standard Flesch Reading Ease and Flesch-Kincaid US school grade levels."
          />
          <ResetButton onReset={() => setText("QuickForma gives professionals fast, secure business calculators. Everything runs inside your web browser. No private customer information is sent across external networks, ensuring high confidentiality.")} />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Article, Copy, or Technical Text
          </label>
          <textarea
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text here to inspect readability scores, sentence counts, and syllable density..."
            className="w-full p-4 text-xs font-sans bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:bg-white"
          />
        </div>

        <ResultCard variant="dark" title="Readability Analysis">
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
              <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Flesch Reading Ease</div>
              <div className="text-5xl font-extrabold text-white">
                {fleschEase !== null ? fleschEase.toFixed(1) : "—"}
              </div>
              <div className={`text-xs font-semibold mt-1.5 ${tier.color}`}>{tier.label}</div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400">US Grade Level:</span>
                <p className="text-emerald-300 font-bold text-base mt-0.5">
                  {fleschKincaid !== null ? `Grade ${Math.max(1, Math.round(fleschKincaid))}` : "—"}
                </p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400">Total Words:</span>
                <p className="text-white font-bold text-base mt-0.5">{wordCount}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400">Total Sentences:</span>
                <p className="text-white font-bold text-base mt-0.5">{sentences.length}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400">Avg Syllables/Word:</span>
                <p className="text-indigo-200 font-bold text-base mt-0.5">
                  {hasContent ? (totalSyllables / wordCount).toFixed(2) : "—"}
                </p>
              </div>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
