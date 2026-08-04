import React, { useState } from 'react';
import { Cake } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('1998-05-15');

  const calculateAge = () => {
    if (!birthDate) return { years: 0, months: 0, days: 0, dayOfWeek: '' };
    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[birth.getDay()];

    return { years, months, days, dayOfWeek };
  };

  const age = calculateAge();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Cake className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Age & Birthday Calculator</h2>
            <p className="text-slate-600 text-sm">Calculate exact age in years, months, days, and day born.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Select Date of Birth</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white space-y-4 shadow-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 block mb-1">Your Exact Age</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {age.years} <span className="text-lg text-indigo-200 font-normal">Yrs</span> {age.months} <span className="text-lg text-indigo-200 font-normal">Mos</span> {age.days} <span className="text-lg text-indigo-200 font-normal">Days</span>
              </div>
            </div>
            <div className="pt-3 border-t border-indigo-500/80 text-xs text-indigo-100 flex justify-between">
              <span>Day Born:</span>
              <span className="font-bold text-white">{age.dayOfWeek || '...'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
