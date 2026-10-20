import React, { useState } from "react";
import { PiggyBank, Target, Calendar, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SimpleSavingsGoalCalculator: React.FC = () => {
  const [savingsTarget, setSavingsTarget] = useState<number>(30000);
  const [currentSavings, setCurrentSavings] = useState<number>(5000);
  const [targetTimeMonths, setTargetTimeMonths] = useState<number>(24);
  const [apyInterestPercent, setApyInterestPercent] = useState<number>(4.5); // 4.5% High Yield Savings APY

  const handleReset = () => {
    setSavingsTarget(30000);
    setCurrentSavings(5000);
    setTargetTimeMonths(24);
    setApyInterestPercent(4.5);
  };

  const remainingPrincipalNeeded = Math.max(0, savingsTarget - currentSavings);
  // Monthly interest rate
  const monthlyRate = (apyInterestPercent / 100) / 12;
  // Future value of current savings: PV * (1+r)^n
  const fvInitial = currentSavings * Math.pow(1 + monthlyRate, targetTimeMonths);
  const netDeficitAfterGrowth = Math.max(0, savingsTarget - fvInitial);
  // Required monthly deposit: PMT = Deficit * r / ((1+r)^n - 1)
  const monthlyDepositRequired = monthlyRate > 0 && targetTimeMonths > 0
    ? (netDeficitAfterGrowth * monthlyRate) / (Math.pow(1 + monthlyRate, targetTimeMonths) - 1)
    : remainingPrincipalNeeded / Math.max(1, targetTimeMonths);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Target Savings Goal & Monthly Deposit Required Solver"
        description="Compute required monthly deposits to reach financial goals, down payments, or emergency funds with High-Yield APY."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Total Savings Goal ($)"
            value={savingsTarget}
            onChange={(val) => setSavingsTarget(Math.max(100, Number(val) || 0))}
            type="number"
            min={100}
            prefix="$"
          />
          <InputField
            label="Current Savings Already Set Aside ($)"
            value={currentSavings}
            onChange={(val) => setCurrentSavings(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Target Timeline (Months)"
            value={targetTimeMonths}
            onChange={(val) => setTargetTimeMonths(Math.min(240, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={240}
          />
          <InputField
            label="High-Yield Savings APY (%)"
            value={apyInterestPercent}
            onChange={(val) => setApyInterestPercent(Math.min(15, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            step={0.1}
            suffix="%"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Required Monthly Deposit"
            value={`$${monthlyDepositRequired.toFixed(2)}/mo`}
            subtitle={`$${(monthlyDepositRequired / 4.33).toFixed(2)}/week`}
            variant="indigo"
          />
          <ResultCard
            title="Principal Needed"
            value={`$${remainingPrincipalNeeded.toLocaleString()}`}
            subtitle="Goal minus initial seed"
            variant="light"
          />
          <ResultCard
            title="Interest Earned (HYSA)"
            value={`+$${Math.max(0, savingsTarget - (currentSavings + monthlyDepositRequired * targetTimeMonths)).toFixed(0)}`}
            subtitle="Free APY cash contribution"
            variant="indigo"
          />
          <ResultCard
            title="Progress Completed"
            value={`${((currentSavings / savingsTarget) * 100).toFixed(1)}%`}
            subtitle="Initial funded milestone"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
