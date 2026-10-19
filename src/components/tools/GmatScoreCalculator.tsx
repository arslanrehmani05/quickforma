import React, { useState } from "react";
import { BarChart3, Award, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const GmatScoreCalculator: React.FC = () => {
  const [quantScore, setQuantScore] = useState<number>(82);
  const [verbalScore, setVerbalScore] = useState<number>(83);
  const [dataInsightsScore, setDataInsightsScore] = useState<number>(81);

  // GMAT Focus Edition: 3 sections scored 60 to 90 each. Total 205 - 805 (ends in 5)
  // Total = 205 + round(((Q + V + DI - 180) / 90) * 600) rounded to nearest 10 plus 5
  const sumRaw = quantScore + verbalScore + dataInsightsScore;
  const rawOffset = (sumRaw - 180) / 90;
  let estimatedTotal = 205 + Math.round(rawOffset * 60) * 10;
  estimatedTotal = Math.max(205, Math.min(805, estimatedTotal));
  if (estimatedTotal % 10 === 0) estimatedTotal += 5; // Focus edition always ends in 5

  let percentile = "50th";
  if (estimatedTotal >= 715) percentile = "99th Percentile (M7 / Top 10 MBA)";
  else if (estimatedTotal >= 675) percentile = "93rd Percentile (Top 25 MBA)";
  else if (estimatedTotal >= 645) percentile = "83rd Percentile (Competitive MBA)";
  else if (estimatedTotal >= 605) percentile = "66th Percentile";
  else percentile = "40th - 50th Percentile";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BarChart3}
            title="GMAT Focus Edition Section & Percentile Estimator"
            description="Calculate GMAT Focus Edition total score (205-805 scale) from Quantitative, Verbal, and Data Insights sections."
          />
          <ResetButton onReset={() => {
            setQuantScore(82); setVerbalScore(83); setDataInsightsScore(81);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Quantitative Section (60-90)"
            type="number"
            value={quantScore}
            onChange={(e) => setQuantScore(Number(e.target.value))}
            min={60}
            max={90}
          />
          <InputField
            label="Verbal Section (60-90)"
            type="number"
            value={verbalScore}
            onChange={(e) => setVerbalScore(Number(e.target.value))}
            min={60}
            max={90}
          />
          <InputField
            label="Data Insights Section (60-90)"
            type="number"
            value={dataInsightsScore}
            onChange={(e) => setDataInsightsScore(Number(e.target.value))}
            min={60}
            max={90}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="GMAT Focus Score"
            value={estimatedTotal.toString()}
            subtitle="Scaled score range: 205 – 805"
          />
          <ResultCard
            variant="light"
            title="MBA Percentile"
            value={percentile}
            subtitle="Based on GMAC cohort distributions"
          />
          <ResultCard
            variant="light"
            title="Section Average"
            value={(sumRaw / 3).toFixed(1)}
            subtitle="Equally weighted sections"
          />
        </div>
      </div>
    </div>
  );
};
