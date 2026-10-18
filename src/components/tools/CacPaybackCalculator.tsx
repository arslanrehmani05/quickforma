import React, { useState } from "react";
import { Users, DollarSign, Percent, Clock } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CacPaybackCalculator: React.FC = () => {
  const [cac, setCac] = useState<number>(1800);
  const [arpuMonthly, setArpuMonthly] = useState<number>(250);
  const [grossMarginPercent, setGrossMarginPercent] = useState<number>(80);
  const [avgCustomerLifespanMonths, setAvgCustomerLifespanMonths] = useState<number>(24);

  const monthlyGrossProfit = (arpuMonthly || 0) * ((grossMarginPercent || 0) / 100);
  const paybackMonths = monthlyGrossProfit > 0 ? (cac || 0) / monthlyGrossProfit : Infinity;
  const ltv = monthlyGrossProfit * (avgCustomerLifespanMonths || 0);
  const ltvToCac = cac > 0 ? ltv / cac : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Users}
            title="Customer Acquisition Cost (CAC) & Payback Calculator"
            description="Determine how many months of subscription gross margin are required to recover customer acquisition costs."
          />
          <ResetButton onReset={() => {
            setCac(1800);
            setArpuMonthly(250);
            setGrossMarginPercent(80);
            setAvgCustomerLifespanMonths(24);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Customer Acquisition Cost (CAC) ($)" type="number" prefix="$" value={cac} onChange={(e) => setCac(Number(e.target.value))} />
            <InputField label="Average Monthly Revenue per Account (ARPU) ($)" type="number" prefix="$" value={arpuMonthly} onChange={(e) => setArpuMonthly(Number(e.target.value))} />
            <InputField label="Gross Margin (%)" type="number" suffix="%" value={grossMarginPercent} onChange={(e) => setGrossMarginPercent(Number(e.target.value))} />
            <InputField label="Estimated Customer Lifespan (Months)" type="number" value={avgCustomerLifespanMonths} onChange={(e) => setAvgCustomerLifespanMonths(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="CAC Payback Velocity">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">CAC Payback Period</div>
                  <div className="text-4xl font-extrabold text-white">
                    {isFinite(paybackMonths) ? `${paybackMonths.toFixed(1)} Months` : "N/A"}
                  </div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Industry benchmark: Top SaaS companies recover CAC in &lt; 12 months
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Monthly Gross Profit / User:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${monthlyGrossProfit.toFixed(2)}/mo</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">LTV to CAC Ratio:</span>
                    <p className={`font-bold text-sm mt-0.5 ${ltvToCac >= 3 ? "text-emerald-400" : "text-amber-300"}`}>{ltvToCac.toFixed(2)}x</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Customer Lifetime Value (LTV):</span>
                    <p className="text-emerald-300 font-bold text-sm mt-0.5">${ltv.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Capital Efficiency:</span>
                    <p className="text-white font-bold text-sm mt-0.5">{paybackMonths <= 12 ? "High (Scalable)" : "Moderate Burn"}</p>
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
