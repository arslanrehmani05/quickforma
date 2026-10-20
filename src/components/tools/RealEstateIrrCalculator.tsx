import React, { useState } from "react";
import { TrendingUp, DollarSign, Calculator, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RealEstateIrrCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(150000);
  const [year1CashFlow, setYear1CashFlow] = useState<number>(12000);
  const [year2CashFlow, setYear2CashFlow] = useState<number>(13500);
  const [year3CashFlow, setYear3CashFlow] = useState<number>(15000);
  const [year4CashFlow, setYear4CashFlow] = useState<number>(16500);
  const [year5CashFlowAndSale, setYear5CashFlowAndSale] = useState<number>(235000); // Year 5 cash flow + sales proceeds

  const handleReset = () => {
    setInitialInvestment(150000);
    setYear1CashFlow(12000);
    setYear2CashFlow(13500);
    setYear3CashFlow(15000);
    setYear4CashFlow(16500);
    setYear5CashFlowAndSale(235000);
  };

  const cashFlows = [-initialInvestment, year1CashFlow, year2CashFlow, year3CashFlow, year4CashFlow, year5CashFlowAndSale];

  // Newton-Raphson approximation for Internal Rate of Return (IRR)
  let irr = 0.15; // Initial guess 15%
  for (let iter = 0; iter < 100; iter++) {
    let npv = 0;
    let dNpv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      const denom = Math.pow(1 + irr, t);
      npv += cashFlows[t] / denom;
      if (t > 0) {
        dNpv -= (t * cashFlows[t]) / Math.pow(1 + irr, t + 1);
      }
    }
    if (Math.abs(dNpv) < 1e-7) break;
    const nextIrr = irr - npv / dNpv;
    if (Math.abs(nextIrr - irr) < 1e-6) {
      irr = nextIrr;
      break;
    }
    irr = nextIrr;
  }

  const irrPercent = irr * 100;
  const totalCashReturned = year1CashFlow + year2CashFlow + year3CashFlow + year4CashFlow + year5CashFlowAndSale;
  const netTotalProfit = totalCashReturned - initialInvestment;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Real Estate Internal Rate of Return (IRR) Solver"
        description="Compute 5-year annualized Internal Rate of Return (IRR), cumulative cash distributions, and capital exit gains."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Initial Cash Equity Invested ($)"
            value={initialInvestment}
            onChange={(val) => setInitialInvestment(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Year 1 Cash Flow ($)"
            value={year1CashFlow}
            onChange={(val) => setYear1CashFlow(Number(val) || 0)}
            type="number"
            prefix="$"
          />
          <InputField
            label="Year 2 Cash Flow ($)"
            value={year2CashFlow}
            onChange={(val) => setYear2CashFlow(Number(val) || 0)}
            type="number"
            prefix="$"
          />
          <InputField
            label="Year 3 Cash Flow ($)"
            value={year3CashFlow}
            onChange={(val) => setYear3CashFlow(Number(val) || 0)}
            type="number"
            prefix="$"
          />
          <InputField
            label="Year 4 Cash Flow ($)"
            value={year4CashFlow}
            onChange={(val) => setYear4CashFlow(Number(val) || 0)}
            type="number"
            prefix="$"
          />
          <InputField
            label="Year 5 Cash Flow + Exit Sale ($)"
            value={year5CashFlowAndSale}
            onChange={(val) => setYear5CashFlowAndSale(Number(val) || 0)}
            type="number"
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Internal Rate of Return (IRR)"
          value={`${irrPercent.toFixed(1)}%`}
          subtitle="Annualized compound return"
          variant="indigo"
        />
        <ResultCard
          title="Net Cash Profit"
          value={`+$${netTotalProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`Over 5-year hold period`}
          variant="light"
        />
        <ResultCard
          title="Total Cash Inflows"
          value={`$${totalCashReturned.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`Distributions + exit`}
          variant="light"
        />
        <ResultCard
          title="Equity Multiple"
          value={`${(totalCashReturned / (initialInvestment || 1)).toFixed(2)}x`}
          subtitle="Total cash / initial equity"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Investment Hurdle Comparison</h4>
        <p className="text-slate-600">
          An annualized IRR of <strong className="text-slate-800">{irrPercent.toFixed(1)}%</strong> exceeds typical 8%–12% commercial real estate cost of capital hurdles, delivering an Equity Multiple of <strong className="text-slate-800">{(totalCashReturned / (initialInvestment || 1)).toFixed(2)}x</strong> over 5 years.
        </p>
      </div>
    </div>
  );
};
