import React, { useState } from "react";
import { Calculator, DollarSign, TrendingUp, Percent, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EbitdaCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(1200000);
  const [cogs, setCogs] = useState<number>(450000);
  const [operatingExpenses, setOperatingExpenses] = useState<number>(380000);
  const [depreciation, setDepreciation] = useState<number>(45000);
  const [amortization, setAmortization] = useState<number>(15000);
  const [interestExpense, setInterestExpense] = useState<number>(22000);
  const [taxExpense, setTaxExpense] = useState<number>(58000);

  const grossProfit = Math.max(0, (revenue || 0) - (cogs || 0));
  // Operating Income (EBIT) before interest & taxes: Gross Profit - (Operating Expenses excluding D&A if reported separately)
  const ebit = grossProfit - (operatingExpenses || 0);
  const ebitda = ebit + (depreciation || 0) + (amortization || 0);
  const ebitdaMargin = (revenue || 0) > 0 ? (ebitda / revenue) * 100 : 0;
  const netIncome = ebit - (interestExpense || 0) - (taxExpense || 0);
  const netMargin = (revenue || 0) > 0 ? (netIncome / revenue) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Calculator}
            title="EBITDA & Operating Margin Calculator"
            description="Calculate Earnings Before Interest, Taxes, Depreciation, and Amortization along with operating profitability margins."
          />
          <ResetButton onReset={() => {
            setRevenue(1200000);
            setCogs(450000);
            setOperatingExpenses(380000);
            setDepreciation(45000);
            setAmortization(15000);
            setInterestExpense(22000);
            setTaxExpense(58000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label="Total Gross Revenue ($)"
              type="number"
              prefix="$"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
            />
            <InputField
              label="Cost of Goods Sold (COGS) ($)"
              type="number"
              prefix="$"
              value={cogs}
              onChange={(e) => setCogs(Number(e.target.value))}
            />
            <InputField
              label="Operating Expenses (SG&A, R&D, Admin) ($)"
              type="number"
              prefix="$"
              value={operatingExpenses}
              onChange={(e) => setOperatingExpenses(Number(e.target.value))}
            />
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Depreciation ($)"
                type="number"
                prefix="$"
                value={depreciation}
                onChange={(e) => setDepreciation(Number(e.target.value))}
              />
              <InputField
                label="Amortization ($)"
                type="number"
                prefix="$"
                value={amortization}
                onChange={(e) => setAmortization(Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Interest Expense ($)"
                type="number"
                prefix="$"
                value={interestExpense}
                onChange={(e) => setInterestExpense(Number(e.target.value))}
              />
              <InputField
                label="Income Tax Expense ($)"
                type="number"
                prefix="$"
                value={taxExpense}
                onChange={(e) => setTaxExpense(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="EBITDA Financial Performance">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Normalized EBITDA</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    ${ebitda.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-xs text-slate-400">
                    EBITDA Margin: <span className="text-indigo-300 font-bold">{ebitdaMargin.toFixed(1)}%</span> of annual gross revenue.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Gross Profit</span>
                    <span className="text-base font-bold text-white">${grossProfit.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Operating Income (EBIT)</span>
                    <span className="text-base font-bold text-white">${ebit.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Net Income</span>
                    <span className="text-base font-bold text-white">${netIncome.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Net Profit Margin</span>
                    <span className="text-base font-bold text-emerald-400">{netMargin.toFixed(1)}%</span>
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
