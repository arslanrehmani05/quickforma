import React from 'react';
import { FileText, Check } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4 border border-indigo-500/20">
          <FileText className="w-4 h-4" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Clear, simple, transparent rules for using QuickForma's free utility tools.
        </p>
      </div>

      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base border-t border-slate-800/80 pt-8">
        <section>
          <h2 className="text-xl font-bold text-slate-100 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using QuickForma (`quickforma.com`), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access or use the website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-100 mb-3">2. Free Client-Side Utility Service</h2>
          <p>
            QuickForma provides free, browser-based utility tools, document generators, and calculators. All services are provided "as is" and "as available". We reserve the right to modify, add, or discontinue tools at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-100 mb-3">3. Disclaimer of Financial and Legal Advice</h2>
          <p>
            Calculators, document templates (such as NDAs, Invoices, Contracts, and Bills of Sale), and financial estimators provided on QuickForma are for informational and convenience purposes only. They do not constitute formal legal, accounting, tax, or financial advice. Users should consult a qualified legal or tax professional for specific business transactions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-100 mb-3">4. Limitation of Liability</h2>
          <p>
            In no event shall QuickForma or its creators be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our tools or generated files.
          </p>
        </section>

        <section className="pt-4 border-t border-slate-800">
          <p className="text-slate-500 text-xs sm:text-sm">
            Last updated: August 4, 2026. For inquiries, contact support@quickforma.com.
          </p>
        </section>
      </div>
    </div>
  );
};
