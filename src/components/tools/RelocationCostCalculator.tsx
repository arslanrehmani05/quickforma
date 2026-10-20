import React, { useState } from "react";
import { Truck, DollarSign, Home, Plane } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RelocationCostCalculator: React.FC = () => {
  const [movingVanFreightCost, setMovingVanFreightCost] = useState<number>(4500);
  const [temporaryHousingCost, setTemporaryHousingCost] = useState<number>(3200);
  const [travelAirfareCost, setTravelAirfareCost] = useState<number>(1200);
  const [miscellaneousSettlingInAllowance, setMiscellaneousSettlingInAllowance] = useState<number>(2000);
  const [taxGrossUpPercentage, setTaxGrossUpPercentage] = useState<number>(30); // 30% tax gross-up

  const handleReset = () => {
    setMovingVanFreightCost(4500);
    setTemporaryHousingCost(3200);
    setTravelAirfareCost(1200);
    setMiscellaneousSettlingInAllowance(2000);
    setTaxGrossUpPercentage(30);
  };

  const directMovingExpenses = movingVanFreightCost + temporaryHousingCost + travelAirfareCost + miscellaneousSettlingInAllowance;
  // Tax gross-up: employee receives net amount after tax withholding
  const taxGrossUpAmount = directMovingExpenses * (taxGrossUpPercentage / 100);
  const totalEmployerRelocationBudget = directMovingExpenses + taxGrossUpAmount;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Employee Job Relocation Package & Tax Gross-Up Solver"
        description="Estimate corporate employee relocation packages, moving van freight, temporary housing, and tax gross-up allowances."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Moving Van & Freight ($)"
            value={movingVanFreightCost}
            onChange={(val) => setMovingVanFreightCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Temporary Housing (30-60 Days) ($)"
            value={temporaryHousingCost}
            onChange={(val) => setTemporaryHousingCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Travel & Airfare ($)"
            value={travelAirfareCost}
            onChange={(val) => setTravelAirfareCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Settling-In Allowance ($)"
            value={miscellaneousSettlingInAllowance}
            onChange={(val) => setMiscellaneousSettlingInAllowance(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Tax Gross-Up Rate (%)"
            value={taxGrossUpPercentage}
            onChange={(val) => setTaxGrossUpPercentage(Math.min(60, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            suffix="%"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Direct Relocation Outlay"
            value={`$${directMovingExpenses.toLocaleString()}`}
            subtitle="Direct employee reimbursements"
            variant="light"
          />
          <ResultCard
            title="Employer Tax Gross-Up"
            value={`$${taxGrossUpAmount.toLocaleString()}`}
            subtitle="Offset for IRS taxable fringe benefit"
            variant="light"
          />
          <ResultCard
            title="Total Relocation Budget"
            value={`$${totalEmployerRelocationBudget.toLocaleString()}`}
            subtitle="Total company cost for relocation"
            variant="indigo"
          />
        </div>
      </div>
    </div>
  );
};
