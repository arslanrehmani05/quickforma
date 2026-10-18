import React, { useState } from "react";
import { Handshake, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const SubcontractorAgreementGenerator: React.FC = () => {
  const [primeContractor, setPrimeContractor] = useState("Vanguard Builders & Engineering LLC");
  const [subcontractorName, setSubcontractorName] = useState("Precision Electrical Contractors Inc.");
  const [projectLocation, setProjectLocation] = useState("450 Market St, Philadelphia, PA");
  const [compensationRate, setCompensationRate] = useState("18500");
  const [retainagePct, setRetainagePct] = useState("10");

  const formattedAgreement = `SUBCONTRACTOR SERVICES AGREEMENT

EFFECTIVE DATE: ${new Date().toISOString().split("T")[0]}
PRIME CONTRACTOR: ${primeContractor}
SUBCONTRACTOR: ${subcontractorName}
PROJECT SITE: ${projectLocation}

1. SUBCONTRACT WORK:
Subcontractor agrees to furnish all necessary labor, materials, equipment, and supervision to perform the trade scope in accordance with prime contract specifications.

2. COMPENSATION & RETAINAGE:
Total Subcontract Value: $${Number(compensationRate).toLocaleString()} USD.
Prime Contractor shall retain ${retainagePct}% of each progress billing ("Retainage") until final owner inspection and unconditional lien waiver execution.

3. INDEPENDENT CONTRACTOR STATUS:
Subcontractor is an independent contractor, solely responsible for workers' compensation, general liability insurance ($1,000,000 minimum naming Prime as additional insured), and federal/state payroll taxes.

4. INDEMNIFICATION & LIEN WAIVERS:
Subcontractor shall defend, indemnify, and hold harmless Prime Contractor against all mechanic's liens, claims, and OSHA safety violations arising from Subcontractor's performance.

IN WITNESS WHEREOF, the parties execute this Agreement:

Prime Contractor: ________________________     Date: _______________
Subcontractor: ___________________________     Date: _______________
`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Handshake}
            title="Commercial Subcontractor Service Agreement Generator"
            description="Draft construction and professional trade subcontract agreements: retainage withholding, insurance covenants, and mechanic lien indemnification."
          />
          <ResetButton onReset={() => {
            setPrimeContractor("Vanguard Builders & Engineering LLC");
            setSubcontractorName("Precision Electrical Contractors Inc.");
            setProjectLocation("450 Market St, Philadelphia, PA");
            setCompensationRate("18500");
            setRetainagePct("10");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Prime Contractor Name</label>
            <input type="text" value={primeContractor} onChange={(e) => setPrimeContractor(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Subcontractor Business Name</label>
            <input type="text" value={subcontractorName} onChange={(e) => setSubcontractorName(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Subcontract Sum ($)</label>
            <input type="number" value={compensationRate} onChange={(e) => setCompensationRate(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Retainage Withholding (%)</label>
            <input type="number" value={retainagePct} onChange={(e) => setRetainagePct(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Subcontract Document</span>
            <CopyButton textToCopy={formattedAgreement} variant="ghost" />
          </div>
          <textarea readOnly rows={10} value={formattedAgreement} className="w-full p-4 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl outline-none border border-slate-800" />
        </div>
      </div>
    </div>
  );
};
