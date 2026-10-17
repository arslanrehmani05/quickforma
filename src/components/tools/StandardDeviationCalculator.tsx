import React, { useState } from "react";
import { Activity, BarChart2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const StandardDeviationCalculator: React.FC = () => {
  const [dataInput, setDataInput] = useState("12, 18, 25, 31, 38, 42, 55, 60");

  const calculateStats = () => {
    const nums = dataInput.split(/[,\s]+/).map(Number).filter((n) => !isNaN(n));
    const n = nums.length;
    if (n < 2) return null;

    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const sqDiffs = nums.map((x) => Math.pow(x - mean, 2));
    const sumSqDiffs = sqDiffs.reduce((a, b) => a + b, 0);

    const sampleVariance = sumSqDiffs / (n - 1);
    const sampleStdDev = Math.sqrt(sampleVariance);

    const popVariance = sumSqDiffs / n;
    const popStdDev = Math.sqrt(popVariance);

    const sorted = [...nums].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[n - 1];
    const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];

    return { n, sum, mean, sampleStdDev, sampleVariance, popStdDev, popVariance, min, max, median };
  };

  const res = calculateStats();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Activity}
            title="Sample & Population Standard Deviation Solver"
            description="Calculate sample and population standard deviation, variance, mean, and range for any numeric dataset."
          />
          <ResetButton onReset={() => setDataInput("12, 18, 25, 31, 38, 42, 55, 60")} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Enter Numbers (separated by commas or spaces)</label>
              <textarea
                rows={5}
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-900 outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Statistical Dispersion">
              {res ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[11px] text-slate-400 block uppercase font-bold">Sample Std Dev (s)</span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                        {res.sampleStdDev.toFixed(3)}
                      </div>
                      <span className="text-[10px] text-slate-400 block font-mono">Variance: {res.sampleVariance.toFixed(2)}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[11px] text-slate-400 block uppercase font-bold">Population Std Dev (σ)</span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                        {res.popStdDev.toFixed(3)}
                      </div>
                      <span className="text-[10px] text-slate-400 block font-mono">Variance: {res.popVariance.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 block font-sans">Mean (x̄)</span>
                      <span className="text-base font-bold text-white">{res.mean.toFixed(2)}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 block font-sans">Median</span>
                      <span className="text-base font-bold text-white">{res.median.toFixed(2)}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 block font-sans">Count (n)</span>
                      <span className="text-base font-bold text-white">{res.n}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-rose-400 text-xs">Enter at least 2 numbers.</div>
              )}
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
