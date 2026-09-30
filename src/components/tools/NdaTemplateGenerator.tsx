import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { Button } from '../ui/Button';

export const NdaTemplateGenerator: React.FC = () => {
  const [disclosingParty, setDisclosingParty] = useState('Apex Technologies Inc.');
  const [receivingParty, setReceivingParty] = useState('John Doe Consultancy');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [jurisdiction, setJurisdiction] = useState('State of California');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Non-Disclosure Agreement (NDA) Generator</h2>
            <p className="text-slate-600 text-sm">Generate and print mutual or unilateral confidentiality agreements.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Disclosing Party (Owner)</label>
            <input type="text" value={disclosingParty} onChange={(e) => setDisclosingParty(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Receiving Party (Recipient)</label>
            <input type="text" value={receivingParty} onChange={(e) => setReceivingParty(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Effective Date</label>
            <input type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Governing State / Jurisdiction</label>
            <input type="text" value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
        </div>

        <button onClick={() => window.print()} className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all">
          <Printer className="w-4 h-4" />
          <span>Print / Save NDA Document PDF</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-md border border-slate-200 font-serif leading-relaxed text-sm max-w-3xl mx-auto space-y-6">
        <div className="text-center border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">NON-DISCLOSURE AGREEMENT (NDA)</h1>
        </div>

        <p>This Non-Disclosure Agreement ("Agreement") is entered into on <strong>{effectiveDate}</strong> by and between <strong>{disclosingParty}</strong> ("Disclosing Party") and <strong>{receivingParty}</strong> ("Receiving Party").</p>
        <p><strong>1. Confidential Information:</strong> Receiving Party agrees to hold all proprietary trade secrets, software code, and business data disclosed by Disclosing Party in strict confidence for a period of 2 years.</p>
        <p><strong>2. Governing Law:</strong> This Agreement shall be governed by and construed in accordance with the laws of <strong>{jurisdiction}</strong>.</p>

        <div className="pt-8 grid grid-cols-2 gap-8 text-xs font-sans">
          <div className="border-t border-slate-400 pt-2"><p className="font-bold">{disclosingParty}</p><p className="text-slate-500">Authorized Signature</p></div>
          <div className="border-t border-slate-400 pt-2"><p className="font-bold">{receivingParty}</p><p className="text-slate-500">Authorized Signature</p></div>
        </div>
      </div>
    </div>
  );
};
