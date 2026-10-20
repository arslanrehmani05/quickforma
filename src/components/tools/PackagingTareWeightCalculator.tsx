import React, { useState } from "react";
import { Scale, Package, DollarSign, Truck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PackagingTareWeightCalculator: React.FC = () => {
  const [grossWeightPerPalletKg, setGrossWeightPerPalletKg] = useState<number>(680);
  const [palletWoodWeightKg, setPalletWoodWeightKg] = useState<number>(22);
  const [cartonsTareWeightKg, setCartonsTareWeightKg] = useState<number>(35); // Cardboard + strapping + plastic wrap
  const [freightRatePerKg, setFreightRatePerKg] = useState<number>(2.40); // Air / Expedited freight rate per kg
  const [annualPalletsShipped, setAnnualPalletsShipped] = useState<number>(450);

  const handleReset = () => {
    setGrossWeightPerPalletKg(680);
    setPalletWoodWeightKg(22);
    setCartonsTareWeightKg(35);
    setFreightRatePerKg(2.40);
    setAnnualPalletsShipped(450);
  };

  const totalTareWeightKg = palletWoodWeightKg + cartonsTareWeightKg;
  const netProductWeightKg = Math.max(0, grossWeightPerPalletKg - totalTareWeightKg);
  const tareWeightPercent = grossWeightPerPalletKg > 0 ? (totalTareWeightKg / grossWeightPerPalletKg) * 100 : 0;

  const tareFreightCostPerPallet = totalTareWeightKg * freightRatePerKg;
  const totalAnnualTareFreightCost = tareFreightCostPerPallet * annualPalletsShipped;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Gross vs Net Freight Shipping Tare Weight"
        description="Compute packaging tare weight percentages, empty packaging freight costs, and lightweight packaging savings."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Total Gross Pallet Weight (kg)"
            value={grossWeightPerPalletKg}
            onChange={(val) => setGrossWeightPerPalletKg(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="kg"
          />
          <InputField
            label="Wooden Pallet Tare Weight (kg)"
            value={palletWoodWeightKg}
            onChange={(val) => setPalletWoodWeightKg(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="kg"
          />
          <InputField
            label="Boxes, Straps & Wrap Tare (kg)"
            value={cartonsTareWeightKg}
            onChange={(val) => setCartonsTareWeightKg(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="kg"
          />
          <InputField
            label="Freight Shipping Rate ($/kg)"
            value={freightRatePerKg}
            onChange={(val) => setFreightRatePerKg(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Annual Pallets Shipped"
            value={annualPalletsShipped}
            onChange={(val) => setAnnualPalletsShipped(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Annual Tare Freight Cost"
          value={`$${totalAnnualTareFreightCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Shipping cost on packaging"
          variant="indigo"
        />
        <ResultCard
          title="Tare Weight Ratio"
          value={`${tareWeightPercent.toFixed(1)}%`}
          subtitle={`${totalTareWeightKg} kg tare per pallet`}
          variant="light"
        />
        <ResultCard
          title="Net Product Weight"
          value={`${netProductWeightKg} kg`}
          subtitle="Pure saleable goods"
          variant="light"
        />
        <ResultCard
          title="Freight Paid / Pallet Tare"
          value={`$${tareFreightCostPerPallet.toFixed(2)}`}
          subtitle="Packaging weight penalty"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Packaging Lightweighting Opportunity</h4>
        <p className="text-slate-600">
          Empty pallets and corrugated cardboard constitute <strong className="text-slate-800">{tareWeightPercent.toFixed(1)}% of your gross freight bill</strong>. On {annualPalletsShipped} pallets, you spend <strong className="text-slate-800">${totalAnnualTareFreightCost.toLocaleString()} per year</strong> transporting dead tare weight. Switching to lightweight composite pallets (saving 10 kg/pallet) would save <strong className="text-slate-800">${(10 * freightRatePerKg * annualPalletsShipped).toLocaleString()}</strong> annually.
        </p>
      </div>
    </div>
  );
};
