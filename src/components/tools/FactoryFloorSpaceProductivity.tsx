import React, { useState } from "react";
import { Building2, DollarSign, Gauge, Layers } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const FactoryFloorSpaceProductivity: React.FC = () => {
  const [floorAreaSqFt, setFloorAreaSqFt] = useState<number>(25000);
  const [annualRevenue, setAnnualRevenue] = useState<number>(4500000);
  const [annualUnitsProduced, setAnnualUnitsProduced] = useState<number>(120000);
  const [rentAndFacilityCostSqFt, setRentAndFacilityCostSqFt] = useState<number>(14.50);

  const handleReset = () => {
    setFloorAreaSqFt(25000);
    setAnnualRevenue(4500000);
    setAnnualUnitsProduced(120000);
    setRentAndFacilityCostSqFt(14.50);
  };

  const revenuePerSqFt = floorAreaSqFt > 0 ? annualRevenue / floorAreaSqFt : 0;
  const unitsPerSqFt = floorAreaSqFt > 0 ? annualUnitsProduced / floorAreaSqFt : 0;
  const facilityCostTotal = floorAreaSqFt * rentAndFacilityCostSqFt;
  const facilityCostRatioPercent = annualRevenue > 0 ? (facilityCostTotal / annualRevenue) * 100 : 0;
  const profitDensityPerSqFt = floorAreaSqFt > 0 ? (annualRevenue - facilityCostTotal) / floorAreaSqFt : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Revenue & Output Per Square Foot Factory Floor"
        description="Compute manufacturing facility floor space productivity, revenue density per square foot, and facility rent ratios."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Total Factory Usable Area (Sq Ft)"
            value={floorAreaSqFt}
            onChange={(val) => setFloorAreaSqFt(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="sq ft"
          />
          <InputField
            label="Annual Plant Sales Revenue ($)"
            value={annualRevenue}
            onChange={(val) => setAnnualRevenue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Annual Finished Units Output"
            value={annualUnitsProduced}
            onChange={(val) => setAnnualUnitsProduced(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Lease & Facility Overhead ($/sq ft/yr)"
            value={rentAndFacilityCostSqFt}
            onChange={(val) => setRentAndFacilityCostSqFt(Math.max(0, Number(val) || 0))}
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
          title="Revenue per Sq Ft"
          value={`$${revenuePerSqFt.toFixed(2)}/sq ft`}
          subtitle="Annual sales density"
          variant="indigo"
        />
        <ResultCard
          title="Physical Output Density"
          value={`${unitsPerSqFt.toFixed(1)} units/sq ft`}
          subtitle="Annual unit density"
          variant="light"
        />
        <ResultCard
          title="Facility Occupancy Drag"
          value={`${facilityCostRatioPercent.toFixed(1)}%`}
          subtitle={`$${facilityCostTotal.toLocaleString()} total rent`}
          variant="light"
        />
        <ResultCard
          title="Net Margin Density"
          value={`$${profitDensityPerSqFt.toFixed(2)}/sq ft`}
          subtitle="After facility overhead"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Shop Floor Density Benchmark</h4>
        <p className="text-slate-600">
          Generating <strong className="text-slate-800">${revenuePerSqFt.toFixed(2)} in revenue per square foot</strong> against an occupancy cost of ${rentAndFacilityCostSqFt.toFixed(2)}/sq ft represents a healthy <strong className="text-slate-800">{(revenuePerSqFt / (rentAndFacilityCostSqFt || 1)).toFixed(1)}x multiple</strong> on facility space overhead. Cellular manufacturing layouts typically boost revenue density by 20–35% by eliminating dead aisle footprint.
        </p>
      </div>
    </div>
  );
};
