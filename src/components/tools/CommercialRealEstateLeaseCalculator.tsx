import React, { useState } from "react";
import { Building2, DollarSign, Calculator, Layers } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CommercialRealEstateLeaseCalculator: React.FC = () => {
  const [rentableSqFt, setRentableSqFt] = useState<number>(3500);
  const [baseRentPerSqFtAnnual, setBaseRentPerSqFtAnnual] = useState<number>(26.00);
  const [camCostPerSqFtAnnual, setCamCostPerSqFtAnnual] = useState<number>(5.50); // Common area maintenance
  const [propertyTaxPerSqFtAnnual, setPropertyTaxPerSqFtAnnual] = useState<number>(3.20);
  const [insurancePerSqFtAnnual, setInsurancePerSqFtAnnual] = useState<number>(1.30);
  const [leaseType, setLeaseType] = useState<string>("nnn"); // nnn vs gross

  const handleReset = () => {
    setRentableSqFt(3500);
    setBaseRentPerSqFtAnnual(26.00);
    setCamCostPerSqFtAnnual(5.50);
    setPropertyTaxPerSqFtAnnual(3.20);
    setInsurancePerSqFtAnnual(1.30);
    setLeaseType("nnn");
  };

  const annualBaseRent = rentableSqFt * baseRentPerSqFtAnnual;
  const nnnPassThroughPerSqFt = camCostPerSqFtAnnual + propertyTaxPerSqFtAnnual + insurancePerSqFtAnnual;
  const annualPassThroughTotal = leaseType === "nnn" ? rentableSqFt * nnnPassThroughPerSqFt : 0;
  const totalAnnualRent = annualBaseRent + annualPassThroughTotal;
  const totalMonthlyRent = totalAnnualRent / 12;
  const effectiveAnnualRatePerSqFt = rentableSqFt > 0 ? totalAnnualRent / rentableSqFt : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Triple Net NNN vs Modified Gross Lease"
        description="Compute commercial real estate lease rates, Triple Net (NNN) operating pass-throughs, and total monthly rent obligations."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Commercial Lease Structure</label>
          <select
            value={leaseType}
            onChange={(e) => setLeaseType(e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 focus:outline-indigo-500 font-medium"
          >
            <option value="nnn">Triple Net (NNN) — Tenant pays Base Rent + CAM + Taxes + Insurance</option>
            <option value="gross">Full Service Gross — Landlord pays all operating expenses</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Rentable Floor Space (Sq Ft)"
            value={rentableSqFt}
            onChange={(val) => setRentableSqFt(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="sq ft"
          />
          <InputField
            label="Base Rent Rate ($/sq ft/year)"
            value={baseRentPerSqFtAnnual}
            onChange={(val) => setBaseRentPerSqFtAnnual(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="CAM Operating Expenses ($/sq ft/yr)"
            value={camCostPerSqFtAnnual}
            onChange={(val) => setCamCostPerSqFtAnnual(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Property Taxes Pass-Through ($/sq ft/yr)"
            value={propertyTaxPerSqFtAnnual}
            onChange={(val) => setPropertyTaxPerSqFtAnnual(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Building Insurance ($/sq ft/yr)"
            value={insurancePerSqFtAnnual}
            onChange={(val) => setInsurancePerSqFtAnnual(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Total Monthly Rent"
          value={`$${totalMonthlyRent.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="All-in check to landlord"
          variant="indigo"
        />
        <ResultCard
          title="All-In Cost / Sq Ft"
          value={`$${effectiveAnnualRatePerSqFt.toFixed(2)}/sq ft`}
          subtitle={`Annual blended rate`}
          variant="light"
        />
        <ResultCard
          title="Monthly Base Rent"
          value={`$${(annualBaseRent / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`$${baseRentPerSqFtAnnual.toFixed(2)} base rate`}
          variant="light"
        />
        <ResultCard
          title="Monthly NNN Pass-Through"
          value={leaseType === "nnn" ? `$${(annualPassThroughTotal / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "$0 (Gross Lease)"}
          subtitle={`+$${nnnPassThroughPerSqFt.toFixed(2)}/sq ft pass-through`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Commercial Tenant Budgeting</h4>
        <p className="text-slate-600">
          Under this {leaseType.toUpperCase()} lease structure, {rentableSqFt.toLocaleString()} sq ft requires <strong className="text-slate-800">${totalMonthlyRent.toLocaleString(undefined, { maximumFractionDigits: 0 })} monthly (${totalAnnualRent.toLocaleString()}/year)</strong>. In Triple Net leases, NNN pass-throughs add <strong className="text-slate-800">${(annualPassThroughTotal / 12).toLocaleString()} per month</strong> on top of base rent.
        </p>
      </div>
    </div>
  );
};
