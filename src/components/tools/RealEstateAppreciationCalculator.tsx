import React, { useState } from "react";
import { TrendingUp, Building, DollarSign, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RealEstateAppreciationCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState<number>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [annualAppreciationPercent, setAnnualAppreciationPercent] = useState<number>(4.5);
  const [holdingYears, setHoldingYears] = useState<number>(10);

  const handleReset = () => {
    setPurchasePrice(400000);
    setDownPaymentPercent(20);
    setAnnualAppreciationPercent(4.5);
    setHoldingYears(10);
  };

  const initialEquity = purchasePrice * (downPaymentPercent / 100);
  // Future Value = P * (1 + r)^t
  const futureValue = purchasePrice * Math.pow(1 + (annualAppreciationPercent / 100), holdingYears);
  const totalCapitalGain = futureValue - purchasePrice;
  const returnOnInitialEquity = initialEquity > 0 ? (totalCapitalGain / initialEquity) * 100 : 0;
  const annualizedLeveragedRoe = holdingYears > 0 ? (Math.pow(1 + (totalCapitalGain / (initialEquity || 1)), 1 / holdingYears) - 1) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Compound Property Value Growth & Equity"
        description="Compute compound real estate property appreciation, capital gains, and leveraged Return on Equity (ROE)."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <InputField
            label="Purchase Price ($)"
            value={purchasePrice}
            onChange={(val) => setPurchasePrice(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Down Payment (%)"
            value={downPaymentPercent}
            onChange={(val) => setDownPaymentPercent(Math.min(100, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={100}
            suffix="%"
          />
          <InputField
            label="Annual Appreciation Rate (%)"
            value={annualAppreciationPercent}
            onChange={(val) => setAnnualAppreciationPercent(Math.min(25, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={25}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Holding Period (Years)"
            value={holdingYears}
            onChange={(val) => setHoldingYears(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="yrs"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Future Property Value"
          value={`$${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`After ${holdingYears} years`}
          variant="indigo"
        />
        <ResultCard
          title="Total Capital Gain"
          value={`+$${totalCapitalGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Net appreciation equity"
          variant="light"
        />
        <ResultCard
          title="Total Return on Cash"
          value={`${returnOnInitialEquity.toFixed(0)}%`}
          subtitle={`On $${initialEquity.toLocaleString()} down payment`}
          variant="light"
        />
        <ResultCard
          title="Annualized Leveraged ROE"
          value={`${annualizedLeveragedRoe.toFixed(1)}%`}
          subtitle="CAGR on invested cash"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Mortgage Leverage Multiplier</h4>
        <p className="text-slate-600">
          Because mortgage leverage controls a ${purchasePrice.toLocaleString()} asset with only ${initialEquity.toLocaleString()} down, a moderate {annualAppreciationPercent}% annual property growth produces an outsized <strong className="text-slate-800">{annualizedLeveragedRoe.toFixed(1)}% annualized return</strong> on your original invested cash equity.
        </p>
      </div>
    </div>
  );
};
