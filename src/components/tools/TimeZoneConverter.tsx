import React, { useState } from 'react';
import { Globe } from 'lucide-react';

export const TimeZoneConverter: React.FC = () => {
  const [time, setTime] = useState('14:00');
  const [fromOffset, setFromOffset] = useState<number>(-5); // EST
  const [toOffset, setToOffset] = useState<number>(1); // CET

  const [hours, minutes] = (time || '12:00').split(':').map(Number);
  const diffHours = (toOffset || 0) - (fromOffset || 0);
  const convertedHours = (hours + diffHours + 24) % 24;
  const formattedConverted = `${String(Math.floor(convertedHours)).padStart(2, '0')}:${String(minutes || 0).padStart(2, '0')}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Time Zone Converter</h2>
            <p className="text-slate-400 text-sm">Convert meeting times across major world time zone offsets.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Select Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">From Zone</label>
                <select
                  value={fromOffset}
                  onChange={(e) => setFromOffset(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="-8">PST (UTC-8)</option>
                  <option value="-5">EST (UTC-5)</option>
                  <option value="0">GMT / UTC (UTC+0)</option>
                  <option value="1">CET (UTC+1)</option>
                  <option value="5.5">IST (UTC+5:30)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">To Zone</label>
                <select
                  value={toOffset}
                  onChange={(e) => setToOffset(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="-8">PST (UTC-8)</option>
                  <option value="-5">EST (UTC-5)</option>
                  <option value="0">GMT / UTC (UTC+0)</option>
                  <option value="1">CET (UTC+1)</option>
                  <option value="5.5">IST (UTC+5:30)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Converted Local Time</span>
              <div className="my-3 text-4xl sm:text-5xl font-extrabold text-indigo-400 font-mono">
                {formattedConverted}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
