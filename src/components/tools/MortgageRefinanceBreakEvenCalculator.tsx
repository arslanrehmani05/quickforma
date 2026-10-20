import React, { useState } from "react";
import { Landmark, DollarSign, Calendar, TrendingDown } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const MortgageRefinanceBreakEvenCalculator: React.FC = () => {
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState<number>(2450);
  const [newMonthlyPayment, setNewMonthlyPayment] = useState<number>(2120);
  const [totalClosingCosts, setTotalClosingCosts] = useState<number>(6800); // Origination, appraisal, title, points

  const handleReset = () => {
    setCurrentMonthlyPayment(2450);
    setNewMonthlyPayment(2120);
    setTotalClosingCosts(6800);
  };

  const monthlySavings = Math.max(0, currentMonthlyPayment - newMonthlyPayment);
  const breakEvenMonths = monthlySavings > 0 ? totalClosingCosts / monthlySavings : 0;
  const breakEvenYears = breakEvenMonths / 12;
  const fiveYearNetSavings = (monthlySavings * 60) - totalClosingCosts;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Refinance Closing Cost Break-Even Months"
        description="Compute mortgage refinance break-even timelines, monthly payment reductions, and cumulative 5-year net savings."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Current Monthly P&I Payment ($)"
            value={currentMonthlyPayment}
            onChange={(val) => setCurrentMonthlyPayment(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="New Refinanced Monthly Payment ($)"
            value={newMonthlyPayment}
            onChange={(val) => setNewMonthlyPayment(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Total Refinance Closing Costs ($)"
            value={totalClosingCosts}
            onChange={(val) => setTotalClosingCosts(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Break-Even Timeline"
          value={`${Math.ceil(breakEvenMonths)} months`}
          subtitle={`${breakEvenYears.toFixed(1)} years to payback`}
          variant="indigo"
        />
        <ResultCard
          title="Monthly Cash Savings"
          value={`$${monthlySavings.toFixed(2)}/mo`}
          subtitle="Monthly payment drop"
          variant="light"
        />
        <ResultCard
          title="5-Year Net Savings"
          value={`+$${fiveYearNetSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="After paying closing costs"
          variant="light"
        />
        <ResultCard
          title="Annual Cash Flow Lift"
          value={`+$${(monthlySavings * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr`}
          subtitle="Yearly debt relief"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Refinance Decision Rule</h4>
        <p className="text-slate-600">
          Saving ${monthlySavings.toFixed(2)} each month fully recoups the ${totalClosingCosts.toLocaleString()} closing fee in <strong className="text-slate-800">{Math.ceil(breakEvenMonths)} months ({breakEvenYears.toFixed(1)} years)</strong>. If you intend to hold the property longer than {Math.ceil(breakEvenMonths)} months, refinancing yields <strong className="text-slate-800">${fiveYearNetSavings.toLocaleString()} in clean cash gain</strong> over 5 years.
        </p>
      </div>
    </div>
  );
};
