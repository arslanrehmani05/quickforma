import React, { useState } from "react";
import { Package, Calendar, DollarSign, Layers } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AmazonStorageFeeCalculator: React.FC = () => {
  const [lengthInches, setLengthInches] = useState<number>(10);
  const [widthInches, setWidthInches] = useState<number>(8);
  const [heightInches, setHeightInches] = useState<number>(4);
  const [unitsStored, setUnitsStored] = useState<number>(500);
  const [isOversize, setIsOversize] = useState<boolean>(false);
  const [isQ4Peak, setIsQ4Peak] = useState<boolean>(false);

  const handleReset = () => {
    setLengthInches(10);
    setWidthInches(8);
    setHeightInches(4);
    setUnitsStored(500);
    setIsOversize(false);
    setIsQ4Peak(false);
  };

  // Amazon FBA Monthly Storage Rates (per cubic foot):
  // Standard Size: Jan-Sep $0.87 | Oct-Dec (Q4 Peak) $2.40
  // Oversize: Jan-Sep $0.56 | Oct-Dec (Q4 Peak) $1.40
  const cubicFeetPerUnit = (lengthInches * widthInches * heightInches) / 1728;
  const totalCubicFeet = cubicFeetPerUnit * unitsStored;

  const ratePerCuFt = isOversize
    ? (isQ4Peak ? 1.40 : 0.56)
    : (isQ4Peak ? 2.40 : 0.87);

  const monthlyFee = totalCubicFeet * ratePerCuFt;
  const costPerUnit = unitsStored > 0 ? monthlyFee / unitsStored : 0;
  const peakDifference = isQ4Peak
    ? monthlyFee - (totalCubicFeet * (isOversize ? 0.56 : 0.87))
    : (totalCubicFeet * (isOversize ? 1.40 : 2.40)) - monthlyFee;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Amazon Q4 Peak vs Standard Storage Fee Solver"
        description="Compute Amazon FBA monthly inventory storage costs, cubic footage fees, and Q4 holiday peak rate surcharges."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <input
              type="checkbox"
              id="peakSeason"
              checked={isQ4Peak}
              onChange={(e) => setIsQ4Peak(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <label htmlFor="peakSeason" className="text-xs font-semibold text-slate-800 cursor-pointer">
              Q4 Holiday Peak Season (October – December)
            </label>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <input
              type="checkbox"
              id="oversizeTier"
              checked={isOversize}
              onChange={(e) => setIsOversize(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <label htmlFor="oversizeTier" className="text-xs font-semibold text-slate-800 cursor-pointer">
              Oversize Tier Product (&gt; 20 lbs or &gt; 18&quot; on longest side)
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <InputField
            label="Length (in)"
            value={lengthInches}
            onChange={(val) => setLengthInches(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            suffix="in"
          />
          <InputField
            label="Width (in)"
            value={widthInches}
            onChange={(val) => setWidthInches(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            suffix="in"
          />
          <InputField
            label="Height (in)"
            value={heightInches}
            onChange={(val) => setHeightInches(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            suffix="in"
          />
          <InputField
            label="Units in FBA"
            value={unitsStored}
            onChange={(val) => setUnitsStored(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Monthly FBA Storage"
          value={`$${monthlyFee.toFixed(2)}`}
          subtitle={`$${ratePerCuFt.toFixed(2)} / cu ft`}
          variant="indigo"
        />
        <ResultCard
          title="Cost Per Unit / Mo"
          value={`$${costPerUnit.toFixed(3)}`}
          subtitle="Monthly holding cost"
          variant="light"
        />
        <ResultCard
          title="Total Volume"
          value={`${totalCubicFeet.toFixed(2)} ft³`}
          subtitle={`${cubicFeetPerUnit.toFixed(3)} ft³ per item`}
          variant="light"
        />
        <ResultCard
          title="Q4 Peak Surcharge"
          value={isQ4Peak ? `+$${peakDifference.toFixed(2)}` : `$${peakDifference.toFixed(2)} jump`}
          subtitle={isQ4Peak ? "Active holiday surge" : "Projected Oct-Dec bump"}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Storage Optimization Strategy</h4>
        <p className="text-slate-600">
          In Q4 peak season, standard-size storage costs jump by <strong className="text-slate-800">175%</strong> (from $0.87 to $2.40 per cu ft). For {unitsStored} units, storage increases from <strong className="text-slate-800">${(totalCubicFeet * 0.87).toFixed(2)}</strong> to <strong className="text-slate-800">${(totalCubicFeet * 2.40).toFixed(2)}</strong> monthly. Maintain a 30-day inventory buffer to avoid aged inventory surcharges.
        </p>
      </div>
    </div>
  );
};
