import React, { useState } from "react";
import { Navigation, Clock, Users, ArrowRight } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const OrderPickingRouteTimeCalculator: React.FC = () => {
  const [picksPerShift, setPicksPerShift] = useState<number>(450);
  const [avgWalkDistancePerPickFeet, setAvgWalkDistancePerPickFeet] = useState<number>(65);
  const [walkingSpeedMph, setWalkingSpeedMph] = useState<number>(2.8); // standard 2.8 mph walking pace
  const [itemScanTimeSeconds, setItemScanTimeSeconds] = useState<number>(15);
  const [hourlyWage, setHourlyWage] = useState<number>(22.00);

  const handleReset = () => {
    setPicksPerShift(450);
    setAvgWalkDistancePerPickFeet(65);
    setWalkingSpeedMph(2.8);
    setItemScanTimeSeconds(15);
    setHourlyWage(22.00);
  };

  // Walking speed in feet per second: 1 mph = 1.467 fps
  const feetPerSecond = walkingSpeedMph * 1.467;
  const walkTimePerPickSeconds = feetPerSecond > 0 ? avgWalkDistancePerPickFeet / feetPerSecond : 0;
  const totalSecondsPerPick = walkTimePerPickSeconds + itemScanTimeSeconds;

  const totalShiftSeconds = picksPerShift * totalSecondsPerPick;
  const totalShiftHours = totalShiftSeconds / 3600;
  const totalWalkingHours = (picksPerShift * walkTimePerPickSeconds) / 3600;
  const walkingSharePercent = totalShiftHours > 0 ? (totalWalkingHours / totalShiftHours) * 100 : 0;
  const dailyLaborCost = totalShiftHours * hourlyWage;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Warehouse Order Picker Travel Time Solver"
        description="Calculate picker travel time, walking fatigue distance, scan latency, and wave picking route optimization."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Pick Lines Completed per Shift"
            value={picksPerShift}
            onChange={(val) => setPicksPerShift(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Average Walk Distance per Pick (Feet)"
            value={avgWalkDistancePerPickFeet}
            onChange={(val) => setAvgWalkDistancePerPickFeet(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="ft"
          />
          <InputField
            label="Walking Speed (mph)"
            value={walkingSpeedMph}
            onChange={(val) => setWalkingSpeedMph(Math.max(0.5, Number(val) || 0))}
            type="number"
            min={0.5}
            step={0.1}
            suffix="mph"
          />
          <InputField
            label="Physical Pick & Scan Time (Seconds)"
            value={itemScanTimeSeconds}
            onChange={(val) => setItemScanTimeSeconds(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="sec"
          />
          <InputField
            label="Picker Hourly Wage ($)"
            value={hourlyWage}
            onChange={(val) => setHourlyWage(Math.max(0, Number(val) || 0))}
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
          title="Total Shift Time"
          value={`${totalShiftHours.toFixed(1)} hrs`}
          subtitle={`${(totalShiftHours * 60 / picksPerShift).toFixed(1)} mins/pick`}
          variant="indigo"
        />
        <ResultCard
          title="Walking / Travel Share"
          value={`${walkingSharePercent.toFixed(1)}%`}
          subtitle={`${totalWalkingHours.toFixed(1)} hrs spent walking`}
          variant="light"
        />
        <ResultCard
          title="Total Distance Walked"
          value={`${((picksPerShift * avgWalkDistancePerPickFeet) / 5280).toFixed(1)} miles`}
          subtitle={`${(picksPerShift * avgWalkDistancePerPickFeet).toLocaleString()} feet traveled`}
          variant="light"
        />
        <ResultCard
          title="Cost per Pick Line"
          value={`$${(dailyLaborCost / picksPerShift).toFixed(2)}`}
          subtitle={`$${dailyLaborCost.toFixed(2)} labor/shift`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Routing Optimization Opportunity</h4>
        <p className="text-slate-600">
          Pickers spend <strong className="text-slate-800">{walkingSharePercent.toFixed(1)}% of their workday walking</strong> instead of picking. Transitioning from random routing to batch/wave picking typically reduces travel distance by 35%, cutting walking time by <strong className="text-slate-800">{(totalWalkingHours * 0.35).toFixed(1)} hours per shift</strong>.
        </p>
      </div>
    </div>
  );
};
