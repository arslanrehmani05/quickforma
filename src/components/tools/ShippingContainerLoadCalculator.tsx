import React, { useState } from "react";
import { Box, Truck, Compass, Layers } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ShippingContainerLoadCalculator: React.FC = () => {
  const [containerType, setContainerType] = useState<string>("40hc");
  const [cartonLength, setCartonLength] = useState<number>(50); // cm
  const [cartonWidth, setCartonWidth] = useState<number>(40);  // cm
  const [cartonHeight, setCartonHeight] = useState<number>(30); // cm
  const [cartonWeight, setCartonWeight] = useState<number>(12); // kg
  const [totalCartons, setTotalCartons] = useState<number>(650);

  const handleReset = () => {
    setContainerType("40hc");
    setCartonLength(50);
    setCartonWidth(40);
    setCartonHeight(30);
    setCartonWeight(12);
    setTotalCartons(650);
  };

  // Standard container specs: internal volume CBM and max payload weight KG
  const containerSpecs: Record<string, { name: string; maxCbm: number; maxPayloadKg: number }> = {
    "20gp": { name: "20ft Standard Container", maxCbm: 33.2, maxPayloadKg: 25000 },
    "40gp": { name: "40ft Standard Container", maxCbm: 67.7, maxPayloadKg: 26500 },
    "40hc": { name: "40ft High Cube Container", maxCbm: 76.4, maxPayloadKg: 26500 }
  };

  const selectedSpec = containerSpecs[containerType] || containerSpecs["40hc"];
  const cartonCbm = (cartonLength * cartonWidth * cartonHeight) / 1000000;
  const totalVolumeCbm = cartonCbm * totalCartons;
  const totalWeightKg = cartonWeight * totalCartons;

  const volumeUtilization = (totalVolumeCbm / selectedSpec.maxCbm) * 100;
  const weightUtilization = (totalWeightKg / selectedSpec.maxPayloadKg) * 100;
  const theoreticalMaxCartons = Math.floor(selectedSpec.maxCbm / (cartonCbm > 0 ? cartonCbm : 1));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="20ft/40ft Container CBM Freight Load Estimator"
        description="Compute ocean shipping container cubic meter volume (CBM), capacity utilization, and payload limits."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Shipping Container Size</label>
          <select
            value={containerType}
            onChange={(e) => setContainerType(e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 focus:outline-indigo-500 font-medium"
          >
            <option value="20gp">20ft Standard (33.2 CBM / 25,000 kg)</option>
            <option value="40gp">40ft Standard (67.7 CBM / 26,500 kg)</option>
            <option value="40hc">40ft High Cube (76.4 CBM / 26,500 kg)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <InputField
            label="Length (cm)"
            value={cartonLength}
            onChange={(val) => setCartonLength(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="cm"
          />
          <InputField
            label="Width (cm)"
            value={cartonWidth}
            onChange={(val) => setCartonWidth(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="cm"
          />
          <InputField
            label="Height (cm)"
            value={cartonHeight}
            onChange={(val) => setCartonHeight(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="cm"
          />
          <InputField
            label="Gross Weight (kg)"
            value={cartonWeight}
            onChange={(val) => setCartonWeight(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            suffix="kg"
          />
        </div>

        <InputField
          label="Total Cargo Cartons to Ship"
          value={totalCartons}
          onChange={(val) => setTotalCartons(Math.max(1, Number(val) || 0))}
          type="number"
          min={1}
        />

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Total Cargo CBM"
          value={`${totalVolumeCbm.toFixed(2)} m³`}
          subtitle={`${cartonCbm.toFixed(3)} m³ per carton`}
          variant="indigo"
        />
        <ResultCard
          title="Volume Utilization"
          value={`${volumeUtilization.toFixed(1)}%`}
          subtitle={`Capacity: ${selectedSpec.maxCbm} CBM`}
          variant="light"
        />
        <ResultCard
          title="Payload Utilization"
          value={`${weightUtilization.toFixed(1)}%`}
          subtitle={`${totalWeightKg.toLocaleString()} / ${selectedSpec.maxPayloadKg.toLocaleString()} kg`}
          variant="light"
        />
        <ResultCard
          title="Max Theoretical Fit"
          value={`${theoreticalMaxCartons.toLocaleString()} boxes`}
          subtitle={`Available space`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Packing & Stacking Feasibility</h4>
        <p className="text-slate-600">
          Your shipment utilizes <strong className="text-slate-800">{volumeUtilization.toFixed(1)}%</strong> of available cubic space and <strong className="text-slate-800">{weightUtilization.toFixed(1)}%</strong> of weight capacity. Standard practical pallet packing typically reaches 80–85% space efficiency due to pallet overhang and headspace clearance.
        </p>
      </div>
    </div>
  );
};
