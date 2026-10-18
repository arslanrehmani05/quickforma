import React, { useState } from "react";
import { UserMinus, DollarSign, Percent, TrendingDown } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ChurnRateImpactCalculator: React.FC = () => {
  const [startingCustomers, setStartingCustomers] = useState<number>(1200);
  const [monthlyChurnRate, setMonthlyChurnRate] = useState<number>(3.5);
  const [arpuMonthly, setArpuMonthly] = useState<number>(150);
  const [monthlyNewCustomers, setMonthlyNewCustomers] = useState<number>(60);

  const monthlyLostCustomers = Math.round((startingCustomers || 0) * ((monthlyChurnRate || 0) / 100));
  const monthlyLostMrr = monthlyLostCustomers * (arpuMonthly || 0);
  const annualLostArr = monthlyLostMrr * 12;

  const netMonthlyGrowth = (monthlyNewCustomers || 0) - monthlyLostCustomers;
  const annualProjectedCustomers = Math.max(0, (startingCustomers || 0) + netMonthlyGrowth * 12);
  const netArrImpact = netMonthlyGrowth * (arpuMonthly || 0) * 12;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={UserMinus}
            title="Customer Churn Revenue Loss Calculator"
            description="Quantify recurring revenue lost to monthly subscription attrition and evaluate net 12-month ARR impact."
          />
          <ResetButton onReset={() => {
            setStartingCustomers(1200);
            setMonthlyChurnRate(3.5);
            setArpuMonthly(150);
            setMonthlyNewCustomers(60);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Starting Active Customer Count" type="number" value={startingCustomers} onChange={(e) => setStartingCustomers(Number(e.target.value))} />
            <InputField label="Monthly Customer Churn Rate (%)" type="number" suffix="%" value={monthlyChurnRate} onChange={(e) => setMonthlyChurnRate(Number(e.target.value))} />
            <InputField label="Average Monthly Revenue per User (ARPU) ($)" type="number" prefix="$" value={arpuMonthly} onChange={(e) => setArpuMonthly(Number(e.target.value))} />
            <InputField label="Monthly New Customers Acquired" type="number" value={monthlyNewCustomers} onChange={(e) => setMonthlyNewCustomers(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Revenue Attrition Drag">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Annual Lost ARR from Churn</div>
                  <div className="text-4xl font-extrabold text-rose-300">
                    -${annualLostArr.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    Monthly MRR bleeding: -${monthlyLostMrr.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo ({monthlyLostCustomers} customers/mo)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Net Monthly Customer Delta:</span>
                    <p className={`font-bold text-sm mt-0.5 ${netMonthlyGrowth >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {netMonthlyGrowth >= 0 ? `+${netMonthlyGrowth}` : netMonthlyGrowth} accounts/mo
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">12-Month Projected Base:</span>
                    <p className="text-white font-bold text-sm mt-0.5">{annualProjectedCustomers.toLocaleString()} customers</p>
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
