import React, { useState } from "react";
import { AlertOctagon, TrendingUp, ShieldAlert, CheckCircle2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AltmanZScoreCalculator: React.FC = () => {
  const [totalAssets, setTotalAssets] = useState<number>(5000000);
  const [totalLiabilities, setTotalLiabilities] = useState<number>(2400000);
  const [workingCapital, setWorkingCapital] = useState<number>(800000);
  const [retainedEarnings, setRetainedEarnings] = useState<number>(1200000);
  const [ebit, setEbit] = useState<number>(650000);
  const [equityValue, setEquityValue] = useState<number>(3500000);
  const [salesRevenue, setSalesRevenue] = useState<number>(6000000);

  // Standard Altman Z-Score for Manufacturing / Public
  const x1 = totalAssets > 0 ? workingCapital / totalAssets : 0;
  const x2 = totalAssets > 0 ? retainedEarnings / totalAssets : 0;
  const x3 = totalAssets > 0 ? ebit / totalAssets : 0;
  const x4 = totalLiabilities > 0 ? equityValue / totalLiabilities : 0;
  const x5 = totalAssets > 0 ? salesRevenue / totalAssets : 0;

  const zScore = 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 0.999 * x5;

  const getZone = () => {
    if (zScore >= 2.99) return { label: "Safe Zone (Low Bankruptcy Risk)", color: "text-emerald-400" };
    if (zScore >= 1.81) return { label: "Grey Zone (Caution / Moderate Default Risk)", color: "text-amber-300" };
    return { label: "Distress Zone (High Bankruptcy Probability)", color: "text-rose-400" };
  };

  const zone = getZone();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={AlertOctagon}
            title="Altman Z-Score Business Bankruptcy Predictor"
            description="Assess financial distress probability and credit default risk using the classic 5-factor Altman Z-Score model."
          />
          <ResetButton onReset={() => {
            setTotalAssets(5000000);
            setTotalLiabilities(2400000);
            setWorkingCapital(800000);
            setRetainedEarnings(1200000);
            setEbit(650000);
            setEquityValue(3500000);
            setSalesRevenue(6000000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Total Assets ($)" type="number" prefix="$" value={totalAssets} onChange={(e) => setTotalAssets(Number(e.target.value))} />
            <InputField label="Total Liabilities ($)" type="number" prefix="$" value={totalLiabilities} onChange={(e) => setTotalLiabilities(Number(e.target.value))} />
            <InputField label="Working Capital ($)" type="number" prefix="$" value={workingCapital} onChange={(e) => setWorkingCapital(Number(e.target.value))} />
            <InputField label="Retained Earnings ($)" type="number" prefix="$" value={retainedEarnings} onChange={(e) => setRetainedEarnings(Number(e.target.value))} />
            <InputField label="EBIT (Operating Income) ($)" type="number" prefix="$" value={ebit} onChange={(e) => setEbit(Number(e.target.value))} />
            <InputField label="Market Value of Equity (or Net Worth) ($)" type="number" prefix="$" value={equityValue} onChange={(e) => setEquityValue(Number(e.target.value))} />
            <InputField label="Total Sales Revenue ($)" type="number" prefix="$" value={salesRevenue} onChange={(e) => setSalesRevenue(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Altman Z-Score Standing">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Altman Z-Score</div>
                  <div className="text-5xl font-extrabold text-white">{zScore.toFixed(2)}</div>
                  <div className={`text-xs font-semibold mt-1.5 ${zone.color}`}>{zone.label}</div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs text-slate-300 space-y-2">
                  <div className="flex justify-between">
                    <span>Safe Zone Threshold:</span>
                    <span className="font-bold text-emerald-300">&gt; 2.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grey Zone Range:</span>
                    <span className="font-bold text-amber-300">1.81 - 2.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distress Zone:</span>
                    <span className="font-bold text-rose-400">&lt; 1.81</span>
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
