import React, { useState } from "react";
import { Mail, Printer, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const OfferLetterGenerator: React.FC = () => {
  const [companyName, setCompanyName] = useState("Horizon Analytics Inc.");
  const [candidateName, setCandidateName] = useState("Sarah Jenkins");
  const [jobTitle, setJobTitle] = useState("Senior Frontend Engineer");
  const [startDate, setStartDate] = useState("2026-11-15");
  const [annualSalary, setAnnualSalary] = useState<number>(145000);
  const [reportingTo, setReportingTo] = useState("VP of Engineering");
  const [expirationDate, setExpirationDate] = useState("2026-10-31");

  const letterText = `Date: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}

Dear ${candidateName},

On behalf of ${companyName}, we are pleased to offer you the position of ${jobTitle}, reporting directly to our ${reportingTo}.

1. COMPENSATION & SCHEDULE
Your starting annualized base salary will be $${annualSalary.toLocaleString()} per year, paid in accordance with the company's regular payroll schedule. This is a full-time, exempt position.

2. START DATE
Your anticipated start date will be ${startDate}.

3. BENEFITS & EQUITY
You will be eligible to participate in standard company health insurance, 401(k) matching, and company equity incentive programs pursuant to plan terms.

4. AT-WILL EMPLOYMENT
Employment with ${companyName} is "at-will," meaning that either you or the company may terminate the employment relationship at any time, with or without cause.

5. OFFER EXPIRATION
This offer is contingent upon successful background verification and expires on ${expirationDate}.

Sincerely,
${companyName} Hiring Committee

ACCEPTANCE OF OFFER:
I accept the offer of employment described above.

Signature: __________________________ Date: _________________`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Mail}
            title="Employee Job Offer Letter Generator"
            description="Generate formal corporate job offer letters with salary terms, reporting hierarchy, at-will clauses, and signing lines."
          />
          <ResetButton onReset={() => {
            setCompanyName("Horizon Analytics Inc.");
            setCandidateName("Sarah Jenkins");
            setJobTitle("Senior Frontend Engineer");
            setStartDate("2026-11-15");
            setAnnualSalary(145000);
            setReportingTo("VP of Engineering");
            setExpirationDate("2026-10-31");
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          <InputField label="Candidate Full Name" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} />
          <InputField label="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          <InputField label="Reporting Manager / Title" value={reportingTo} onChange={(e) => setReportingTo(e.target.value)} />
          <InputField label="Base Annual Salary ($)" type="number" prefix="$" value={annualSalary} onChange={(e) => setAnnualSalary(Number(e.target.value))} />
          <InputField label="Anticipated Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <InputField label="Offer Expiration Date" type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Offer Letter Document Preview</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={letterText} variant="secondary" />
              <Button size="sm" variant="primary" onClick={() => window.print()} className="flex items-center gap-1">
                <Printer className="w-3.5 h-3.5" /> Print Letter
              </Button>
            </div>
          </div>

          <pre className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-serif text-slate-800 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
            {letterText}
          </pre>
        </div>
      </div>
    </div>
  );
};
