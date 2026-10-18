import React, { useState } from "react";
import { RotateCcw, DollarSign, Calendar, Clock } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AccountsPayableTurnoverCalculator: React.FC = () => {
  const [cogsPurchases, setCogsPurchases] = useState<number>(850000);
  const [begAp, setBegAp] = useState<number>(65000);
  const [endAp, setEndAp] = useState<number>(85000);
  const [periodDays, setPeriodDays] = useState<number>(365);

  const avgAp = ((begAp || 0) + (endAp || 0)) / 2;
  const apTurnover = avgAp > 0 ? (cogsPurchases || 0) / avgAp : 0;
  const dpo = apTurnover > 0 ? (periodDays || 365) / apTurnover : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={RotateCcw}
            title="Accounts Payable Turnover & DPO Calculator"
            description="Calculate Accounts Payable turnover velocity and Days Payable Outstanding (DPO) to optimize supplier payment cycles."
          />
          <ResetButton onReset={() => {
            setCogsPurchases(850000);
            setBegAp(65000);
            setEndAp(85000);
            setPeriodDays(365);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Total Cost of Goods Sold / Supplier Purchases ($)" type="number" prefix="$" value={cogsPurchases} onChange={(e) => setCogsPurchases(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Beginning AP ($)" type="number" prefix="$" value={begAp} onChange={(e) => setBegAp(Number(e.target.value))} />
              <InputField label="Ending AP ($)" type="number" prefix="$" value={endAp} onChange={(e) => setEndAp(Number(e.target.value))} />
            </div>
            <InputField label="Measurement Period (Days)" type="number" value={periodDays} onChange={(e) => setPeriodDays(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Payables Cycle Timing">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Days Payable Outstanding (DPO)</div>
                  <div className="text-4xl font-extrabold text-white">{dpo.toFixed(1)} Days</div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Average time your business retains cash before settling vendor invoices
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">AP Turnover Ratio:</span>
                    <p className="text-emerald-300 font-bold text-sm mt-0.5">{apTurnover.toFixed(2)}x / year</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Average AP Balance:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${avgAp.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
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
