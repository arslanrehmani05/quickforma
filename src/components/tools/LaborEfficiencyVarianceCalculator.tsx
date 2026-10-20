import React, { useState } from "react";
import { Users, Clock, DollarSign, TrendingDown } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const LaborEfficiencyVarianceCalculator: React.FC = () => {
  const [standardRatePerHour, setStandardRatePerHour] = useState<number>(24.00);
  const [standardHoursAllowed, setStandardHoursAllowed] = useState<number>(500);
  const [actualHoursWorked, setActualHoursWorked] = useState<number>(540);

  const handleReset = () => {
    setStandardRatePerHour(24.00);
    setStandardHoursAllowed(500);
    setActualHoursWorked(540);
  };

  // Labor Efficiency Variance (LEV) = (Actual Hours - Standard Hours) * Standard Rate
  const hoursVariance = actualHoursWorked - standardHoursAllowed;
  const laborEfficiencyVariance = hoursVariance * standardRatePerHour;
  const isFavorable = laborEfficiencyVariance <= 0;
  const efficiencyPercent = actualHoursWorked > 0 ? (standardHoursAllowed / actualHoursWorked) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Standard vs Actual Labor Hours Variance"
        description="Compute standard cost accounting Direct Labor Efficiency Variance (LEV), workforce productivity, and payroll impact."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Standard Labor Rate ($/hour)"
            value={standardRatePerHour}
            onChange={(val) => setStandardRatePerHour(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Standard Hours Allowed for Output"
            value={standardHoursAllowed}
            onChange={(val) => setStandardHoursAllowed(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs"
          />
          <InputField
            label="Actual Direct Labor Hours Worked"
            value={actualHoursWorked}
            onChange={(val) => setActualHoursWorked(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Labor Efficiency Variance"
          value={`${laborEfficiencyVariance >= 0 ? "+" : ""}$${laborEfficiencyVariance.toFixed(2)}`}
          subtitle={isFavorable ? "Favorable (Under budget)" : "Unfavorable (Cost overrun)"}
          variant="indigo"
        />
        <ResultCard
          title="Hours Variance"
          value={`${hoursVariance >= 0 ? "+" : ""}${hoursVariance.toFixed(1)} hrs`}
          subtitle={hoursVariance <= 0 ? "Saved labor time" : "Excess labor time"}
          variant="light"
        />
        <ResultCard
          title="Workforce Efficiency"
          value={`${efficiencyPercent.toFixed(1)}%`}
          subtitle="Output pace vs standard"
          variant="light"
        />
        <ResultCard
          title="Standard Labor Budget"
          value={`$${(standardHoursAllowed * standardRatePerHour).toLocaleString()}`}
          subtitle={`vs $${(actualHoursWorked * standardRatePerHour).toLocaleString()} standard value`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Cost Accounting Interpretation</h4>
        <p className="text-slate-600">
          Working {actualHoursWorked} hours instead of the standard {standardHoursAllowed} hours creates a <strong className="text-slate-800">{Math.abs(hoursVariance)} hour discrepancy</strong>, resulting in a <strong className="text-slate-800">{isFavorable ? "favorable savings of" : "unfavorable cost overrun of"} ${Math.abs(laborEfficiencyVariance).toFixed(2)}</strong> at standard wage rates.
        </p>
      </div>
    </div>
  );
};
