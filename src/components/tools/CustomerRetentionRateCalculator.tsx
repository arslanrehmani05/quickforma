import React, { useState } from "react";
import { Users, Repeat, Heart, ArrowDownRight } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CustomerRetentionRateCalculator: React.FC = () => {
  const [customersAtStart, setCustomersAtStart] = useState<number>(1200);
  const [customersAcquired, setCustomersAcquired] = useState<number>(350);
  const [customersAtEnd, setCustomersAtEnd] = useState<number>(1380);

  const handleReset = () => {
    setCustomersAtStart(1200);
    setCustomersAcquired(350);
    setCustomersAtEnd(1380);
  };

  // Retention Rate = ((E - N) / S) * 100
  const retainedCount = Math.max(0, customersAtEnd - customersAcquired);
  const retentionRate = customersAtStart > 0 ? (retainedCount / customersAtStart) * 100 : 0;
  const churnedCount = Math.max(0, customersAtStart - retainedCount);
  const churnRate = customersAtStart > 0 ? (churnedCount / customersAtStart) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Cohort Customer Retention & Churn Rate Solver"
        description="Compute periodic customer retention percentages, customer churn counts, and cohort stability metrics."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Customers at Start of Period (S)"
            value={customersAtStart}
            onChange={(val) => setCustomersAtStart(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="New Customers Acquired (N)"
            value={customersAcquired}
            onChange={(val) => setCustomersAcquired(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Customers at End of Period (E)"
            value={customersAtEnd}
            onChange={(val) => setCustomersAtEnd(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Customer Retention Rate"
            value={`${retentionRate.toFixed(2)}%`}
            subtitle={`${retainedCount} original accounts retained`}
            variant="light"
          />
          <ResultCard
            title="Customer Churn Rate"
            value={`${churnRate.toFixed(2)}%`}
            subtitle={`${churnedCount} accounts lost during cycle`}
            variant="light"
          />
          <ResultCard
            title="Net Customer Growth"
            value={`${customersAtEnd - customersAtStart >= 0 ? "+" : ""}${customersAtEnd - customersAtStart}`}
            subtitle={`Base shifted from ${customersAtStart} to ${customersAtEnd}`}
            variant="light"
          />
          <ResultCard
            title="Implied Average Lifetime"
            value={churnRate > 0 ? `${(1 / (churnRate / 100)).toFixed(1)} cycles` : "Infinite"}
            subtitle="1 / Churn Rate longevity"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
