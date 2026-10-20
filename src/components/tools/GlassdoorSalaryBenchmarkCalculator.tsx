import React, { useState } from "react";
import { BarChart, DollarSign, Target, Award } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const GlassdoorSalaryBenchmarkCalculator: React.FC = () => {
  const [offeredSalary, setOfferedSalary] = useState<number>(115000);
  const [marketP25Salary, setMarketP25Salary] = useState<number>(98000);
  const [marketP50MedianSalary, setMarketP50MedianSalary] = useState<number>(112000);
  const [marketP75Salary, setMarketP75Salary] = useState<number>(130000);

  const handleReset = () => {
    setOfferedSalary(115000);
    setMarketP25Salary(98000);
    setMarketP50MedianSalary(112000);
    setMarketP75Salary(130000);
  };

  const compaRatio = marketP50MedianSalary > 0 ? (offeredSalary / marketP50MedianSalary) * 100 : 0;
  const differenceFromMedian = offeredSalary - marketP50MedianSalary;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Industry Percentile Salary Benchmark & Compa-Ratio Solver"
        description="Benchmark compensation packages against 25th, 50th (median), and 75th market percentiles and compute Compa-Ratios."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Candidate / Offered Salary ($)"
            value={offeredSalary}
            onChange={(val) => setOfferedSalary(Math.max(1000, Number(val) || 0))}
            type="number"
            min={1000}
            prefix="$"
          />
          <InputField
            label="Market 25th Percentile ($)"
            value={marketP25Salary}
            onChange={(val) => setMarketP25Salary(Math.max(1000, Number(val) || 0))}
            type="number"
            min={1000}
            prefix="$"
          />
          <InputField
            label="Market Median / 50th ($)"
            value={marketP50MedianSalary}
            onChange={(val) => setMarketP50MedianSalary(Math.max(1000, Number(val) || 0))}
            type="number"
            min={1000}
            prefix="$"
          />
          <InputField
            label="Market 75th Percentile ($)"
            value={marketP75Salary}
            onChange={(val) => setMarketP75Salary(Math.max(1000, Number(val) || 0))}
            type="number"
            min={1000}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Compa-Ratio"
            value={`${compaRatio.toFixed(1)}%`}
            subtitle={compaRatio >= 100 ? `${(compaRatio - 100).toFixed(1)}% above market median` : `${(100 - compaRatio).toFixed(1)}% below market median`}
            variant="light"
          />
          <ResultCard
            title="Variance vs Median"
            value={`${differenceFromMedian >= 0 ? "+" : ""}$${differenceFromMedian.toLocaleString()}`}
            subtitle="Dollar difference against 50th percentile"
            variant="light"
          />
          <ResultCard
            title="Market Competitive Tier"
            value={offeredSalary >= marketP75Salary ? "Top Quartile (75th+)" : offeredSalary >= marketP50MedianSalary ? "Above Median (50th-75th)" : "Below Median (25th-50th)"}
            subtitle="Positioning within industry survey"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
