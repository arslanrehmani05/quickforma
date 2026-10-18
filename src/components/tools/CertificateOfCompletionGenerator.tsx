import React, { useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const CertificateOfCompletionGenerator: React.FC = () => {
  const [recipientName, setRecipientName] = useState("Alexandre Moreau");
  const [issuingEntity, setIssuingEntity] = useState("QuickForma Executive Academy");
  const [courseOrProjectTitle, setCourseOrProjectTitle] = useState("Advanced Corporate Financial Modeling & Valuation");
  const [issueDate, setIssueDate] = useState("2026-10-18");
  const [credentialId, setCredentialId] = useState("QF-CERT-88492");

  const formattedCert = `CERTIFICATE OF COMPLETION

THIS ACKNOWLEDGES THAT:
${recipientName.toUpperCase()}

HAS SUCCESSFULLY COMPLETED ALL CURRICULAR AND PERFORMANCE REQUIREMENTS FOR:
${courseOrProjectTitle}

ISSUED BY:
${issuingEntity}

VERIFICATION DETAILS:
- Credential ID: ${credentialId}
- Date of Issuance: ${issueDate}
- Verification URL: https://quickforma.com/verify/${credentialId}

Authorized Officer: __________________________
Dean of Professional Studies, ${issuingEntity}
`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={CheckCircle2}
            title="Certificate of Completion & Project Sign-Off Document Generator"
            description="Generate verified certificates of completion for training programs, technical courses, and client project deliverables acceptance."
          />
          <ResetButton onReset={() => {
            setRecipientName("Alexandre Moreau");
            setIssuingEntity("QuickForma Executive Academy");
            setCourseOrProjectTitle("Advanced Corporate Financial Modeling & Valuation");
            setIssueDate("2026-10-18");
            setCredentialId("QF-CERT-88492");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Recipient / Student Full Name</label>
            <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Issuing Organization</label>
            <input type="text" value={issuingEntity} onChange={(e) => setIssuingEntity(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Course / Deliverable Title</label>
            <input type="text" value={courseOrProjectTitle} onChange={(e) => setCourseOrProjectTitle(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Credential Serial ID</label>
            <input type="text" value={credentialId} onChange={(e) => setCredentialId(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Official Certificate Text</span>
            <CopyButton textToCopy={formattedCert} variant="ghost" />
          </div>
          <textarea readOnly rows={10} value={formattedCert} className="w-full p-4 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl outline-none border border-slate-800" />
        </div>
      </div>
    </div>
  );
};
