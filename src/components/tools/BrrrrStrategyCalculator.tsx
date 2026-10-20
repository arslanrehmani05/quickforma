import React, { useState } from "react";
import { RefreshCw, DollarSign, Building, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const BrrrrStrategyCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState<number>(140000);
  const [rehabCost, setRehabCost] = useState<number>(45000);
  const [arvAfterRepair, setArvAfterRepair] = useState<number>(260000);
  const [refinanceLtvPercent, setRefinanceLtvPercent] = useState<number>(75); // 75% cash-out refinance
  const [monthlyRent, setMonthlyRent] = useState<number>(2200);
  const [monthlyMortgagePandI, setMonthlyMortgagePandI] = useState<number>(1350);
  const [monthlyOperatingExpenses, setMonthlyOperatingExpenses] = useState<number>(450); // Taxes, insurance, PM

  const handleReset = () => {
    setPurchasePrice(140000);
    setRehabCost(45000);
    setArvAfterRepair(260000);
    setRefinanceLtvPercent(75);
    setMonthlyRent(2200);
    setMonthlyMortgagePandI(1350);
    setMonthlyOperatingExpenses(450);
  };

  const totalAllInCost = purchasePrice + rehabCost;
  const newLoanAmount = arvAfterRepair * (refinanceLtvPercent / 100);
  const cashRecoveredAtRefinance = newLoanAmount;
  const cashLeftInDeal = Math.max(0, totalAllInCost - cashRecoveredAtRefinance);
  const cashFlowMonthly = monthlyRent - monthlyMortgagePandI - monthlyOperatingExpenses;
  const cashFlowAnnual = cashFlowMonthly * 12;

  const isInfiniteReturn = cashLeftInDeal === 0;
  const cashOnCashPercent = cashLeftInDeal > 0 ? (cashFlowAnnual / cashLeftInDeal) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Buy, Rehab, Rent, Refinance, Repeat Profit Solver"
        description="Compute real estate BRRRR strategy cash-out refinance capital recycling, equity velocity, and infinite return metrics."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Buy Price ($)"
            value={purchasePrice}
            onChange={(val) => setPurchasePrice(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Rehab & Repair Costs ($)"
            value={rehabCost}
            onChange={(val) => setRehabCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Appraised ARV ($)"
            value={arvAfterRepair}
            onChange={(val) => setArvAfterRepair(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Refinance Loan-to-Value (LTV %)"
            value={refinanceLtvPercent}
            onChange={(val) => setRefinanceLtvPercent(Math.min(90, Math.max(50, Number(val) || 0)))}
            type="number"
            min={50}
            max={90}
            suffix="%"
          />
          <InputField
            label="Monthly Rent Received ($)"
            value={monthlyRent}
            onChange={(val) => setMonthlyRent(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="New Monthly P&I Mortgage ($)"
            value={monthlyMortgagePandI}
            onChange={(val) => setMonthlyMortgagePandI(Math.max(0, Number(val) || 0))}
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
          title="Cash Left in Deal"
          value={isInfiniteReturn ? "$0.00" : `$${cashLeftInDeal.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={isInfiniteReturn ? "100% Capital Recycled!" : "Unrecovered equity"}
          variant="indigo"
        />
        <ResultCard
          title="Refinance Cash Out"
          value={`$${cashRecoveredAtRefinance.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${refinanceLtvPercent}% of $${arvAfterRepair.toLocaleString()} ARV`}
          variant="light"
        />
        <ResultCard
          title="Net Monthly Cash Flow"
          value={`$${cashFlowMonthly.toFixed(2)}/mo`}
          subtitle={`$${cashFlowAnnual.toLocaleString()}/year net`}
          variant="light"
        />
        <ResultCard
          title="Cash-on-Cash Return"
          value={isInfiniteReturn ? "INFINITE (100% Recouped)" : `${cashOnCashPercent.toFixed(1)}%`}
          subtitle={isInfiniteReturn ? "Zero capital trapped" : "Annual CoC yield"}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">BRRRR Execution Verdict</h4>
        <p className="text-slate-600">
          Total all-in investment was ${totalAllInCost.toLocaleString()} (purchase + rehab). The 75% cash-out refinance returns <strong className="text-slate-800">${cashRecoveredAtRefinance.toLocaleString()} in tax-free debt proceeds</strong>, leaving {isInfiniteReturn ? "zero dollars" : `$${cashLeftInDeal.toLocaleString()}`} trapped in the deal while generating <strong className="text-slate-800">${cashFlowMonthly.toFixed(2)} monthly passive cash flow</strong>.
        </p>
      </div>
    </div>
  );
};
