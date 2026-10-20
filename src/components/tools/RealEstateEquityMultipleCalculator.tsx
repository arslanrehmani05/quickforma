import React, { useState } from "react";
import { TrendingUp, DollarSign, Building, Award } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RealEstateEquityMultipleCalculator: React.FC = () => {
  const [initialEquityInvested, setInitialEquityInvested] = useState<number>(100000);
  const [cumulativeOperatingDistributions, setCumulativeOperatingDistributions] = useState<number>(38000);
  const [capitalReturnedOnExit, setCapitalReturnedOnExit] = useState<number>(175000);
  const [holdingPeriodYears, setHoldingPeriodYears] = useState<number>(5);

  const handleReset = () => {
    setInitialEquityInvested(100000);
    setCumulativeOperatingDistributions(38000);
    setCapitalReturnedOnExit(175000);
    setHoldingPeriodYears(5);
  };

  const totalCashReturned = cumulativeOperatingDistributions + capitalReturnedOnExit;
  const equityMultiple = initialEquityInvested > 0 ? totalCashReturned / initialEquityInvested : 0;
  const totalNetDollarProfit = totalCashReturned - initialEquityInvested;
  const totalReturnPercent = initialEquityInvested > 0 ? (totalNetDollarProfit / initialEquityInvested) * 100 : 0;
  const averageAnnualReturnPercent = holdingPeriodYears > 0 ? totalReturnPercent / holdingPeriodYears : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Total Equity Multiple & LP Return Solver"
        description="Compute real estate syndication Equity Multiples (EM), total cumulative cash distributions, and capital returns."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Initial Invested Capital ($)"
            value={initialEquityInvested}
            onChange={(val) => setInitialEquityInvested(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Holding Period (Years)"
            value={holdingPeriodYears}
            onChange={(val) => setHoldingPeriodYears(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="yrs"
          />
          <InputField
            label="Total Cumulative Rental Cash Flow Distributions ($)"
            value={cumulativeOperatingDistributions}
            onChange={(val) => setCumulativeOperatingDistributions(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Capital & Profit Returned at Sale Exit ($)"
            value={capitalReturnedOnExit}
            onChange={(val) => setCapitalReturnedOnExit(Math.max(0, Number(val) || 0))}
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
          title="Equity Multiple (EM)"
          value={`${equityMultiple.toFixed(2)}x`}
          subtitle="Total cash / invested capital"
          variant="indigo"
        />
        <ResultCard
          title="Total Net Profit"
          value={`+$${totalNetDollarProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${totalReturnPercent.toFixed(0)}% total return`}
          variant="light"
        />
        <ResultCard
          title="Average Annual Return"
          value={`${averageAnnualReturnPercent.toFixed(1)}%/yr`}
          subtitle={`Over ${holdingPeriodYears} years`}
          variant="light"
        />
        <ResultCard
          title="Total Cash Returned"
          value={`$${totalCashReturned.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Distributions + liquidation"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Syndication Performance Benchmark</h4>
        <p className="text-slate-600">
          An Equity Multiple of <strong className="text-slate-800">{equityMultiple.toFixed(2)}x</strong> means that for every $1.00 invested, the investor receives <strong className="text-slate-800">${equityMultiple.toFixed(2)} in total distributions</strong>. Commercial real estate private equity targets 1.8x to 2.2x on 5-year investment horizons.
        </p>
      </div>
    </div>
  );
};
