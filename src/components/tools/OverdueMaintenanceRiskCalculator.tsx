import React, { useState } from "react";
import { AlertOctagon, Clock, DollarSign, ShieldAlert } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const OverdueMaintenanceRiskCalculator: React.FC = () => {
  const [hoursOverdue, setHoursOverdue] = useState<number>(120);
  const [standardServiceIntervalHours, setStandardServiceIntervalHours] = useState<number>(500);
  const [criticalityMultiplier, setCriticalityMultiplier] = useState<number>(4); // 1 = Non-critical, 4 = High, 10 = Bottleneck
  const [dailyDowntimeCost, setDailyDowntimeCost] = useState<number>(18000); // Production loss per day if failed
  const [catastrophicRepairCost, setCatastrophicRepairCost] = useState<number>(35000);

  const handleReset = () => {
    setHoursOverdue(120);
    setStandardServiceIntervalHours(500);
    setCriticalityMultiplier(4);
    setDailyDowntimeCost(18000);
    setCatastrophicRepairCost(35000);
  };

  // Overdue Ratio = Overdue Hours / Standard Interval
  const overdueRatio = standardServiceIntervalHours > 0 ? hoursOverdue / standardServiceIntervalHours : 0;
  // Exponential failure risk surge: P_fail = 1 - exp(-0.8 * overdueRatio)
  const failureProbabilityPercent = Math.min(95, (1 - Math.exp(-0.9 * overdueRatio)) * 100);
  const totalExposureCost = catastrophicRepairCost + (dailyDowntimeCost * 2); // Assume 2 days outage
  const expectedMonetaryValueLoss = totalExposureCost * (failureProbabilityPercent / 100);
  const riskIndexScore = Math.min(100, Math.round(overdueRatio * criticalityMultiplier * 25));

  let urgencyTier = "Low / Normal";
  if (riskIndexScore >= 75) urgencyTier = "EMERGENCY SHUTDOWN REQUIRED";
  else if (riskIndexScore >= 45) urgencyTier = "High Risk of Imminent Seizure";
  else if (riskIndexScore >= 20) urgencyTier = "Moderate Overdue Warning";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Preventive Maintenance Overdue Risk Index Solver"
        description="Quantify failure probabilities, catastrophic repair exposures, and downtime risks on overdue factory equipment."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Asset Line Criticality</label>
          <select
            value={criticalityMultiplier}
            onChange={(e) => setCriticalityMultiplier(Number(e.target.value))}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 focus:outline-indigo-500 font-medium"
          >
            <option value={10}>Level 4: Main Factory Bottleneck (Shuts Down Entire Plant)</option>
            <option value={4}>Level 3: High Priority Production Asset (Buffers Deplete in 4 hrs)</option>
            <option value={2}>Level 2: Medium Secondary Equipment (Redundant Machine Exists)</option>
            <option value={1}>Level 1: Low Offline Utility / Support Equipment</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <InputField
            label="Operating Hours Past Due"
            value={hoursOverdue}
            onChange={(val) => setHoursOverdue(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="hrs"
          />
          <InputField
            label="Standard Service Interval"
            value={standardServiceIntervalHours}
            onChange={(val) => setStandardServiceIntervalHours(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs"
          />
          <InputField
            label="Daily Plant Downtime Loss ($)"
            value={dailyDowntimeCost}
            onChange={(val) => setDailyDowntimeCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Catastrophic Rebuild Cost ($)"
            value={catastrophicRepairCost}
            onChange={(val) => setCatastrophicRepairCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Risk Index Score"
          value={`${riskIndexScore} / 100`}
          subtitle={urgencyTier}
          variant="indigo"
        />
        <ResultCard
          title="Failure Probability"
          value={`${failureProbabilityPercent.toFixed(1)}%`}
          subtitle={`${(overdueRatio * 100).toFixed(0)}% past due interval`}
          variant="light"
        />
        <ResultCard
          title="Expected Risk Exposure"
          value={`$${expectedMonetaryValueLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Probability-weighted loss"
          variant="light"
        />
        <ResultCard
          title="Worst-Case Catastrophe"
          value={`$${totalExposureCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Rebuild + 48hr outage"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Reliability Engineering Directive</h4>
        <p className="text-slate-600">
          Running {hoursOverdue} hours past the manufacturer service interval elevates breakdown probability to <strong className="text-slate-800">{failureProbabilityPercent.toFixed(1)}%</strong>, exposing the business to <strong className="text-slate-800">${expectedMonetaryValueLoss.toLocaleString()} in expected failure costs</strong>. Schedule service within 24 hours to avert an unbudgeted ${totalExposureCost.toLocaleString()} breakdown.
        </p>
      </div>
    </div>
  );
};
