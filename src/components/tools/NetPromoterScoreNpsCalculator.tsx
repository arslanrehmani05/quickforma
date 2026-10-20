import React, { useState } from "react";
import { Smile, Frown, Meh, Award } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const NetPromoterScoreNpsCalculator: React.FC = () => {
  const [promotersCount, setPromotersCount] = useState<number>(450); // Scores 9-10
  const [passivesCount, setPassivesCount] = useState<number>(220); // Scores 7-8
  const [detractorsCount, setDetractorsCount] = useState<number>(80); // Scores 0-6

  const handleReset = () => {
    setPromotersCount(450);
    setPassivesCount(220);
    setDetractorsCount(80);
  };

  const totalRespondents = promotersCount + passivesCount + detractorsCount;
  const promoterPercent = totalRespondents > 0 ? (promotersCount / totalRespondents) * 100 : 0;
  const detractorPercent = totalRespondents > 0 ? (detractorsCount / totalRespondents) * 100 : 0;
  const passivePercent = totalRespondents > 0 ? (passivesCount / totalRespondents) * 100 : 0;

  // NPS = % Promoters - % Detractors (range -100 to +100)
  const npsScore = Math.round(promoterPercent - detractorPercent);

  let npsTier = "Needs Improvement (< 0)";
  if (npsScore >= 70) npsTier = "World-Class Customer Loyalty (>= 70)";
  else if (npsScore >= 50) npsTier = "Excellent Customer Advocacy (50 - 69)";
  else if (npsScore >= 30) npsTier = "Good / Favorable Sentiment (30 - 49)";
  else if (npsScore >= 0) npsTier = "Average (0 - 29)";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Promoters vs Detractors NPS Score Solver"
        description="Compute Net Promoter Score (NPS), customer loyalty sentiment distributions, and advocacy tier benchmarks."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Promoters (Score 9–10)"
            value={promotersCount}
            onChange={(val) => setPromotersCount(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Passives (Score 7–8)"
            value={passivesCount}
            onChange={(val) => setPassivesCount(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Detractors (Score 0–6)"
            value={detractorsCount}
            onChange={(val) => setDetractorsCount(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Net Promoter Score (NPS)"
          value={`${npsScore > 0 ? "+" : ""}${npsScore}`}
          subtitle={npsTier}
          variant="indigo"
        />
        <ResultCard
          title="Promoters Share"
          value={`${promoterPercent.toFixed(1)}%`}
          subtitle={`${promotersCount} loyal advocates`}
          variant="light"
        />
        <ResultCard
          title="Detractors Share"
          value={`${detractorPercent.toFixed(1)}%`}
          subtitle={`${detractorsCount} at-risk customers`}
          variant="light"
        />
        <ResultCard
          title="Passives Share"
          value={`${passivePercent.toFixed(1)}%`}
          subtitle={`${passivesCount} neutral buyers`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Customer Advocacy Verdict</h4>
        <p className="text-slate-600">
          An NPS of <strong className="text-slate-800">{npsScore > 0 ? "+" : ""}{npsScore}</strong> indicates <strong className="text-slate-800">{npsTier}</strong> across {totalRespondents.toLocaleString()} survey responses. Converting just 20 detractors into passives would raise your score by +{( (20/totalRespondents)*100 ).toFixed(0)} points.
        </p>
      </div>
    </div>
  );
};
