import React, { useState } from "react";
import { CreditCard, DollarSign, Percent, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CreditCardProcessingSavingsCalculator: React.FC = () => {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(75000);
  const [monthlyTransactions, setMonthlyTransactions] = useState<number>(1200);
  const [flatRatePercent, setFlatRatePercent] = useState<number>(2.9);
  const [flatRatePerTx, setFlatRatePerTx] = useState<number>(0.30);
  const [interchangePercent, setInterchangePercent] = useState<number>(1.65);
  const [processorMarkupPercent, setProcessorMarkupPercent] = useState<number>(0.25);
  const [interchangePerTx, setInterchangePerTx] = useState<number>(0.10);

  const currentFlatFees = (monthlyVolume || 0) * ((flatRatePercent || 0) / 100) + (monthlyTransactions || 0) * (flatRatePerTx || 0);
  const proposedICRate = (interchangePercent || 0) + (processorMarkupPercent || 0);
  const proposedICFees = (monthlyVolume || 0) * (proposedICRate / 100) + (monthlyTransactions || 0) * (interchangePerTx || 0);

  const monthlySavings = Math.max(0, currentFlatFees - proposedICFees);
  const annualSavings = monthlySavings * 12;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={CreditCard}
            title="Interchange Plus vs Flat Rate Processing Savings"
            description="Calculate monthly and annual merchant processing savings by migrating from flat-rate pricing (Stripe/Square) to Interchange-Plus."
          />
          <ResetButton onReset={() => {
            setMonthlyVolume(75000);
            setMonthlyTransactions(1200);
            setFlatRatePercent(2.9);
            setFlatRatePerTx(0.30);
            setInterchangePercent(1.65);
            setProcessorMarkupPercent(0.25);
            setInterchangePerTx(0.10);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Monthly Processing Volume ($)" type="number" prefix="$" value={monthlyVolume} onChange={(e) => setMonthlyVolume(Number(e.target.value))} />
            <InputField label="Total Monthly Transactions" type="number" value={monthlyTransactions} onChange={(e) => setMonthlyTransactions(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Current Flat Rate (%)" type="number" suffix="%" value={flatRatePercent} onChange={(e) => setFlatRatePercent(Number(e.target.value))} />
              <InputField label="Flat Fixed Fee ($/tx)" type="number" prefix="$" value={flatRatePerTx} onChange={(e) => setFlatRatePerTx(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Avg Interchange Rate (%)" type="number" suffix="%" value={interchangePercent} onChange={(e) => setInterchangePercent(Number(e.target.value))} />
              <InputField label="Processor Markup (%)" type="number" suffix="%" value={processorMarkupPercent} onChange={(e) => setProcessorMarkupPercent(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Merchant Cost Reduction">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Annual Bottom-Line Savings</div>
                  <div className="text-4xl font-extrabold text-emerald-400">
                    +${annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Monthly savings: <span className="font-bold text-white">+${monthlySavings.toFixed(2)}/mo</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Current Flat Rate Fees:</span>
                    <p className="text-rose-300 font-bold text-sm mt-0.5">${currentFlatFees.toFixed(2)}/mo</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Interchange Plus Fees:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${proposedICFees.toFixed(2)}/mo</p>
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
