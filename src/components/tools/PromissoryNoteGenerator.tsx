import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { Button } from '../ui/Button';

export const PromissoryNoteGenerator: React.FC = () => {
  const [borrowerName, setBorrowerName] = useState('Andy Bernard');
  const [lenderName, setLenderName] = useState('Scranton Financial Corp');
  const [principalAmount, setPrincipalAmount] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(5);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Promissory Note Generator</h2>
            <p className="text-slate-600 text-sm">Create legally binding IOU debt promise repayment agreements.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Borrower Name</label>
            <input type="text" value={borrowerName} onChange={(e) => setBorrowerName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Lender Name</label>
            <input type="text" value={lenderName} onChange={(e) => setLenderName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Loan Principal ($)</label>
            <input type="number" min="0" value={principalAmount} onChange={(e) => setPrincipalAmount(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Annual Interest (%)</label>
            <input type="number" step="0.1" min="0" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
        </div>

        <button onClick={() => window.print()} className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all">
          <Printer className="w-4 h-4" />
          <span>Print / Save Promissory Note PDF</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-md border border-slate-200 font-serif leading-relaxed text-sm max-w-3xl mx-auto space-y-6">
        <div className="text-center border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">PROMISSORY NOTE</h1>
        </div>
        <p>FOR VALUE RECEIVED, the undersigned Borrower (<strong>{borrowerName}</strong>) promises to pay to the order of Lender (<strong>{lenderName}</strong>) the principal sum of <strong>${(principalAmount || 0).toLocaleString()} USD</strong>, together with interest at <strong>{interestRate}%</strong> per annum.</p>
        <div className="pt-8 grid grid-cols-2 gap-8 text-xs font-sans">
          <div className="border-t border-slate-400 pt-2"><p className="font-bold">{borrowerName} (Borrower)</p></div>
          <div className="border-t border-slate-400 pt-2"><p className="font-bold">{lenderName} (Lender)</p></div>
        </div>
      </div>
    </div>
  );
};
