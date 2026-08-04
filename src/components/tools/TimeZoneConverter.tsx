import React, { useState } from 'react';
import { Clock } from 'lucide-react';

export const TimeZoneConverter: React.FC = () => {
  const [time, setTime] = useState('14:00');
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState('EST');

  const OFFSETS: Record<string, number> = {
    UTC: 0,
    EST: -5,
    PST: -8,
    GMT: 0,
    CET: 1,
    IST: 5.5
  };

  const calculateTargetTime = () => {
    if (!time) return '--:--';
    const [h, m] = time.split(':').map(Number);
    const fromOff = OFFSETS[fromZone] || 0;
    const toOff = OFFSETS[toZone] || 0;
    const diff = toOff - fromOff;

    let targetH = (h + diff + 24) % 24;
    return `${String(Math.floor(targetH)).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Time Zone Converter & Meeting Planner</h2>
            <p className="text-slate-600 text-sm">Convert meeting times across UTC, EST, PST, GMT, CET & IST.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Local Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">From Zone</label>
                <select
                  value={fromZone}
                  onChange={(e) => setFromZone(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold outline-none"
                >
                  {Object.keys(OFFSETS).map(z => <option key={z} value={z}>{z}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">To Zone</label>
                <select
                  value={toZone}
                  onChange={(e) => setToZone(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold outline-none"
                >
                  {Object.keys(OFFSETS).map(z => <option key={z} value={z}>{z}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Converted Time ({toZone})</span>
              <div className="my-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{calculateTargetTime()}</div>
            </div>
            <div className="pt-4 border-t border-indigo-500/80 text-xs text-indigo-100">
              <span>Time Difference: {(OFFSETS[toZone] || 0) - (OFFSETS[fromZone] || 0)} Hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
