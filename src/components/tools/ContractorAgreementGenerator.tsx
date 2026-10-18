import React, { useState } from "react";
import { FileSignature, Printer, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const ContractorAgreementGenerator: React.FC = () => {
  const [clientCompany, setClientCompany] = useState("VentureWave Media LLC");
  const [contractorName, setContractorName] = useState("Alex Rivera");
  const [effectiveDate, setEffectiveDate] = useState("2026-11-01");
  const [scopeOfWork, setScopeOfWork] = useState("Full-stack web application development, API integration, and architectural performance optimization.");
  const [compensationRate, setCompensationRate] = useState("95 per hour");
  const [paymentTerms, setPaymentTerms] = useState("Net 15 upon invoice receipt");
  const [stateJurisdiction, setStateJurisdiction] = useState("California");

  const agreementText = `INDEPENDENT CONTRACTOR SERVICES AGREEMENT

This Agreement is made effective as of ${effectiveDate}, by and between:
Client: ${clientCompany} ("Client")
Contractor: ${contractorName} ("Contractor")

1. SERVICES & SCOPE OF WORK
Contractor agrees to perform the following professional services:
${scopeOfWork}

2. COMPENSATION & PAYMENT TERMS
Client shall compensate Contractor at the rate of $${compensationRate}.
Invoices shall be paid pursuant to the following terms: ${paymentTerms}.

3. INDEPENDENT CONTRACTOR STATUS
Contractor is an independent contractor, not an employee of Client. Contractor is responsible for all federal, state, and local self-employment taxes.

4. INTELLECTUAL PROPERTY & WORK FOR HIRE
All deliverables, software, documentation, and work product developed under this Agreement shall belong exclusively to Client as a "work made for hire."

5. CONFIDENTIALITY
Contractor agrees to maintain the strict confidentiality of all proprietary Client information, source code, and customer records.

6. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of ${stateJurisdiction}.

IN WITNESS WHEREOF, the parties have executed this Agreement:
Client Signature: _______________________ Date: ___________
Contractor Signature: ___________________ Date: ___________`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileSignature}
            title="Independent Contractor Agreement Generator"
            description="Create customizable legal independent contractor agreements with IP assignment, confidentiality, and payment terms."
          />
          <ResetButton onReset={() => {
            setClientCompany("VentureWave Media LLC");
            setContractorName("Alex Rivera");
            setEffectiveDate("2026-11-01");
            setScopeOfWork("Full-stack web application development, API integration, and architectural performance optimization.");
            setCompensationRate("95 per hour");
            setPaymentTerms("Net 15 upon invoice receipt");
            setStateJurisdiction("California");
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Client / Company Name" value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} />
          <InputField label="Contractor Full Name / Entity" value={contractorName} onChange={(e) => setContractorName(e.target.value)} />
          <InputField label="Effective Date" type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
          <InputField label="Compensation (e.g. 95/hr or $5,000 fixed)" value={compensationRate} onChange={(e) => setCompensationRate(e.target.value)} />
          <InputField label="Payment Terms" value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} />
          <InputField label="Governing State / Jurisdiction" value={stateJurisdiction} onChange={(e) => setStateJurisdiction(e.target.value)} />
        </div>

        <InputField label="Scope of Services / Deliverables" value={scopeOfWork} onChange={(e) => setScopeOfWork(e.target.value)} />

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Generated Legal Agreement Preview</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={agreementText} variant="secondary" />
              <Button size="sm" variant="primary" onClick={() => window.print()} className="flex items-center gap-1">
                <Printer className="w-3.5 h-3.5" /> Print Agreement
              </Button>
            </div>
          </div>

          <pre className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
            {agreementText}
          </pre>
        </div>
      </div>
    </div>
  );
};
