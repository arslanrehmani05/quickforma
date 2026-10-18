import React, { useState } from "react";
import { Award, DollarSign, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EconomicValueAddedCalculator: React.FC = () => {
  const [nopat, setNopat] = useState<number>(650000); // Net Operating Profit After Taxes
  const [totalInvestedCapital, setTotalInvestedCapital] = useState<number>(4500000);
  const [waccPct, setWaccPct] = useState<number>(9.5); // Weighted Average Cost of Capital

  const safeNopat = Number(nopat);
  const safeCapital = Math.max(0, totalInvestedCapital);
  const safeWacc = Math.max(0, waccPct);

  // Capital Charge = Invested Capital * WACC
  const capitalChargeDollars = safeCapital * (safeWacc / 100);

  // EVA = NOPAT - (Invested Capital * WACC)
  const eva = safeNopat - capitalChargeDollars;
  
  // Return on Invested Capital (ROIC) = NOPAT / Capital
  const roicPct = safeCapital > 0 ? (safeNopat / safeCapital) * 100 : 0;
  const spreadPct = roicPct - safeWacc;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Award}
            title="Economic Value Added (EVA) & True Economic Profit Calculator"
            description="Measure true economic profit generated beyond all capital costs: EVA = NOPAT - (Invested Capital × WACC)."
          />
          <ResetButton onReset={() => {
            setNopat(650000);
            setTotalInvestedCapital(4500000);
            setWaccPct(9.5);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="NOPAT ($)"
            type="number"
            step={25000}
            value={nopat}
            onChange={(e) => setNopat(Number(e.target.value))}
          />
          <InputField
            label="Total Invested Capital ($)"
            type="number"
            min={0}
            step={100000}
            value={totalInvestedCapital}
            onChange={(e) => setTotalInvestedCapital(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Cost of Capital (WACC) (%)"
            type="number"
            min={0.1}
            max={30}
            step={0.1}
            value={waccPct}
            onChange={(e) => setWaccPct(Math.max(0.1, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Shareholder Value Creation">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Economic Value Added</span>
              <p className={`text-3xl font-extrabold mt-2 ${eva >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                ${Math.round(eva).toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Net economic surplus</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Return on Capital (ROIC)</span>
              <p className="text-3xl font-extrabold text-white mt-2">{roicPct.toFixed(2)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">NOPAT / Invested Capital</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Capital Charge</span>
              <p className="text-3xl font-extrabold text-amber-300 mt-2">${Math.round(capitalChargeDollars).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Hurdle return required</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Economic Spread</span>
              <p className={`text-2xl font-mono font-bold mt-2 ${spreadPct >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {spreadPct >= 0 ? "+" : ""}{spreadPct.toFixed(2)}%
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">ROIC minus WACC</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
