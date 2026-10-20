import React, { useState } from "react";
import { Truck, Clock, DollarSign, Layers } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const WarehouseForkliftFleetCalculator: React.FC = () => {
  const [dailyPalletMoves, setDailyPalletMoves] = useState<number>(650);
  const [minutesPerMove, setMinutesPerMove] = useState<number>(4.5); // Travel, pick, putaway
  const [shiftHours, setShiftHours] = useState<number>(8);
  const [operatingShiftsPerDay, setOperatingShiftsPerDay] = useState<number>(2);
  const [targetUtilizationPercent, setTargetUtilizationPercent] = useState<number>(75); // 75% practical utilization
  const [monthlyCostPerForklift, setMonthlyCostPerForklift] = useState<number>(1450); // Lease + battery + maintenance

  const handleReset = () => {
    setDailyPalletMoves(650);
    setMinutesPerMove(4.5);
    setShiftHours(8);
    setOperatingShiftsPerDay(2);
    setTargetUtilizationPercent(75);
    setMonthlyCostPerForklift(1450);
  };

  const totalDailyMoveMinutes = dailyPalletMoves * minutesPerMove;
  const availableMinutesPerForkliftPerDay = (shiftHours * operatingShiftsPerDay * 60) * (targetUtilizationPercent / 100);
  const forkliftsNeededDecimal = availableMinutesPerForkliftPerDay > 0 ? totalDailyMoveMinutes / availableMinutesPerForkliftPerDay : 0;
  const recommendedFleetSize = Math.ceil(forkliftsNeededDecimal);
  const totalMonthlyFleetCost = recommendedFleetSize * monthlyCostPerForklift;
  const costPerPalletMove = (dailyPalletMoves * 22) > 0 ? totalMonthlyFleetCost / (dailyPalletMoves * 22) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Warehouse Fleet Size & Operating Cost"
        description="Compute warehouse forklift fleet size requirements, operator utilization factors, and cost per pallet moved."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Daily Pallet Moves Required"
            value={dailyPalletMoves}
            onChange={(val) => setDailyPalletMoves(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Average Cycle Time per Move (Minutes)"
            value={minutesPerMove}
            onChange={(val) => setMinutesPerMove(Math.max(0.5, Number(val) || 0))}
            type="number"
            min={0.5}
            step={0.1}
            suffix="mins"
          />
          <InputField
            label="Hours per Shift"
            value={shiftHours}
            onChange={(val) => setShiftHours(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs"
          />
          <InputField
            label="Operating Shifts per Day"
            value={operatingShiftsPerDay}
            onChange={(val) => setOperatingShiftsPerDay(Math.min(3, Math.max(1, Number(val) || 1)))}
            type="number"
            min={1}
            max={3}
          />
          <InputField
            label="Target Fleet Utilization (%)"
            value={targetUtilizationPercent}
            onChange={(val) => setTargetUtilizationPercent(Math.min(95, Math.max(20, Number(val) || 0)))}
            type="number"
            min={20}
            max={95}
            suffix="%"
          />
          <InputField
            label="Monthly Lease & Service ($/truck)"
            value={monthlyCostPerForklift}
            onChange={(val) => setMonthlyCostPerForklift(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Recommended Fleet Size"
          value={`${recommendedFleetSize} forklifts`}
          subtitle={`${forkliftsNeededDecimal.toFixed(2)} exact requirement`}
          variant="indigo"
        />
        <ResultCard
          title="Total Monthly Fleet Cost"
          value={`$${totalMonthlyFleetCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Lease + maintenance"
          variant="light"
        />
        <ResultCard
          title="Equipment Cost / Move"
          value={`$${costPerPalletMove.toFixed(2)} / pallet`}
          subtitle="Excludes driver wage"
          variant="light"
        />
        <ResultCard
          title="Daily Fleet Drive Time"
          value={`${(totalDailyMoveMinutes / 60).toFixed(1)} hrs/day`}
          subtitle={`Across ${dailyPalletMoves} moves`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Fleet Sizing Recommendation</h4>
        <p className="text-slate-600">
          At an average of {minutesPerMove} minutes per pallet transaction, your material handling volume demands <strong className="text-slate-800">{(totalDailyMoveMinutes / 60).toFixed(1)} operating hours daily</strong>. Staging a fleet of <strong className="text-slate-800">{recommendedFleetSize} forklifts</strong> ensures smooth operation at {targetUtilizationPercent}% utilization without dock congestion.
        </p>
      </div>
    </div>
  );
};
