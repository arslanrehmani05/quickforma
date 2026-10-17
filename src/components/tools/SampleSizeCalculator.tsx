import React, { useState } from "react";
import { Users, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SampleSizeCalculator: React.FC = () => {
  const [population, setPopulation] = useState<number>(50000);
  const [confidenceLevel, setConfidenceLevel] = useState<number>(95);
  const [marginOfError, setMarginOfError] = useState<number>(5);
  const [proportion, setProportion] = useState<number>(50);

  // Z-scores for confidence levels
  const zScores: Record<number, number> = { 90: 1.645, 95: 1.96, 99: 2.576 };
  const z = zScores[confidenceLevel] ?? 1.96;
  const p = (proportion || 50) / 100;
  const e = (marginOfError || 5) / 100;

  // Cochran's sample size formula for infinite population: n0 = (Z^2 * p * (1-p)) / e^2
  const n0 = (Math.pow(z, 2) * p * (1 - p)) / Math.pow(e, 2);

  // Finite population correction: n = n0 / (1 + (n0 - 1) / N)
  const N = population || 0;
  const sampleSize = N > 0 ? Math.ceil(n0 / (1 + (n0 - 1) / N)) : Math.ceil(n0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Users}
            title="Margin of Error & Survey Sample Size Solver"
            description="Determine statistically rigorous sample sizes for surveys, market research studies, and A/B experiments."
          />
          <ResetButton onReset={() => {
            setPopulation(50000);
            setConfidenceLevel(95);
            setMarginOfError(5);
            setProportion(50);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label="Total Population Size (N)"
              type="number"
              value={population}
              onChange={(e) => setPopulation(Number(e.target.value))}
              helpText="Leave blank or 0 for unknown / infinite population."
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Confidence Level</label>
                <select
                  value={confidenceLevel}
                  onChange={(e) => setConfidenceLevel(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                >
                  <option value={90}>90% (Z = 1.645)</option>
                  <option value={95}>95% (Z = 1.960)</option>
                  <option value={99}>99% (Z = 2.576)</option>
                </select>
              </div>
              <InputField
                label="Margin of Error (±%)"
                type="number"
                suffix="%"
                value={marginOfError}
                onChange={(e) => setMarginOfError(Number(e.target.value))}
              />
            </div>
            <InputField
              label="Expected Response Proportion (%)"
              type="number"
              suffix="%"
              value={proportion}
              onChange={(e) => setProportion(Number(e.target.value))}
              helpText="50% provides the most conservative sample size recommendation."
            />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Recommended Sample Size">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Required Respondents (n)</span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 font-mono">
                    {sampleSize.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400">
                    Provides {confidenceLevel}% confidence with ±{marginOfError}% margin of error.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Z-Score Factor</span>
                    <span className="text-base font-bold text-white font-mono">{z}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Finite Pop Correction</span>
                    <span className="text-base font-bold text-white">{N > 0 ? "Applied" : "Infinite"}</span>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
