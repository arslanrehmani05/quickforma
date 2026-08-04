import React from 'react';
import { Shield, Lock, Eye, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-4 border border-indigo-100">
          <Shield className="w-4 h-4" />
          <span>Privacy & Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          QuickForma is built on a 100% client-side zero-server architecture. Your documents, calculations, and data never leave your web browser.
        </p>
      </div>

      {/* Trust Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <Lock className="w-6 h-6 text-indigo-600 mb-3" />
          <h3 className="text-slate-900 font-bold text-base mb-1">Local Browser Processing</h3>
          <p className="text-slate-600 text-sm">All calculations, PDF generation, and image conversions occur inside your local browser memory.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <Eye className="w-6 h-6 text-emerald-600 mb-3" />
          <h3 className="text-slate-900 font-bold text-base mb-1">Zero File Storage</h3>
          <p className="text-slate-600 text-sm">We operate zero backend databases or file storage servers. Your uploads and inputs disappear on tab close.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <CheckCircle2 className="w-6 h-6 text-blue-600 mb-3" />
          <h3 className="text-slate-900 font-bold text-base mb-1">No Sign-Up Required</h3>
          <p className="text-slate-600 text-sm">We do not collect names, emails, credit cards, or account credentials to access any of our utilities.</p>
        </div>
      </div>

      {/* Policy Content */}
      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base border-t border-slate-200 pt-8">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Do Not Collect</h2>
          <p>
            QuickForma (`quickforma.com`) does not collect, record, or transmit personal data entered into any of our tool widgets. Information such as invoice details, passwords generated, text pasted into counters, uploaded images, or financial figures are processed locally in your browser RAM using client-side JavaScript.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">2. Cookies and Analytics</h2>
          <p>
            We use privacy-respecting analytics (such as Google Tag and Microsoft Clarity) to monitor website performance, page load times, and aggregated traffic volumes. These tools collect anonymized browser technical data (screen resolution, general country location, browser type) to help us improve site accessibility. You may disable cookies at any time in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">3. Advertising Partners</h2>
          <p>
            We support our zero-cost free tools model through third-party advertising networks (including Google AdSense). These ad partners may use cookies to serve non-intrusive ads based on your visit to this and other websites on the Internet. Users can opt out of personalized advertising by visiting Google’s Ads Settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">4. Security</h2>
          <p>
            Because no user data is ever uploaded to or stored on our servers, there is zero risk of server-side data leaks or database breaches regarding your documents or generated files.
          </p>
        </section>

        <section className="pt-4 border-t border-slate-200">
          <p className="text-slate-500 text-xs sm:text-sm">
            Last updated: August 4, 2026. For questions regarding our privacy practices, please contact us at support@quickforma.com.
          </p>
        </section>
      </div>
    </div>
  );
};
