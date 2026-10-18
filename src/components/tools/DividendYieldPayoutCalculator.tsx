import React, { useState } from "react";
import { Coins, Percent, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const DividendYieldPayoutCalculator: React.FC = () => {
  const [stockPrice, setStockPrice] = useState<number>(75.00);
  const [annualDividendPerShare, setAnnualDividendPerShare] = useState<number>(3.20);
  const [earningsPerShareEps, setEarningsPerShareEps] = useState<number>(5.50);

  const safePrice = Math.max(0.01, stockPrice);
  const safeDiv = Math.max(0, annualDividendPerShare);
  const safeEps = Number(earningsPerShareEps);

  // Dividend Yield = Annual Dividend / Stock Price
  const dividendYieldPct = (safeDiv / safePrice) * 100;

  // Dividend Payout Ratio = Annual Dividend / EPS
  const payoutRatioPct = safeEps > 0 ? (safeDiv / safeEps) * 100 : 0;
  
  // Retention ratio = 100% - Payout Ratio
  const retentionRatioPct = Math.max(0, 100 - payoutRatioPct);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Coins}
            title="Dividend Yield & Payout Ratio Sustainability Calculator"
            description="Calculate dividend yield percentage, payout ratio from EPS, and evaluate dividend safety and reinvestment retention."
          />
          <ResetButton onReset={() => {
            setStockPrice(75.00);
            setAnnualDividendPerShare(3.20);
            setEarningsPerShareEps(5.50);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Current Share Price ($)"
            type="number"
            min={0.01}
            step={1}
            value={stockPrice}
            onChange={(e) => setStockPrice(Math.max(0.01, Number(e.target.value)))}
          />
          <InputField
            label="Annual Dividend / Share ($)"
            type="number"
            min={0}
            step={0.1}
            value={annualDividendPerShare}
            onChange={(e) => setAnnualDividendPerShare(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Diluted EPS ($)"
            type="number"
            step={0.1}
            value={earningsPerShareEps}
            onChange={(e) => setEarningsPerShareEps(Number(e.target.value))}
          />
        </div>

        <ResultCard variant="dark" title="Dividend Return & Coverage">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Dividend Yield</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-2">{dividendYieldPct.toFixed(2)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Annual cash return</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Payout Ratio</span>
              <p className={`text-4xl font-extrabold mt-2 ${payoutRatioPct <= 60 ? "text-white" : payoutRatioPct <= 85 ? "text-amber-300" : "text-rose-400"}`}>
                {payoutRatioPct.toFixed(1)}%
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">of net earnings</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Retention Ratio</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">{retentionRatioPct.toFixed(1)}%</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Reinvested for growth</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Safety Assessment</span>
              <p className="text-sm font-bold text-slate-200 mt-2">
                {payoutRatioPct <= 60 ? "Safe & Sustainable" : payoutRatioPct <= 85 ? "Moderate Caution" : "High Risk of Dividend Cut"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
