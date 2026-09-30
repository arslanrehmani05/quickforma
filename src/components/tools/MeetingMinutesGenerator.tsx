import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { Button } from '../ui/Button';

export const MeetingMinutesGenerator: React.FC = () => {
  const [meetingTitle, setMeetingTitle] = useState('Q3 Strategy & Product Roadmap Review');
  const [attendees, setAttendees] = useState('Alex Rivera, Sarah Connor, Dwight Schrute');
  const [keyDecisions, setKeyDecisions] = useState('- Approved new enterprise light UI redesign.\n- Scheduled v2 release for Q3.\n- Finalized zero-server analytics setup.');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Meeting Minutes & Notes Generator</h2>
            <p className="text-slate-600 text-sm">Format team meetings, executive notes, and action items into clean documents.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Meeting Title</label>
            <input type="text" value={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Attendees</label>
            <input type="text" value={attendees} onChange={(e) => setAttendees(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Key Decisions & Action Items</label>
            <textarea rows={4} value={keyDecisions} onChange={(e) => setKeyDecisions(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 resize-none shadow-xs" />
          </div>
        </div>

        <button onClick={() => window.print()} className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all">
          <Printer className="w-4 h-4" />
          <span>Print / Save Meeting Minutes PDF</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-md border border-slate-200 font-sans leading-relaxed text-sm max-w-3xl mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">{meetingTitle}</h1>
          <p className="text-xs text-slate-500 font-medium">Date: {new Date().toISOString().split('T')[0]}</p>
        </div>
        <div>
          <h3 className="text-xs font-bold  text-slate-500 mb-1">Attendees</h3>
          <p className="text-slate-800 font-medium">{attendees}</p>
        </div>
        <div>
          <h3 className="text-xs font-bold  text-slate-500 mb-1">Key Decisions & Notes</h3>
          <p className="text-slate-800 whitespace-pre-wrap">{keyDecisions}</p>
        </div>
      </div>
    </div>
  );
};
