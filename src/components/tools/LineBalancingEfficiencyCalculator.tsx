import React, { useState } from "react";
import { Gauge, Clock, Layers, Users } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const LineBalancingEfficiencyCalculator: React.FC = () => {
  const [totalTaskTimeSeconds, setTotalTaskTimeSeconds] = useState<number>(320); // Sum of all work element times
  const [workstationCount, setWorkstationCount] = useState<number>(5);
  const [bottleneckCycleTimeSeconds, setBottleneckCycleTimeSeconds] = useState<number>(75); // Slowest station
  const [taktTimeSeconds, setTaktTimeSeconds] = useState<number>(70);

  const handleReset = () => {
    setTotalTaskTimeSeconds(320);
    setWorkstationCount(5);
    setBottleneckCycleTimeSeconds(75);
    setTaktTimeSeconds(70);
  };

  // Line Balancing Efficiency = (Sum of Task Times) / (Workstations * Bottleneck Cycle Time) * 100
  const maxPossibleOutputTime = workstationCount * bottleneckCycleTimeSeconds;
  const balanceEfficiencyPercent = maxPossibleOutputTime > 0 ? (totalTaskTimeSeconds / maxPossibleOutputTime) * 100 : 0;
  const balanceDelayIdlePercent = Math.max(0, 100 - balanceEfficiencyPercent);
  const idleTimePerUnitSeconds = Math.max(0, maxPossibleOutputTime - totalTaskTimeSeconds);

  // Theoretical minimum workstations N_min = Sum(Task Times) / Takt Time
  const minTheoreticalStations = taktTimeSeconds > 0 ? Math.ceil(totalTaskTimeSeconds / taktTimeSeconds) : 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Assembly Line Balancing & Idle Time Solver"
        description="Compute assembly line balancing efficiency, station idle times, balance delay, and bottleneck pacing."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Total Work Element Task Times (Seconds)"
            value={totalTaskTimeSeconds}
            onChange={(val) => setTotalTaskTimeSeconds(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="sec"
          />
          <InputField
            label="Number of Active Workstations"
            value={workstationCount}
            onChange={(val) => setWorkstationCount(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Bottleneck Station Cycle Time (Seconds)"
            value={bottleneckCycleTimeSeconds}
            onChange={(val) => setBottleneckCycleTimeSeconds(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="sec"
          />
          <InputField
            label="Required Customer Takt Time (Seconds)"
            value={taktTimeSeconds}
            onChange={(val) => setTaktTimeSeconds(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="sec"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Balancing Efficiency"
          value={`${balanceEfficiencyPercent.toFixed(1)}%`}
          subtitle="Line utilization"
          variant="indigo"
        />
        <ResultCard
          title="Balance Delay (Idle %)"
          value={`${balanceDelayIdlePercent.toFixed(1)}%`}
          subtitle="Starvation / blocking waste"
          variant="light"
        />
        <ResultCard
          title="Idle Time per Unit"
          value={`${idleTimePerUnitSeconds}s`}
          subtitle="Non-value-add labor wait"
          variant="light"
        />
        <ResultCard
          title="Min Stations Required"
          value={`${minTheoreticalStations} stations`}
          subtitle={`To satisfy ${taktTimeSeconds}s Takt`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Assembly Line Optimization</h4>
        <p className="text-slate-600">
          The line runs at <strong className="text-slate-800">{balanceEfficiencyPercent.toFixed(1)}% efficiency</strong>. Due to workstation imbalance, workers accumulate <strong className="text-slate-800">{idleTimePerUnitSeconds} seconds</strong> of wasted idle time on every single finished unit. Re-allocating tasks away from the bottleneck station will reduce balance delay and increase throughput.
        </p>
      </div>
    </div>
  );
};
