import React, { useState } from "react";
import { Calculator, Store, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RuleOfThumbValuationCalculator: React.FC = () => {
  const [industryType, setIndustryType] = useState<string>("b2b_services");
  const [annualSde, setAnnualSde] = useState<number>(220000);
  const [inventoryAtCost, setInventoryAtCost] = useState<number>(35000);
  const [equipmentValue, setEquipmentValue] = useState<number>(45000);

  // Industry SDE multiple rule-of-thumb ranges
  const industryMultipliers: { [key: string]: { min: number; max: number; label: string } } = {
    ecommerce: { min: 2.5, max: 4.0, label: "Ecommerce & D2C Brands (2.5× - 4.0× SDE)" },
    b2b_services: { min: 2.0, max: 3.5, label: "B2B Professional Services (2.0× - 3.5× SDE)" },
    hvac_trades: { min: 2.8, max: 4.5, label: "HVAC / Plumbing / Skilled Trades (2.8× - 4.5× SDE)" },
    restaurant: { min: 1.5, max: 2.5, label: "Restaurants & Bars (1.5× - 2.5× SDE)" },
    medical_dental: { min: 3.0, max: 5.0, label: "Medical & Dental Practices (3.0× - 5.0× SDE)" },
  };

  const selectedRule = industryMultipliers[industryType] || industryMultipliers.b2b_services;
  const safeSde = Math.max(0, annualSde);
  const safeInventory = Math.max(0, inventoryAtCost);
  const safeEquipment = Math.max(0, equipmentValue);

  const lowValuation = safeSde * selectedRule.min + safeInventory;
  const midValuation = safeSde * ((selectedRule.min + selectedRule.max) / 2) + safeInventory;
  const highValuation = safeSde * selectedRule.max + safeInventory;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Store}
            title="Small Business Rule of Thumb Valuation (SDE Multiplier) Calculator"
            description="Estimate small business acquisition asking price using Main Street broker SDE multiples plus inventory."
          />
          <ResetButton onReset={() => {
            setIndustryType("b2b_services");
            setAnnualSde(220000);
            setInventoryAtCost(35000);
            setEquipmentValue(45000);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Industry Vertical Benchmark
            </label>
            <select
              value={industryType}
              onChange={(e) => setIndustryType(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
            >
              {Object.entries(industryMultipliers).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>
          <InputField
            label="Seller Discretionary Earnings (SDE) ($)"
            type="number"
            min={0}
            step={10000}
            value={annualSde}
            onChange={(e) => setAnnualSde(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Current Inventory at Cost ($)"
            type="number"
            min={0}
            step={5000}
            value={inventoryAtCost}
            onChange={(e) => setInventoryAtCost(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Equipment & FF&E Asset Value ($)"
            type="number"
            min={0}
            step={5000}
            value={equipmentValue}
            onChange={(e) => setEquipmentValue(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Estimated Asking Price Range">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Conservative Range</span>
              <p className="text-3xl font-extrabold text-white mt-2">${Math.round(lowValuation).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">{selectedRule.min}× SDE + Inventory</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Mid-Market Target</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-2">${Math.round(midValuation).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Expected listing price</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Premium Valuation</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">${Math.round(highValuation).toLocaleString()}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">{selectedRule.max}× SDE + Inventory</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
