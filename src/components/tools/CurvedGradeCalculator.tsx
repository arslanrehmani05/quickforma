import React, { useState } from "react";
import { TrendingUp, Award, Sliders, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CurvedGradeCalculator: React.FC = () => {
  const [rawScore, setRawScore] = useState<number>(64);
  const [curveMethod, setCurveMethod] = useState<"sqrt" | "linear" | "target">("sqrt");
  const [linearPoints, setLinearPoints] = useState<number>(10);
  const [targetHigh, setTargetHigh] = useState<number>(85);

  const raw = Math.min(100, Math.max(0, rawScore || 0));

  let curvedScore = raw;
  let explanation = "";

  if (curveMethod === "sqrt") {
    // Square root curve: curved = 10 * sqrt(raw)
    curvedScore = Math.min(100, Math.max(0, 10 * Math.sqrt(raw)));
    explanation = "Square Root Curve: 10 × √(Raw Score). Gives a larger proportional boost to lower scores while tapering at higher scores.";
  } else if (curveMethod === "linear") {
    const pts = Number(linearPoints) || 0;
    curvedScore = Math.min(100, Math.max(0, raw + pts));
    explanation = `Linear Point Addition: Flat +${pts} percentage points added to every student's score.`;
  } else if (curveMethod === "target") {
    const high = Math.min(100, Math.max(1, targetHigh || 1));
    const ratio = 100 / high;
    curvedScore = Math.min(100, Math.max(0, raw * ratio));
    explanation = `Top-Score Benchmark: Scales so the highest exam score (${high}%) equals 100%. Multiplier: ${ratio.toFixed(3)}×.`;
  }

  const pointBoost = curvedScore - raw;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={TrendingUp}
            title="Curved Grade Adjustment Calculator"
            description="Simulate square root curve (10√x), flat point bump, or high-score normalization curve with transparent academic formulas."
          />
          <ResetButton onReset={() => {
            setRawScore(64);
            setCurveMethod("sqrt");
            setLinearPoints(10);
            setTargetHigh(85);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Raw Test Score (%)"
            type="number"
            min={0}
            max={100}
            value={rawScore}
            onChange={(e) => setRawScore(Number(e.target.value))}
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Curving Methodology
            </label>
            <select
              value={curveMethod}
              onChange={(e) => setCurveMethod(e.target.value as any)}
              className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
            >
              <option value="sqrt">Square Root Curve (10 × √Score)</option>
              <option value="linear">Flat Point Addition (+X pts)</option>
              <option value="target">Top-Score Normalization (Top = 100%)</option>
            </select>
          </div>
        </div>

        {curveMethod === "linear" && (
          <InputField
            label="Flat Points Added to Every Student"
            type="number"
            min={0}
            max={50}
            value={linearPoints}
            onChange={(e) => setLinearPoints(Number(e.target.value))}
          />
        )}

        {curveMethod === "target" && (
          <InputField
            label="Highest Raw Score Achieved in Class (%)"
            type="number"
            min={1}
            max={100}
            value={targetHigh}
            onChange={(e) => setTargetHigh(Math.max(1, Number(e.target.value)))}
            helpText="Must be greater than 0% to prevent division by zero."
          />
        )}

        <ResultCard variant="dark" title="Curved Outcome">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Curved Grade</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">{curvedScore.toFixed(1)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Raw: {raw}%</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Curve Boost</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">+{pointBoost.toFixed(1)} pts</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Net increase</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Curve Formula</span>
              <p className="text-xs font-medium text-slate-200 mt-2">{explanation}</p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
