import React, { useState } from 'react';
import { Briefcase, Printer } from 'lucide-react';

export const FreelanceContractGenerator: React.FC = () => {
  const [freelancerName, setFreelancerName] = useState('Alex Rivera');
  const [clientName, setClientName] = useState('Apex Digital Media');
  const [scopeOfWork, setScopeOfWork] = useState('Design and frontend implementation of 5 marketing landing pages in React & Tailwind CSS.');
  const [paymentAmount, setPaymentAmount] = useState<number>(3200);
  const [deadline, setDeadline] = useState('2026-09-15');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Freelance Work Agreement Builder</h2>
            <p className="text-slate-400 text-sm">Build simple freelance client agreements defining scope, payment terms, and deadlines.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Freelancer Name</label>
            <input
              type="text"
              value={freelancerName}
              onChange={(e) => setFreelancerName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Client Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Scope of Services</label>
            <textarea
              rows={3}
              value={scopeOfWork}
              onChange={(e) => setScopeOfWork(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Total Fixed Fee ($)</label>
            <input
              type="number"
              min="0"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Project Completion Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Download Freelance Agreement</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 font-serif leading-relaxed text-sm max-w-3xl mx-auto space-y-6">
        <h1 className="text-xl font-bold text-center uppercase tracking-widest text-slate-900 border-b pb-4">
          INDEPENDENT CONTRACTOR AGREEMENT
        </h1>

        <p>
          This Agreement is made by and between <strong>{freelancerName || '[Freelancer]'}</strong> ("Contractor") and <strong>{clientName || '[Client]'}</strong> ("Client").
        </p>

        <h2 className="font-bold text-base uppercase text-slate-800 pt-2">1. Scope of Work</h2>
        <p className="p-3 bg-slate-50 border rounded font-sans text-xs sm:text-sm text-slate-800">
          {scopeOfWork}
        </p>

        <h2 className="font-bold text-base uppercase text-slate-800 pt-2">2. Compensation & Payment Terms</h2>
        <p>
          Client agrees to pay Contractor a total fee of <strong>${(paymentAmount || 0).toLocaleString()} USD</strong>. Payment shall be due upon final project delivery.
        </p>

        <h2 className="font-bold text-base uppercase text-slate-800 pt-2">3. Delivery Deadline</h2>
        <p>Contractor agrees to complete work on or before <strong>{deadline}</strong>.</p>

        <div className="pt-12 grid grid-cols-2 gap-12 font-sans text-xs">
          <div className="border-t border-slate-400 pt-2">
            <p className="font-bold text-slate-800">Contractor: {freelancerName}</p>
            <p className="text-slate-500">Signature</p>
          </div>
          <div className="border-t border-slate-400 pt-2">
            <p className="font-bold text-slate-800">Client: {clientName}</p>
            <p className="text-slate-500">Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};
