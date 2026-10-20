import React, { useState } from "react";
import { Users, DollarSign, Percent, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ManufacturingLaborRateBurden: React.FC = () => {
  const [baseHourlyWage, setBaseHourlyWage] = useState<number>(22.00);
  const [payrollTaxesPercent, setPayrollTaxesPercent] = useState<number>(8.5); // FICA, FUTA, SUTA
  const [healthAndBenefitsPercent, setHealthAndBenefitsPercent] = useState<number>(18.0); // Healthcare + retirement
  const [paidTimeOffPercent, setPaidTimeOffPercent] = useState<number>(7.5); // Holidays, sick days, vacation
  const [workersCompPercent, setWorkersCompPercent] = useState<number>(4.0); // Manufacturing safety risk premium

  const handleReset = () => {
    setBaseHourlyWage(22.00);
    setPayrollTaxesPercent(8.5);
    setHealthAndBenefitsPercent(18.0);
    setPaidTimeOffPercent(7.5);
    setWorkersCompPercent(4.0);
  };

  const totalBurdenPercent = payrollTaxesPercent + healthAndBenefitsPercent + paidTimeOffPercent + workersCompPercent;
  const burdenMultiplier = 1 + (totalBurdenPercent / 100);
  const fullyBurdenedHourlyRate = baseHourlyWage * burdenMultiplier;
  const hourlyBurdenDollar = fullyBurdenedHourlyRate - baseHourlyWage;
  const annualBaseSalary = baseHourlyWage * 2080;
  const annualFullyBurdenedCost = fullyBurdenedHourlyRate * 2080;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Fringe Benefit & Overhead Labor Rate Burden"
        description="Calculate fully burdened factory labor rates, employer payroll taxes, healthcare benefits, and workers' compensation."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Base Hourly Wage ($/hour)"
            value={baseHourlyWage}
            onChange={(val) => setBaseHourlyWage(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Payroll Taxes (FICA, FUTA, SUTA %)"
            value={payrollTaxesPercent}
            onChange={(val) => setPayrollTaxesPercent(Math.min(30, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={30}
            suffix="%"
          />
          <InputField
            label="Health, Dental & 401(k) Benefits (%)"
            value={healthAndBenefitsPercent}
            onChange={(val) => setHealthAndBenefitsPercent(Math.min(50, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={50}
            suffix="%"
          />
          <InputField
            label="Paid Time Off & Holidays Factor (%)"
            value={paidTimeOffPercent}
            onChange={(val) => setPaidTimeOffPercent(Math.min(25, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={25}
            suffix="%"
          />
          <InputField
            label="Workers' Comp Insurance Premium (%)"
            value={workersCompPercent}
            onChange={(val) => setWorkersCompPercent(Math.min(25, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={25}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Fully Burdened Rate"
          value={`$${fullyBurdenedHourlyRate.toFixed(2)}/hr`}
          subtitle={`${burdenMultiplier.toFixed(2)}x wage multiplier`}
          variant="indigo"
        />
        <ResultCard
          title="Fringe Overhead Adder"
          value={`+$${hourlyBurdenDollar.toFixed(2)}/hr`}
          subtitle={`${totalBurdenPercent.toFixed(1)}% total burden`}
          variant="light"
        />
        <ResultCard
          title="Annual Cost per Worker"
          value={`$${annualFullyBurdenedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="2,080 standard hours"
          variant="light"
        />
        <ResultCard
          title="Base Payroll Share"
          value={`${((baseHourlyWage / fullyBurdenedHourlyRate) * 100).toFixed(0)}%`}
          subtitle={`$${annualBaseSalary.toLocaleString()} take-home`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Job Costing Guideline</h4>
        <p className="text-slate-600">
          When quoting production jobs, charging only the base wage ($${baseHourlyWage.toFixed(2)}) loses money. The real out-of-pocket employer cost is <strong className="text-slate-800">${fullyBurdenedHourlyRate.toFixed(2)} per hour</strong> once mandatory benefits and payroll taxes are absorbed.
        </p>
      </div>
    </div>
  );
};
