import React, { useState } from "react";
import { Activity, Clock, Wrench, ShieldAlert } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const MeanTimeBetweenFailuresMtbf: React.FC = () => {
  const [totalOperatingHours, setTotalOperatingHours] = useState<number>(2400);
  const [failureCount, setFailureCount] = useState<number>(6);
  const [totalDowntimeHours, setTotalDowntimeHours] = useState<number>(28);

  const handleReset = () => {
    setTotalOperatingHours(2400);
    setFailureCount(6);
    setTotalDowntimeHours(28);
  };

  // MTBF = (Total Operating Hours - Downtime) / Number of Failures
  const actualUptimeHours = Math.max(0, totalOperatingHours - totalDowntimeHours);
  const mtbfHours = failureCount > 0 ? actualUptimeHours / failureCount : actualUptimeHours;
  // MTTR = Total Downtime / Number of Failures
  const mttrHours = failureCount > 0 ? totalDowntimeHours / failureCount : 0;
  // Inherent Availability A = MTBF / (MTBF + MTTR)
  const availabilityPercent = (mtbfHours + mttrHours) > 0 ? (mtbfHours / (mtbfHours + mttrHours)) * 100 : 0;
  // Failure rate lambda = 1 / MTBF
  const failureRatePerThousandHours = mtbfHours > 0 ? (1 / mtbfHours) * 1000 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="MTBF & MTTR Equipment Reliability Solver"
        description="Compute Mean Time Between Failures (MTBF), Mean Time to Repair (MTTR), and machine mechanical availability."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Total Planned Operating Hours"
            value={totalOperatingHours}
            onChange={(val) => setTotalOperatingHours(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs"
          />
          <InputField
            label="Number of Breakdowns / Failures"
            value={failureCount}
            onChange={(val) => setFailureCount(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Total Unplanned Downtime (Hours)"
            value={totalDowntimeHours}
            onChange={(val) => setTotalDowntimeHours(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="hrs"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="MTBF (Mean Time Between)"
          value={`${mtbfHours.toFixed(1)} hrs`}
          subtitle="Operating hours per failure"
          variant="indigo"
        />
        <ResultCard
          title="MTTR (Mean Time to Repair)"
          value={`${mttrHours.toFixed(1)} hrs`}
          subtitle="Average fix duration"
          variant="light"
        />
        <ResultCard
          title="Inherent Machine Availability"
          value={`${availabilityPercent.toFixed(2)}%`}
          subtitle="MTBF / (MTBF + MTTR)"
          variant="light"
        />
        <ResultCard
          title="Failure Rate (λ)"
          value={`${failureRatePerThousandHours.toFixed(2)}`}
          subtitle="Failures / 1,000 hrs"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Reliability Engineering Interpretation</h4>
        <p className="text-slate-600">
          The equipment runs for an average of <strong className="text-slate-800">{mtbfHours.toFixed(0)} operating hours</strong> between unexpected stops, and technicians require <strong className="text-slate-800">{mttrHours.toFixed(1)} hours</strong> to restore service. Reducing MTTR by 30% through rapid spare parts staging would boost uptime availability to <strong className="text-slate-800">{((mtbfHours / (mtbfHours + (mttrHours * 0.7))) * 100).toFixed(2)}%</strong>.
        </p>
      </div>
    </div>
  );
};
