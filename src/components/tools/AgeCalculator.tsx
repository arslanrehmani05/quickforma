import React, { useState } from 'react';
import { Cake } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const [dob, setDob] = useState('1998-05-15');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const birth = new Date(dob);
  const target = new Date(targetDate);

  const isValid = !isNaN(birth.getTime()) && !isNaN(target.getTime()) && target >= birth;

  const calculateAgeDetails = () => {
    if (!isValid) return null;

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDiffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(totalDiffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekBorn = dayNames[birth.getDay()];

    const nextBdayYear = target.getMonth() > birth.getMonth() || (target.getMonth() === birth.getMonth() && target.getDate() > birth.getDate())
      ? target.getFullYear() + 1
      : target.getFullYear();

    const nextBday = new Date(nextBdayYear, birth.getMonth(), birth.getDate());
    const daysToNextBday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      dayOfWeekBorn,
      daysToNextBday
    };
  };

  const details = calculateAgeDetails();

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Cake className="w-5 h-5" />
            Age & Date Difference Calculator
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Calculate exact age, day born, and birthday countdowns.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">
              Age At Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white outline-none font-medium"
            />
          </div>
        </div>

        {details && (
          <div className="space-y-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            {/* Primary Age Display */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 rounded-2xl">
                <span className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">{details.years}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold block mt-1">Years</span>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 rounded-2xl">
                <span className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">{details.months}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold block mt-1">Months</span>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 rounded-2xl">
                <span className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">{details.days}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold block mt-1">Days</span>
              </div>
            </div>

            {/* Total Equivalents */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <span className="text-zinc-500 dark:text-zinc-400 block mb-1">Total Months</span>
                <span className="font-bold text-zinc-900 dark:text-white text-base">{details.totalMonths.toLocaleString()}</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <span className="text-zinc-500 dark:text-zinc-400 block mb-1">Total Weeks</span>
                <span className="font-bold text-zinc-900 dark:text-white text-base">{details.totalWeeks.toLocaleString()}</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <span className="text-zinc-500 dark:text-zinc-400 block mb-1">Total Days</span>
                <span className="font-bold text-zinc-900 dark:text-white text-base">{details.totalDays.toLocaleString()}</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <span className="text-zinc-500 dark:text-zinc-400 block mb-1">Total Hours</span>
                <span className="font-bold text-zinc-900 dark:text-white text-base">{details.totalHours.toLocaleString()}</span>
              </div>
            </div>

            {/* Birthday Fun Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <span className="text-zinc-500 dark:text-zinc-400">Day of Week Born:</span>
                <span className="font-bold text-zinc-900 dark:text-white">{details.dayOfWeekBorn}</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <span className="text-zinc-500 dark:text-zinc-400">Next Birthday In:</span>
                <span className="font-bold text-zinc-900 dark:text-white">{details.daysToNextBday} Days</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
