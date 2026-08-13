import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';
import { SimpleCalculatorTemplate } from '../templates/SimpleCalculatorTemplate';

export const LoanPayoffCalculator: React.FC = () => {
  const [balance, setBalance] = useState<number>(15000);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(400);

  const monthlyRate = ((interestRate || 0) / 100) / 12;
  const numMonths = monthlyRate > 0 && monthlyPayment > balance * monthlyRate
    ? Math.log(monthlyPayment / (monthlyPayment - balance * monthlyRate)) / Math.log(1 + monthlyRate)
    : 0;

  return (
    <SimpleCalculatorTemplate
      header={
        <ToolHeader
          icon={DollarSign}
          title="Loan Payoff & Debt Schedule Calculator"
          description="Calculate months required to completely pay off credit card or personal loan debt."
        />
      }
      inputs={
        <>
          <InputField
            label="Current Balance ($)"
            type="number"
            min="0"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            prefix="$"
            inputMode="decimal"
          />
          <InputField
            label="Annual Interest Rate (%)"
            type="number"
            step="0.1"
            min="0"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            suffix="%"
            inputMode="decimal"
          />
          <InputField
            label="Monthly Payment Amount ($)"
            type="number"
            min="0"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(Number(e.target.value))}
            prefix="$"
            inputMode="decimal"
          />
        </>
      }
      result={
        <ResultCard
          variant="indigo"
          title="Payoff Timeline"
          value={numMonths > 0 ? `${Math.ceil(numMonths)} Months` : 'Payment Too Low'}
          subtitle={numMonths > 0 ? `Estimated ${(numMonths / 12).toFixed(1)} years to complete debt payoff.` : 'Increase payment above monthly interest.'}
        />
      }
    />
  );
};
