import React, { useState } from "react";
import { Activity, BarChart3, Calculator, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const VarianceCalculator: React.FC = () => {
  const [dataText, setDataText] = useState<string>("12, 15, 18, 20, 22, 25, 28, 30");

  const numbers = dataText
    .split(/[,\s]+/)
    .map(Number)
    .filter((n) => !isNaN(n));

  const n = numbers.length;
  const isSampleValid = n >= 2;
  const isPopValid = n >= 1;

  const mean = n > 0 ? numbers.reduce((a, b) => a + b, 0) / n : 0;

  // Sum of squared deviations
  const sumSq = numbers.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0);

  // Sample variance (s^2) with Bessel's correction (n - 1)
  const sampleVariance = isSampleValid ? sumSq / (n - 1) : null;
  const sampleStdDev = sampleVariance !== null ? Math.sqrt(sampleVariance) : null;

  // Population variance (sigma^2)
  const popVariance = isPopValid ? sumSq / n : null;
  const popStdDev = popVariance !== null ? Math.sqrt(popVariance) : null;

  // Coefficient of Variation (CV)
  const cv = sampleStdDev !== null && mean !== 0 ? (sampleStdDev / mean) * 100 : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Activity}
            title="Sample & Population Variance / Standard Deviation Calculator"
            description="Calculate sample variance (s² with Bessel's n-1 correction), population variance (σ²), standard deviation, sum of squares (SS), and CV."
          />
          <ResetButton onReset={() => {
            setDataText("12, 15, 18, 20, 22, 25, 28, 30");
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
            Found {n} valid numerical observation(s) {n > 0 && `| Sample Mean (x̄) = ${mean.toFixed(2)}`}
          </p>
        </div>

        {!isSampleValid && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Sample variance requires at least 2 numerical observations for degrees of freedom (n - 1). Population variance shown for single points.</span>
          </div>
        )}

        <ResultCard variant="dark" title="Dispersion Statistics">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Sample Variance (s²)</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {sampleVariance !== null ? sampleVariance.toFixed(2) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {sampleStdDev !== null ? `s = ${sampleStdDev.toFixed(2)} (Std Dev)` : "Requires n ≥ 2"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Population (σ²)</span>
              <p className="text-4xl font-extrabold text-white mt-1">
                {popVariance !== null ? popVariance.toFixed(2) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {popStdDev !== null ? `σ = ${popStdDev.toFixed(2)} (Std Dev)` : "No data"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Sum of Squares (SS)</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">
                {n > 0 ? sumSq.toFixed(1) : "—"}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Σ (x - x̄)²</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Coeff of Variation (CV)</span>
              <p className="text-4xl font-extrabold text-amber-300 mt-1">
                {cv !== null ? `${cv.toFixed(1)}%` : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Relative dispersion</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
