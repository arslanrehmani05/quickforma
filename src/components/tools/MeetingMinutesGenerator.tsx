import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';

export const MeetingMinutesGenerator: React.FC = () => {
  const [meetingTitle, setMeetingTitle] = useState('Quarterly Product Strategy Review');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendees, setAttendees] = useState('Sarah Jenkins (Product), Mark Davis (Engineering), Elena Rostova (Design)');
  const [agenda, setAgenda] = useState('Review Q3 product roadmap, catalog scale expansion, and mobile UI updates.');
  const [actionItems, setActionItems] = useState('1. Sarah to finalize SEMrush keywords by Friday.\n2. Mark to deploy Vercel edge build.\n3. Elena to approve glassmorphism design system.');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Meeting Minutes Generator</h2>
            <p className="text-slate-400 text-sm">Format corporate meeting notes, attendee lists, agendas, and action items.</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Meeting Title</label>
            <input
              type="text"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Attendees</label>
              <input
                type="text"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Meeting Agenda & Notes</label>
            <textarea
              rows={3}
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Action Items & Deliverables</label>
            <textarea
              rows={3}
              value={actionItems}
              onChange={(e) => setActionItems(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Meeting Minutes</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 font-sans leading-relaxed text-sm max-w-3xl mx-auto space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-slate-900">{meetingTitle || 'Meeting Minutes'}</h1>
          <p className="text-xs text-slate-500 font-mono mt-1">Date: {date}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Attendees</h3>
          <p className="text-slate-800 font-medium">{attendees}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Agenda & Key Discussion</h3>
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{agenda}</p>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">Action Items & Owners</h3>
          <p className="text-slate-800 font-mono text-xs leading-relaxed whitespace-pre-wrap">{actionItems}</p>
        </div>
      </div>
    </div>
  );
};
