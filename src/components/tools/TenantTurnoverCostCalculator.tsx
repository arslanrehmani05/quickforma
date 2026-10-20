import React, { useState } from "react";
import { Users, DollarSign, Calendar, TrendingDown } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TenantTurnoverCostCalculator: React.FC = () => {
  const [monthlyRent, setMonthlyRent] = useState<number>(2400);
  const [vacancyDurationWeeks, setVacancyDurationWeeks] = useState<number>(5); // 5 weeks empty
  const [cleaningAndPaintCost, setCleaningAndPaintCost] = useState<number>(1400);
  const [leasingBrokerCommission, setLeasingBrokerCommission] = useState<number>(1200); // Half to full month rent
  const [advertisingAndScreeningCost, setAdvertisingAndScreeningCost] = useState<number>(250);

  const handleReset = () => {
    setMonthlyRent(2400);
    setVacancyDurationWeeks(5);
    setCleaningAndPaintCost(1400);
    setLeasingBrokerCommission(1200);
    setAdvertisingAndScreeningCost(250);
  };

  const lostRentDuringVacancy = (monthlyRent / 4.333) * vacancyDurationWeeks;
  const turnoverMakeReadyExpenses = cleaningAndPaintCost + leasingBrokerCommission + advertisingAndScreeningCost;
  const totalTurnoverFinancialLoss = lostRentDuringVacancy + turnoverMakeReadyExpenses;
  const monthsOfRentLost = monthlyRent > 0 ? totalTurnoverFinancialLoss / monthlyRent : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Vacancy Loss, Cleaning & Lease Up Cost Solver"
        description="Calculate the true hidden financial cost of tenant turnover, vacancy rent loss, and unit turnover make-ready expenses."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Monthly Contract Rent ($)"
            value={monthlyRent}
            onChange={(val) => setMonthlyRent(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Vacancy Downtime (Weeks)"
            value={vacancyDurationWeeks}
            onChange={(val) => setVacancyDurationWeeks(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            step={0.5}
            suffix="wks"
          />
          <InputField
            label="Cleaning, Painting & Repairs ($)"
            value={cleaningAndPaintCost}
            onChange={(val) => setCleaningAndPaintCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Leasing Commission to Agent ($)"
            value={leasingBrokerCommission}
            onChange={(val) => setLeasingBrokerCommission(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Marketing & Background Checks ($)"
            value={advertisingAndScreeningCost}
            onChange={(val) => setAdvertisingAndScreeningCost(Math.max(0, Number(val) || 0))}
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
          title="Total Turnover Loss"
          value={`$${totalTurnoverFinancialLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${monthsOfRentLost.toFixed(1)} months of rent lost`}
          variant="indigo"
        />
        <ResultCard
          title="Uncollected Vacancy Rent"
          value={`$${lostRentDuringVacancy.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${vacancyDurationWeeks} empty weeks`}
          variant="light"
        />
        <ResultCard
          title="Unit Make-Ready Outlay"
          value={`$${turnoverMakeReadyExpenses.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Repairs + leasing commissions"
          variant="light"
        />
        <ResultCard
          title="Retention Breakeven"
          value={`$${(totalTurnoverFinancialLoss / 12).toFixed(2)}/mo`}
          subtitle="Concession buffer to renew"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Tenant Retention ROI</h4>
        <p className="text-slate-600">
          Losing a tenant burns <strong className="text-slate-800">${totalTurnoverFinancialLoss.toLocaleString()}</strong> in uncollected rent and turnover labor. Offering an existing tenant a $100/month rent concession costs only $1,200 annually—saving <strong className="text-slate-800">${(totalTurnoverFinancialLoss - 1200).toLocaleString()}</strong> compared to turnover downtime.
        </p>
      </div>
    </div>
  );
};
