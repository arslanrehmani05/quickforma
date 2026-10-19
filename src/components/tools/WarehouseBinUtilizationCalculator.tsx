import React, { useState } from "react";
import { Box, Layers, Building, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const WarehouseBinUtilizationCalculator: React.FC = () => {
  const [binLengthInches, setBinLengthInches] = useState<number>(24);
  const [binWidthInches, setBinWidthInches] = useState<number>(18);
  const [binHeightInches, setBinHeightInches] = useState<number>(12);
  const [totalBinsCount, setTotalBinsCount] = useState<number>(1200);
  const [cartonsPerBin, setCartonsPerBin] = useState<number>(8);
  const [cartonLength, setCartonLength] = useState<number>(8);
  const [cartonWidth, setCartonWidth] = useState<number>(6);
  const [cartonHeight, setCartonHeight] = useState<number>(5);

  const handleReset = () => {
    setBinLengthInches(24);
    setBinWidthInches(18);
    setBinHeightInches(12);
    setTotalBinsCount(1200);
    setCartonsPerBin(8);
    setCartonLength(8);
    setCartonWidth(6);
    setCartonHeight(5);
  };

  const binCubicInches = binLengthInches * binWidthInches * binHeightInches;
  const cartonCubicInches = cartonLength * cartonWidth * cartonHeight;
  const occupiedCubicInchesPerBin = cartonCubicInches * cartonsPerBin;

  const cubeUtilizationPercent = binCubicInches > 0 ? (occupiedCubicInchesPerBin / binCubicInches) * 100 : 0;
  const wastedAirPercent = Math.max(0, 100 - cubeUtilizationPercent);

  const totalWarehouseCubicFeet = (binCubicInches * totalBinsCount) / 1728;
  const totalOccupiedCubicFeet = (occupiedCubicInchesPerBin * totalBinsCount) / 1728;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Cube Utilization & Bin Storage Efficiency"
        description="Compute warehouse bin storage cube utilization, honeycombing wasted headspace, and volumetric racking capacity."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase">Bin / Shelf Dimensions</h4>
            <div className="grid grid-cols-3 gap-2">
              <InputField label="Length (in)" value={binLengthInches} onChange={(v) => setBinLengthInches(Math.max(1, Number(v) || 0))} type="number" min={1} />
              <InputField label="Width (in)" value={binWidthInches} onChange={(v) => setBinWidthInches(Math.max(1, Number(v) || 0))} type="number" min={1} />
              <InputField label="Height (in)" value={binHeightInches} onChange={(v) => setBinHeightInches(Math.max(1, Number(v) || 0))} type="number" min={1} />
            </div>
            <InputField label="Total Bins in Warehouse" value={totalBinsCount} onChange={(v) => setTotalBinsCount(Math.max(1, Number(v) || 0))} type="number" min={1} />
          </div>

          <div className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase">Stored Carton Dimensions</h4>
            <div className="grid grid-cols-3 gap-2">
              <InputField label="Length (in)" value={cartonLength} onChange={(v) => setCartonLength(Math.max(1, Number(v) || 0))} type="number" min={1} />
              <InputField label="Width (in)" value={cartonWidth} onChange={(v) => setCartonWidth(Math.max(1, Number(v) || 0))} type="number" min={1} />
              <InputField label="Height (in)" value={cartonHeight} onChange={(v) => setCartonHeight(Math.max(1, Number(v) || 0))} type="number" min={1} />
            </div>
            <InputField label="Cartons Stored per Bin" value={cartonsPerBin} onChange={(v) => setCartonsPerBin(Math.max(1, Number(v) || 0))} type="number" min={1} />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Cube Utilization"
          value={`${cubeUtilizationPercent.toFixed(1)}%`}
          subtitle="Effective storage volume"
          variant="indigo"
        />
        <ResultCard
          title="Wasted Air (Honeycombing)"
          value={`${wastedAirPercent.toFixed(1)}%`}
          subtitle="Unused vertical headspace"
          variant="light"
        />
        <ResultCard
          title="Total Racking Volume"
          value={`${totalWarehouseCubicFeet.toLocaleString(undefined, { maximumFractionDigits: 0 })} ft³`}
          subtitle={`${totalBinsCount} shelf locations`}
          variant="light"
        />
        <ResultCard
          title="Occupied Inventory Volume"
          value={`${totalOccupiedCubicFeet.toLocaleString(undefined, { maximumFractionDigits: 0 })} ft³`}
          subtitle="Physical product volume"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Space Utilization Strategy</h4>
        <p className="text-slate-600">
          Your racking currently stores <strong className="text-slate-800">{cubeUtilizationPercent.toFixed(1)}% product</strong> and <strong className="text-slate-800">{wastedAirPercent.toFixed(1)}% empty air</strong>. Implementing divider bins or matching shelf height to carton dimensions can increase warehouse capacity without leasing additional square footage.
        </p>
      </div>
    </div>
  );
};
