import React, { useState } from "react";
import { ShieldCheck, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const ServiceLevelAgreementGenerator: React.FC = () => {
  const [providerName, setProviderName] = useState("CloudScale Hosting Solutions LLC");
  const [clientName, setClientName] = useState("Global FinTech Systems Corp");
  const [uptimeTargetPct, setUptimeTargetPct] = useState("99.95");
  const [p1ResponseTimeHours, setP1ResponseTimeHours] = useState("1");
  const [creditPctUnderBreach, setCreditPctUnderBreach] = useState("10");

  const formattedSla = `SERVICE LEVEL AGREEMENT (SLA) SCHEDULE

EFFECTIVE DATE: ${new Date().toISOString().split("T")[0]}
SERVICE PROVIDER: ${providerName}
CUSTOMER: ${clientName}

1. SERVICE AVAILABILITY COMMITMENT:
Provider shall maintain a monthly Service Uptime Percentage of not less than ${uptimeTargetPct}% ("Uptime Target"), calculated 24x7x365 excluding scheduled maintenance.

2. INCIDENT SEVERITY & RESPONSE TIMES:
- Priority 1 (Critical Outage / Core Systems Down): Response within ${p1ResponseTimeHours} hour(s); 24/7 continuous remediation.
- Priority 2 (Major Degradation / Impaired Functionality): Response within 4 hours during business hours.
- Priority 3 (Minor Defect / Administrative Question): Response within 24 hours.

3. SERVICE SERVICE CREDITS (REMEDY):
In the event Provider fails to meet the ${uptimeTargetPct}% monthly availability commitment, Customer shall be entitled to receive a Service Credit equal to ${creditPctUnderBreach}% of the total monthly service subscription fee for every 0.1% below the SLA Target, up to a maximum cap of 50% monthly credit.

4. EXCLUSIONS:
Downtime caused by Customer's upstream internet service providers, unauthorized configuration changes, or documented force majeure events shall not count towards availability breach calculations.
`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ShieldCheck}
            title="Service Level Agreement (SLA) & Uptime Terms Generator"
            description="Draft binding B2B SaaS and technical SLA terms: uptime target percentages, incident response severity tiers, and penalty credit structures."
          />
          <ResetButton onReset={() => {
            setProviderName("CloudScale Hosting Solutions LLC");
            setClientName("Global FinTech Systems Corp");
            setUptimeTargetPct("99.95");
            setP1ResponseTimeHours("1");
            setCreditPctUnderBreach("10");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Provider Legal Name</label>
            <input type="text" value={providerName} onChange={(e) => setProviderName(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Client Legal Name</label>
            <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Uptime Target (%)</label>
            <input type="number" step="0.01" value={uptimeTargetPct} onChange={(e) => setUptimeTargetPct(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">P1 Outage Response (Hours)</label>
            <input type="number" value={p1ResponseTimeHours} onChange={(e) => setP1ResponseTimeHours(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Generated SLA Contract Terms</span>
            <CopyButton textToCopy={formattedSla} variant="ghost" />
          </div>
          <textarea readOnly rows={10} value={formattedSla} className="w-full p-4 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl outline-none border border-slate-800" />
        </div>
      </div>
    </div>
  );
};
