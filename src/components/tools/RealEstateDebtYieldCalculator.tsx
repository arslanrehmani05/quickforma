import React, { useState } from "react";
import { Building, DollarSign, ShieldCheck, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RealEstateDebtYieldCalculator: React.FC = () => {
  const [netOperatingIncome, setNetOperatingIncome] = useState<number>(240000); // NOI
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [lenderMinimumDebtYieldPercent, setLenderMinimumDebtYieldPercent] = useState<number>(9.5); // 9.5%

  const handleReset = () => {
    setNetOperatingIncome(240000);
    setLoanAmount(2500000);
    setLenderMinimumDebtYieldPercent(9.5);
  };

  // Debt Yield = (NOI / Loan Amount) * 100
  const debtYieldPercent = loanAmount > 0 ? (netOperatingIncome / loanAmount) * 100 : 0;
  const isApproved = debtYieldPercent >= lenderMinimumDebtYieldPercent;
  const maxSupportableLoan = lenderMinimumDebtYieldPercent > 0 ? netOperatingIncome / (lenderMinimumDebtYieldPercent / 100) : 0;
  const loanDifference = maxSupportableLoan - loanAmount;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Lender Commercial Debt Yield Ratio Solver"
        description="Compute commercial real estate Debt Yield ratios, lender loan sizing constraints, and refinancing leverage caps."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Annual Net Operating Income (NOI $)"
            value={netOperatingIncome}
            onChange={(val) => setNetOperatingIncome(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Requested Loan Amount ($)"
            value={loanAmount}
            onChange={(val) => setLoanAmount(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Lender Minimum Debt Yield (%)"
            value={lenderMinimumDebtYieldPercent}
            onChange={(val) => setLenderMinimumDebtYieldPercent(Math.min(25, Math.max(5, Number(val) || 0)))}
            type="number"
            min={5}
            max={25}
            step={0.25}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Property Debt Yield"
          value={`${debtYieldPercent.toFixed(2)}%`}
          subtitle="NOI / Loan Amount"
          variant="indigo"
        />
        <ResultCard
          title="Underwriting Status"
          value={isApproved ? "QUALIFIED" : "SHORTFALL"}
          subtitle={`Min target: ${lenderMinimumDebtYieldPercent.toFixed(2)}%`}
          variant="light"
        />
        <ResultCard
          title="Max Supported Loan"
          value={`$${maxSupportableLoan.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`At ${lenderMinimumDebtYieldPercent}% debt yield`}
          variant="light"
        />
        <ResultCard
          title="Leverage Cushion"
          value={`${loanDifference >= 0 ? "+" : ""}$${loanDifference.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={loanDifference >= 0 ? "Additional borrowing capacity" : "Required equity paydown"}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Commercial Underwriting Rule</h4>
        <p className="text-slate-600">
          Unlike DSCR which depends on loan interest rates and amortization, Debt Yield measures pure property cash flow against loan size independent of interest rates. At <strong className="text-slate-800">{debtYieldPercent.toFixed(2)}% Debt Yield</strong>, this property {isApproved ? `satisfies the lender's ${lenderMinimumDebtYieldPercent}% standard, supporting up to $${maxSupportableLoan.toLocaleString()} in commercial debt.` : `falls short of the lender's ${lenderMinimumDebtYieldPercent}% hurdle, requiring an equity paydown of $${Math.abs(loanDifference).toLocaleString()} to qualify.`}
        </p>
      </div>
    </div>
  );
};
