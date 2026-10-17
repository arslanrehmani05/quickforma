import React, { useState } from "react";
import { Layers, Package, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CostOfGoodsSoldCalculator: React.FC = () => {
  const [beginningInventory, setBeginningInventory] = useState<number>(75000);
  const [purchases, setPurchases] = useState<number>(240000);
  const [directLabor, setDirectLabor] = useState<number>(85000);
  const [manufacturingOverhead, setManufacturingOverhead] = useState<number>(35000);
  const [endingInventory, setEndingInventory] = useState<number>(65000);
  const [totalRevenue, setTotalRevenue] = useState<number>(600000);

  const totalGoodsAvailable = (beginningInventory || 0) + (purchases || 0) + (directLabor || 0) + (manufacturingOverhead || 0);
  const cogs = Math.max(0, totalGoodsAvailable - (endingInventory || 0));
  const grossProfit = Math.max(0, (totalRevenue || 0) - cogs);
  const grossMargin = (totalRevenue || 0) > 0 ? (grossProfit / totalRevenue) * 100 : 0;
  const cogsPercentOfRevenue = (totalRevenue || 0) > 0 ? (cogs / totalRevenue) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Layers}
            title="COGS & Ending Inventory Cost Estimator"
            description="Calculate Cost of Goods Sold, goods available for sale, and resulting gross profit margins."
          />
          <ResetButton onReset={() => {
            setBeginningInventory(75000);
            setPurchases(240000);
            setDirectLabor(85000);
            setManufacturingOverhead(35000);
            setEndingInventory(65000);
            setTotalRevenue(600000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Beginning Inventory Valuation ($)" type="number" prefix="$" value={beginningInventory} onChange={(e) => setBeginningInventory(Number(e.target.value))} />
            <InputField label="Raw Material Purchases & Freight-In ($)" type="number" prefix="$" value={purchases} onChange={(e) => setPurchases(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Direct Labor Costs ($)" type="number" prefix="$" value={directLabor} onChange={(e) => setDirectLabor(Number(e.target.value))} />
              <InputField label="Manufacturing Overhead ($)" type="number" prefix="$" value={manufacturingOverhead} onChange={(e) => setManufacturingOverhead(Number(e.target.value))} />
            </div>
            <InputField label="Ending Inventory Physical Count ($)" type="number" prefix="$" value={endingInventory} onChange={(e) => setEndingInventory(Number(e.target.value))} />
            <InputField label="Total Sales Revenue ($)" type="number" prefix="$" value={totalRevenue} onChange={(e) => setTotalRevenue(Number(e.target.value))} helpText="Optional to calculate gross profit margin." />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="COGS & Margin Breakdown">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Cost of Goods Sold (COGS)</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    ${cogs.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400">
                    Represents {cogsPercentOfRevenue.toFixed(1)}% of total revenue.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Goods Available for Sale</span>
                    <span className="text-base font-bold text-white">${totalGoodsAvailable.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Gross Profit</span>
                    <span className="text-base font-bold text-white">${grossProfit.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Gross Profit Margin</span>
                    <span className="text-base font-bold text-emerald-400">{grossMargin.toFixed(1)}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Ending Inventory</span>
                    <span className="text-base font-bold text-white">${endingInventory.toLocaleString()}</span>
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
