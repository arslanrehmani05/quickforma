import React, { useState } from 'react';
import { FileCheck, Printer } from 'lucide-react';

export const PromissoryNoteGenerator: React.FC = () => {
  const [borrowerName, setBorrowerName] = useState('Michael Vance');
  const [lenderName, setLenderName] = useState('First Capital Lending');
  const [principalAmount, setPrincipalAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [dueDate, setDueDate] = useState('2027-08-01');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Promissory Note Generator</h2>
            <p className="text-slate-400 text-sm">Create simple promissory notes and loan repayment contracts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Borrower Name</label>
            <input
              type="text"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Lender Name</label>
            <input
              type="text"
              value={lenderName}
              onChange={(e) => setLenderName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Principal Loan Amount ($)</label>
            <input
              type="number"
              min="0"
              value={principalAmount}
              onChange={(e) => setPrincipalAmount(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Annual Interest Rate (%)</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Promissory Note</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 font-serif leading-relaxed text-sm max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center uppercase tracking-widest text-slate-900 border-b pb-4">
          PROMISSORY NOTE
        </h1>

        <p>
          FOR VALUE RECEIVED, the undersigned <strong>{borrowerName || '[Borrower]'}</strong> ("Borrower") promises to pay to the order of <strong>{lenderName || '[Lender]'}</strong> ("Lender") the principal sum of <strong>${(principalAmount || 0).toLocaleString()} USD</strong>, together with interest at the rate of <strong>{interestRate}% per annum</strong>.
        </p>

        <p>
          The full principal and accrued interest shall be due and payable in full on or before <strong>{dueDate}</strong>.
        </p>

        <div className="pt-12 grid grid-cols-2 gap-12 font-sans text-xs">
          <div className="border-t border-slate-400 pt-2">
            <p className="font-bold text-slate-800">Borrower: {borrowerName}</p>
            <p className="text-slate-500">Signature</p>
          </div>
          <div className="border-t border-slate-400 pt-2">
            <p className="font-bold text-slate-800">Lender: {lenderName}</p>
            <p className="text-slate-500">Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};
