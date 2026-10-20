import React, { useState } from "react";
import { Landmark, DollarSign, Percent, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const HomeEquityLineOfCreditHeloc: React.FC = () => {
  const [propertyAppraisedValue, setPropertyAppraisedValue] = useState<number>(550000);
  const [firstMortgageBalance, setFirstMortgageBalance] = useState<number>(310000);
  const [maxCltvPercent, setMaxCltvPercent] = useState<number>(80); // 80% Combined LTV max
  const [drawnAmount, setDrawnAmount] = useState<number>(65000);
  const [helocInterestRatePercent, setHelocInterestRatePercent] = useState<number>(8.5);

  const handleReset = () => {
    setPropertyAppraisedValue(550000);
    setFirstMortgageBalance(310000);
    setMaxCltvPercent(80);
    setDrawnAmount(65000);
    setHelocInterestRatePercent(8.5);
  };

  const maxTotalLendingAllowed = propertyAppraisedValue * (maxCltvPercent / 100);
  const maxAvailableCreditLimit = Math.max(0, maxTotalLendingAllowed - firstMortgageBalance);
  const actualDraw = Math.min(drawnAmount, maxAvailableCreditLimit);

  // Interest-Only Monthly Payment during 10-year Draw Period = Draw * (Rate / 12)
  const monthlyInterestOnlyPayment = (actualDraw * (helocInterestRatePercent / 100)) / 12;

  // 20-Year Amortization Payment upon Reset (at end of draw period): P&I Formula
  const monthlyRate = (helocInterestRatePercent / 100) / 12;
  const numRepaymentPayments = 240; // 20 years = 240 months
  const monthlyPrincipalAndInterest = monthlyRate > 0 && actualDraw > 0
    ? (actualDraw * (monthlyRate * Math.pow(1 + monthlyRate, numRepaymentPayments))) / (Math.pow(1 + monthlyRate, numRepaymentPayments) - 1)
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="HELOC Monthly Interest-Only & Repayment"
        description="Calculate Home Equity Line of Credit (HELOC) maximum borrowing limits, interest-only payments, and reset amounts."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Property Appraised Value ($)"
            value={propertyAppraisedValue}
            onChange={(val) => setPropertyAppraisedValue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Existing First Mortgage Balance ($)"
            value={firstMortgageBalance}
            onChange={(val) => setFirstMortgageBalance(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Lender Max Combined LTV (CLTV %)"
            value={maxCltvPercent}
            onChange={(val) => setMaxCltvPercent(Math.min(95, Math.max(50, Number(val) || 0)))}
            type="number"
            min={50}
            max={95}
            suffix="%"
          />
          <InputField
            label="Desired Borrowed Draw Amount ($)"
            value={drawnAmount}
            onChange={(val) => setDrawnAmount(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Variable HELOC Interest Rate (%)"
            value={helocInterestRatePercent}
            onChange={(val) => setHelocInterestRatePercent(Math.min(25, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={25}
            step={0.125}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Max Credit Line Limit"
          value={`$${maxAvailableCreditLimit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`At ${maxCltvPercent}% CLTV limit`}
          variant="indigo"
        />
        <ResultCard
          title="Draw Period Payment"
          value={`$${monthlyInterestOnlyPayment.toFixed(2)}/mo`}
          subtitle="Interest-only payment"
          variant="light"
        />
        <ResultCard
          title="Repayment Reset Payment"
          value={`$${monthlyPrincipalAndInterest.toFixed(2)}/mo`}
          subtitle="20-year P&I amortization"
          variant="light"
        />
        <ResultCard
          title="Available Unused Equity"
          value={`$${Math.max(0, maxAvailableCreditLimit - actualDraw).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Remaining borrowing reserve"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Payment Shock Warning</h4>
        <p className="text-slate-600">
          Borrowing ${actualDraw.toLocaleString()} requires only <strong className="text-slate-800">${monthlyInterestOnlyPayment.toFixed(2)} monthly</strong> during the 10-year draw period. Once the draw period closes and repayment begins, monthly payments jump by <strong className="text-slate-800">${(monthlyPrincipalAndInterest - monthlyInterestOnlyPayment).toFixed(2)}/mo</strong> to satisfy mandatory 20-year principal amortization.
        </p>
      </div>
    </div>
  );
};
