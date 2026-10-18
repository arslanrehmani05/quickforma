import React, { useState } from "react";
import { Sparkles, BarChart, CheckCircle2, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const HeadlineAnalyzer: React.FC = () => {
  const [headline, setHeadline] = useState("10 Proven Financial Habits That Build Long-Term Wealth Fast");

  const words = headline.trim() ? headline.trim().split(/\s+/) : [];
  const charCount = headline.length;
  const wordCount = words.length;

  // Power & emotional keywords
  const powerWords = ["proven", "secret", "fast", "effortless", "ultimate", "essential", "breakthrough", "expert", "guaranteed", "master"];
  const emotionalWords = ["build", "wealth", "smart", "critical", "danger", "thrive", "success", "mistakes", "free", "win"];

  const hasNumber = /\d+/.test(headline);
  const hasPowerWord = powerWords.some((w) => headline.toLowerCase().includes(w));
  const hasEmotionalWord = emotionalWords.some((w) => headline.toLowerCase().includes(w));

  // Score calculation
  let score = 50;
  if (charCount >= 45 && charCount <= 65) score += 20;
  else if (charCount >= 30 && charCount <= 80) score += 10;

  if (wordCount >= 6 && wordCount <= 9) score += 15;
  if (hasNumber) score += 10;
  if (hasPowerWord) score += 10;
  if (hasEmotionalWord) score += 5;

  score = Math.min(100, Math.max(0, score));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Sparkles}
            title="Click-Through Rate Headline Quality Analyzer"
            description="Evaluate blog, article, and YouTube headlines for emotional resonance, character length, and Google SERP CTR."
          />
          <ResetButton onReset={() => setHeadline("10 Proven Financial Habits That Build Long-Term Wealth Fast")} />
        </div>

        <InputField
          label="Headline / Title Text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          helpText="Ideal headline length: 55-60 characters, 6-8 words."
        />

        <ResultCard variant="dark" title="Headline Quality Rating">
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
              <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Overall Headline Score</div>
              <div className="text-5xl font-extrabold text-white">{score} / 100</div>
              <div className={`text-xs font-semibold mt-1.5 ${score >= 75 ? "text-emerald-400" : "text-amber-300"}`}>
                {score >= 75 ? "High-Converting Headline (Strong SEO & Emotional Hook)" : "Average Headline (Add power words or numbers)"}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400">Length (Chars):</span>
                <p className={`font-bold text-base mt-0.5 ${charCount >= 45 && charCount <= 65 ? "text-emerald-400" : "text-amber-300"}`}>{charCount} chars</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400">Word Count:</span>
                <p className={`font-bold text-base mt-0.5 ${wordCount >= 6 && wordCount <= 9 ? "text-emerald-400" : "text-white"}`}>{wordCount} words</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400">Includes Number:</span>
                <p className={`font-bold text-base mt-0.5 ${hasNumber ? "text-emerald-400" : "text-slate-400"}`}>{hasNumber ? "Yes (+10)" : "No"}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400">Power Words:</span>
                <p className={`font-bold text-base mt-0.5 ${hasPowerWord ? "text-emerald-400" : "text-slate-400"}`}>{hasPowerWord ? "Detected" : "None"}</p>
              </div>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
