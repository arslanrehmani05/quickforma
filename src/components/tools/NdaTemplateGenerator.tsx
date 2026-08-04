import React, { useState } from 'react';
import { FileCheck, Printer } from 'lucide-react';

export const NdaTemplateGenerator: React.FC = () => {
  const [partyA, setPartyA] = useState('Disclosing Party LLC');
  const [partyB, setPartyB] = useState('Recipient Consultant Inc');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [jurisdiction, setJurisdiction] = useState('State of Delaware');
  const [ndaType, setNdaType] = useState<'one-way' | 'mutual'>('one-way');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Simple NDA Agreement Generator</h2>
            <p className="text-slate-400 text-sm">Generate mutual or one-way Non-Disclosure Agreement (NDA) legal templates.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Disclosing Party Name</label>
            <input
              type="text"
              value={partyA}
              onChange={(e) => setPartyA(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Receiving Party Name</label>
            <input
              type="text"
              value={partyB}
              onChange={(e) => setPartyB(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Effective Date</label>
            <input
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">State / Jurisdiction</label>
            <input
              type="text"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Legal Document</span>
        </button>
      </div>

      {/* Printable Legal Document */}
      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 font-serif leading-relaxed text-sm max-w-3xl mx-auto space-y-6">
        <h1 className="text-xl font-bold text-center uppercase tracking-widest text-slate-900 border-b pb-4">
          NON-DISCLOSURE AGREEMENT (NDA)
        </h1>

        <p>
          This Non-Disclosure Agreement (the "Agreement") is entered into on <strong>{effectiveDate}</strong>, by and between:
        </p>

        <p>
          <strong>Disclosing Party:</strong> {partyA || '[Party A Name]'} <br />
          <strong>Receiving Party:</strong> {partyB || '[Party B Name]'}
        </p>

        <h2 className="font-bold text-base uppercase text-slate-800 pt-2">1. Confidential Information</h2>
        <p>
          "Confidential Information" refers to proprietary technical, business, software, financial, or strategic data disclosed by the Disclosing Party to the Receiving Party during negotiations or project evaluation.
        </p>

        <h2 className="font-bold text-base uppercase text-slate-800 pt-2">2. Non-Disclosure Obligations</h2>
        <p>
          The Receiving Party agrees to hold Confidential Information in strict confidence and shall not disclose such information to any third party without prior written consent from the Disclosing Party.
        </p>

        <h2 className="font-bold text-base uppercase text-slate-800 pt-2">3. Governing Law</h2>
        <p>
          This Agreement shall be governed by and construed in accordance with the laws of the <strong>{jurisdiction}</strong>.
        </p>

        <div className="pt-12 grid grid-cols-2 gap-12 font-sans text-xs">
          <div className="border-t border-slate-400 pt-2">
            <p className="font-bold text-slate-800">By: {partyA}</p>
            <p className="text-slate-500">Authorized Signature</p>
          </div>
          <div className="border-t border-slate-400 pt-2">
            <p className="font-bold text-slate-800">By: {partyB}</p>
            <p className="text-slate-500">Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};
