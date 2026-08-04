import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';

export const CoverLetterFormatter: React.FC = () => {
  const [applicantName, setApplicantName] = useState('Alex Rivera');
  const [jobTitle, setJobTitle] = useState('Senior Product Designer');
  const [companyName, setCompanyName] = useState('Stripe Inc.');
  const [letterBody, setLetterBody] = useState('I am writing to express my enthusiasm for the Senior Product Designer role. With 6+ years building user-centric SaaS platforms, I specialize in crafting clean component systems and intuitive user workflows.');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Cover Letter Formatter</h2>
            <p className="text-slate-600 text-sm">Format and clean up cover letter text into professional business layouts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Your Full Name</label>
            <input
              type="text"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Target Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Target Company</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Cover Letter Text</label>
            <textarea
              rows={5}
              value={letterBody}
              onChange={(e) => setLetterBody(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 resize-none shadow-xs"
            />
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Cover Letter</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-md border border-slate-200 font-serif leading-relaxed text-sm max-w-3xl mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">{applicantName}</h1>
          <p className="text-xs text-slate-500 font-sans">{jobTitle}</p>
        </div>

        <p className="text-slate-700">Dear Hiring Manager at {companyName},</p>
        <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{letterBody}</p>
        <p className="text-slate-800 pt-4">Sincerely,<br /><strong>{applicantName}</strong></p>
      </div>
    </div>
  );
};
