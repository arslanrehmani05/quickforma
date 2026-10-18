import React, { useState } from "react";
import { RefreshCw, DollarSign, Calendar, BarChart3, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const InventoryTurnoverRatioCalculator: React.FC = () => {
  const [cogs, setCogs] = useState<number>(450000);
  const [beginningInventory, setBeginningInventory] = useState<number>(85000);
  const [endingInventory, setEndingInventory] = useState<number>(95000);
  const [annualRevenue, setAnnualRevenue] = useState<number>(750000);

  const annualCogs = Math.max(0, Number(cogs) || 0);
  const begInv = Math.max(0, Number(beginningInventory) || 0);
  const endInv = Math.max(0, Number(endingInventory) || 0);
  const rev = Math.max(0, Number(annualRevenue) || 0);

  const averageInventory = (begInv + endInv) / 2;
  const isAvgInvValid = averageInventory > 0;

  // Inventory Turnover = COGS / Average Inventory
  const turnoverRatio = isAvgInvValid ? annualCogs / averageInventory : 0;

  // Days Sales of Inventory (DSI) = 365 / Turnover Ratio
  const daysSalesOfInventory = turnoverRatio > 0 ? 365 / turnoverRatio : 0;

  // Gross Margin Return on Investment (GMROI) = Gross Profit / Average Inventory
  const grossProfit = rev - annualCogs;
  const gmroi = isAvgInvValid ? grossProfit / averageInventory : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={RefreshCw}
            title="Inventory Turnover Ratio & Days Sales of Inventory (DSI)"
            description="Calculate stock turnover velocity (COGS / Avg Inventory), days sales of inventory under US GAAP, and GMROI capital efficiency."
          />
          <ResetButton onReset={() => {
            setCogs(450000);
            setBeginningInventory(85000);
            setEndingInventory(95000);
            setAnnualRevenue(750000);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InputField
            label="Annual COGS ($)"
            type="number"
            min={0}
            step="1000"
            value={cogs}
            onChange={(e) => setCogs(Number(e.target.value))}
            helpText="Cost of Goods Sold (US GAAP)"
          />
          <InputField
            label="Beginning Inventory ($)"
            type="number"
            min={0}
            step="1000"
            value={beginningInventory}
            onChange={(e) => setBeginningInventory(Number(e.target.value))}
          />
          <InputField
            label="Ending Inventory ($)"
            type="number"
            min={0}
            step="1000"
            value={endingInventory}
            onChange={(e) => setEndingInventory(Number(e.target.value))}
          />
          <InputField
            label="Annual Revenue ($)"
            type="number"
            min={0}
            step="1000"
            value={annualRevenue}
            onChange={(e) => setAnnualRevenue(Number(e.target.value))}
          />
        </div>

        {!isAvgInvValid && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            Average inventory must be greater than $0 to calculate turnover velocity and days sales of inventory.
          </div>
        )}

        <ResultCard variant="dark" title="Stock Velocity & Working Capital Velocity">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Turnover Ratio</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {isAvgInvValid ? `${turnoverRatio.toFixed(2)}×` : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Turns per year</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Days to Sell (DSI)</span>
              <p className="text-4xl font-extrabold text-white mt-1">
                {turnoverRatio > 0 ? `${Math.round(daysSalesOfInventory)} days` : "—"}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">365 / Turnover</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">GMROI Multiplier</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">
                {isAvgInvValid ? `$${gmroi.toFixed(2)}` : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Gross profit / avg inventory</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Inventory Health</span>
              <p className="text-sm font-bold text-slate-200 mt-1">
                {!isAvgInvValid ? "Awaiting Data" :
                 turnoverRatio >= 6 ? "High Velocity (Lean & Agile)" :
                 turnoverRatio >= 4 ? "Healthy / Normal Operations" : "Slow Moving (Holding Risk)"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
