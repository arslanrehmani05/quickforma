import React, { useState } from "react";
import { Building2, DollarSign, Percent, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const DscrCalculator: React.FC = () => {
  const [grossRevenue, setGrossRevenue] = useState<number>(350000);
  const [operatingExpenses, setOperatingExpenses] = useState<number>(140000);
  const [annualDebtService, setAnnualDebtService] = useState<number>(120000);
  const [targetMinDscr, setTargetMinDscr] = useState<number>(1.25);

  const noi = Math.max(0, (grossRevenue || 0) - (operatingExpenses || 0));
  const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;
  const maxAllowableDebtService = targetMinDscr > 0 ? noi / targetMinDscr : 0;

  const getDscrTier = () => {
    if (dscr >= 1.35) return { label: "Strong (Preferred Commercial Rate)", color: "text-emerald-400" };
    if (dscr >= 1.20) return { label: "Acceptable (Standard Bank Underwriting)", color: "text-emerald-300" };
    if (dscr >= 1.00) return { label: "Marginal (Breakeven / High Risk)", color: "text-amber-300" };
    return { label: "Default Risk (Insufficient Cash Flow)", color: "text-rose-400" };
  };

  const status = getDscrTier();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Building2}
            title="Debt Service Coverage Ratio (DSCR) Calculator"
            description="Commercial real estate and SBA loan underwriting metric measuring cash flow available to service principal and interest debt."
          />
          <ResetButton onReset={() => {
            setGrossRevenue(350000);
            setOperatingExpenses(140000);
            setAnnualDebtService(120000);
            setTargetMinDscr(1.25);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Gross Operating Revenue / Rent ($)" type="number" prefix="$" value={grossRevenue} onChange={(e) => setGrossRevenue(Number(e.target.value))} />
            <InputField label="Total Operating Expenses (Excl. Debt) ($)" type="number" prefix="$" value={operatingExpenses} onChange={(e) => setOperatingExpenses(Number(e.target.value))} />
            <InputField label="Annual Principal & Interest Debt Service ($)" type="number" prefix="$" value={annualDebtService} onChange={(e) => setAnnualDebtService(Number(e.target.value))} />
            <InputField label="Target Bank Minimum DSCR" type="number" suffix="x" value={targetMinDscr} onChange={(e) => setTargetMinDscr(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="DSCR Loan Qualification">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Debt Service Coverage Ratio</div>
                  <div className="text-4xl font-extrabold text-white">{dscr.toFixed(2)}x</div>
                  <div className={`text-xs font-semibold mt-1 ${status.color}`}>{status.label}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Net Operating Income (NOI):</span>
                    <p className="text-white font-bold text-sm mt-0.5">${noi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Max Debt Service @ {targetMinDscr}x:</span>
                    <p className="text-indigo-200 font-bold text-sm mt-0.5">${maxAllowableDebtService.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
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
