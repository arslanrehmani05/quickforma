import React, { useState } from "react";
import { Building2, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const CommercialLeaseSummaryGenerator: React.FC = () => {
  const [propertyAddress, setPropertyAddress] = useState("Suite 400, 1200 Avenue of the Americas, New York, NY");
  const [landlordName, setLandlordName] = useState("Empire Commercial Properties Trust");
  const [tenantName, setTenantName] = useState("Apex Cloud Analytics Inc.");
  const [rentableSqFt, setRentableSqFt] = useState("4500");
  const [baseRentPerSqFt, setBaseRentPerSqFt] = useState("58.00");
  const [leaseType, setLeaseType] = useState<string>("NNN (Triple Net)");
  const [securityDeposit, setSecurityDeposit] = useState("43500");

  const annualBaseRent = (Number(rentableSqFt) || 0) * (Number(baseRentPerSqFt) || 0);
  const monthlyBaseRent = annualBaseRent / 12;

  const formattedAbstract = `COMMERCIAL LEASE ABSTRACT SUMMARY

PROPERTY PREMISES: ${propertyAddress}
LANDLORD: ${landlordName}
TENANT: ${tenantName}

KEY LEASE PROVISIONS:
- Rentable Area: ${Number(rentableSqFt).toLocaleString()} RSF
- Lease Structure: ${leaseType}
- Base Rent Rate: $${Number(baseRentPerSqFt).toFixed(2)} / RSF / Year
- Monthly Base Rent: $${Math.round(monthlyBaseRent).toLocaleString()} USD
- Annual Base Rent: $${Math.round(annualBaseRent).toLocaleString()} USD
- Security Deposit / Letter of Credit: $${Number(securityDeposit).toLocaleString()} USD

EXPENSE RESPONSIBILITIES (${leaseType}):
${leaseType.includes("NNN") 
  ? "Tenant pays proportional share of Property Taxes, Property Insurance, and Common Area Maintenance (CAM)." 
  : "Landlord pays baseline operational expenses; Tenant pays increases over Base Year."}

CRITICAL DATES & OPTIONS:
- Commencement Date: Upon Substantial Completion
- Renewal Options: One (1) Five-Year renewal option at 95% Fair Market Value
- Sublease / Assignment: Permitted with Landlord's reasonable consent
`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Building2}
            title="Commercial Real Estate Lease Abstract & Summary Sheet Builder"
            description="Create an executive lease abstract: Rentable Square Footage (RSF), Triple Net (NNN) expense structures, monthly rent, and renewal options."
          />
          <ResetButton onReset={() => {
            setPropertyAddress("Suite 400, 1200 Avenue of the Americas, New York, NY");
            setLandlordName("Empire Commercial Properties Trust");
            setTenantName("Apex Cloud Analytics Inc.");
            setRentableSqFt("4500");
            setBaseRentPerSqFt("58.00");
            setLeaseType("NNN (Triple Net)");
            setSecurityDeposit("43500");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Rentable Area (RSF)</label>
            <input type="number" value={rentableSqFt} onChange={(e) => setRentableSqFt(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Base Rent ($ / RSF / Yr)</label>
            <input type="number" step="0.5" value={baseRentPerSqFt} onChange={(e) => setBaseRentPerSqFt(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Lease Structure</label>
            <select value={leaseType} onChange={(e) => setLeaseType(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white">
              <option value="NNN (Triple Net)">NNN (Triple Net)</option>
              <option value="Full Service Gross">Full Service Gross (FSG)</option>
              <option value="Modified Gross">Modified Gross</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Commercial Lease Abstract</span>
            <CopyButton textToCopy={formattedAbstract} variant="ghost" />
          </div>
          <textarea readOnly rows={10} value={formattedAbstract} className="w-full p-4 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl outline-none border border-slate-800" />
        </div>
      </div>
    </div>
  );
};
