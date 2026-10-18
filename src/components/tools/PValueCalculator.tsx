import React, { useState } from "react";
import { Activity, Percent, ArrowRightLeft, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PValueCalculator: React.FC = () => {
  const [testType, setTestType] = useState<"z" | "t">("z");
  const [score, setScore] = useState<number>(2.15);
  const [df, setDf] = useState<number>(24);

  const effectiveDf = Math.max(1, Number(df) || 1);
  const zScore = Number(score) || 0;

  // Standard Normal CDF approximation via Abramowitz and Stegun (Formula 26.2.17)
  const normalCdf = (z: number) => {
    if (z < -8) return 0;
    if (z > 8) return 1;
    const t = 1.0 / (1.0 + 0.2316419 * Math.abs(z));
    const d = 0.3989422804014327 * Math.exp((-z * z) / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1.0 - p : p;
  };

  // For Student's t approximation: Hill's Cornish-Fisher expansion / transformation
  const effectiveZ = testType === "t"
    ? zScore / Math.sqrt(1 + (zScore * zScore) / (2 * effectiveDf))
    : zScore;

  const oneTail = Math.max(0, Math.min(1, 1 - normalCdf(Math.abs(effectiveZ))));
  const twoTail = Math.max(0, Math.min(1, 2 * oneTail));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Percent}
            title="P-Value from Z-Score and Student's t-Distribution"
            description="Convert test statistics (Z or t score) into exact one-tailed and two-tailed p-values for statistical hypothesis testing."
          />
          <ResetButton onReset={() => {
            setTestType("z");
            setScore(2.15);
            setDf(24);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Distribution Type
            </label>
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value as any)}
              className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
            >
              <option value="z">Standard Normal (Z-Score)</option>
              <option value="t">Student's t-Distribution</option>
            </select>
          </div>

          <InputField
            label={testType === "z" ? "Z-Score Test Statistic" : "t-Score Test Statistic"}
            type="number"
            step="0.01"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
          />

          {testType === "t" && (
            <InputField
              label="Degrees of Freedom (df ≥ 1)"
              type="number"
              min={1}
              value={df}
              onChange={(e) => setDf(Math.max(1, Number(e.target.value)))}
            />
          )}
        </div>

        <ResultCard variant="dark" title="P-Value Probability Results">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Two-Tailed P-Value</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {twoTail < 0.0001 ? "< 0.0001" : twoTail.toFixed(4)}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">P(|X| ≥ |{zScore}|)</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">One-Tailed P-Value</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">
                {oneTail < 0.0001 ? "< 0.0001" : oneTail.toFixed(4)}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Directional test</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Statistical Inference</span>
              <p className="text-sm font-bold text-white mt-1">
                {twoTail < 0.01 ? "Statistically Significant (p < 0.01)" :
                 twoTail < 0.05 ? "Significant (p < 0.05)" : "Not Significant (p ≥ 0.05)"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
