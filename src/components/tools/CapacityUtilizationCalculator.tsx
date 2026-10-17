import React, { useState } from "react";
import { Gauge, Factory } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CapacityUtilizationCalculator: React.FC = () => {
  const [actualOutput, setActualOutput] = useState<number>(7800);
  const [maxPotentialOutput, setMaxPotentialOutput] = useState<number>(10000);

  const utilizationRate = (maxPotentialOutput || 0) > 0 ? ((actualOutput || 0) / maxPotentialOutput) * 100 : 0;
  const idleCapacityRate = Math.max(0, 100 - utilizationRate);
  const outputGap = Math.max(0, (maxPotentialOutput || 0) - (actualOutput || 0));

  const getStatus = () => {
    if (utilizationRate > 90) return { label: "Bottleneck Risk (>90%)", color: "text-amber-400" };
    if (utilizationRate >= 75) return { label: "Optimal Utilization (75–90%)", color: "text-emerald-400" };
    return { label: "Sub-Optimal / Excess Slack (<75%)", color: "text-indigo-300" };
  };

  const status = getStatus();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Gauge}
            title="Machine Hours Available vs Actual Run Time"
            description="Measure manufacturing facility capacity utilization percentage, excess idle capacity, and production slack."
          />
          <ResetButton onReset={() => {
            setActualOutput(7800);
            setMaxPotentialOutput(10000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Actual Production Output (Units or Hours)" type="number" value={actualOutput} onChange={(e) => setActualOutput(Number(e.target.value))} />
            <InputField label="Maximum Potential Capacity (Units or Hours)" type="number" value={maxPotentialOutput} onChange={(e) => setMaxPotentialOutput(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Capacity Metrics">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Capacity Utilization Rate</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                    {utilizationRate.toFixed(1)}%
                  </div>
                  <p className={`text-xs font-bold ${status.color}`}>
                    {status.label}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Idle Unused Capacity</span>
                    <span className="text-base font-bold text-white">{idleCapacityRate.toFixed(1)}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Production Output Gap</span>
                    <span className="text-base font-bold text-white">{outputGap.toLocaleString()} units</span>
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
