import React, { useState } from "react";
import { PiggyBank, DollarSign, Percent, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RetainedEarningsCalculator: React.FC = () => {
  const [begRetainedEarnings, setBegRetainedEarnings] = useState<number>(450000);
  const [netIncome, setNetIncome] = useState<number>(180000);
  const [cashDividends, setCashDividends] = useState<number>(40000);
  const [stockDividends, setStockDividends] = useState<number>(10000);

  const totalDividends = (cashDividends || 0) + (stockDividends || 0);
  const endingRetainedEarnings = (begRetainedEarnings || 0) + (netIncome || 0) - totalDividends;
  const plowbackRatio = netIncome > 0 ? (Math.max(0, netIncome - totalDividends) / netIncome) * 100 : 0;
  const dividendPayoutRatio = netIncome > 0 ? (totalDividends / netIncome) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={PiggyBank}
            title="Ending Retained Earnings & Plowback Ratio Solver"
            description="Track retained balance sheet earnings across net income additions, cash dividend distributions, and internal plowback."
          />
          <ResetButton onReset={() => {
            setBegRetainedEarnings(450000);
            setNetIncome(180000);
            setCashDividends(40000);
            setStockDividends(10000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Beginning Retained Earnings ($)" type="number" prefix="$" value={begRetainedEarnings} onChange={(e) => setBegRetainedEarnings(Number(e.target.value))} />
            <InputField label="Net Income / (Loss) for the Period ($)" type="number" prefix="$" value={netIncome} onChange={(e) => setNetIncome(Number(e.target.value))} />
            <InputField label="Cash Dividends Declared ($)" type="number" prefix="$" value={cashDividends} onChange={(e) => setCashDividends(Number(e.target.value))} />
            <InputField label="Stock Dividends Distributed ($)" type="number" prefix="$" value={stockDividends} onChange={(e) => setStockDividends(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Retained Equity Position">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Ending Retained Earnings</div>
                  <div className="text-4xl font-extrabold text-white">
                    ${endingRetainedEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Internal Reinvestment Rate: <span className="font-bold text-white">{plowbackRatio.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Net Addition to Equity:</span>
                    <p className="text-emerald-400 font-bold text-sm mt-0.5">
                      +${(endingRetainedEarnings - begRetainedEarnings).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Dividend Payout Ratio:</span>
                    <p className="text-white font-bold text-sm mt-0.5">{dividendPayoutRatio.toFixed(1)}%</p>
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
