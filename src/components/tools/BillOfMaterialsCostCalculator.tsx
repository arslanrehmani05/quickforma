import React, { useState } from "react";
import { Layers, DollarSign, PieChart, Tag } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const BillOfMaterialsCostCalculator: React.FC = () => {
  const [rawMaterialsCost, setRawMaterialsCost] = useState<number>(34.50);
  const [fastenersHardwareCost, setFastenersHardwareCost] = useState<number>(6.20);
  const [packagingCost, setPackagingCost] = useState<number>(3.80);
  const [assemblyLaborHours, setAssemblyLaborHours] = useState<number>(0.75); // 45 mins
  const [laborHourlyRate, setLaborHourlyRate] = useState<number>(26.00);
  const [overheadPercent, setOverheadPercent] = useState<number>(20);
  const [targetGrossMarginPercent, setTargetGrossMarginPercent] = useState<number>(45);

  const handleReset = () => {
    setRawMaterialsCost(34.50);
    setFastenersHardwareCost(6.20);
    setPackagingCost(3.80);
    setAssemblyLaborHours(0.75);
    setLaborHourlyRate(26.00);
    setOverheadPercent(20);
    setTargetGrossMarginPercent(45);
  };

  const directMaterialCost = rawMaterialsCost + fastenersHardwareCost + packagingCost;
  const directLaborCost = assemblyLaborHours * laborHourlyRate;
  const primeCost = directMaterialCost + directLaborCost;
  const overheadCost = primeCost * (overheadPercent / 100);
  const totalRolledUpBOMCost = primeCost + overheadCost;

  // Wholesale Price at target gross margin = BOM / (1 - margin%)
  const marginDecimal = targetGrossMarginPercent / 100;
  const wholesalePrice = marginDecimal < 1 ? totalRolledUpBOMCost / (1 - marginDecimal) : 0;
  const suggestedRetailMSRP = wholesalePrice * 2; // Standard 2x keystone retail markup

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="BOM Component Cost & Raw Material Rollup"
        description="Calculate rolled-up Bill of Materials (BOM) prime manufacturing costs, labor absorption, and wholesale pricing."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Raw Material Costs ($)"
            value={rawMaterialsCost}
            onChange={(val) => setRawMaterialsCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Hardware & Components ($)"
            value={fastenersHardwareCost}
            onChange={(val) => setFastenersHardwareCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Packaging & Labeling ($)"
            value={packagingCost}
            onChange={(val) => setPackagingCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Assembly Labor Time (Hours)"
            value={assemblyLaborHours}
            onChange={(val) => setAssemblyLaborHours(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            step={0.05}
            suffix="hrs"
          />
          <InputField
            label="Shop Labor Rate ($/hour)"
            value={laborHourlyRate}
            onChange={(val) => setLaborHourlyRate(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Factory Overhead Absorption (%)"
            value={overheadPercent}
            onChange={(val) => setOverheadPercent(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Rolled-Up Unit BOM Cost"
          value={`$${totalRolledUpBOMCost.toFixed(2)}`}
          subtitle="Full absorption cost"
          variant="indigo"
        />
        <ResultCard
          title="Direct Materials"
          value={`$${directMaterialCost.toFixed(2)}`}
          subtitle={`${((directMaterialCost / (totalRolledUpBOMCost || 1)) * 100).toFixed(0)}% of cost`}
          variant="light"
        />
        <ResultCard
          title="Direct Labor Cost"
          value={`$${directLaborCost.toFixed(2)}`}
          subtitle={`${(assemblyLaborHours * 60).toFixed(0)} mins assembly`}
          variant="light"
        />
        <ResultCard
          title="Suggested Wholesale Price"
          value={`$${wholesalePrice.toFixed(2)}`}
          subtitle={`${targetGrossMarginPercent}% gross margin`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Commercial Margin Architecture</h4>
        <p className="text-slate-600">
          Total manufacturing cost rolls up to <strong className="text-slate-800">${totalRolledUpBOMCost.toFixed(2)}</strong>. To maintain your {targetGrossMarginPercent}% wholesale margin, distribute to dealers at <strong className="text-slate-800">${wholesalePrice.toFixed(2)}</strong> and recommend an MSRP of <strong className="text-slate-800">${suggestedRetailMSRP.toFixed(2)}</strong>.
        </p>
      </div>
    </div>
  );
};
