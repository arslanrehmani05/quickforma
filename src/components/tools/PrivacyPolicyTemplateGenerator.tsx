import React, { useState } from "react";
import { Shield, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const PrivacyPolicyTemplateGenerator: React.FC = () => {
  const [businessName, setBusinessName] = useState("Vanguard Operations LLC");
  const [websiteUrl, setWebsiteUrl] = useState("https://example.com");
  const [contactEmail, setContactEmail] = useState("privacy@example.com");
  const [collectAnalytics, setCollectAnalytics] = useState(true);
  const [collectPaymentInfo, setCollectPaymentInfo] = useState(true);

  const formattedPolicy = `PRIVACY POLICY NOTICE

LAST UPDATED: ${new Date().toISOString().split("T")[0]}
ENTITY: ${businessName} ("we," "our," or "us")
WEBSITE: ${websiteUrl}

1. INFORMATION WE COLLECT:
We respect your privacy and collect only the information necessary to provide our services:
- Direct Account Information: Names, email addresses, and account credentials.
${collectAnalytics ? "- Usage & Log Telemetry: IP addresses, browser types, and anonymized interaction metrics.\n" : ""}${collectPaymentInfo ? "- Transaction Records: Billing addresses and encrypted tokenized payment confirmations (credit cards processed directly via PCI-DSS compliant gateways).\n" : ""}
2. HOW WE USE YOUR INFORMATION:
We use personal information exclusively to:
- Operate, maintain, and optimize our digital tools and platform features.
- Fulfill orders and process secure transactions.
- Comply with legal and accounting compliance obligations.

3. DATA RETENTION & SECURITY:
We employ industry-standard encryption (TLS/HTTPS) in transit. We never sell, rent, or trade your personal data to third-party data brokers.

4. USER RIGHTS (GDPR / CCPA):
Depending on your jurisdiction, you have the right to request access, correction, or deletion of your personal records. Contact us at ${contactEmail} to exercise these statutory rights.
`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Shield}
            title="Website & SaaS Privacy Policy Statement Generator"
            description="Generate standard GDPR and CCPA compliant website privacy disclosures for small businesses, agencies, and web applications."
          />
          <ResetButton onReset={() => {
            setBusinessName("Vanguard Operations LLC");
            setWebsiteUrl("https://example.com");
            setContactEmail("privacy@example.com");
            setCollectAnalytics(true);
            setCollectPaymentInfo(true);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Business Name</label>
            <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Website URL</label>
            <input type="text" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Contact Email</label>
            <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Generated Privacy Statement</span>
            <CopyButton textToCopy={formattedPolicy} variant="ghost" />
          </div>
          <textarea readOnly rows={10} value={formattedPolicy} className="w-full p-4 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl outline-none border border-slate-800" />
        </div>
      </div>
    </div>
  );
};
