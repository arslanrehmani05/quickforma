import React, { useState } from "react";
import { Building2, Box, DollarSign, Layers } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const WarehouseStorageCbmCalculator: React.FC = () => {
  const [palletCount, setPalletCount] = useState<number>(45);
  const [palletCbm, setPalletCbm] = useState<number>(1.8); // Standard 1.2 x 1.0 x 1.5m pallet
  const [monthlyStorageRatePerCbm, setMonthlyStorageRatePerCbm] = useState<number>(18.50);
  const [handlingFeePerPallet, setHandlingFeePerPallet] = useState<number>(6.50);

  const handleReset = () => {
    setPalletCount(45);
    setPalletCbm(1.8);
    setMonthlyStorageRatePerCbm(18.50);
    setHandlingFeePerPallet(6.50);
  };

  const totalCbm = palletCount * palletCbm;
  const monthlyStorageFee = totalCbm * monthlyStorageRatePerCbm;
  const oneTimeHandling = palletCount * handlingFeePerPallet;
  const totalFirstMonthCost = monthlyStorageFee + oneTimeHandling;
  const costPerPalletPerMonth = palletCount > 0 ? monthlyStorageFee / palletCount : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Pallet Racking & Warehouse CBM Storage Cost"
        description="Calculate 3PL contract logistics warehousing costs, pallet position charges, and cubic meter (CBM) fees."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Total Pallet Positions"
            value={palletCount}
            onChange={(val) => setPalletCount(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Volume Per Pallet (CBM / m³)"
            value={palletCbm}
            onChange={(val) => setPalletCbm(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            suffix="m³"
          />
          <InputField
            label="Monthly Storage Rate per CBM ($)"
            value={monthlyStorageRatePerCbm}
            onChange={(val) => setMonthlyStorageRatePerCbm(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Inbound / Outbound Handling Fee per Pallet ($)"
            value={handlingFeePerPallet}
            onChange={(val) => setHandlingFeePerPallet(Math.max(0, Number(val) || 0))}
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
          title="Monthly Storage Rent"
          value={`$${monthlyStorageFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Recurring warehousing"
          variant="indigo"
        />
        <ResultCard
          title="Total Volume"
          value={`${totalCbm.toFixed(1)} CBM`}
          subtitle={`${palletCount} standard pallets`}
          variant="light"
        />
        <ResultCard
          title="Cost / Pallet / Mo"
          value={`$${costPerPalletPerMonth.toFixed(2)}`}
          subtitle="Blended pallet rate"
          variant="light"
        />
        <ResultCard
          title="Total Month 1 Cost"
          value={`$${totalFirstMonthCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Includes handling charges"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">3PL Warehousing Analysis</h4>
        <p className="text-slate-600">
          Stowing {palletCount} pallets occupies <strong className="text-slate-800">{totalCbm.toFixed(1)} cubic meters</strong> of warehouse racking. Your effective storage cost is <strong className="text-slate-800">${costPerPalletPerMonth.toFixed(2)}</strong> per pallet monthly, plus a one-time turnover fee of <strong className="text-slate-800">${oneTimeHandling.toFixed(2)}</strong> for dock receiving and putaway.
        </p>
      </div>
    </div>
  );
};
