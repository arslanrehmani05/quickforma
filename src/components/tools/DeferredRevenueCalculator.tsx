import React, { useState } from "react";
import { Calendar, DollarSign, Layers } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const DeferredRevenueCalculator: React.FC = () => {
  const [contractValue, setContractValue] = useState<number>(36000);
  const [contractTermMonths, setContractTermMonths] = useState<number>(12);
  const [monthsElapsed, setMonthsElapsed] = useState<number>(4);

  const safeContract = Math.max(0, contractValue);
  const safeTerm = Math.max(1, contractTermMonths);
  const safeElapsed = Math.min(safeTerm, Math.max(0, monthsElapsed));

  const monthlyRecognizedRevenue = safeContract / safeTerm;
  const recognizedRevenueToDate = monthlyRecognizedRevenue * safeElapsed;
  const remainingDeferredRevenue = safeContract - recognizedRevenueToDate;
  const remainingMonths = safeTerm - safeElapsed;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Calendar}
            title="SaaS Deferred Revenue & ASC 606 Revenue Recognition Schedule"
            description="Track GAAP / ASC 606 ratable subscription revenue recognition, balance sheet unearned liability, and monthly recognized income."
          />
          <ResetButton onReset={() => {
            setContractValue(36000);
            setContractTermMonths(12);
            setMonthsElapsed(4);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Total Contract Value (TCV) ($)"
            type="number"
            min={0}
            step={1000}
            value={contractValue}
            onChange={(e) => setContractValue(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Subscription Term (Months)"
            type="number"
            min={1}
            max={60}
            value={contractTermMonths}
            onChange={(e) => setContractTermMonths(Math.max(1, Number(e.target.value)))}
          />
          <InputField
            label="Completed Service Months"
            type="number"
            min={0}
            max={contractTermMonths}
            value={monthsElapsed}
            onChange={(e) => setMonthsElapsed(Number(e.target.value))}
          />
        </div>

        <ResultCard variant="dark" title="ASC 606 Balance Sheet & P&L Allocation">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Recognized to Date</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">${Math.round(recognizedRevenueToDate).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Earned on Income Statement</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Deferred Revenue (Liability)</span>
              <p className="text-3xl font-extrabold text-amber-300 mt-2">${Math.round(remainingDeferredRevenue).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Unearned Balance Sheet liability</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Ratable Monthly Run-Rate</span>
              <p className="text-3xl font-extrabold text-white mt-2">${Math.round(monthlyRecognizedRevenue).toLocaleString()}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Per month recognition</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Remaining Term</span>
              <p className="text-2xl font-mono font-bold text-indigo-300 mt-2">{remainingMonths} months</p>
              <span className="text-[11px] text-slate-300 mt-1 block">of {safeTerm} month contract</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
