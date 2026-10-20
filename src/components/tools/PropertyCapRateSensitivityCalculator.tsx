import React, { useState } from "react";
import { Building, DollarSign, Calculator, Layers } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PropertyCapRateSensitivityCalculator: React.FC = () => {
  const [netOperatingIncome, setNetOperatingIncome] = useState<number>(140000); // NOI
  const [baselineCapRatePercent, setBaselineCapRatePercent] = useState<number>(6.0); // 6%

  const handleReset = () => {
    setNetOperatingIncome(140000);
    setBaselineCapRatePercent(6.0);
  };

  const getValuation = (cap: number) => {
    return cap > 0 ? netOperatingIncome / (cap / 100) : 0;
  };

  const baselineValuation = getValuation(baselineCapRatePercent);
  const capMinus1 = Math.max(1, baselineCapRatePercent - 1.0);
  const capMinus05 = Math.max(1, baselineCapRatePercent - 0.5);
  const capPlus05 = baselineCapRatePercent + 0.5;
  const capPlus1 = baselineCapRatePercent + 1.0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Cap Rate Sensitivity & Exit Price Valuation Matrix"
        description="Compute real estate capitalization rate sensitivity matrices, valuation expansions, and yield compression impacts."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Annual Net Operating Income (NOI $)"
            value={netOperatingIncome}
            onChange={(val) => setNetOperatingIncome(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Baseline Capitalization Rate (%)"
            value={baselineCapRatePercent}
            onChange={(val) => setBaselineCapRatePercent(Math.min(20, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={20}
            step={0.25}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Baseline Property Value"
          value={`$${baselineValuation.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`At ${baselineCapRatePercent.toFixed(2)}% Cap Rate`}
          variant="indigo"
        />
        <ResultCard
          title="-50 bps Compression"
          value={`$${getValuation(capMinus05).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`+$${(getValuation(capMinus05) - baselineValuation).toLocaleString()} upside`}
          variant="light"
        />
        <ResultCard
          title="+50 bps Expansion"
          value={`$${getValuation(capPlus05).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`-$${(baselineValuation - getValuation(capPlus05)).toLocaleString()} downside`}
          variant="light"
        />
        <ResultCard
          title="Annual NOI"
          value={`$${netOperatingIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Net rental cash flow"
          variant="light"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h4 className="font-semibold text-slate-800 mb-3 text-sm">Cap Rate Valuation Matrix</h4>
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="font-bold text-emerald-800">{capMinus1.toFixed(1)}% Cap</div>
            <div className="font-semibold text-slate-900 mt-1">${(getValuation(capMinus1) / 1000).toFixed(0)}k</div>
            <div className="text-[10px] text-emerald-600 mt-0.5">+{( (getValuation(capMinus1)/baselineValuation - 1)*100 ).toFixed(0)}%</div>
          </div>
          <div className="p-2.5 bg-emerald-50/60 rounded-lg border border-emerald-100">
            <div className="font-bold text-emerald-700">{capMinus05.toFixed(1)}% Cap</div>
            <div className="font-semibold text-slate-900 mt-1">${(getValuation(capMinus05) / 1000).toFixed(0)}k</div>
            <div className="text-[10px] text-emerald-600 mt-0.5">+{( (getValuation(capMinus05)/baselineValuation - 1)*100 ).toFixed(0)}%</div>
          </div>
          <div className="p-2.5 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="font-bold text-indigo-700">{baselineCapRatePercent.toFixed(1)}% Base</div>
            <div className="font-bold text-indigo-900 mt-1">${(baselineValuation / 1000).toFixed(0)}k</div>
            <div className="text-[10px] text-indigo-500 mt-0.5">Baseline</div>
          </div>
          <div className="p-2.5 bg-rose-50/60 rounded-lg border border-rose-100">
            <div className="font-bold text-rose-700">{capPlus05.toFixed(1)}% Cap</div>
            <div className="font-semibold text-slate-900 mt-1">${(getValuation(capPlus05) / 1000).toFixed(0)}k</div>
            <div className="text-[10px] text-rose-600 mt-0.5">{( (getValuation(capPlus05)/baselineValuation - 1)*100 ).toFixed(0)}%</div>
          </div>
          <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
            <div className="font-bold text-rose-800">{capPlus1.toFixed(1)}% Cap</div>
            <div className="font-semibold text-slate-900 mt-1">${(getValuation(capPlus1) / 1000).toFixed(0)}k</div>
            <div className="text-[10px] text-rose-600 mt-0.5">{( (getValuation(capPlus1)/baselineValuation - 1)*100 ).toFixed(0)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
