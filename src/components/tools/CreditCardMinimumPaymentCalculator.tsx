import React, { useState } from "react";
import { CreditCard, AlertCircle, DollarSign, Clock } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CreditCardMinimumPaymentCalculator: React.FC = () => {
  const [currentBalance, setCurrentBalance] = useState<number>(8500);
  const [aprPercent, setAprPercent] = useState<number>(24.99); // 24.99% standard APR
  const [fixedMonthlyPayment, setFixedMonthlyPayment] = useState<number>(275);

  const handleReset = () => {
    setCurrentBalance(8500);
    setAprPercent(24.99);
    setFixedMonthlyPayment(275);
  };

  const monthlyRate = (aprPercent / 100) / 12;
  const firstMonthInterest = currentBalance * monthlyRate;

  // Simulate payoff timeline with fixed monthly payment
  let balance = currentBalance;
  let months = 0;
  let totalInterest = 0;
  const maxMonths = 360;

  if (fixedMonthlyPayment > firstMonthInterest) {
    while (balance > 0 && months < maxMonths) {
      months++;
      const interest = balance * monthlyRate;
      totalInterest += interest;
      const principal = fixedMonthlyPayment - interest;
      balance = Math.max(0, balance - principal);
    }
  }

  const isPaymentSufficient = fixedMonthlyPayment > firstMonthInterest;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Credit Card Debt Payoff & Interest Cost Solver"
        description="Compute credit card payoff timelines, total interest charges, and the dangerous cost of paying only the minimum."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Current Card Balance ($)"
            value={currentBalance}
            onChange={(val) => setCurrentBalance(Math.max(10, Number(val) || 0))}
            type="number"
            min={10}
            prefix="$"
          />
          <InputField
            label="Card APR Interest (%)"
            value={aprPercent}
            onChange={(val) => setAprPercent(Math.min(40, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Monthly Payment Budget ($)"
            value={fixedMonthlyPayment}
            onChange={(val) => setFixedMonthlyPayment(Math.max(10, Number(val) || 0))}
            type="number"
            min={10}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Debt-Free In"
            value={isPaymentSufficient ? `${months} months` : "Never"}
            subtitle={isPaymentSufficient ? `${(months / 12).toFixed(1)} years to zero balance` : "Payment does not cover interest"}
            variant="light"
          />
          <ResultCard
            title="Total Interest Paid"
            value={isPaymentSufficient ? `$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "Infinite"}
            subtitle="Financing charge on debt"
            variant="light"
          />
          <ResultCard
            title="Total Cash Paid"
            value={isPaymentSufficient ? `$${(currentBalance + totalInterest).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "Infinite"}
            subtitle="Principal + cumulative interest"
            variant="light"
          />
          <ResultCard
            title="Monthly Interest Cost"
            value={`$${firstMonthInterest.toFixed(2)}/mo`}
            subtitle="Current interest accruing each month"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
