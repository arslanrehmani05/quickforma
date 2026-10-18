import React, { useState } from "react";
import { Target, DollarSign, TrendingUp, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const GoogleShoppingRoasCalculator: React.FC = () => {
  const [adSpend, setAdSpend] = useState<number>(2500);
  const [revenueGenerated, setRevenueGenerated] = useState<number>(10000);
  const [grossMarginPct, setGrossMarginPct] = useState<number>(45);

  const spend = Math.max(0, Number(adSpend) || 0);
  const revenue = Math.max(0, Number(revenueGenerated) || 0);
  const marginPct = Math.min(100, Math.max(0, Number(grossMarginPct) || 0));

  // ROAS = Revenue / Ad Spend
  const roasMultiplier = spend > 0 ? revenue / spend : 0;
  const roasPct = roasMultiplier * 100;

  // Gross profit before ad spend
  const grossProfit = revenue * (marginPct / 100);
  // Net profit after ad spend
  const netProfit = grossProfit - spend;
  // POAS = Gross Profit / Ad Spend
  const poas = spend > 0 ? grossProfit / spend : 0;

  // Break-even ROAS = 1 / (Gross Margin %)
  const breakEvenRoas = marginPct > 0 ? (100 / marginPct) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Target}
            title="Google Shopping ROAS & Break-Even POAS Tool"
            description="Calculate Target ROAS (tROAS), Profit on Ad Spend (POAS), and true contribution margin after campaign ad spend."
          />
          <ResetButton onReset={() => {
            setAdSpend(2500);
            setRevenueGenerated(10000);
            setGrossMarginPct(45);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Google Ads Spend ($)"
            type="number"
            min={0}
            step="100"
            value={adSpend}
            onChange={(e) => setAdSpend(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Conversion Revenue ($)"
            type="number"
            min={0}
            step="100"
            value={revenueGenerated}
            onChange={(e) => setRevenueGenerated(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Product Gross Margin (%)"
            type="number"
            min={1}
            max={100}
            value={grossMarginPct}
            onChange={(e) => setGrossMarginPct(Math.min(100, Math.max(1, Number(e.target.value))))}
          />
        </div>

        <ResultCard variant="dark" title="Campaign Efficiency & Profitability">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">ROAS Multiplier</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {spend > 0 ? `${roasMultiplier.toFixed(2)}×` : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {spend > 0 ? `${Math.round(roasPct)}% Return on Ads` : "Enter ad spend"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">POAS (Profit on Spend)</span>
              <p className="text-4xl font-extrabold text-white mt-1">
                {spend > 0 ? `${poas.toFixed(2)}×` : "—"}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">
                {spend > 0 ? (poas >= 1.0 ? "Profitable (POAS ≥ 1.0)" : "Losing Money (POAS < 1.0)") : "Gross Profit / Spend"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Break-Even ROAS</span>
              <p className="text-4xl font-extrabold text-amber-300 mt-1">
                {breakEvenRoas > 0 ? `${breakEvenRoas.toFixed(2)}×` : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">1 / {marginPct}% Margin</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Net Ad Profit</span>
              <p className={`text-2xl font-bold mt-1 ${netProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                ${Math.round(netProfit).toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Gross profit minus ad cost</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
