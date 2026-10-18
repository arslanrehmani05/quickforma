import React, { useState } from "react";
import { DollarSign, BarChart3, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const FreeCashFlowCalculator: React.FC = () => {
  const [operatingCashFlow, setOperatingCashFlow] = useState<number>(450000);
  const [capEx, setCapEx] = useState<number>(120000);
  const [netIncome, setNetIncome] = useState<number>(310000);
  const [netDebtRepayment, setNetDebtRepayment] = useState<number>(50000);

  const fcff = (operatingCashFlow || 0) - (capEx || 0); // Standard Free Cash Flow
  const fcfe = fcff - (netDebtRepayment || 0); // Free Cash Flow to Equity
  const fcfConversionRatio = netIncome > 0 ? (fcff / netIncome) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BarChart3}
            title="Free Cash Flow (FCF) & FCFF / FCFE Calculator"
            description="Calculate unlevered Free Cash Flow to Firm (FCFF), levered Free Cash Flow to Equity (FCFE), and net income conversion rates."
          />
          <ResetButton onReset={() => {
            setOperatingCashFlow(450000);
            setCapEx(120000);
            setNetIncome(310000);
            setNetDebtRepayment(50000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Operating Cash Flow (CFO) ($)" type="number" prefix="$" value={operatingCashFlow} onChange={(e) => setOperatingCashFlow(Number(e.target.value))} />
            <InputField label="Capital Expenditures (CapEx) ($)" type="number" prefix="$" value={capEx} onChange={(e) => setCapEx(Number(e.target.value))} />
            <InputField label="Net Income (GAAP) ($)" type="number" prefix="$" value={netIncome} onChange={(e) => setNetIncome(Number(e.target.value))} />
            <InputField label="Net Debt Principal Repayment / (Issuance) ($)" type="number" prefix="$" value={netDebtRepayment} onChange={(e) => setNetDebtRepayment(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Cash Generation Capacity">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Free Cash Flow to Firm (FCFF)</div>
                  <div className="text-4xl font-extrabold text-white">
                    ${fcff.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Conversion Rate: <span className="font-bold text-white">{fcfConversionRatio.toFixed(1)}%</span> of GAAP Net Income
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Free Cash Flow to Equity (FCFE):</span>
                    <p className="text-emerald-400 font-bold text-sm mt-0.5">${fcfe.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">CapEx Reinvestment Ratio:</span>
                    <p className="text-white font-bold text-sm mt-0.5">{operatingCashFlow > 0 ? ((capEx / operatingCashFlow) * 100).toFixed(1) : 0}% of CFO</p>
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
