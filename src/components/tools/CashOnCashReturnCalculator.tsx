import React, { useState } from "react";
import { Coins, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CashOnCashReturnCalculator: React.FC = () => {
  const [downPayment, setDownPayment] = useState<number>(90000);
  const [closingCosts, setClosingCosts] = useState<number>(12000);
  const [renovationCosts, setRenovationCosts] = useState<number>(15000);
  const [annualGrossRent, setAnnualGrossRent] = useState<number>(45000);
  const [annualOperatingExpenses, setAnnualOperatingExpenses] = useState<number>(14000);
  const [annualMortgageDebtService, setAnnualMortgageDebtService] = useState<number>(21000);

  const totalCashInvested = (downPayment || 0) + (closingCosts || 0) + (renovationCosts || 0);
  const netOperatingIncome = (annualGrossRent || 0) - (annualOperatingExpenses || 0);
  const annualPreTaxCashFlow = netOperatingIncome - (annualMortgageDebtService || 0);

  const cashOnCashReturn = totalCashInvested > 0 ? (annualPreTaxCashFlow / totalCashInvested) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Coins}
            title="Cash-on-Cash Return & Initial Outlay Solver"
            description="Calculate cash-on-cash yield on equity deployed into leveraged real estate investments."
          />
          <ResetButton onReset={() => {
            setDownPayment(90000);
            setClosingCosts(12000);
            setRenovationCosts(15000);
            setAnnualGrossRent(45000);
            setAnnualOperatingExpenses(14000);
            setAnnualMortgageDebtService(21000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Initial Out-of-Pocket Equity</h3>
            <div className="grid grid-cols-3 gap-2">
              <InputField label="Down Payment ($)" type="number" prefix="$" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
              <InputField label="Closing Costs ($)" type="number" prefix="$" value={closingCosts} onChange={(e) => setClosingCosts(Number(e.target.value))} />
              <InputField label="Rehab / Repairs ($)" type="number" prefix="$" value={renovationCosts} onChange={(e) => setRenovationCosts(Number(e.target.value))} />
            </div>

            <h3 className="text-sm font-bold text-slate-800 pt-2 border-t border-slate-100">Annual Cash Flows</h3>
            <InputField label="Annual Gross Rental Income ($)" type="number" prefix="$" value={annualGrossRent} onChange={(e) => setAnnualGrossRent(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Annual Operating Expenses ($)" type="number" prefix="$" value={annualOperatingExpenses} onChange={(e) => setAnnualOperatingExpenses(Number(e.target.value))} />
              <InputField label="Annual Debt Service (P&I) ($)" type="number" prefix="$" value={annualMortgageDebtService} onChange={(e) => setAnnualMortgageDebtService(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Cash-on-Cash Yield">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Cash-on-Cash Return (CoC)</span>
                  <div className={`text-3xl sm:text-4xl font-extrabold ${cashOnCashReturn >= 0 ? "text-emerald-400" : "text-rose-400"} font-mono`}>
                    {cashOnCashReturn.toFixed(2)}%
                  </div>
                  <p className="text-xs text-slate-400">
                    Net Pre-Tax Cash Flow: <strong className="text-white">${annualPreTaxCashFlow.toLocaleString()}/yr</strong> (${Math.round(annualPreTaxCashFlow / 12).toLocaleString()}/mo).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Total Cash Invested</span>
                    <span className="text-base font-bold text-white">${totalCashInvested.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Net Operating Income (NOI)</span>
                    <span className="text-base font-bold text-white">${netOperatingIncome.toLocaleString()}</span>
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
