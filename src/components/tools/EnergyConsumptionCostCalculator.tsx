import React, { useState } from "react";
import { Zap, DollarSign, Clock, Gauge } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EnergyConsumptionCostCalculator: React.FC = () => {
  const [motorPowerKw, setMotorPowerKw] = useState<number>(45); // 45 kW electric motor
  const [dailyRunHours, setDailyRunHours] = useState<number>(14);
  const [operatingDaysPerMonth, setOperatingDaysPerMonth] = useState<number>(24);
  const [electricityRateKwh, setElectricityRateKwh] = useState<number>(0.14); // $0.14 / kWh
  const [motorLoadFactorPercent, setMotorLoadFactorPercent] = useState<number>(80); // 80% average operating load

  const handleReset = () => {
    setMotorPowerKw(45);
    setDailyRunHours(14);
    setOperatingDaysPerMonth(24);
    setElectricityRateKwh(0.14);
    setMotorLoadFactorPercent(80);
  };

  const effectiveKwDraw = motorPowerKw * (motorLoadFactorPercent / 100);
  const dailyKwhConsumed = effectiveKwDraw * dailyRunHours;
  const monthlyKwhConsumed = dailyKwhConsumed * operatingDaysPerMonth;
  const monthlyElectricBill = monthlyKwhConsumed * electricityRateKwh;
  const annualEnergyCost = monthlyElectricBill * 12;
  const hourlyOperatingCost = effectiveKwDraw * electricityRateKwh;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Industrial Machine Kilowatt-Hour Cost"
        description="Compute heavy machinery electrical power consumption, operating kilowatt-hours (kWh), and monthly utility bills."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Machine Motor Rating (kW)"
            value={motorPowerKw}
            onChange={(val) => setMotorPowerKw(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            suffix="kW"
          />
          <InputField
            label="Daily Operating Hours"
            value={dailyRunHours}
            onChange={(val) => setDailyRunHours(Math.min(24, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={24}
            suffix="hrs/day"
          />
          <InputField
            label="Operating Days per Month"
            value={operatingDaysPerMonth}
            onChange={(val) => setOperatingDaysPerMonth(Math.min(31, Math.max(1, Number(val) || 1)))}
            type="number"
            min={1}
            max={31}
            suffix="days"
          />
          <InputField
            label="Commercial Electric Rate ($/kWh)"
            value={electricityRateKwh}
            onChange={(val) => setElectricityRateKwh(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Average Motor Load Factor (%)"
            value={motorLoadFactorPercent}
            onChange={(val) => setMotorLoadFactorPercent(Math.min(100, Math.max(10, Number(val) || 0)))}
            type="number"
            min={10}
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
          title="Monthly Power Cost"
          value={`$${monthlyElectricBill.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Electric utility charge"
          variant="indigo"
        />
        <ResultCard
          title="Hourly Energy Cost"
          value={`$${hourlyOperatingCost.toFixed(2)}/hr`}
          subtitle={`${effectiveKwDraw.toFixed(1)} kW effective draw`}
          variant="light"
        />
        <ResultCard
          title="Monthly Consumption"
          value={`${Math.round(monthlyKwhConsumed).toLocaleString()} kWh`}
          subtitle={`${Math.round(dailyKwhConsumed)} kWh per day`}
          variant="light"
        />
        <ResultCard
          title="Annualized Energy Bill"
          value={`$${annualEnergyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr`}
          subtitle="Projected 12 months"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Energy Efficiency Insight</h4>
        <p className="text-slate-600">
          Drawing {effectiveKwDraw.toFixed(1)} kW for {dailyRunHours} hours daily costs <strong className="text-slate-800">${hourlyOperatingCost.toFixed(2)} every running hour</strong>. Upgrading to an IE4 Super Premium efficiency motor typically shaves 3–5% off power draw, saving <strong className="text-slate-800">${(annualEnergyCost * 0.04).toFixed(0)} annually</strong> on this single machine.
        </p>
      </div>
    </div>
  );
};
