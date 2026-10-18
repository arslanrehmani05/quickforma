import React, { useState } from "react";
import { PackageOpen, DollarSign, Percent, TrendingDown } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const InventoryHoldingCostCalculator: React.FC = () => {
  const [averageInventoryValue, setAverageInventoryValue] = useState<number>(500000);
  const [capitalCostRate, setCapitalCostRate] = useState<number>(8.0);
  const [warehousingRate, setWarehousingRate] = useState<number>(5.5);
  const [insuranceTaxRate, setInsuranceTaxRate] = useState<number>(2.5);
  const [shrinkageObsolescenceRate, setShrinkageObsolescenceRate] = useState<number>(4.0);

  const totalCarryingRate = (capitalCostRate || 0) + (warehousingRate || 0) + (insuranceTaxRate || 0) + (shrinkageObsolescenceRate || 0);
  const annualHoldingCost = (averageInventoryValue || 0) * (totalCarryingRate / 100);
  const monthlyHoldingCost = annualHoldingCost / 12;
  const dailyHoldingCost = annualHoldingCost / 365;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={PackageOpen}
            title="Inventory Carrying & Holding Cost Calculator"
            description="Calculate total annual inventory carrying costs, capital tie-up rates, warehousing, shrinkage, and daily holding drag."
          />
          <ResetButton onReset={() => {
            setAverageInventoryValue(500000);
            setCapitalCostRate(8.0);
            setWarehousingRate(5.5);
            setInsuranceTaxRate(2.5);
            setShrinkageObsolescenceRate(4.0);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Average Annual Inventory Value ($)" type="number" prefix="$" value={averageInventoryValue} onChange={(e) => setAverageInventoryValue(Number(e.target.value))} />
            <InputField label="Capital Financing Cost of Money (%)" type="number" suffix="%" value={capitalCostRate} onChange={(e) => setCapitalCostRate(Number(e.target.value))} />
            <InputField label="Storage, Handling & Facility Rate (%)" type="number" suffix="%" value={warehousingRate} onChange={(e) => setWarehousingRate(Number(e.target.value))} />
            <InputField label="Inventory Insurance & Property Taxes (%)" type="number" suffix="%" value={insuranceTaxRate} onChange={(e) => setInsuranceTaxRate(Number(e.target.value))} />
            <InputField label="Shrinkage, Spoilage & Obsolescence (%)" type="number" suffix="%" value={shrinkageObsolescenceRate} onChange={(e) => setShrinkageObsolescenceRate(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Carrying Cost Impact">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Total Annual Holding Cost</div>
                  <div className="text-4xl font-extrabold text-rose-300">
                    ${annualHoldingCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    Carrying Cost Rate: <span className="font-bold text-white">{totalCarryingRate.toFixed(1)}%</span> of inventory value
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Monthly Holding Cost:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${monthlyHoldingCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Daily Cash Burn Drag:</span>
                    <p className="text-rose-400 font-bold text-sm mt-0.5">${dailyHoldingCost.toFixed(2)}/day</p>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
