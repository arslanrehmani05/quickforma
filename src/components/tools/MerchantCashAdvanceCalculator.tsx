import React, { useState } from "react";
import { AlertCircle, DollarSign, Percent, Calendar } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const MerchantCashAdvanceCalculator: React.FC = () => {
  const [advanceAmount, setAdvanceAmount] = useState<number>(50000);
  const [factorRate, setFactorRate] = useState<number>(1.28);
  const [estimatedTermMonths, setEstimatedTermMonths] = useState<number>(6);

  const totalPayback = (advanceAmount || 0) * (factorRate || 1.2);
  const totalFinancingFee = totalPayback - (advanceAmount || 0);

  // Approximate APR calculation for MCA
  const days = (estimatedTermMonths || 6) * 30.4;
  const apr = days > 0 ? (totalFinancingFee / (advanceAmount || 1)) * (365 / days) * 100 : 0;
  const estimatedDailyPayment = days > 0 ? totalPayback / (days * (5 / 7)) : 0; // assuming weekday withholding

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={AlertCircle}
            title="Merchant Cash Advance (MCA) APR & Factor Rate Calculator"
            description="Expose the true effective Annual Percentage Rate (APR) and total repayment cost behind factor rates in commercial cash advances."
          />
          <ResetButton onReset={() => {
            setAdvanceAmount(50000);
            setFactorRate(1.28);
            setEstimatedTermMonths(6);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Cash Advance Funded Amount ($)" type="number" prefix="$" value={advanceAmount} onChange={(e) => setAdvanceAmount(Number(e.target.value))} />
            <InputField label="Factor Rate (e.g. 1.20 - 1.45)" type="number" step="0.01" value={factorRate} onChange={(e) => setFactorRate(Number(e.target.value))} />
            <InputField label="Expected Repayment Horizon (Months)" type="number" value={estimatedTermMonths} onChange={(e) => setEstimatedTermMonths(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="True Cost of Capital">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Effective Annual Percentage Rate (APR)</div>
                  <div className="text-4xl font-extrabold text-rose-400">{apr.toFixed(1)}% APR</div>
                  <div className="text-xs text-rose-200 mt-1">
                    Caution: MCA factor rates conceal aggressive real annual interest rates
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Dollar Repayment:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${totalPayback.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Finance Charge:</span>
                    <p className="text-rose-300 font-bold text-sm mt-0.5">${totalFinancingFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Est. Daily Payment (M-F):</span>
                    <p className="text-white font-bold text-sm mt-0.5">${estimatedDailyPayment.toFixed(2)}/day</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Cash Cost Ratio:</span>
                    <p className="text-white font-bold text-sm mt-0.5">{((totalFinancingFee / advanceAmount) * 100).toFixed(1)}%</p>
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
