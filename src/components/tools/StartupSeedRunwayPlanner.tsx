import React, { useState } from "react";
import { Rocket, DollarSign, Calendar, TrendingDown } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const StartupSeedRunwayPlanner: React.FC = () => {
  const [seedRoundRaised, setSeedRoundRaised] = useState<number>(1500000);
  const [startingMonthlyBurn, setStartingMonthlyBurn] = useState<number>(65000);
  const [monthlyBurnGrowthPercent, setMonthlyBurnGrowthPercent] = useState<number>(4.0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(12000);

  // Model dynamic monthly cash depletion
  let cash = seedRoundRaised || 0;
  let currentBurn = startingMonthlyBurn || 0;
  let monthsDynamic = 0;
  for (let m = 1; m <= 60; m++) {
    const netBurn = Math.max(0, currentBurn - (monthlyRevenue || 0));
    if (cash < netBurn) {
      monthsDynamic = m - 1 + (cash / netBurn);
      break;
    }
    cash -= netBurn;
    currentBurn *= (1 + (monthlyBurnGrowthPercent || 0) / 100);
  }

  const staticRunwayMonths = (startingMonthlyBurn - monthlyRevenue) > 0
    ? (seedRoundRaised || 0) / (startingMonthlyBurn - monthlyRevenue)
    : Infinity;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Rocket}
            title="Pre-Seed / Seed Round Runway Planner"
            description="Forecast startup cash depletion under team expansion, increasing headcount burn rates, and revenue milestones."
          />
          <ResetButton onReset={() => {
            setSeedRoundRaised(1500000);
            setStartingMonthlyBurn(65000);
            setMonthlyBurnGrowthPercent(4.0);
            setMonthlyRevenue(12000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Seed Capital Raised ($)" type="number" prefix="$" value={seedRoundRaised} onChange={(e) => setSeedRoundRaised(Number(e.target.value))} />
            <InputField label="Initial Monthly Operating Expenses ($)" type="number" prefix="$" value={startingMonthlyBurn} onChange={(e) => setStartingMonthlyBurn(Number(e.target.value))} />
            <InputField label="Monthly Headcount / Expense Growth Rate (%)" type="number" suffix="%" value={monthlyBurnGrowthPercent} onChange={(e) => setMonthlyBurnGrowthPercent(Number(e.target.value))} helpText="Reflects engineering hiring and tool expansion." />
            <InputField label="Current Monthly Recurring Revenue ($)" type="number" prefix="$" value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Seed Runway Forecast">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Dynamic Scaling Runway</div>
                  <div className="text-4xl font-extrabold text-white">{monthsDynamic.toFixed(1)} Months</div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Accounting for {monthlyBurnGrowthPercent}% monthly headcount & overhead expansion
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Static Fixed Burn Runway:</span>
                    <p className="text-white font-bold text-sm mt-0.5">{isFinite(staticRunwayMonths) ? `${staticRunwayMonths.toFixed(1)} Mos` : "N/A"}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Expansion Burn Drag:</span>
                    <p className="text-rose-300 font-bold text-sm mt-0.5">
                      {isFinite(staticRunwayMonths) ? `-${(staticRunwayMonths - monthsDynamic).toFixed(1)} Mos Lost` : "N/A"}
                    </p>
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
