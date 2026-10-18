import React, { useState } from "react";
import { CheckCircle2, BarChart2, GitCommit, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TTestCalculator: React.FC = () => {
  const [sampleMean, setSampleMean] = useState<number>(104.2);
  const [hypothesizedMean, setHypothesizedMean] = useState<number>(100.0);
  const [sampleStdDev, setSampleStdDev] = useState<number>(8.5);
  const [sampleSize, setSampleSize] = useState<number>(25);

  const n = Math.max(2, Math.round(Number(sampleSize) || 2));
  const s = Math.max(0.0001, Number(sampleStdDev) || 0.0001);
  const xBar = Number(sampleMean) || 0;
  const mu0 = Number(hypothesizedMean) || 0;

  const df = n - 1;
  const standardError = s / Math.sqrt(n);
  const tStat = standardError > 0 ? (xBar - mu0) / standardError : 0;

  // Approximate two-tailed critical t value at alpha = 0.05
  const critT = df > 30 ? 1.96 : 2.0 + 4.0 / (df + 10);
  const isSignificant = Math.abs(tStat) > critT;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={GitCommit}
            title="One-Sample Student's t-Test Calculator"
            description="Calculate t-statistic t = (x̄ - μ₀) / (s / √n), standard error of the mean, and two-tailed hypothesis test significance at α = 0.05."
          />
          <ResetButton onReset={() => {
            setSampleMean(104.2);
            setHypothesizedMean(100.0);
            setSampleStdDev(8.5);
            setSampleSize(25);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Sample Mean (x̄)"
            type="number"
            step="any"
            value={sampleMean}
            onChange={(e) => setSampleMean(Number(e.target.value))}
          />
          <InputField
            label="Hypothesized Mean (μ₀)"
            type="number"
            step="any"
            value={hypothesizedMean}
            onChange={(e) => setHypothesizedMean(Number(e.target.value))}
          />
          <InputField
            label="Sample Std Dev (s)"
            type="number"
            min={0.001}
            step="any"
            value={sampleStdDev}
            onChange={(e) => setSampleStdDev(Math.max(0.001, Number(e.target.value)))}
          />
          <InputField
            label="Sample Size (n ≥ 2)"
            type="number"
            min={2}
            value={sampleSize}
            onChange={(e) => setSampleSize(Math.max(2, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="t-Test Inference Output">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">t-Statistic</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">{tStat.toFixed(3)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Degrees of Freedom: {df}</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Standard Error (SE)</span>
              <p className="text-4xl font-extrabold text-white mt-1">{standardError.toFixed(3)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">s / √n</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Critical t (α=.05)</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">±{critT.toFixed(2)}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Two-tailed threshold</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Null Hypothesis</span>
              <p className={`text-sm font-bold mt-1 ${isSignificant ? "text-emerald-400" : "text-slate-300"}`}>
                {isSignificant ? "Reject H₀ (p < 0.05)" : "Fail to Reject H₀"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {isSignificant ? "Statistically significant difference" : "No significant difference"}
              </span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
