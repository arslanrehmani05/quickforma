import React, { useState } from "react";
import { FileText, Copy, Printer } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const StatementOfWorkGenerator: React.FC = () => {
  const [clientName, setClientName] = useState("Acme Global Enterprises");
  const [serviceProvider, setServiceProvider] = useState("Vanguard Digital Advisory LLC");
  const [projectName, setProjectName] = useState("Enterprise Cloud Infrastructure Modernization");
  const [effectiveDate, setEffectiveDate] = useState("2026-11-01");
  const [targetCompletionDate, setTargetCompletionDate] = useState("2027-02-28");
  const [totalFixedFee, setTotalFixedFee] = useState("45000");
  const [scopeDetails, setScopeDetails] = useState(
    "1. Architecture discovery & AWS VPC cloud audit\n2. Kubernetes container migration and CI/CD pipelines\n3. Zero-downtime database failover testing\n4. Staff handoff documentation and technical training"
  );
  const [deliverables, setDeliverables] = useState(
    "- Architecture Design Document (ADD)\n- Automated Terraform infrastructure scripts\n- Staging and production Kubernetes clusters\n- Post-launch 30-day warranty support"
  );

  const formattedDoc = `STATEMENT OF WORK (SOW)

PROJECT NAME: ${projectName}
EFFECTIVE DATE: ${effectiveDate}
TARGET COMPLETION: ${targetCompletionDate}

PARTIES:
1. Client: ${clientName}
2. Service Provider: ${serviceProvider}

1. SCOPE OF SERVICES:
${scopeDetails}

2. KEY DELIVERABLES & ACCEPTANCE CRITERIA:
${deliverables}

3. PROFESSIONAL FEES & PAYMENT TERMS:
Total Project Fee: $${Number(totalFixedFee).toLocaleString()} USD
- 30% Mobilization Deposit upon SOW signature
- 40% Milestone progress billing upon Deliverables Staging acceptance
- 30% Final release upon production verification and handoff

4. OUT OF SCOPE:
Any services, features, or requests not explicitly detailed in Section 1 shall require a formal written Change Request Order signed by both parties.

IN WITNESS WHEREOF, the parties hereto have executed this Statement of Work.

Client Signature: _______________________      Date: _______________
Printed Name: ${clientName}

Provider Signature: _____________________      Date: _______________
Printed Name: ${serviceProvider}
`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileText}
            title="Statement of Work (SOW) Project Contract Scope Generator"
            description="Generate a professional, binding Statement of Work detailing scope of work, deliverables schedule, payment milestones, and change control."
          />
          <ResetButton onReset={() => {
            setClientName("Acme Global Enterprises");
            setServiceProvider("Vanguard Digital Advisory LLC");
            setProjectName("Enterprise Cloud Infrastructure Modernization");
            setEffectiveDate("2026-11-01");
            setTargetCompletionDate("2027-02-28");
            setTotalFixedFee("45000");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Client Business Name</label>
            <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Contractor / Agency Name</label>
            <input type="text" value={serviceProvider} onChange={(e) => setServiceProvider(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Project Title</label>
            <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Total Fixed Project Fee ($)</label>
            <input type="number" value={totalFixedFee} onChange={(e) => setTotalFixedFee(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Scope of Work Items</label>
          <textarea rows={3} value={scopeDetails} onChange={(e) => setScopeDetails(e.target.value)} className="w-full p-2.5 text-xs font-mono rounded-xl border border-slate-200 bg-slate-50" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Generated Statement of Work</span>
            <CopyButton textToCopy={formattedDoc} variant="ghost" />
          </div>
          <textarea readOnly rows={12} value={formattedDoc} className="w-full p-4 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl outline-none border border-slate-800" />
        </div>
      </div>
    </div>
  );
};
