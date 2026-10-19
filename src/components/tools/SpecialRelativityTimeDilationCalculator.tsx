import React, { useState } from "react";
import { Rocket, Clock, Sparkles } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SpecialRelativityTimeDilationCalculator: React.FC = () => {
  const [velocityFractionC, setVelocityFractionC] = useState<number>(0.80); // 0.80 c
  const [properTimeYears, setProperTimeYears] = useState<number>(5.0); // 5 years on spacecraft

  const beta = Math.max(0, Math.min(0.99999, velocityFractionC));
  // Lorentz factor gamma = 1 / sqrt(1 - beta^2)
  const gamma = 1 / Math.sqrt(1 - beta * beta);

  // Dilated time Delta t = gamma * properTime
  const dilatedTimeYears = gamma * properTimeYears;
  const lengthContractionPct = ((1 - (1 / gamma)) * 100).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Rocket}
            title="Special Relativity Time Dilation & Lorentz Factor Solver"
            description="Calculate relativistic time dilation Δt = γΔt₀ and length contraction at fractions of light speed (c)."
          />
          <ResetButton onReset={() => { setVelocityFractionC(0.80); setProperTimeYears(5.0); }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Velocity as Fraction of Light Speed: <strong className="text-indigo-600">{beta.toFixed(3)} c</strong>
            </label>
            <input
              type="range"
              min={0}
              max={0.999}
              step={0.005}
              value={beta}
              onChange={(e) => setVelocityFractionC(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-500 font-mono mt-1">
              <span>0.1c (1.005γ)</span>
              <span>0.5c (1.15γ)</span>
              <span>0.8c (1.67γ)</span>
              <span>0.99c (7.09γ)</span>
            </div>
          </div>
          <InputField
            label="Proper Time on Spacecraft (Years)"
            type="number"
            step={0.5}
            value={properTimeYears}
            onChange={(e) => setProperTimeYears(Number(e.target.value))}
            min={0.1}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Earth-Elapsed Time"
            value={`${dilatedTimeYears.toFixed(2)} years`}
            subtitle="Time experienced by stationary observer"
          />
          <ResultCard
            variant="light"
            title="Lorentz Factor (γ)"
            value={`γ = ${gamma.toFixed(3)}`}
            subtitle="Relativistic scaling factor"
          />
          <ResultCard
            variant="light"
            title="Length Contraction"
            value={`-${lengthContractionPct}%`}
            subtitle="Shortening in direction of motion"
          />
        </div>
      </div>
    </div>
  );
};
