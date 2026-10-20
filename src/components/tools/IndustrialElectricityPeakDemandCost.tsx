import React, { useState } from "react";
import { Zap, DollarSign, TrendingDown, AlertTriangle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const IndustrialElectricityPeakDemandCost: React.FC = () => {
  const [peakDemandKw, setPeakDemandKw] = useState<number>(380); // Highest 15-min spike
  const [demandChargeRatePerKw, setDemandChargeRatePerKw] = useState<number>(18.50); // $/kW monthly demand charge
  const [monthlyEnergyKwh, setMonthlyEnergyKwh] = useState<number>(85000);
  const [energyConsumptionRateKwh, setEnergyConsumptionRateKwh] = useState<number>(0.095); // Base energy charge

  const handleReset = () => {
    setPeakDemandKw(380);
    setDemandChargeRatePerKw(18.50);
    setMonthlyEnergyKwh(85000);
    setEnergyConsumptionRateKwh(0.095);
  };

  const totalDemandCharge = peakDemandKw * demandChargeRatePerKw;
  const totalEnergyConsumptionCharge = monthlyEnergyKwh * energyConsumptionRateKwh;
  const totalMonthlyElectricBill = totalDemandCharge + totalEnergyConsumptionCharge;
  const demandSharePercent = totalMonthlyElectricBill > 0 ? (totalDemandCharge / totalMonthlyElectricBill) * 100 : 0;
  const effectiveCostPerKwh = monthlyEnergyKwh > 0 ? totalMonthlyElectricBill / monthlyEnergyKwh : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Industrial Utility Peak Demand Charge kW Loss Solver"
        description="Compute industrial electric utility peak demand kW penalties, demand charge shares, and peak-shaving savings."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Recorded Peak 15-Min Demand (kW)"
            value={peakDemandKw}
            onChange={(val) => setPeakDemandKw(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="kW"
          />
          <InputField
            label="Utility Peak Demand Tariff ($/kW/month)"
            value={demandChargeRatePerKw}
            onChange={(val) => setDemandChargeRatePerKw(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Total Monthly Energy Consumed (kWh)"
            value={monthlyEnergyKwh}
            onChange={(val) => setMonthlyEnergyKwh(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="kWh"
          />
          <InputField
            label="Base Energy Charge Rate ($/kWh)"
            value={energyConsumptionRateKwh}
            onChange={(val) => setEnergyConsumptionRateKwh(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            step={0.005}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Monthly Demand Penalty"
          value={`$${totalDemandCharge.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${demandSharePercent.toFixed(1)}% of total bill`}
          variant="indigo"
        />
        <ResultCard
          title="Total Electric Bill"
          value={`$${totalMonthlyElectricBill.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Demand + consumption"
          variant="light"
        />
        <ResultCard
          title="Effective Rate Paid"
          value={`$${effectiveCostPerKwh.toFixed(3)}/kWh`}
          subtitle={`vs $${energyConsumptionRateKwh.toFixed(3)} base rate`}
          variant="light"
        />
        <ResultCard
          title="50 kW Peak Shaving Save"
          value={`$${(50 * demandChargeRatePerKw * 12).toLocaleString()}/yr`}
          subtitle="From staggered start-ups"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Peak Shaving Opportunity</h4>
        <p className="text-slate-600">
          A single 15-minute simultaneous start-up spike of {peakDemandKw} kW sets your demand ratchet for the entire month, adding <strong className="text-slate-800">${totalDemandCharge.toLocaleString()}</strong> in non-energy capacity fees. Staggering heavy motor starts by 10 minutes cuts peak kW and delivers immediate utility bill reductions.
        </p>
      </div>
    </div>
  );
};
