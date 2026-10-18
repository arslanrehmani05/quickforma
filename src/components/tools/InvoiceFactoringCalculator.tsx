import React, { useState } from "react";
import { FileSpreadsheet, Percent, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const InvoiceFactoringCalculator: React.FC = () => {
  const [invoiceAmount, setInvoiceAmount] = useState<number>(50000);
  const [advanceRatePct, setAdvanceRatePct] = useState<number>(85); // typically 80% - 90%
  const [factoringFeePctPer30Days, setFactoringFeePctPer30Days] = useState<number>(2.5); // standard 1.5% - 3.5%
  const [daysToClientPayment, setDaysToClientPayment] = useState<number>(45);

  const safeInvoice = Math.max(0, invoiceAmount);
  const safeAdvanceRate = Math.min(100, Math.max(0, advanceRatePct));
  const advanceAmount = safeInvoice * (safeAdvanceRate / 100);
  const reserveHeld = safeInvoice - advanceAmount;

  // Factoring fee proportional to days outstanding
  const factoringFeeDollars = safeInvoice * (factoringFeePctPer30Days / 100) * (Math.max(1, daysToClientPayment) / 30);
  const rebateReturned = Math.max(0, reserveHeld - factoringFeeDollars);
  const totalCashReceived = advanceAmount + rebateReturned;
  const effectiveApr = daysToClientPayment > 0 
    ? ((factoringFeeDollars / advanceAmount) * (365 / daysToClientPayment)) * 100 
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileSpreadsheet}
            title="Invoice Factoring & Accounts Receivable Financing Calculator"
            description="Calculate upfront cash advance, reserve escrow rebate, factoring discount fees, and true annualized APR."
          />
          <ResetButton onReset={() => {
            setInvoiceAmount(50000);
            setAdvanceRatePct(85);
            setFactoringFeePctPer30Days(2.5);
            setDaysToClientPayment(45);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InputField
            label="Invoice Total ($)"
            type="number"
            min={0}
            step={5000}
            value={invoiceAmount}
            onChange={(e) => setInvoiceAmount(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Advance Rate (%)"
            type="number"
            min={50}
            max={95}
            step={1}
            value={advanceRatePct}
            onChange={(e) => setAdvanceRatePct(Number(e.target.value))}
          />
          <InputField
            label="Discount Fee (% / 30 Days)"
            type="number"
            min={0.5}
            max={10}
            step={0.1}
            value={factoringFeePctPer30Days}
            onChange={(e) => setFactoringFeePctPer30Days(Number(e.target.value))}
          />
          <InputField
            label="Days until Client Pays"
            type="number"
            min={5}
            max={180}
            value={daysToClientPayment}
            onChange={(e) => setDaysToClientPayment(Math.max(1, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Factoring Cash Flow Schedule">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Immediate Cash Advance</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">${Math.round(advanceAmount).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">{safeAdvanceRate}% funded within 24-48 hrs</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total Factoring Fee</span>
              <p className="text-3xl font-extrabold text-amber-300 mt-2">${Math.round(factoringFeeDollars).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">{daysToClientPayment} days financing cost</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Subsequent Rebate</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">${Math.round(rebateReturned).toLocaleString()}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Released upon client collection</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Equivalent APR</span>
              <p className="text-2xl font-mono font-bold text-rose-300 mt-2">{effectiveApr.toFixed(1)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Annualized cost of credit</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
