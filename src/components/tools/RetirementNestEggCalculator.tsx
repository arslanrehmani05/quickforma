import React, { useState } from "react";
import { TrendingUp, DollarSign, Calendar, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RetirementNestEggCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState<number>(32);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(65000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000);
  const [annualReturn, setAnnualReturn] = useState<number>(7.5);
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [swrPercent, setSwrPercent] = useState<number>(4.0);

  const years = Math.max(1, (retirementAge || 65) - (currentAge || 30));
  const months = years * 12;
  const monthlyRate = (annualReturn || 0) / 100 / 12;

  // Compound future value
  const fvInitial = (currentSavings || 0) * Math.pow(1 + monthlyRate, months);
  const fvContributions = monthlyRate > 0
    ? (monthlyContribution || 0) * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
    : (monthlyContribution || 0) * months;
  const nominalNestEgg = fvInitial + fvContributions;

  // Inflation adjusted real value
  const realDiscountFactor = Math.pow(1 + (inflationRate || 0) / 100, years);
  const realNestEgg = nominalNestEgg / realDiscountFactor;

  const annualSafeIncomeNominal = nominalNestEgg * ((swrPercent || 4) / 100);
  const monthlySafeIncomeNominal = annualSafeIncomeNominal / 12;

  const annualSafeIncomeReal = realNestEgg * ((swrPercent || 4) / 100);
  const monthlySafeIncomeReal = annualSafeIncomeReal / 12;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={TrendingUp}
            title="Retirement Nest Egg & 4% Rule Income Solver"
            description="Project total retirement portfolio growth, compound investment returns, and safe monthly withdrawal income."
          />
          <ResetButton onReset={() => {
            setCurrentAge(32);
            setRetirementAge(65);
            setCurrentSavings(65000);
            setMonthlyContribution(1000);
            setAnnualReturn(7.5);
            setInflationRate(2.5);
            setSwrPercent(4.0);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Current Age" type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
              <InputField label="Target Retirement Age" type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} />
            </div>
            <InputField
              label="Current Retirement Savings ($)"
              type="number"
              prefix="$"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
            />
            <InputField
              label="Monthly Investment Contribution ($)"
              type="number"
              prefix="$"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            />
            <div className="grid grid-cols-3 gap-2">
              <InputField label="Return (%)" type="number" suffix="%" value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))} />
              <InputField label="Inflation (%)" type="number" suffix="%" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} />
              <InputField label="SWR (%)" type="number" suffix="%" value={swrPercent} onChange={(e) => setSwrPercent(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Retirement Projection">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Projected Nest Egg @ Age {retirementAge}</div>
                  <div className="text-4xl font-extrabold text-white">
                    ${nominalNestEgg.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Inflation-adjusted purchasing power: <span className="font-bold text-white">${realNestEgg.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Monthly Safe Withdrawal:</span>
                    <p className="text-emerald-400 font-bold text-base mt-0.5">${monthlySafeIncomeNominal.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Today's Purchasing Power:</span>
                    <p className="text-indigo-300 font-bold text-base mt-0.5">${monthlySafeIncomeReal.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Years to Accumulate:</span>
                    <p className="text-white font-bold text-sm mt-0.5">{years} years ({months} mos)</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Safe Withdrawal Rate:</span>
                    <p className="text-white font-bold text-sm mt-0.5">{swrPercent}% annually</p>
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
