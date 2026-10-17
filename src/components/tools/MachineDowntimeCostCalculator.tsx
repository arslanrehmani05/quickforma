import React, { useState } from "react";
import { AlertTriangle, Clock, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const MachineDowntimeCostCalculator: React.FC = () => {
  const [downtimeHours, setDowntimeHours] = useState<number>(4.5);
  const [laborCostPerHour, setLaborCostPerHour] = useState<number>(180); // wages of idle operators
  const [unitsLostPerHour, setUnitsLostPerHour] = useState<number>(120);
  const [profitMarginPerUnit, setProfitMarginPerUnit] = useState<number>(15);
  const [repairPartsCost, setRepairPartsCost] = useState<number>(1200);

  const hours = downtimeHours || 0;
  const lostLabor = hours * (laborCostPerHour || 0);
  const lostProductionProfit = hours * (unitsLostPerHour || 0) * (profitMarginPerUnit || 0);
  const totalDowntimeLoss = lostLabor + lostProductionProfit + (repairPartsCost || 0);
  const costPerHour = hours > 0 ? totalDowntimeLoss / hours : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={AlertTriangle}
            title="Unplanned Equipment Downtime Financial Loss"
            description="Quantify the true financial cost of equipment stoppages including idle labor, lost output profit, and repair bills."
          />
          <ResetButton onReset={() => {
            setDowntimeHours(4.5);
            setLaborCostPerHour(180);
            setUnitsLostPerHour(120);
            setProfitMarginPerUnit(15);
            setRepairPartsCost(1200);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Unplanned Machine Downtime (Hours)" type="number" suffix="hrs" value={downtimeHours} onChange={(e) => setDowntimeHours(Number(e.target.value))} />
            <InputField label="Idle Direct Labor Cost per Hour ($)" type="number" prefix="$" value={laborCostPerHour} onChange={(e) => setLaborCostPerHour(Number(e.target.value))} helpText="Combined hourly wages of idle operators/technicians." />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Lost Output (Units / Hr)" type="number" value={unitsLostPerHour} onChange={(e) => setUnitsLostPerHour(Number(e.target.value))} />
              <InputField label="Profit Margin / Unit ($)" type="number" prefix="$" value={profitMarginPerUnit} onChange={(e) => setProfitMarginPerUnit(Number(e.target.value))} />
            </div>
            <InputField label="Emergency Parts & Contractor Cost ($)" type="number" prefix="$" value={repairPartsCost} onChange={(e) => setRepairPartsCost(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Downtime Impact Breakdown">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Total Financial Loss</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono">
                    ${Math.round(totalDowntimeLoss).toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400">
                    Hourly Outage Burn Rate: <strong className="text-white">${Math.round(costPerHour).toLocaleString()}/hour</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Lost Profit Output</span>
                    <span className="text-base font-bold text-white">${Math.round(lostProductionProfit).toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Idle Labor Wages</span>
                    <span className="text-base font-bold text-white">${Math.round(lostLabor).toLocaleString()}</span>
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
