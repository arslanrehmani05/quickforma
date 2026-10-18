import React, { useState } from "react";
import { Percent, TrendingUp, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const WaccCalculator: React.FC = () => {
  const [equityValue, setEquityValue] = useState<number>(6000000);
  const [debtValue, setDebtValue] = useState<number>(4000000);
  const [costOfEquity, setCostOfEquity] = useState<number>(10.5);
  const [costOfDebt, setCostOfDebt] = useState<number>(6.0);
  const [taxRate, setTaxRate] = useState<number>(21.0);

  const totalCapital = (equityValue || 0) + (debtValue || 0);
  const weightEquity = totalCapital > 0 ? (equityValue || 0) / totalCapital : 0;
  const weightDebt = totalCapital > 0 ? (debtValue || 0) / totalCapital : 0;
  const afterTaxCostOfDebt = (costOfDebt || 0) * (1 - (taxRate || 0) / 100);
  const wacc = weightEquity * (costOfEquity || 0) + weightDebt * afterTaxCostOfDebt;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Percent}
            title="Weighted Average Cost of Capital (WACC) Solver"
            description="Calculate a firm's blended discount hurdle rate across equity valuation, debt obligations, and corporate tax shields."
          />
          <ResetButton onReset={() => {
            setEquityValue(6000000);
            setDebtValue(4000000);
            setCostOfEquity(10.5);
            setCostOfDebt(6.0);
            setTaxRate(21.0);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Market Value of Equity ($)" type="number" prefix="$" value={equityValue} onChange={(e) => setEquityValue(Number(e.target.value))} />
            <InputField label="Market Value of Debt ($)" type="number" prefix="$" value={debtValue} onChange={(e) => setDebtValue(Number(e.target.value))} />
            <InputField label="Cost of Equity (Re %) [CAPM]" type="number" suffix="%" value={costOfEquity} onChange={(e) => setCostOfEquity(Number(e.target.value))} />
            <InputField label="Pre-Tax Cost of Debt (Rd %)" type="number" suffix="%" value={costOfDebt} onChange={(e) => setCostOfDebt(Number(e.target.value))} />
            <InputField label="Corporate Marginal Tax Rate (%)" type="number" suffix="%" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="WACC Hurdle Rate">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Blended WACC Discount Rate</div>
                  <div className="text-4xl font-extrabold text-white">{wacc.toFixed(2)}%</div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Projects must yield &gt; {wacc.toFixed(2)}% to create shareholder value
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Equity Weight (E/V):</span>
                    <p className="text-white font-bold text-sm mt-0.5">{(weightEquity * 100).toFixed(1)}%</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Debt Weight (D/V):</span>
                    <p className="text-white font-bold text-sm mt-0.5">{(weightDebt * 100).toFixed(1)}%</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">After-Tax Cost of Debt:</span>
                    <p className="text-indigo-200 font-bold text-sm mt-0.5">{afterTaxCostOfDebt.toFixed(2)}%</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Capital Employed:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${totalCapital.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
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
