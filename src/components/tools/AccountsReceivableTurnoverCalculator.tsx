import React, { useState } from "react";
import { RotateCw, DollarSign, Calendar, Clock } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AccountsReceivableTurnoverCalculator: React.FC = () => {
  const [netCreditSales, setNetCreditSales] = useState<number>(1200000);
  const [begAr, setBegAr] = useState<number>(110000);
  const [endAr, setEndAr] = useState<number>(130000);
  const [periodDays, setPeriodDays] = useState<number>(365);

  const avgAr = ((begAr || 0) + (endAr || 0)) / 2;
  const arTurnover = avgAr > 0 ? (netCreditSales || 0) / avgAr : 0;
  const dso = arTurnover > 0 ? (periodDays || 365) / arTurnover : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={RotateCw}
            title="Accounts Receivable Turnover & DSO Calculator"
            description="Measure receivables collection efficiency and calculate Days Sales Outstanding (DSO) across accounting periods."
          />
          <ResetButton onReset={() => {
            setNetCreditSales(1200000);
            setBegAr(110000);
            setEndAr(130000);
            setPeriodDays(365);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Net Annual Credit Sales ($)" type="number" prefix="$" value={netCreditSales} onChange={(e) => setNetCreditSales(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Beginning AR ($)" type="number" prefix="$" value={begAr} onChange={(e) => setBegAr(Number(e.target.value))} />
              <InputField label="Ending AR ($)" type="number" prefix="$" value={endAr} onChange={(e) => setEndAr(Number(e.target.value))} />
            </div>
            <InputField label="Measurement Period (Days)" type="number" value={periodDays} onChange={(e) => setPeriodDays(Number(e.target.value))} helpText="Typically 365 for annual or 90 for quarterly." />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Collection Velocity">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Days Sales Outstanding (DSO)</div>
                  <div className="text-4xl font-extrabold text-white">{dso.toFixed(1)} Days</div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Average time to collect invoice payment from clients
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">AR Turnover Ratio:</span>
                    <p className="text-emerald-300 font-bold text-sm mt-0.5">{arTurnover.toFixed(2)}x / year</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Average AR Balance:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${avgAr.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
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
