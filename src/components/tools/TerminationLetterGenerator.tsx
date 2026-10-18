import React, { useState } from "react";
import { UserMinus, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const TerminationLetterGenerator: React.FC = () => {
  const [employeeName, setEmployeeName] = useState("Jordan Miller");
  const [companyName, setCompanyName] = useState("Beacon Financial Logistics LLC");
  const [terminationDate, setTerminationDate] = useState("2026-11-15");
  const [terminationType, setTerminationType] = useState<"without_cause" | "with_cause">("without_cause");
  const [severanceWeeks, setSeveranceWeeks] = useState("4");

  const formattedLetter = `CONFIDENTIAL NOTICE OF EMPLOYMENT SEPARATION

DATE: ${new Date().toISOString().split("T")[0]}
TO: ${employeeName}
FROM: Human Resources, ${companyName}

Dear ${employeeName},

This letter serves as formal notification that your employment with ${companyName} will conclude effective ${terminationDate}.

${terminationType === "without_cause" 
  ? `This decision is the result of operational restructuring and does not reflect upon your individual integrity or personal character. As part of your separation, you are offered ${severanceWeeks} weeks of severance pay, subject to the execution of our standard Release and Severance Agreement.` 
  : `This termination is for cause, pursuant to company policy and employment contract terms.`}

FINAL COMPENSATION & BENEFITS:
- Your final paycheck, including all earned wages and accrued unused PTO, will be issued in accordance with statutory pay requirements.
- COBRA health continuation notices and enrollment documents will be mailed separately to your primary residence.
- Please return all company-owned property (laptop, access keys, credit cards) by your final date.

We appreciate the contributions you made during your tenure and wish you success in your future endeavors.

Sincerely,

Authorized Representative
${companyName}
`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={UserMinus}
            title="Employee Separation & Termination Notice Generator"
            description="Generate compliant employment termination letters with or without cause, specifying severance, final pay, and COBRA benefits continuation."
          />
          <ResetButton onReset={() => {
            setEmployeeName("Jordan Miller");
            setCompanyName("Beacon Financial Logistics LLC");
            setTerminationDate("2026-11-15");
            setTerminationType("without_cause");
            setSeveranceWeeks("4");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Employee Name</label>
            <input type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Company Legal Name</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Effective Separation Date</label>
            <input type="date" value={terminationDate} onChange={(e) => setTerminationDate(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Separation Category</label>
            <select value={terminationType} onChange={(e) => setTerminationType(e.target.value as any)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white">
              <option value="without_cause">Without Cause / Layoff / Restructure</option>
              <option value="with_cause">For Cause / Disciplinary Breach</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Official Separation Letter</span>
            <CopyButton textToCopy={formattedLetter} variant="ghost" />
          </div>
          <textarea readOnly rows={10} value={formattedLetter} className="w-full p-4 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl outline-none border border-slate-800" />
        </div>
      </div>
    </div>
  );
};
