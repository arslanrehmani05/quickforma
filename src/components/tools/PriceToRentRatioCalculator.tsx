import React, { useState } from "react";
import { Home, DollarSign, Calculator, Scale } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PriceToRentRatioCalculator: React.FC = () => {
  const [medianHomePrice, setMedianHomePrice] = useState<number>(430000);
  const [monthlyMarketRent, setMonthlyMarketRent] = useState<number>(2300);

  const handleReset = () => {
    setMedianHomePrice(430000);
    setMonthlyMarketRent(2300);
  };

  const annualRent = monthlyMarketRent * 12;
  const priceToRentRatio = annualRent > 0 ? medianHomePrice / annualRent : 0;

  let recommendation = "Favorable to Buy (1 - 15)";
  if (priceToRentRatio >= 21) recommendation = "Much Better to Rent (>= 21)";
  else if (priceToRentRatio >= 16) recommendation = "Leaning Toward Renting (16 - 20)";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Buy vs Rent Price-to-Rent Ratio Metric Solver"
        description="Compute real estate Price-to-Rent Ratios to determine whether buying or renting is more financially advantageous."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Median Home Purchase Price ($)"
            value={medianHomePrice}
            onChange={(val) => setMedianHomePrice(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Equivalent Monthly Rent ($)"
            value={monthlyMarketRent}
            onChange={(val) => setMonthlyMarketRent(Math.max(1, Number(val) || 0))}
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
          title="Price-to-Rent Ratio"
          value={`${priceToRentRatio.toFixed(1)}`}
          subtitle="Price / Annual Rent"
          variant="indigo"
        />
        <ResultCard
          title="Market Verdict"
          value={priceToRentRatio <= 15 ? "BUY FAVORABLE" : priceToRentRatio >= 21 ? "RENT FAVORABLE" : "NEUTRAL"}
          subtitle={recommendation}
          variant="light"
        />
        <ResultCard
          title="Annual Rent Outlay"
          value={`$${annualRent.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr`}
          subtitle={`$${monthlyMarketRent.toLocaleString()}/month`}
          variant="light"
        />
        <ResultCard
          title="Breakeven Rent Equivalent"
          value={`$${Math.round(medianHomePrice / 15 / 12).toLocaleString()}/mo`}
          subtitle="Rent to justify purchase"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Economic Guidance</h4>
        <p className="text-slate-600">
          A Price-to-Rent ratio of <strong className="text-slate-800">{priceToRentRatio.toFixed(1)}</strong> indicates that home purchase prices are {priceToRentRatio >= 21 ? "inflated relative to local rents, making renting and investing surplus cash the mathematically superior choice." : priceToRentRatio <= 15 ? "bargain-priced relative to rent, making homeownership a strong equity-building investment." : "balanced, with decision depending on holding timeline and tax deductions."}
        </p>
      </div>
    </div>
  );
};
