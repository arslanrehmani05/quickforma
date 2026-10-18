import React, { useState } from "react";
import { Clock, DollarSign, Percent, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PaybackPeriodCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [annualCashFlow, setAnnualCashFlow] = useState<number>(32000);
  const [discountRate, setDiscountRate] = useState<number>(8.0);

  const simpleYears = annualCashFlow > 0 ? (initialInvestment || 0) / annualCashFlow : Infinity;

  // Discounted Payback
  let cumulativePV = 0;
  let discountedYears: number | null = null;
  const rate = (discountRate || 0) / 100;
  for (let y = 1; y <= 50; y++) {
    const pv = (annualCashFlow || 0) / Math.pow(1 + rate, y);
    if (cumulativePV + pv >= (initialInvestment || 0)) {
      const needed = (initialInvestment || 0) - cumulativePV;
      discountedYears = (y - 1) + (needed / pv);
      break;
    }
    cumulativePV += pv;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Clock}
            title="Simple & Discounted Payback Period Calculator"
            description="Calculate the exact years and months required for an investment's cash inflows to fully recover initial capital outlay."
          />
          <ResetButton onReset={() => {
            setInitialInvestment(100000);
            setAnnualCashFlow(32000);
            setDiscountRate(8.0);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Initial Capital Outlay ($)" type="number" prefix="$" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} />
            <InputField label="Annual Net Cash Inflow ($)" type="number" prefix="$" value={annualCashFlow} onChange={(e) => setAnnualCashFlow(Number(e.target.value))} />
            <InputField label="Cost of Capital / Discount Rate (%)" type="number" suffix="%" value={discountRate} onChange={(e) => setDiscountRate(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Capital Recovery Horizon">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Simple Payback Period</div>
                  <div className="text-4xl font-extrabold text-white">
                    {isFinite(simpleYears) ? `${simpleYears.toFixed(2)} Years` : "Never"}
                  </div>
                  <div className="text-xs text-indigo-200 mt-1">
                    {isFinite(simpleYears) ? `${Math.floor(simpleYears)} years, ${Math.round((simpleYears % 1) * 12)} months` : "Inflows are zero"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Discounted Payback:</span>
                    <p className="text-emerald-300 font-bold text-sm mt-0.5">
                      {discountedYears !== null ? `${discountedYears.toFixed(2)} Years` : "Exceeds 50 yrs"}
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Annual Return on Capital:</span>
                    <p className="text-white font-bold text-sm mt-0.5">
                      {initialInvestment > 0 ? (((annualCashFlow || 0) / initialInvestment) * 100).toFixed(1) : 0}% / yr
                    </p>
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
