import React, { useState } from "react";
import { ShieldAlert, Package, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SafetyStockCalculator: React.FC = () => {
  const [maxDailyUsage, setMaxDailyUsage] = useState<number>(45);
  const [avgDailyUsage, setAvgDailyUsage] = useState<number>(30);
  const [maxLeadTime, setMaxLeadTime] = useState<number>(21); // days
  const [avgLeadTime, setAvgLeadTime] = useState<number>(14); // days

  // Formula: Safety Stock = (Max Daily * Max Lead Time) - (Avg Daily * Avg Lead Time)
  const maxUsageScenario = (maxDailyUsage || 0) * (maxLeadTime || 0);
  const avgUsageScenario = (avgDailyUsage || 0) * (avgLeadTime || 0);
  const safetyStock = Math.max(0, maxUsageScenario - avgUsageScenario);

  // Reorder Point (ROP) = (Avg Daily * Avg Lead Time) + Safety Stock
  const reorderPoint = avgUsageScenario + safetyStock;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ShieldAlert}
            title="Safety Stock & Desired Service Level Solver"
            description="Prevent stockouts by computing buffer inventory and optimal inventory reorder points (ROP)."
          />
          <ResetButton onReset={() => {
            setMaxDailyUsage(45);
            setAvgDailyUsage(30);
            setMaxLeadTime(21);
            setAvgLeadTime(14);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Max Daily Unit Sales" type="number" value={maxDailyUsage} onChange={(e) => setMaxDailyUsage(Number(e.target.value))} />
              <InputField label="Average Daily Unit Sales" type="number" value={avgDailyUsage} onChange={(e) => setAvgDailyUsage(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Max Lead Time (Days)" type="number" suffix="days" value={maxLeadTime} onChange={(e) => setMaxLeadTime(Number(e.target.value))} />
              <InputField label="Average Lead Time (Days)" type="number" suffix="days" value={avgLeadTime} onChange={(e) => setAvgLeadTime(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Inventory Buffer Parameters">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 block uppercase font-bold">Safety Stock Buffer</span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                      {Math.ceil(safetyStock)} Units
                    </div>
                    <span className="text-[10px] text-slate-400 block">Lead-time variance buffer</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 block uppercase font-bold">Reorder Point (ROP)</span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                      {Math.ceil(reorderPoint)} Units
                    </div>
                    <span className="text-[10px] text-slate-400 block">Trigger reorder when reached</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                  Lead Time Demand: <strong>{avgUsageScenario} units</strong> consumed during standard {avgLeadTime}-day supplier replenishment window.
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
