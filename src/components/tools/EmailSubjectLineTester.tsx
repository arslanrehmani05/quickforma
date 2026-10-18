import React, { useState } from "react";
import { Mail, Smartphone, Monitor, AlertCircle, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EmailSubjectLineTester: React.FC = () => {
  const [subject, setSubject] = useState<string>("Unlock 40% Off: New Spring Developer Tools Released Today!");

  const trimmed = subject.trim();
  const charCount = subject.length;
  const words = trimmed ? trimmed.split(/\s+/) : [];
  const wordCount = words.length;

  // Published marketing heuristic lists for spam words
  const spamTriggers = ["free", "guaranteed", "urgent", "100%", "$$$", "winner", "risk-free", "cash", "act now", "apply now", "no cost", "order now", "congratulations"];
  const detectedSpam = spamTriggers.filter((word) => subject.toLowerCase().includes(word));

  const mobileCutoff = 41; // Typical iPhone / Android truncation point
  const desktopCutoff = 70; // Typical Gmail / Outlook desktop truncation point

  // Heuristic Copywriting Quality Score (0 to 100)
  let score = 0;
  if (charCount > 0) {
    score = 65;
    // Length heuristics: 30-50 chars is optimal
    if (charCount >= 30 && charCount <= 50) score += 20;
    else if (charCount < 20) score -= 10;
    else if (charCount > 60) score -= 15;

    // Word count heuristics: 4-7 words optimal
    if (wordCount >= 4 && wordCount <= 7) score += 10;

    // Numbers in subject line often improve engagement
    if (/\d+/.test(subject)) score += 5;

    // Deduct for spam trigger words
    if (detectedSpam.length > 0) score -= detectedSpam.length * 15;
    score = Math.min(100, Math.max(0, score));
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Mail}
            title="Email Subject Line Copy & Length Analyzer"
            description="Analyze subject line character length, mobile inbox truncation, and promotional keyword triggers based on email marketing best practices."
          />
          <ResetButton onReset={() => setSubject("Unlock 40% Off: New Spring Developer Tools Released Today!")} />
        </div>

        <InputField
          label="Email Subject Line"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          helpText="Recommended: 30–50 characters and 4–7 words for optimal mobile preview visibility."
        />

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <Info className="w-3.5 h-3.5 text-indigo-600" /> Deliverability Transparency Note
          </div>
          <p>
            Actual email inbox placement and open rates depend primarily on sender domain authentication (SPF, DKIM, DMARC), IP reputation, subscriber engagement history, and mailbox provider algorithms (Gmail, Outlook). This tool evaluates copywriting length, mobile screen cutoffs, and spam trigger heuristics.
          </p>
        </div>

        <ResultCard variant="dark" title="Subject Line Heuristic Quality Score">
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
              <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Heuristic Copy Score</div>
              <div className="text-5xl font-extrabold text-white">
                {charCount > 0 ? `${score} / 100` : "—"}
              </div>
              <div className={`text-xs font-semibold mt-1.5 ${charCount === 0 ? "text-slate-400" : score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-300" : "text-rose-400"}`}>
                {charCount === 0 ? "Enter subject line above" : score >= 80 ? "Optimized Length & Strong Mobile Fit" : "Room for Improvement (Adjust length or remove trigger terms)"}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400">Character Count:</span>
                <p className={`font-bold text-base mt-0.5 ${charCount >= 30 && charCount <= 50 ? "text-emerald-300" : "text-amber-300"}`}>
                  {charCount} characters
                </p>
                <span className="text-[10px] text-slate-400">Mobile Budget: ~41 chars</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400">Word Count:</span>
                <p className="text-white font-bold text-base mt-0.5">{wordCount} words</p>
                <span className="text-[10px] text-slate-400">Target: 4–7 words</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400">Promotional Triggers:</span>
                <p className={`font-bold text-base mt-0.5 ${detectedSpam.length === 0 ? "text-emerald-400" : "text-amber-300"}`}>
                  {detectedSpam.length === 0 ? "None Detected" : detectedSpam.join(", ")}
                </p>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <Smartphone className="w-3.5 h-3.5 text-indigo-400" /> Mobile Inbox Preview (~41 char truncation):
              </div>
              <p className="font-mono text-emerald-300 bg-slate-900/50 p-2 rounded-lg">
                {subject.length > 0 ? (
                  <>
                    <span>{subject.slice(0, mobileCutoff)}</span>
                    {subject.length > mobileCutoff && <span className="text-slate-500">...</span>}
                  </>
                ) : (
                  <span className="text-slate-500 italic">No subject line entered</span>
                )}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
