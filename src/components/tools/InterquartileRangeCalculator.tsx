import React, { useState } from "react";
import { Sliders, BarChart, AlertTriangle, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const InterquartileRangeCalculator: React.FC = () => {
  const [dataText, setDataText] = useState<string>("4, 8, 12, 15, 18, 21, 24, 28, 32, 55");

  const numbers = dataText
    .split(/[,\s]+/)
    .map(Number)
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);

  const n = numbers.length;
  const isValid = n >= 4;

  const getPercentile = (arr: number[], p: number) => {
    if (arr.length === 0) return 0;
    const index = (arr.length - 1) * p;
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;
    return arr[lower] * (1 - weight) + arr[upper] * weight;
  };

  const q1 = isValid ? getPercentile(numbers, 0.25) : 0;
  const q2 = isValid ? getPercentile(numbers, 0.50) : (n > 0 ? numbers[Math.floor(n / 2)] : 0);
  const q3 = isValid ? getPercentile(numbers, 0.75) : 0;
  const iqr = isValid ? q3 - q1 : 0;

  // Tukey outlier fences: 1.5 * IQR
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;

  const outliers = isValid ? numbers.filter((x) => x < lowerFence || x > upperFence) : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Sliders}
            title="Interquartile Range (IQR) & Outlier Detection Tool"
            description="Calculate Q1 (25th), Median Q2 (50th), Q3 (75th), IQR spread, and identify Tukey outliers with 1.5×IQR fences."
          />
          <ResetButton onReset={() => {
            setDataText("4, 8, 12, 15, 18, 21, 24, 28, 32, 55");
          }} />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Dataset Numbers (comma or space separated)
          </label>
          <textarea
            rows={3}
            value={dataText}
            onChange={(e) => setDataText(e.target.value)}
            className="w-full text-sm font-mono p-3 rounded-2xl border border-slate-200 bg-white"
          />
          <p className="text-xs text-slate-500 mt-1">
            {n > 0 ? `Sorted ${n} observations: ${numbers.join(", ")}` : "Enter numbers above"}
          </p>
        </div>

        {!isValid && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Calculating meaningful quartiles (Q1 and Q3) and Tukey outlier fences requires at least 4 numerical data points.</span>
          </div>
        )}

        <ResultCard variant="dark" title="Five-Number Summary & IQR Spread">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">IQR (Q3 - Q1)</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {isValid ? iqr.toFixed(2) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Middle 50% spread</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Median (Q2)</span>
              <p className="text-4xl font-extrabold text-white mt-1">
                {n > 0 ? q2.toFixed(2) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {isValid ? `Q1: ${q1.toFixed(1)} | Q3: ${q3.toFixed(1)}` : "50th percentile"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Outlier Fences</span>
              <p className="text-sm font-mono font-bold text-indigo-300 mt-3">
                {isValid ? `[${lowerFence.toFixed(1)}, ${upperFence.toFixed(1)}]` : "—"}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Q1 - 1.5×IQR to Q3 + 1.5×IQR</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Detected Outliers</span>
              <p className={`text-sm font-bold mt-1 ${outliers.length > 0 ? "text-amber-300" : "text-emerald-300"}`}>
                {!isValid ? "—" : outliers.length > 0 ? outliers.join(", ") : "None Detected"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {isValid ? `${outliers.length} data point(s)` : "Needs n ≥ 4"}
              </span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
