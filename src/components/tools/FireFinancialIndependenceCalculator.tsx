import React, { useState } from "react";
import { Compass, DollarSign, TrendingUp, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const FireFinancialIndependenceCalculator: React.FC = () => {
  const [annualLivingExpenses, setAnnualLivingExpenses] = useState<number>(65000);
  const [safeWithdrawalRatePercent, setSafeWithdrawalRatePercent] = useState<number>(4.0); // 4% Rule
  const [currentInvestedNetWorth, setCurrentInvestedNetWorth] = useState<number>(320000);
  const [annualSavingsAmount, setAnnualSavingsAmount] = useState<number>(35000);
  const [investmentReturnPercent, setInvestmentReturnPercent] = useState<number>(7.0);

  const handleReset = () => {
    setAnnualLivingExpenses(65000);
    setSafeWithdrawalRatePercent(4.0);
    setCurrentInvestedNetWorth(320000);
    setAnnualSavingsAmount(35000);
    setInvestmentReturnPercent(7.0);
  };

  // FIRE Number = Annual Expenses / (SWR / 100) -> 25x expenses for 4%
  const fireNumber = safeWithdrawalRatePercent > 0 ? annualLivingExpenses / (safeWithdrawalRatePercent / 100) : 0;
  const fireProgressPercent = fireNumber > 0 ? (currentInvestedNetWorth / fireNumber) * 100 : 0;
  const remainingWealthNeeded = Math.max(0, fireNumber - currentInvestedNetWorth);

  // Estimate years to FIRE
  let netWorth = currentInvestedNetWorth;
  let years = 0;
  const r = investmentReturnPercent / 100;
  while (netWorth < fireNumber && years < 60) {
    years++;
    netWorth = netWorth * (1 + r) + annualSavingsAmount;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Financial Independence Retire Early (FIRE) Number Solver"
        description="Compute your FIRE retirement target number, Safe Withdrawal Rate (4% Trinity study rule), and years to financial freedom."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Annual Living Expenses ($)"
            value={annualLivingExpenses}
            onChange={(val) => setAnnualLivingExpenses(Math.max(1000, Number(val) || 0))}
            type="number"
            min={1000}
            prefix="$"
          />
          <InputField
            label="Safe Withdrawal Rate (SWR %)"
            value={safeWithdrawalRatePercent}
            onChange={(val) => setSafeWithdrawalRatePercent(Math.min(10, Math.max(2, Number(val) || 0)))}
            type="number"
            min={2}
            step={0.25}
            suffix="%"
          />
          <InputField
            label="Current Invested Portfolio ($)"
            value={currentInvestedNetWorth}
            onChange={(val) => setCurrentInvestedNetWorth(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Annual New Savings Added ($)"
            value={annualSavingsAmount}
            onChange={(val) => setAnnualSavingsAmount(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Expected Real Portfolio Return (%)"
            value={investmentReturnPercent}
            onChange={(val) => setInvestmentReturnPercent(Math.min(20, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            step={0.5}
            suffix="%"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Target FIRE Number"
            value={`$${fireNumber.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle={`${(100 / safeWithdrawalRatePercent).toFixed(1)}x annual expenses`}
            variant="indigo"
          />
          <ResultCard
            title="FIRE Progress"
            value={`${fireProgressPercent.toFixed(1)}%`}
            subtitle={`$${remainingWealthNeeded.toLocaleString(undefined, { maximumFractionDigits: 0 })} remaining to goal`}
            variant="light"
          />
          <ResultCard
            title="Estimated Years to FIRE"
            value={years < 60 ? `${years} years` : "60+ years"}
            subtitle="Based on savings & 7% return"
            variant="light"
          />
          <ResultCard
            title="Monthly Passive Budget"
            value={`$${(annualLivingExpenses / 12).toFixed(0)}/mo`}
            subtitle="Safe withdrawal monthly cash"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
