import React, { useState } from "react";
import { Users, TrendingUp, DollarSign, Repeat } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EcommerceCustomerRetentionRevenue: React.FC = () => {
  const [totalCustomers, setTotalCustomers] = useState<number>(10000);
  const [currentRepeatRate, setCurrentRepeatRate] = useState<number>(22);
  const [targetRepeatRate, setTargetRepeatRate] = useState<number>(30);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(85);
  const [repeatOrdersPerYear, setRepeatOrdersPerYear] = useState<number>(2.4);

  const handleReset = () => {
    setTotalCustomers(10000);
    setCurrentRepeatRate(22);
    setTargetRepeatRate(30);
    setAverageOrderValue(85);
    setRepeatOrdersPerYear(2.4);
  };

  const currentReturningCustomers = totalCustomers * (currentRepeatRate / 100);
  const targetReturningCustomers = totalCustomers * (targetRepeatRate / 100);
  const incrementalReturningCustomers = Math.max(0, targetReturningCustomers - currentReturningCustomers);

  const currentRepeatRevenue = currentReturningCustomers * repeatOrdersPerYear * averageOrderValue;
  const targetRepeatRevenue = targetReturningCustomers * repeatOrdersPerYear * averageOrderValue;
  const incrementalAnnualRevenue = targetRepeatRevenue - currentRepeatRevenue;
  const ltvExpansionPerCustomer = totalCustomers > 0 ? incrementalAnnualRevenue / totalCustomers : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Repeat Purchase Rate & LTV Boost Solver"
        description="Compute the direct bottom-line revenue impact of increasing ecommerce customer retention and repeat purchase rates."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Total Active Customer Base"
            value={totalCustomers}
            onChange={(val) => setTotalCustomers(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Current Repeat Rate (%)"
            value={currentRepeatRate}
            onChange={(val) => setCurrentRepeatRate(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
          <InputField
            label="Target Repeat Rate (%)"
            value={targetRepeatRate}
            onChange={(val) => setTargetRepeatRate(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
          <InputField
            label="Average Order Value ($)"
            value={averageOrderValue}
            onChange={(val) => setAverageOrderValue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Repeat Orders / Year"
            value={repeatOrdersPerYear}
            onChange={(val) => setRepeatOrdersPerYear(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            step={0.1}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Added Annual Revenue"
          value={`+$${incrementalAnnualRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="From retention lift"
          variant="indigo"
        />
        <ResultCard
          title="New Repeat Buyers"
          value={`+${Math.round(incrementalReturningCustomers).toLocaleString()}`}
          subtitle={`From ${currentRepeatRate}% to ${targetRepeatRate}%`}
          variant="light"
        />
        <ResultCard
          title="Total Repeat Revenue"
          value={`$${targetRepeatRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Projected annual total"
          variant="light"
        />
        <ResultCard
          title="Average LTV Expansion"
          value={`+$${ltvExpansionPerCustomer.toFixed(2)}`}
          subtitle="Per customer in database"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Retention Multiplier Insight</h4>
        <p className="text-slate-600">
          Boosting repeat purchase rate by <strong className="text-slate-800">{(targetRepeatRate - currentRepeatRate).toFixed(0)} percentage points</strong> activates <strong className="text-slate-800">{Math.round(incrementalReturningCustomers).toLocaleString()}</strong> existing customers who spend an additional <strong className="text-slate-800">${incrementalAnnualRevenue.toLocaleString()}</strong> annually with zero customer acquisition ad spend (CAC).
        </p>
      </div>
    </div>
  );
};
