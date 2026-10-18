import React, { useState } from "react";
import { FileText, Building, Scale, Shield, Copy, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const TermsOfServiceGenerator: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>("Acme Technologies Inc.");
  const [websiteUrl, setWebsiteUrl] = useState<string>("https://acme.example.com");
  const [supportEmail, setSupportEmail] = useState<string>("legal@acme.example.com");
  const [governingCountry, setGoverningCountry] = useState<string>("United States");
  const [governingState, setGoverningState] = useState<string>("Delaware");
  const [minimumAge, setMinimumAge] = useState<number>(18);
  const [hasUserAccounts, setHasUserAccounts] = useState<boolean>(true);
  const [hasPaidSubscriptions, setHasPaidSubscriptions] = useState<boolean>(true);
  const [refundPeriodDays, setRefundPeriodDays] = useState<number>(14);

  const effectiveDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const termsText = `TERMS OF SERVICE AND CONDITIONS OF USE

Last Updated: ${effectiveDate}

1. AGREEMENT TO TERMS
These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("User", "you"), and ${companyName} ("Company", "we", "us", or "our"), concerning your access to and use of the ${websiteUrl} website as well as any related web applications, services, or tools (collectively, the "Services").

By accessing the Services, you confirm that you have read, understood, and agreed to be bound by all of these Terms. If you do not agree with all of these Terms, then you are expressly prohibited from using the Services and you must discontinue use immediately.

2. ELIGIBILITY & USER REGISTRATION
The Services are intended solely for users who are at least ${minimumAge} years of age. By using the Services, you represent and warrant that you meet this age requirement.
${hasUserAccounts ? `You may be required to register an account. You agree to keep your password confidential and will be responsible for all use of your account and credentials. We reserve the right to remove, reclaim, or change a username you select if we determine it is inappropriate or violates third-party rights.` : `Account registration is not mandatory to view general public areas of the site, but use of specific tools may require session credentials.`}

3. INTELLECTUAL PROPERTY RIGHTS
Unless otherwise indicated, the Services, source code, databases, software, website designs, audio, video, text, and graphics (collectively, the "Content") and trademarks are owned or controlled by ${companyName} and are protected by copyright and trademark laws. Content is provided "AS IS" for your personal or authorized commercial business use only.

${hasPaidSubscriptions ? `4. SUBSCRIPTIONS, BILLING & REFUNDS
If you purchase paid subscription tiers or licenses:
- Billing: Subscriptions renew automatically unless cancelled prior to the end of the current billing cycle.
- Fees & Taxes: You agree to provide current, complete, and accurate purchase information.
- Refund Policy: We offer a ${refundPeriodDays}-day satisfaction refund policy from the initial transaction date upon written request to ${supportEmail}.` : `4. PRICING & PAYMENT TERMS
Any fee schedules for customized enterprise deployments or ancillary services shall be agreed upon via separate statements of work.`}

5. PROHIBITED ACTIVITIES
You may not access or use the Services for any purpose other than that for which we make them available. Specifically, you agree not to:
- Systematically retrieve data or content to compile a collection, database, or directory without written permission.
- Circumvent, disable, or tamper with security-related features of the Services.
- Reverse engineer, decompile, or disassemble any part of our client-side software or proprietary algorithms.
- Engage in unauthorized automated usage of the system, such as scripts, scrapers, or bot crawlers.

6. LIMITATION OF LIABILITY
IN NO EVENT SHALL ${companyName.toUpperCase()}, ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES.

7. GOVERNING LAW & JURISDICTION
These Terms and your use of the Services are governed by and construed in accordance with the laws of the State of ${governingState}, ${governingCountry}, without regard to its conflict of law principles. Any legal action or proceeding shall be instituted exclusively in the state or federal courts located in ${governingState}.

8. CONTACT US
If you have questions or complaints regarding these Terms, please contact us at:
${companyName}
Email: ${supportEmail}
Website: ${websiteUrl}
`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Scale}
            title="SaaS & Website Terms of Service (ToS) Generator"
            description="Generate customized, enforceable legal terms of service for SaaS applications, digital products, and commercial websites."
          />
          <ResetButton onReset={() => {
            setCompanyName("Acme Technologies Inc.");
            setWebsiteUrl("https://acme.example.com");
            setSupportEmail("legal@acme.example.com");
            setGoverningCountry("United States");
            setGoverningState("Delaware");
            setMinimumAge(18);
            setHasUserAccounts(true);
            setHasPaidSubscriptions(true);
            setRefundPeriodDays(14);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Company / Business Name"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <InputField
            label="Website or App URL"
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
          <InputField
            label="Legal / Support Email"
            type="text"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
          />
          <InputField
            label="Governing Country"
            type="text"
            value={governingCountry}
            onChange={(e) => setGoverningCountry(e.target.value)}
          />
          <InputField
            label="State / Province Jurisdiction"
            type="text"
            value={governingState}
            onChange={(e) => setGoverningState(e.target.value)}
          />
          <InputField
            label="Minimum User Age"
            type="number"
            value={minimumAge}
            onChange={(e) => setMinimumAge(Number(e.target.value))}
            min={13}
            max={21}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={hasUserAccounts}
              onChange={(e) => setHasUserAccounts(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            User Account Registration
          </label>
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={hasPaidSubscriptions}
              onChange={(e) => setHasPaidSubscriptions(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Paid Billing & Subscriptions
          </label>
          {hasPaidSubscriptions && (
            <div className="flex items-center gap-2">
              <span className="text-slate-600 whitespace-nowrap">Refund Window:</span>
              <input
                type="number"
                value={refundPeriodDays}
                onChange={(e) => setRefundPeriodDays(Number(e.target.value))}
                className="w-16 px-2 py-1 bg-white border border-slate-300 rounded text-center font-bold"
                min={0}
                max={90}
              />
              <span className="text-slate-500">days</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" /> Generated Legal Agreement
            </h3>
            <CopyButton textToCopy={termsText} />
          </div>
          <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap select-all">
            {termsText}
          </div>
        </div>
      </div>
    </div>
  );
};
