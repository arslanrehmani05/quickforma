import React, { useState } from "react";
import { UserMinus, TrendingDown, DollarSign, Calendar } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CustomerChurnRateCalculator: React.FC = () => {
  const [startingCustomers, setStartingCustomers] = useState<number>(1200);
  const [cancelledCustomersMonthly, setCancelledCustomersMonthly] = useState<number>(42);
  const [averageMonthlyRevenuePerUser, setAverageMonthlyRevenuePerUser] = useState<number>(95);

  const handleReset = () => {
    setStartingCustomers(1200);
    setCancelledCustomersMonthly(42);
    setAverageMonthlyRevenuePerUser(95);
  };

  const monthlyChurnRatePercent = startingCustomers > 0 ? (cancelledCustomersMonthly / startingCustomers) * 100 : 0;
  // Annual Churn Rate = 1 - (1 - monthlyChurn)^12
  const annualChurnRatePercent = (1 - Math.pow(1 - (monthlyChurnRatePercent / 100), 12)) * 100;
  // Average Customer Lifetime = 1 / monthlyChurnRate (in months)
  const customerLifetimeMonths = monthlyChurnRatePercent > 0 ? 100 / monthlyChurnRatePercent : 0;

  const monthlyLostMrr = cancelledCustomersMonthly * averageMonthlyRevenuePerUser;
  const annualizedLostRevenue = monthlyLostMrr * 12;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Monthly & Annual Customer Churn Rate Solver"
        description="Compute SaaS and subscription customer churn rates, MRR revenue leaks, and average customer lifetime tenure."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Active Customers at Start of Month"
            value={startingCustomers}
            onChange={(val) => setStartingCustomers(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Customers Cancelled / Lost in Month"
            value={cancelledCustomersMonthly}
            onChange={(val) => setCancelledCustomersMonthly(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Average Monthly Revenue per User (ARPU $)"
            value={averageMonthlyRevenuePerUser}
            onChange={(val) => setAverageMonthlyRevenuePerUser(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Monthly Churn Rate"
          value={`${monthlyChurnRatePercent.toFixed(2)}%`}
          subtitle="SaaS benchmark: < 3%"
          variant="indigo"
        />
        <ResultCard
          title="Annualized Churn Rate"
          value={`${annualChurnRatePercent.toFixed(1)}%`}
          subtitle="Compounded 12 months"
          variant="light"
        />
        <ResultCard
          title="Average Customer Lifetime"
          value={`${customerLifetimeMonths.toFixed(1)} mos`}
          subtitle={`${(customerLifetimeMonths / 12).toFixed(1)} years tenure`}
          variant="light"
        />
        <ResultCard
          title="Annual Lost Revenue"
          value={`-$${annualizedLostRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr`}
          subtitle={`$${monthlyLostMrr.toLocaleString()}/mo MRR bleed`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Subscription Health Assessment</h4>
        <p className="text-slate-600">
          At a monthly churn of <strong className="text-slate-800">{monthlyChurnRatePercent.toFixed(2)}%</strong>, your business replaces its entire customer base every <strong className="text-slate-800">{(customerLifetimeMonths / 12).toFixed(1)} years</strong>. Cutting churn by just 1% recovers <strong className="text-slate-800">${(startingCustomers * 0.01 * averageMonthlyRevenuePerUser * 12).toLocaleString()}</strong> in preserved annual recurring revenue.
        </p>
      </div>
    </div>
  );
};
