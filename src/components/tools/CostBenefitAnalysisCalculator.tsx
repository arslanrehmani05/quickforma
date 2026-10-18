import React, { useState } from "react";
import { Scale, DollarSign, TrendingUp, CheckCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CostBenefitAnalysisCalculator: React.FC = () => {
  const [initialCost, setInitialCost] = useState<number>(75000);
  const [annualCost, setAnnualCost] = useState<number>(12000);
  const [annualBenefit, setAnnualBenefit] = useState<number>(45000);
  const [horizonYears, setHorizonYears] = useState<number>(5);
  const [discountRate, setDiscountRate] = useState<number>(7.0);

  const rate = (discountRate || 0) / 100;
  let pvCosts = initialCost || 0;
  let pvBenefits = 0;

  for (let y = 1; y <= (horizonYears || 5); y++) {
    pvCosts += (annualCost || 0) / Math.pow(1 + rate, y);
    pvBenefits += (annualBenefit || 0) / Math.pow(1 + rate, y);
  }

  const bcr = pvCosts > 0 ? pvBenefits / pvCosts : 0;
  const npv = pvBenefits - pvCosts;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Scale}
            title="Cost-Benefit Ratio (BCR) & Net Benefit Solver"
            description="Evaluate capital project investments by computing discounted Benefit-Cost Ratios and Net Present Value surplus."
          />
          <ResetButton onReset={() => {
            setInitialCost(75000);
            setAnnualCost(12000);
            setAnnualBenefit(45000);
            setHorizonYears(5);
            setDiscountRate(7.0);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Initial Implementation Cost ($)" type="number" prefix="$" value={initialCost} onChange={(e) => setInitialCost(Number(e.target.value))} />
            <InputField label="Annual Recurring Operating Costs ($)" type="number" prefix="$" value={annualCost} onChange={(e) => setAnnualCost(Number(e.target.value))} />
            <InputField label="Annual Total Financial Benefits & Savings ($)" type="number" prefix="$" value={annualBenefit} onChange={(e) => setAnnualBenefit(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Project Horizon (Years)" type="number" value={horizonYears} onChange={(e) => setHorizonYears(Number(e.target.value))} />
              <InputField label="Discount Rate (%)" type="number" suffix="%" value={discountRate} onChange={(e) => setDiscountRate(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Economic Feasibility">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Benefit-Cost Ratio (BCR)</div>
                  <div className="text-4xl font-extrabold text-white">{bcr.toFixed(2)}x</div>
                  <div className={`text-xs font-semibold mt-1 ${bcr >= 1.0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {bcr >= 1.0 ? "Economically Viable (Benefits exceed discounted costs)" : "Economically Unviable (BCR < 1.0)"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Net Present Value (NPV):</span>
                    <p className={`font-bold text-sm mt-0.5 ${npv >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      ${npv.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Present Value of Benefits:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${pvBenefits.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
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
