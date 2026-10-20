import React, { useState } from "react";
import { CheckSquare, Target, UserCheck, ShieldAlert } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const LeadScoringThresholdCalculator: React.FC = () => {
  const [demographicFitScore, setDemographicFitScore] = useState<number>(35); // max 40
  const [behavioralEngagementScore, setBehavioralEngagementScore] = useState<number>(45); // max 60
  const [salesHandoffThreshold, setSalesHandoffThreshold] = useState<number>(70);

  const handleReset = () => {
    setDemographicFitScore(35);
    setBehavioralEngagementScore(45);
    setSalesHandoffThreshold(70);
  };

  const compositeLeadScore = demographicFitScore + behavioralEngagementScore;
  const isSalesReady = compositeLeadScore >= salesHandoffThreshold;
  const deficitToHandoff = Math.max(0, salesHandoffThreshold - compositeLeadScore);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Behavioral Lead Scoring & Sales Handoff Threshold Solver"
        description="Quantify inbound lead propensity, ICP demographic fit, and automated SDR routing thresholds."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Firmographic / Demographic Score (0-40)"
            value={demographicFitScore}
            onChange={(val) => setDemographicFitScore(Math.min(40, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={40}
          />
          <InputField
            label="Digital Engagement Score (0-60)"
            value={behavioralEngagementScore}
            onChange={(val) => setBehavioralEngagementScore(Math.min(60, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={60}
          />
          <InputField
            label="Sales Ready Handoff Cutoff"
            value={salesHandoffThreshold}
            onChange={(val) => setSalesHandoffThreshold(Math.min(100, Math.max(10, Number(val) || 0)))}
            type="number"
            min={10}
            max={100}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Composite Lead Score"
            value={`${compositeLeadScore} / 100`}
            subtitle={isSalesReady ? "Meets SDR handoff threshold" : `${deficitToHandoff} points below handoff criteria`}
            variant="light"
          />
          <ResultCard
            title="Routing Disposition"
            value={isSalesReady ? "Route to Sales (SDR)" : "Nurture Campaign"}
            subtitle={isSalesReady ? "Priority direct outreach" : "Automated email sequences"}
            variant="light"
          />
          <ResultCard
            title="Qualification Tier"
            value={compositeLeadScore >= 85 ? "Tier 1: Hot Enterprise" : compositeLeadScore >= 70 ? "Tier 2: Sales Qualified" : "Tier 3: Marketing Qualified"}
            subtitle="Pipeline routing tier"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
