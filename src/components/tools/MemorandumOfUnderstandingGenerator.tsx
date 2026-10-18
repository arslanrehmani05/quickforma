import React, { useState } from "react";
import { Handshake, FileCheck, Building2, Calendar, FileText } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const MemorandumOfUnderstandingGenerator: React.FC = () => {
  const [partyAName, setPartyAName] = useState<string>("Alpha Data Solutions LLC");
  const [partyALocation, setPartyALocation] = useState<string>("Austin, Texas");
  const [partyBName, setPartyBName] = useState<string>("Beta Cloud Systems Corp");
  const [partyBLocation, setPartyBLocation] = useState<string>("San Jose, California");
  const [effectiveDate, setEffectiveDate] = useState<string>("2026-11-01");
  const [termDurationMonths, setTermDurationMonths] = useState<number>(12);
  const [collaborationObjective, setCollaborationObjective] = useState<string>(
    "Joint evaluation and co-development of a high-throughput client-side document processing pipeline for mutual business enterprise clients."
  );
  const [partyARole, setPartyARole] = useState<string>(
    "Provide enterprise data normalization APIs, test datasets, and technical architectural consulting."
  );
  const [partyBRole, setPartyBRole] = useState<string>(
    "Provide cloud infrastructure staging environments, deployment orchestration, and security audit verifications."
  );

  const mouDocument = `MEMORANDUM OF UNDERSTANDING (MOU)

This Memorandum of Understanding (the "MOU") is entered into on ${effectiveDate}, by and between:

PARTIES:
1. Party A: ${partyAName}, located at ${partyALocation}
2. Party B: ${partyBName}, located at ${partyBLocation}
(Collectively referred to as the "Parties" and individually as a "Party").

1. PURPOSE & INTENT:
The Parties desire to enter into this MOU to establish an understanding of their mutual intent to collaborate regarding:
${collaborationObjective}

2. AREAS OF RESPONSIBILITY:
Responsibilities of ${partyAName}:
- ${partyARole}

Responsibilities of ${partyBName}:
- ${partyBRole}

3. TERM & TERMINATION:
This MOU shall take effect on ${effectiveDate} and shall remain in force for a period of ${termDurationMonths} months, unless terminated earlier by either Party providing thirty (30) days' written notice to the other Party.

4. NON-BINDING NATURE:
Except for sections regarding Confidentiality and Governing Law, this MOU is an expression of intent only and does not create any legally binding obligations, partnership, joint venture, or agency relationship between the Parties. Definite agreements, if any, will be governed by formal, executed bilateral contracts.

5. CONFIDENTIALITY:
Both Parties agree to maintain in strict confidence all proprietary, technical, and commercial information exchanged during discussions and evaluation under this MOU.

IN WITNESS WHEREOF, the Parties have caused this Memorandum of Understanding to be signed by their authorized representatives:

For ${partyAName}:
Signature: ___________________________    Date: ____________
Name/Title: __________________________

For ${partyBName}:
Signature: ___________________________    Date: ____________
Name/Title: __________________________
`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Handshake}
            title="Memorandum of Understanding (MOU) Generator"
            description="Draft professional partnership MOUs outlining collaborative intent, mutual responsibilities, and non-binding frameworks."
          />
          <ResetButton onReset={() => {
            setPartyAName("Alpha Data Solutions LLC");
            setPartyALocation("Austin, Texas");
            setPartyBName("Beta Cloud Systems Corp");
            setPartyBLocation("San Jose, California");
            setEffectiveDate("2026-11-01");
            setTermDurationMonths(12);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Party A Information</h4>
            <InputField
              label="Organization Name"
              type="text"
              value={partyAName}
              onChange={(e) => setPartyAName(e.target.value)}
            />
            <InputField
              label="Location / State"
              type="text"
              value={partyALocation}
              onChange={(e) => setPartyALocation(e.target.value)}
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Party B Information</h4>
            <InputField
              label="Organization Name"
              type="text"
              value={partyBName}
              onChange={(e) => setPartyBName(e.target.value)}
            />
            <InputField
              label="Location / State"
              type="text"
              value={partyBLocation}
              onChange={(e) => setPartyBLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Effective Start Date"
            type="date"
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
          />
          <InputField
            label="Term Duration (Months)"
            type="number"
            value={termDurationMonths}
            onChange={(e) => setTermDurationMonths(Number(e.target.value))}
            min={1}
            max={60}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Collaboration Purpose & Scope</label>
            <textarea
              rows={2}
              value={collaborationObjective}
              onChange={(e) => setCollaborationObjective(e.target.value)}
              className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{partyAName} Responsibilities</label>
              <textarea
                rows={3}
                value={partyARole}
                onChange={(e) => setPartyARole(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{partyBName} Responsibilities</label>
              <textarea
                rows={3}
                value={partyBRole}
                onChange={(e) => setPartyBRole(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" /> Generated Legal Memorandum
            </h3>
            <CopyButton textToCopy={mouDocument} />
          </div>
          <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs leading-relaxed max-h-80 overflow-y-auto whitespace-pre-wrap select-all">
            {mouDocument}
          </div>
        </div>
      </div>
    </div>
  );
};
