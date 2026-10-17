import React, { useState } from "react";
import { Timer, Gauge, Clock } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TaktTimeCalculator: React.FC = () => {
  const [shiftHours, setShiftHours] = useState<number>(8);
  const [breaksMinutes, setBreaksMinutes] = useState<number>(60); // lunch + breaks
  const [dailyCustomerDemand, setDailyCustomerDemand] = useState<number>(420); // units/day

  // Available production time in seconds = (shiftHours * 60 - breaksMinutes) * 60
  const netOperatingMinutes = Math.max(0, (shiftHours || 0) * 60 - (breaksMinutes || 0));
  const netOperatingSeconds = netOperatingMinutes * 60;

  const taktTimeSeconds = (dailyCustomerDemand || 0) > 0 ? netOperatingSeconds / dailyCustomerDemand : 0;
  const taktTimeMinutes = taktTimeSeconds / 60;
  const targetUnitsPerHour = netOperatingMinutes > 0 ? (dailyCustomerDemand / (netOperatingMinutes / 60)) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Timer}
            title="Production Pace & Customer Demand Rate Solver"
            description="Calculate lean manufacturing Takt Time to synchronize assembly line cycle times with customer purchase pace."
          />
          <ResetButton onReset={() => {
            setShiftHours(8);
            setBreaksMinutes(60);
            setDailyCustomerDemand(420);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Shift Duration (Hours)" type="number" suffix="hrs" value={shiftHours} onChange={(e) => setShiftHours(Number(e.target.value))} />
            <InputField label="Planned Downtime & Breaks (Minutes)" type="number" suffix="min" value={breaksMinutes} onChange={(e) => setBreaksMinutes(Number(e.target.value))} />
            <InputField label="Customer Daily Demand (Units)" type="number" value={dailyCustomerDemand} onChange={(e) => setDailyCustomerDemand(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Assembly Pace Target">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Required Takt Time</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                    {taktTimeSeconds.toFixed(1)} Sec / Unit
                  </div>
                  <p className="text-xs text-slate-400">
                    Equivalent to 1 unit completed every <strong>{taktTimeMinutes.toFixed(2)} minutes</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Target Production Pace</span>
                    <span className="text-base font-bold text-white font-mono">{Math.round(targetUnitsPerHour)} units/hr</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Net Operating Time</span>
                    <span className="text-base font-bold text-white font-mono">{netOperatingMinutes} minutes</span>
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
