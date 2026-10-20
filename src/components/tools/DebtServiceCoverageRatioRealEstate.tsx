import React, { useState } from "react";
import { Building, DollarSign, ShieldCheck, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const DebtServiceCoverageRatioRealEstate: React.FC = () => {
  const [netOperatingIncome, setNetOperatingIncome] = useState<number>(95000); // NOI
  const [annualDebtService, setAnnualDebtService] = useState<number>(72000); // Principal + Interest per year
  const [lenderMinimumDscr, setLenderMinimumDscr] = useState<number>(1.25); // Standard 1.25x commercial underwriting

  const handleReset = () => {
    setNetOperatingIncome(95000);
    setAnnualDebtService(72000);
    setLenderMinimumDscr(1.25);
  };

  const actualDscr = annualDebtService > 0 ? netOperatingIncome / annualDebtService : 0;
  const isApproved = actualDscr >= lenderMinimumDscr;
  const maxAllowableDebtService = lenderMinimumDscr > 0 ? netOperatingIncome / lenderMinimumDscr : 0;
  const annualCashFlowAfterDebt = netOperatingIncome - annualDebtService;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="DSCR Commercial Mortgage Qualification"
        description="Compute real estate Debt Service Coverage Ratio (DSCR), commercial underwriting qualification, and debt buffers."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Annual Net Operating Income (NOI $)"
            value={netOperatingIncome}
            onChange={(val) => setNetOperatingIncome(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Annual Debt Service (P&I $)"
            value={annualDebtService}
            onChange={(val) => setAnnualDebtService(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Lender Minimum DSCR Requirement"
            value={lenderMinimumDscr}
            onChange={(val) => setLenderMinimumDscr(Math.max(1.0, Number(val) || 1.0))}
            type="number"
            min={1.0}
            step={0.05}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Actual Property DSCR"
          value={`${actualDscr.toFixed(2)}x`}
          subtitle={isApproved ? "Lender Compliant" : "Underwriting Deficit"}
          variant="indigo"
        />
        <ResultCard
          title="Underwriting Status"
          value={isApproved ? "APPROVED" : "REJECTED"}
          subtitle={`Min target: ${lenderMinimumDscr.toFixed(2)}x`}
          variant="light"
        />
        <ResultCard
          title="Annual Cash Flow Buffer"
          value={`$${annualCashFlowAfterDebt.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Net cash after mortgage"
          variant="light"
        />
        <ResultCard
          title="Max Supported Debt Service"
          value={`$${maxAllowableDebtService.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr`}
          subtitle="At benchmark DSCR"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Commercial Mortgage Underwriting Verdict</h4>
        <p className="text-slate-600">
          Generating ${netOperatingIncome.toLocaleString()} in NOI against ${annualDebtService.toLocaleString()} in annual loan payments yields a DSCR of <strong className="text-slate-800">{actualDscr.toFixed(2)}x</strong>. {isApproved ? `The property comfortably exceeds the lender's ${lenderMinimumDscr}x threshold with a $${annualCashFlowAfterDebt.toLocaleString()} safety cushion.` : `Warning: Debt service exceeds underwriting thresholds by $${(annualDebtService - maxAllowableDebtService).toLocaleString()}/yr. Lower loan leverage or increase NOI.`}
        </p>
      </div>
    </div>
  );
};
