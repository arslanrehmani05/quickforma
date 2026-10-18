import React, { useState } from "react";
import { TrendingUp, Percent, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const OperatingLeverageCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(1000000);
  const [variableCosts, setVariableCosts] = useState<number>(400000);
  const [fixedCosts, setFixedCosts] = useState<number>(350000);

  const safeRevenue = Math.max(0, revenue);
  const safeVarCosts = Math.max(0, variableCosts);
  const safeFixedCosts = Math.max(0, fixedCosts);

  const contributionMargin = safeRevenue - safeVarCosts;
  const operatingIncomeEbit = contributionMargin - safeFixedCosts;
  
  // Degree of Operating Leverage (DOL) = Contribution Margin / Operating Income (EBIT)
  const dol = operatingIncomeEbit > 0 ? contributionMargin / operatingIncomeEbit : 0;
  const breakEvenRevenue = contributionMargin > 0 && safeRevenue > 0 
    ? safeFixedCosts / (contributionMargin / safeRevenue) 
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={TrendingUp}
            title="Degree of Operating Leverage (DOL) & Cost Structure Calculator"
            description="Measure operating income sensitivity to revenue fluctuations: Degree of Operating Leverage (DOL) = Contribution Margin / Operating Income."
          />
          <ResetButton onReset={() => {
            setRevenue(1000000);
            setVariableCosts(400000);
            setFixedCosts(350000);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Net Sales Revenue ($)"
            type="number"
            min={0}
            step={50000}
            value={revenue}
            onChange={(e) => setRevenue(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Total Variable Costs ($)"
            type="number"
            min={0}
            step={25000}
            value={variableCosts}
            onChange={(e) => setVariableCosts(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Total Fixed Overhead Costs ($)"
            type="number"
            min={0}
            step={25000}
            value={fixedCosts}
            onChange={(e) => setFixedCosts(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Operating Leverage & Sensitivity">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Degree of Op Leverage</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-2">{dol > 0 ? `${dol.toFixed(2)}×` : "—"}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">DOL Multiplier</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Operating Income (EBIT)</span>
              <p className={`text-3xl font-extrabold mt-2 ${operatingIncomeEbit >= 0 ? "text-white" : "text-rose-400"}`}>
                ${Math.round(operatingIncomeEbit).toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">After all fixed overhead</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Break-Even Sales</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">${Math.round(breakEvenRevenue).toLocaleString()}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Zero profit threshold</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Profit Expansion Potential</span>
              <p className="text-sm font-bold text-slate-200 mt-2">
                {dol > 0 ? `A +10% sales gain yields +${(dol * 10).toFixed(1)}% EBIT` : "Unprofitable"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
