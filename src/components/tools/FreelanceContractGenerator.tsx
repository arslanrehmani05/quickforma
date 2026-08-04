import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';

export const FreelanceContractGenerator: React.FC = () => {
  const [freelancerName, setFreelancerName] = useState('Sarah Connor');
  const [clientName, setClientName] = useState('Cyberdyne Systems');
  const [scopeOfWork, setScopeOfWork] = useState('Design and frontend development of web dashboard UI components using React and TypeScript.');
  const [contractRate, setContractRate] = useState<number>(3500);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Freelance Agreement Contract Generator</h2>
            <p className="text-slate-600 text-sm">Generate independent contractor service agreements for client projects.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Contractor / Freelancer Name</label>
            <input type="text" value={freelancerName} onChange={(e) => setFreelancerName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Client Company Name</label>
            <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Scope of Work</label>
            <textarea rows={3} value={scopeOfWork} onChange={(e) => setScopeOfWork(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 resize-none shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Contract Fee ($)</label>
            <input type="number" min="0" value={contractRate} onChange={(e) => setContractRate(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
        </div>

        <button onClick={() => window.print()} className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all">
          <Printer className="w-4 h-4" />
          <span>Print / Save Contract PDF</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-md border border-slate-200 font-serif leading-relaxed text-sm max-w-3xl mx-auto space-y-6">
        <div className="text-center border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">INDEPENDENT CONTRACTOR AGREEMENT</h1>
        </div>
        <p>This Services Agreement is entered into by <strong>{freelancerName}</strong> ("Contractor") and <strong>{clientName}</strong> ("Client").</p>
        <p><strong>1. Scope of Work:</strong> Contractor agrees to perform the following services: {scopeOfWork}.</p>
        <p><strong>2. Compensation:</strong> Client agrees to pay Contractor a total fee of <strong>${(contractRate || 0).toLocaleString()} USD</strong> upon completion.</p>
        <div className="pt-8 grid grid-cols-2 gap-8 text-xs font-sans">
          <div className="border-t border-slate-400 pt-2"><p className="font-bold">{freelancerName} (Contractor)</p></div>
          <div className="border-t border-slate-400 pt-2"><p className="font-bold">{clientName} (Client)</p></div>
        </div>
      </div>
    </div>
  );
};
