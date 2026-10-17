import React, { useState } from "react";
import { RefreshCw, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CashConversionCycleCalculator: React.FC = () => {
  const [annualRevenue, setAnnualRevenue] = useState<number>(2400000);
  const [annualCogs, setAnnualCogs] = useState<number>(1400000);
  const [avgInventory, setAvgInventory] = useState<number>(180000);
  const [avgReceivables, setAvgReceivables] = useState<number>(220000);
  const [avgPayables, setAvgPayables] = useState<number>(140000);

  const dio = (annualCogs || 0) > 0 ? ((avgInventory || 0) / annualCogs) * 365 : 0;
  const dso = (annualRevenue || 0) > 0 ? ((avgReceivables || 0) / annualRevenue) * 365 : 0;
  const dpo = (annualCogs || 0) > 0 ? ((avgPayables || 0) / annualCogs) * 365 : 0;

  const ccc = dio + dso - dpo;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={RefreshCw}
            title="Cash Conversion Cycle (CCC) Solver"
            description="Measure the time required to convert cash invested in inventory back into liquid cash from customer sales."
          />
          <ResetButton onReset={() => {
            setAnnualRevenue(2400000);
            setAnnualCogs(1400000);
            setAvgInventory(180000);
            setAvgReceivables(220000);
            setAvgPayables(140000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Annual Gross Sales ($)" type="number" prefix="$" value={annualRevenue} onChange={(e) => setAnnualRevenue(Number(e.target.value))} />
              <InputField label="Annual COGS ($)" type="number" prefix="$" value={annualCogs} onChange={(e) => setAnnualCogs(Number(e.target.value))} />
            </div>
            <InputField label="Average Inventory Value ($)" type="number" prefix="$" value={avgInventory} onChange={(e) => setAvgInventory(Number(e.target.value))} />
            <InputField label="Average Accounts Receivable ($)" type="number" prefix="$" value={avgReceivables} onChange={(e) => setAvgReceivables(Number(e.target.value))} />
            <InputField label="Average Accounts Payable ($)" type="number" prefix="$" value={avgPayables} onChange={(e) => setAvgPayables(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Cash Conversion Velocity">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Cash Conversion Cycle (CCC)</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    {ccc.toFixed(1)} Days
                  </div>
                  <p className="text-xs text-slate-400">
                    Formula: DIO ({dio.toFixed(0)}d) + DSO ({dso.toFixed(0)}d) - DPO ({dpo.toFixed(0)}d)
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block">Inventory (DIO)</span>
                    <span className="text-base font-bold text-white">{dio.toFixed(1)}d</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block">Collection (DSO)</span>
                    <span className="text-base font-bold text-white">{dso.toFixed(1)}d</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block">Payables (DPO)</span>
                    <span className="text-base font-bold text-white">{dpo.toFixed(1)}d</span>
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
