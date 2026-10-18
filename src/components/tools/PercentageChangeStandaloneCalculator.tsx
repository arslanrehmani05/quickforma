import React, { useState } from "react";
import { Percent, TrendingUp, TrendingDown, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PercentageChangeStandaloneCalculator: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number>(120);
  const [finalValue, setFinalValue] = useState<number>(180);

  const v1 = Number(initialValue) || 0;
  const v2 = Number(finalValue) || 0;

  const absoluteChange = v2 - v1;
  const isInitialZero = v1 === 0;

  // Percentage change from 0 is mathematically undefined
  const percentageChange = !isInitialZero ? (absoluteChange / Math.abs(v1)) * 100 : null;
  const multiplier = !isInitialZero ? v2 / v1 : null;

  // Percentage Difference (symmetric relative to midpoint)
  const average = (v1 + v2) / 2;
  const percentageDifference = average !== 0 ? (Math.abs(absoluteChange) / Math.abs(average)) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Percent}
            title="Percentage Change & Percentage Difference Calculator"
            description="Calculate percentage increase, decrease, absolute variance, growth factor, and relative percentage difference with zero-base validation."
          />
          <ResetButton onReset={() => {
            setInitialValue(120);
            setFinalValue(180);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Initial Baseline Value (V₁)"
            type="number"
            step="any"
            value={initialValue}
            onChange={(e) => setInitialValue(Number(e.target.value))}
          />
          <InputField
            label="Final New Value (V₂)"
            type="number"
            step="any"
            value={finalValue}
            onChange={(e) => setFinalValue(Number(e.target.value))}
          />
        </div>

        {isInitialZero && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Mathematical Boundary: Percentage change from an initial value of 0 is mathematically undefined (division by zero). Showing absolute variance.</span>
          </div>
        )}

        <ResultCard variant="dark" title="Variance & Growth Analysis">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Percentage Change</span>
              <p className={`text-4xl font-extrabold mt-1 ${percentageChange === null ? "text-slate-400" : percentageChange >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {percentageChange === null ? "Undefined" : `${percentageChange >= 0 ? "+" : ""}${percentageChange.toFixed(2)}%`}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {percentageChange === null ? "Initial value is 0" : percentageChange >= 0 ? "Percentage Increase" : "Percentage Decrease"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Absolute Variance</span>
              <p className="text-4xl font-extrabold text-white mt-1">
                {absoluteChange >= 0 ? "+" : ""}{absoluteChange.toFixed(2)}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">V₂ - V₁</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Relative Difference</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">{percentageDifference.toFixed(2)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">|Δ| ÷ Average(V₁, V₂)</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Growth Multiplier</span>
              <p className="text-2xl font-mono font-bold text-slate-100 mt-1">
                {multiplier !== null ? `${multiplier.toFixed(3)}×` : "N/A"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">V₂ ÷ V₁</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
