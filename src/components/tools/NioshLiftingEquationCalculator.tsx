import React, { useState } from "react";
import { ShieldAlert, Scale, Activity, CheckCircle2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const NioshLiftingEquationCalculator: React.FC = () => {
  const [actualLoadLbs, setActualLoadLbs] = useState<number>(38);
  const [horizontalDistanceInches, setHorizontalDistanceInches] = useState<number>(14); // 10" to 25"
  const [verticalOriginInches, setVerticalOriginInches] = useState<number>(30); // 0" to 70"
  const [verticalTravelInches, setVerticalTravelInches] = useState<number>(18);
  const [asymmetryAngleDeg, setAsymmetryAngleDeg] = useState<number>(20); // 0 to 135 deg

  const handleReset = () => {
    setActualLoadLbs(38);
    setHorizontalDistanceInches(14);
    setVerticalOriginInches(30);
    setVerticalTravelInches(18);
    setAsymmetryAngleDeg(20);
  };

  // NIOSH 1991 Revised Lifting Equation:
  // LC = Load Constant = 51 lbs
  // HM = Horizontal Multiplier = 10 / H (clamped between 0.4 and 1.0)
  // VM = Vertical Multiplier = 1 - (0.0075 * |V - 30|)
  // DM = Distance Multiplier = 0.82 + (1.8 / D) (clamped <= 1.0)
  // AM = Asymmetric Multiplier = 1 - (0.0032 * A)
  const hm = Math.min(1.0, Math.max(0.4, 10 / Math.max(10, horizontalDistanceInches)));
  const vm = Math.max(0, 1 - (0.0075 * Math.abs(verticalOriginInches - 30)));
  const dm = Math.min(1.0, 0.82 + (1.8 / Math.max(10, verticalTravelInches)));
  const am = Math.max(0, 1 - (0.0032 * asymmetryAngleDeg));

  // FM and CM assumed standard ~0.85 and 1.0
  const rwlLbs = 51 * hm * vm * dm * am * 0.85;
  const liftingIndex = rwlLbs > 0 ? actualLoadLbs / rwlLbs : 0;

  let riskTier = "Safe Ergonomic Zone (LI <= 1.0)";
  let riskColor = "text-emerald-700";
  if (liftingIndex > 2.0) {
    riskTier = "CRITICAL INJURY RISK (LI > 2.0)";
    riskColor = "text-rose-700";
  } else if (liftingIndex > 1.0) {
    riskTier = "Increased Back Injury Hazard (1.0 < LI <= 2.0)";
    riskColor = "text-amber-700";
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Factory Worker Ergonomic Lifting Limit Solver"
        description="Compute the NIOSH Recommended Weight Limit (RWL) and Lifting Index (LI) to prevent shop-floor lower back injuries."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Actual Lifted Load Weight (lbs)"
            value={actualLoadLbs}
            onChange={(val) => setActualLoadLbs(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="lbs"
          />
          <InputField
            label="Horizontal Reach from Body (Inches)"
            value={horizontalDistanceInches}
            onChange={(val) => setHorizontalDistanceInches(Math.max(10, Number(val) || 0))}
            type="number"
            min={10}
            suffix="in"
          />
          <InputField
            label="Vertical Height at Origin (Inches)"
            value={verticalOriginInches}
            onChange={(val) => setVerticalOriginInches(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="in"
          />
          <InputField
            label="Vertical Travel Distance (Inches)"
            value={verticalTravelInches}
            onChange={(val) => setVerticalTravelInches(Math.max(10, Number(val) || 0))}
            type="number"
            min={10}
            suffix="in"
          />
          <InputField
            label="Torso Twist Angle (Degrees)"
            value={asymmetryAngleDeg}
            onChange={(val) => setAsymmetryAngleDeg(Math.min(135, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={135}
            suffix="°"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Recommended Limit (RWL)"
          value={`${rwlLbs.toFixed(1)} lbs`}
          subtitle="Max safe load under conditions"
          variant="indigo"
        />
        <ResultCard
          title="Lifting Index (LI)"
          value={liftingIndex.toFixed(2)}
          subtitle={liftingIndex <= 1.0 ? "OSHA compliant" : "OSHA Ergonomic Risk"}
          variant="light"
        />
        <ResultCard
          title="Horizontal Penalty"
          value={`${((1 - hm) * 100).toFixed(0)}% drop`}
          subtitle={`Reach: ${horizontalDistanceInches} inches`}
          variant="light"
        />
        <ResultCard
          title="Twist Penalty"
          value={`${((1 - am) * 100).toFixed(0)}% drop`}
          subtitle={`Twist: ${asymmetryAngleDeg} degrees`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">NIOSH Ergonomic Compliance</h4>
        <p className="text-slate-600">
          At this lifting posture, the NIOSH Recommended Weight Limit is <strong className="text-slate-800">{rwlLbs.toFixed(1)} lbs</strong>. Lifting {actualLoadLbs} lbs produces a Lifting Index of <strong className="text-slate-800">{liftingIndex.toFixed(2)}</strong> ({riskTier}). Bringing the box closer to the torso reduces reach penalty and protects worker spinal discs.
        </p>
      </div>
    </div>
  );
};
