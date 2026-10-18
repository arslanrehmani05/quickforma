import React, { useState } from "react";
import { BarChart2, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AnovaCalculator: React.FC = () => {
  const [group1Text, setGroup1Text] = useState<string>("82, 85, 90, 88, 84");
  const [group2Text, setGroup2Text] = useState<string>("75, 78, 80, 72, 77");
  const [group3Text, setGroup3Text] = useState<string>("91, 94, 89, 95, 92");

  const parseNumbers = (text: string) =>
    text.split(/[,\s]+/).map(Number).filter((n) => !isNaN(n));

  const g1 = parseNumbers(group1Text);
  const g2 = parseNumbers(group2Text);
  const g3 = parseNumbers(group3Text);

  const groups = [g1, g2, g3];
  const k = 3; // number of groups
  const nTotal = g1.length + g2.length + g3.length;
  const isDataValid = g1.length >= 2 && g2.length >= 2 && g3.length >= 2;

  const mean = (arr: number[]) => (arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
  const m1 = mean(g1);
  const m2 = mean(g2);
  const m3 = mean(g3);
  const grandMean = nTotal > 0 ? (g1.reduce((a, b) => a + b, 0) + g2.reduce((a, b) => a + b, 0) + g3.reduce((a, b) => a + b, 0)) / nTotal : 0;

  // Between-group sum of squares (SSB)
  const ssb = g1.length * Math.pow(m1 - grandMean, 2) + g2.length * Math.pow(m2 - grandMean, 2) + g3.length * Math.pow(m3 - grandMean, 2);
  const dfBetween = k - 1;
  const msBetween = dfBetween > 0 ? ssb / dfBetween : 0;

  // Within-group sum of squares (SSW)
  const ssw =
    g1.reduce((sum, x) => sum + Math.pow(x - m1, 2), 0) +
    g2.reduce((sum, x) => sum + Math.pow(x - m2, 2), 0) +
    g3.reduce((sum, x) => sum + Math.pow(x - m3, 2), 0);
  const dfWithin = Math.max(1, nTotal - k);
  const msWithin = dfWithin > 0 ? ssw / dfWithin : 0;

  // F-ratio
  const fRatio = msWithin > 0 ? msBetween / msWithin : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BarChart2}
            title="One-Way ANOVA (Analysis of Variance) F-Test Tool"
            description="Calculate Between-Group Variance (SSB), Within-Group Variance (SSW), and the F-ratio test statistic for 3 independent sample groups."
          />
          <ResetButton onReset={() => {
            setGroup1Text("82, 85, 90, 88, 84");
            setGroup2Text("75, 78, 80, 72, 77");
            setGroup3Text("91, 94, 89, 95, 92");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Sample Group 1
            </label>
            <textarea
              rows={3}
              value={group1Text}
              onChange={(e) => setGroup1Text(e.target.value)}
              className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 bg-white"
            />
            <p className="text-[11px] text-slate-500 mt-1">Mean: {m1.toFixed(2)} (n={g1.length})</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Sample Group 2
            </label>
            <textarea
              rows={3}
              value={group2Text}
              onChange={(e) => setGroup2Text(e.target.value)}
              className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 bg-white"
            />
            <p className="text-[11px] text-slate-500 mt-1">Mean: {m2.toFixed(2)} (n={g2.length})</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Sample Group 3
            </label>
            <textarea
              rows={3}
              value={group3Text}
              onChange={(e) => setGroup3Text(e.target.value)}
              className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 bg-white"
            />
            <p className="text-[11px] text-slate-500 mt-1">Mean: {m3.toFixed(2)} (n={g3.length})</p>
          </div>
        </div>

        {!isDataValid && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            Each sample group must contain at least 2 numerical observations to calculate degrees of freedom and within-group variance.
          </div>
        )}

        <ResultCard variant="dark" title="One-Way ANOVA Table">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">F-Ratio Statistic</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {isDataValid ? fRatio.toFixed(3) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">MS_between / MS_within</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Between Groups (SSB)</span>
              <p className="text-3xl font-extrabold text-white mt-2">
                {isDataValid ? Math.abs(ssb).toFixed(1) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">df = {dfBetween} | MS = {msBetween.toFixed(1)}</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Within Groups (SSW)</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">
                {isDataValid ? ssw.toFixed(1) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">df = {dfWithin} | MS = {msWithin.toFixed(1)}</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Significance</span>
              <p className="text-sm font-bold text-white mt-1">
                {!isDataValid ? "Awaiting Valid Samples" : fRatio > 3.88 ? "Statistically Significant Difference (p < 0.05)" : "No Significant Difference"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
