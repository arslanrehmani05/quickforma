import React, { useState } from "react";
import { Smile, Users, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const NetPromoterScoreRoiCalculator: React.FC = () => {
  const [promotersCount, setPromotersCount] = useState<number>(450); // Scores 9-10
  const [passivesCount, setPassivesCount] = useState<number>(300); // Scores 7-8
  const [detractorsCount, setDetractorsCount] = useState<number>(100); // Scores 0-6
  const [averageCustomerAnnualSpend, setAverageCustomerAnnualSpend] = useState<number>(1200);
  const [detractorChurnRatePct, setDetractorChurnRatePct] = useState<number>(35); // standard ~30-40%

  const totalRespondents = Math.max(1, promotersCount + passivesCount + detractorsCount);
  const promoterPct = (promotersCount / totalRespondents) * 100;
  const detractorPct = (detractorsCount / totalRespondents) * 100;
  
  // Net Promoter Score = % Promoters - % Detractors (-100 to +100)
  const npsScore = Math.round(promoterPct - detractorPct);

  // At-risk annual revenue from detractors
  const atRiskCustomers = detractorsCount * (detractorChurnRatePct / 100);
  const atRiskAnnualRevenue = atRiskCustomers * averageCustomerAnnualSpend;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Smile}
            title="Net Promoter Score (NPS) & Customer Retention Revenue Calculator"
            description="Calculate your official NPS score (-100 to +100) and quantify annual recurring revenue at risk from customer detractor churn."
          />
          <ResetButton onReset={() => {
            setPromotersCount(450);
            setPassivesCount(300);
            setDetractorsCount(100);
            setAverageCustomerAnnualSpend(1200);
            setDetractorChurnRatePct(35);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Promoters (Score 9-10)"
            type="number"
            min={0}
            value={promotersCount}
            onChange={(e) => setPromotersCount(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Passives (Score 7-8)"
            type="number"
            min={0}
            value={passivesCount}
            onChange={(e) => setPassivesCount(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Detractors (Score 0-6)"
            type="number"
            min={0}
            value={detractorsCount}
            onChange={(e) => setDetractorsCount(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Average Annual Spend / Customer ($)"
            type="number"
            min={0}
            value={averageCustomerAnnualSpend}
            onChange={(e) => setAverageCustomerAnnualSpend(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Detractor Churn Probability (%)"
            type="number"
            min={0}
            max={100}
            value={detractorChurnRatePct}
            onChange={(e) => setDetractorChurnRatePct(Number(e.target.value))}
          />
        </div>

        <ResultCard variant="dark" title="NPS & Revenue Exposure Breakdown">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Net Promoter Score</span>
              <p className={`text-4xl font-extrabold mt-2 ${npsScore >= 50 ? "text-emerald-400" : npsScore >= 0 ? "text-amber-300" : "text-rose-400"}`}>
                {npsScore > 0 ? `+${npsScore}` : npsScore}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Scale -100 to +100</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">At-Risk Annual Revenue</span>
              <p className="text-3xl font-extrabold text-rose-400 mt-2">${Math.round(atRiskAnnualRevenue).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">From expected detractor churn</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Respondent Breakdown</span>
              <p className="text-2xl font-bold text-white mt-2">
                {promoterPct.toFixed(0)}% / {((passivesCount / totalRespondents) * 100).toFixed(0)}% / {detractorPct.toFixed(0)}%
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Promoter / Passive / Detractor</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Benchmark Quality</span>
              <p className="text-sm font-bold text-slate-200 mt-2">
                {npsScore >= 70 ? "World Class (>70)" : npsScore >= 50 ? "Excellent (>50)" : npsScore >= 0 ? "Good / Normal" : "Needs Immediate Repair"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
