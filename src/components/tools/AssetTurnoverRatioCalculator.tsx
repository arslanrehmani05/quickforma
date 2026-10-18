import React, { useState } from "react";
import { Repeat, DollarSign, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AssetTurnoverRatioCalculator: React.FC = () => {
  const [netSalesRevenue, setNetSalesRevenue] = useState<number>(3500000);
  const [beginningTotalAssets, setBeginningTotalAssets] = useState<number>(1600000);
  const [endingTotalAssets, setEndingTotalAssets] = useState<number>(1900000);

  const safeSales = Math.max(0, netSalesRevenue);
  const averageTotalAssets = (Math.max(0, beginningTotalAssets) + Math.max(0, endingTotalAssets)) / 2;
  
  // Asset Turnover = Net Sales / Average Total Assets
  const assetTurnoverRatio = averageTotalAssets > 0 ? safeSales / averageTotalAssets : 0;
  
  // Capital intensity = 1 / Asset Turnover (Assets needed to generate $1 of sales)
  const capitalIntensity = assetTurnoverRatio > 0 ? 1 / assetTurnoverRatio : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Repeat}
            title="Total Asset Turnover & Capital Intensity Ratio Calculator"
            description="Measure asset deployment efficiency: Asset Turnover Ratio = Net Sales Revenue / Average Total Assets."
          />
          <ResetButton onReset={() => {
            setNetSalesRevenue(3500000);
            setBeginningTotalAssets(1600000);
            setEndingTotalAssets(1900000);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Net Sales Revenue ($)"
            type="number"
            min={0}
            step={50000}
            value={netSalesRevenue}
            onChange={(e) => setNetSalesRevenue(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Beginning Total Assets ($)"
            type="number"
            min={0}
            step={25000}
            value={beginningTotalAssets}
            onChange={(e) => setBeginningTotalAssets(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Ending Total Assets ($)"
            type="number"
            min={0}
            step={25000}
            value={endingTotalAssets}
            onChange={(e) => setEndingTotalAssets(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Asset Velocity & Efficiency">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Asset Turnover</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-2">{assetTurnoverRatio.toFixed(2)}×</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Sales generated per $1 asset</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Average Total Assets</span>
              <p className="text-3xl font-extrabold text-white mt-2">${Math.round(averageTotalAssets).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">(Beg + End) / 2</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Capital Intensity</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">${capitalIntensity.toFixed(2)}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Assets required per $1 revenue</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Business Model Type</span>
              <p className="text-sm font-bold text-slate-200 mt-2">
                {assetTurnoverRatio >= 2.0 ? "High Velocity (Retail / Grocery)" : assetTurnoverRatio >= 1.0 ? "Standard Commercial" : "Capital-Intensive (Heavy Mfg)"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
