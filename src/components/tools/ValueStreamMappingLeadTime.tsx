import React, { useState } from "react";
import { ArrowRight, Clock, Gauge, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ValueStreamMappingLeadTime: React.FC = () => {
  const [valueAddMinutes, setValueAddMinutes] = useState<number>(45); // Direct machining & assembly
  const [queueTimeDays, setQueueTimeDays] = useState<number>(12); // Waiting in buffer queues
  const [operatingHoursPerDay, setOperatingHoursPerDay] = useState<number>(16); // 2 shifts

  const handleReset = () => {
    setValueAddMinutes(45);
    setQueueTimeDays(12);
    setOperatingHoursPerDay(16);
  };

  // Process Lead Time (PLT) = Queue Time in minutes + Value-Added Time in minutes
  const totalQueueMinutes = queueTimeDays * operatingHoursPerDay * 60;
  const totalLeadTimeMinutes = totalQueueMinutes + valueAddMinutes;
  const processCycleEfficiency = totalLeadTimeMinutes > 0 ? (valueAddMinutes / totalLeadTimeMinutes) * 100 : 0;
  const leadTimeDaysExact = totalLeadTimeMinutes / (operatingHoursPerDay * 60);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Process Value-Add Ratio vs Waste Lead Time"
        description="Compute Value Stream Mapping (VSM) Process Cycle Efficiency (PCE), non-value-added queue waste, and lead times."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Total Value-Added Touch Time (Minutes)"
            value={valueAddMinutes}
            onChange={(val) => setValueAddMinutes(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="mins"
          />
          <InputField
            label="Total Non-Value-Added Queue Delay (Days)"
            value={queueTimeDays}
            onChange={(val) => setQueueTimeDays(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            step={0.5}
            suffix="days"
          />
          <InputField
            label="Operating Plant Hours per Day"
            value={operatingHoursPerDay}
            onChange={(val) => setOperatingHoursPerDay(Math.min(24, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={24}
            suffix="hrs/day"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Process Cycle Efficiency"
          value={`${processCycleEfficiency.toFixed(2)}%`}
          subtitle="Value-Add / Lead Time"
          variant="indigo"
        />
        <ResultCard
          title="Total Production Lead Time"
          value={`${leadTimeDaysExact.toFixed(1)} days`}
          subtitle={`${(totalLeadTimeMinutes / 60).toFixed(0)} factory hours`}
          variant="light"
        />
        <ResultCard
          title="Pure Value-Added Time"
          value={`${valueAddMinutes} mins`}
          subtitle={`${(valueAddMinutes / 60).toFixed(2)} hours touch time`}
          variant="light"
        />
        <ResultCard
          title="Wasted Wait Time"
          value={`${(100 - processCycleEfficiency).toFixed(1)}%`}
          subtitle="Non-value-add queue"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Lean VSM Assessment</h4>
        <p className="text-slate-600">
          In typical manufacturing environments, Process Cycle Efficiency is below 5%. Here, pure value-adding work takes only <strong className="text-slate-800">{valueAddMinutes} minutes</strong>, yet the order spends <strong className="text-slate-800">{queueTimeDays} days</strong> waiting in batch queues. Eliminating WIP queue delays by half slashes lead time to <strong className="text-slate-800">{(leadTimeDaysExact / 2).toFixed(1)} days</strong> without adding equipment.
        </p>
      </div>
    </div>
  );
};
