import React, { useState } from "react";
import { DollarSign, Activity, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const OperatingCashFlowToSalesCalculator: React.FC = () => {
  const [operatingCashFlow, setOperatingCashFlow] = useState<number>(420000); // Cash from operations
  const [netSalesRevenue, setNetSalesRevenue] = useState<number>(2500000);
  const [netIncome, setNetIncome] = useState<number>(280000);

  const safeSales = Math.max(0.01, netSalesRevenue);
  
  // OCF Margin = Operating Cash Flow / Net Sales
  const ocfMarginPct = (operatingCashFlow / safeSales) * 100;
  
  // Earnings Quality Ratio = OCF / Net Income (> 1.0 indicates high-quality accruals)
  const earningsQualityRatio = netIncome !== 0 ? operatingCashFlow / netIncome : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Activity}
            title="Operating Cash Flow to Sales Ratio & Quality of Earnings Calculator"
            description="Measure cash conversion efficiency and quality of reported net earnings: OCF Margin = Cash Flow from Operations / Net Sales."
          />
          <ResetButton onReset={() => {
            setOperatingCashFlow(420000);
            setNetSalesRevenue(2500000);
            setNetIncome(280000);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Operating Cash Flow ($)"
            type="number"
            step={25000}
            value={operatingCashFlow}
            onChange={(e) => setOperatingCashFlow(Number(e.target.value))}
          />
          <InputField
            label="Net Sales Revenue ($)"
            type="number"
            min={1}
            step={50000}
            value={netSalesRevenue}
            onChange={(e) => setNetSalesRevenue(Math.max(1, Number(e.target.value)))}
          />
          <InputField
            label="Reported Net Income ($)"
            type="number"
            step={25000}
            value={netIncome}
            onChange={(e) => setNetIncome(Number(e.target.value))}
          />
        </div>

        <ResultCard variant="dark" title="Cash Conversion & Earnings Quality">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">OCF Margin</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-2">{ocfMarginPct.toFixed(1)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Cash collected per $1 sales</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Quality of Earnings</span>
              <p className={`text-4xl font-extrabold mt-2 ${earningsQualityRatio >= 1.0 ? "text-white" : "text-amber-300"}`}>
                {earningsQualityRatio.toFixed(2)}×
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">OCF / Net Income (&gt;1.0 is healthy)</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Cash vs Accrual Spread</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">
                ${Math.round(operatingCashFlow - netIncome).toLocaleString()}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Deprec / Non-cash variance</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Cash Strength</span>
              <p className="text-sm font-bold text-slate-200 mt-2">
                {earningsQualityRatio >= 1.0 ? "High Quality (Cash-Backed)" : "Aggressive Accruals (Cash Lag)"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
