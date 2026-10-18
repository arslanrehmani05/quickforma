import React, { useState } from "react";
import { TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const MarginalCostRevenueCalculator: React.FC = () => {
  const [initialQuantity, setInitialQuantity] = useState<number>(1000);
  const [newQuantity, setNewQuantity] = useState<number>(1200);
  const [initialTotalCost, setInitialTotalCost] = useState<number>(45000);
  const [newTotalCost, setNewTotalCost] = useState<number>(52000);
  const [initialTotalRevenue, setInitialTotalRevenue] = useState<number>(60000);
  const [newTotalRevenue, setNewTotalRevenue] = useState<number>(71000);

  const deltaQuantity = newQuantity - initialQuantity;
  const deltaCost = newTotalCost - initialTotalCost;
  const deltaRevenue = newTotalRevenue - initialTotalRevenue;

  // Marginal Cost (MC) = Delta Cost / Delta Quantity
  const marginalCost = deltaQuantity !== 0 ? deltaCost / deltaQuantity : 0;

  // Marginal Revenue (MR) = Delta Revenue / Delta Quantity
  const marginalRevenue = deltaQuantity !== 0 ? deltaRevenue / deltaQuantity : 0;
  
  // Marginal Profit = MR - MC
  const marginalProfitPerUnit = marginalRevenue - marginalCost;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={TrendingUp}
            title="Marginal Cost (MC) vs Marginal Revenue (MR) Profit Optimization Calculator"
            description="Determine profit-maximizing output scale: calculate MC = ΔTC / ΔQ, MR = ΔTR / ΔQ, and marginal profit per incremental unit."
          />
          <ResetButton onReset={() => {
            setInitialQuantity(1000);
            setNewQuantity(1200);
            setInitialTotalCost(45000);
            setNewTotalCost(52000);
            setInitialTotalRevenue(60000);
            setNewTotalRevenue(71000);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <InputField
            label="Initial Units (Q₁)"
            type="number"
            min={0}
            value={initialQuantity}
            onChange={(e) => setInitialQuantity(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Initial Cost ($)"
            type="number"
            min={0}
            value={initialTotalCost}
            onChange={(e) => setInitialTotalCost(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Initial Revenue ($)"
            type="number"
            min={0}
            value={initialTotalRevenue}
            onChange={(e) => setInitialTotalRevenue(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <InputField
            label="New Units (Q₂)"
            type="number"
            min={0}
            value={newQuantity}
            onChange={(e) => setNewQuantity(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="New Total Cost ($)"
            type="number"
            min={0}
            value={newTotalCost}
            onChange={(e) => setNewTotalCost(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="New Total Revenue ($)"
            type="number"
            min={0}
            value={newTotalRevenue}
            onChange={(e) => setNewTotalRevenue(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Incremental Unit Economics">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Marginal Revenue (MR)</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">${marginalRevenue.toFixed(2)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Per incremental unit</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Marginal Cost (MC)</span>
              <p className="text-3xl font-extrabold text-amber-300 mt-2">${marginalCost.toFixed(2)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Per incremental unit</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Marginal Unit Profit</span>
              <p className={`text-3xl font-extrabold mt-2 ${marginalProfitPerUnit >= 0 ? "text-indigo-300" : "text-rose-400"}`}>
                ${marginalProfitPerUnit.toFixed(2)}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">MR minus MC</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Scale Recommendation</span>
              <p className="text-sm font-bold text-slate-200 mt-2">
                {marginalRevenue > marginalCost ? "Expand Production (MR > MC)" : marginalRevenue === marginalCost ? "Optimal Scale (MR = MC)" : "Reduce Production (Loss on Scale)"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
