import React, { useState } from "react";
import { Home, DollarSign, Laptop, Wifi } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RemoteWorkStipendCalculator: React.FC = () => {
  const [oneTimeDeskErgoAllowance, setOneTimeDeskErgoAllowance] = useState<number>(750);
  const [monthlyInternetSubsidy, setMonthlyInternetSubsidy] = useState<number>(65);
  const [monthlyCellPhoneReimbursement, setMonthlyCellPhoneReimbursement] = useState<number>(50);
  const [annualWellnessStipend, setAnnualWellnessStipend] = useState<number>(500);

  const handleReset = () => {
    setOneTimeDeskErgoAllowance(750);
    setMonthlyInternetSubsidy(65);
    setMonthlyCellPhoneReimbursement(50);
    setAnnualWellnessStipend(500);
  };

  const monthlyRecurringAllowance = monthlyInternetSubsidy + monthlyCellPhoneReimbursement;
  const annualRecurringAllowance = (monthlyRecurringAllowance * 12) + annualWellnessStipend;
  const firstYearTotalPackage = oneTimeDeskErgoAllowance + annualRecurringAllowance;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Remote Work Home Office Stipend & Expense Solver"
        description="Calculate remote employee home office setup stipends, high-speed internet subsidies, and annual remote work allowances."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="One-Time Setup / Ergonomic Desk ($)"
            value={oneTimeDeskErgoAllowance}
            onChange={(val) => setOneTimeDeskErgoAllowance(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Monthly Home Internet Subsidy ($)"
            value={monthlyInternetSubsidy}
            onChange={(val) => setMonthlyInternetSubsidy(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Monthly Mobile Phone Plan ($)"
            value={monthlyCellPhoneReimbursement}
            onChange={(val) => setMonthlyCellPhoneReimbursement(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Annual Co-working / Wellness ($)"
            value={annualWellnessStipend}
            onChange={(val) => setAnnualWellnessStipend(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Monthly Recurring Allowance"
            value={`$${monthlyRecurringAllowance.toFixed(2)}/mo`}
            subtitle="Internet + mobile stipend"
            variant="light"
          />
          <ResultCard
            title="Annual Recurring Package"
            value={`$${annualRecurringAllowance.toLocaleString()}/yr`}
            subtitle="Ongoing monthly + annual wellness"
            variant="light"
          />
          <ResultCard
            title="First-Year Total Investment"
            value={`$${firstYearTotalPackage.toLocaleString()}`}
            subtitle="Includes one-time desk setup"
            variant="indigo"
          />
        </div>
      </div>
    </div>
  );
};
