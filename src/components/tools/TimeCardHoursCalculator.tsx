import React, { useState } from "react";
import { Clock, Calendar, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface DayRow {
  day: string;
  inTime: string;
  lunchMinutes: number;
  outTime: string;
}

export const TimeCardHoursCalculator: React.FC = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(24);
  const [otMultiplier, setOtMultiplier] = useState<number>(1.5);
  const [days, setDays] = useState<DayRow[]>([
    { day: "Monday", inTime: "08:30", lunchMinutes: 30, outTime: "17:00" },
    { day: "Tuesday", inTime: "08:30", lunchMinutes: 30, outTime: "17:00" },
    { day: "Wednesday", inTime: "08:30", lunchMinutes: 30, outTime: "17:00" },
    { day: "Thursday", inTime: "08:30", lunchMinutes: 30, outTime: "17:30" },
    { day: "Friday", inTime: "08:30", lunchMinutes: 30, outTime: "17:00" },
    { day: "Saturday", inTime: "", lunchMinutes: 0, outTime: "" },
    { day: "Sunday", inTime: "", lunchMinutes: 0, outTime: "" },
  ]);

  const calculateHours = (row: DayRow) => {
    if (!row.inTime || !row.outTime) return 0;
    const [inH, inM] = row.inTime.split(":").map(Number);
    const [outH, outM] = row.outTime.split(":").map(Number);
    const totalMinutes = (outH * 60 + outM) - (inH * 60 + inM) - (row.lunchMinutes || 0);
    return Math.max(0, totalMinutes / 60);
  };

  const dailyHours = days.map(calculateHours);
  const totalWeeklyHours = dailyHours.reduce((sum, h) => sum + h, 0);
  const regularHours = Math.min(40, totalWeeklyHours);
  const overtimeHours = Math.max(0, totalWeeklyHours - 40);

  const regularPay = regularHours * (hourlyRate || 0);
  const overtimePay = overtimeHours * (hourlyRate || 0) * (otMultiplier || 1.5);
  const totalGrossPay = regularPay + overtimePay;

  const updateDay = (idx: number, field: keyof DayRow, val: any) => {
    const updated = [...days];
    updated[idx] = { ...updated[idx], [field]: val };
    setDays(updated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Clock}
            title="Weekly Time Card & Overtime Calculator"
            description="Track daily clock-in/out hours, unpaid lunch breaks, 40-hour overtime thresholds, and total employee gross pay."
          />
          <ResetButton onReset={() => {
            setHourlyRate(24);
            setOtMultiplier(1.5);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Regular Hourly Wage ($/hr)" type="number" prefix="$" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} />
          <InputField label="Overtime Multiplier" type="number" suffix="x" value={otMultiplier} onChange={(e) => setOtMultiplier(Number(e.target.value))} />
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900">7-Day Hours Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                  <th className="p-2.5">Day</th>
                  <th className="p-2.5">Clock In</th>
                  <th className="p-2.5">Lunch (Min)</th>
                  <th className="p-2.5">Clock Out</th>
                  <th className="p-2.5 text-right">Daily Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {days.map((row, idx) => (
                  <tr key={row.day} className="hover:bg-slate-50/50">
                    <td className="p-2.5 font-semibold text-slate-800">{row.day}</td>
                    <td className="p-2.5">
                      <input
                        type="time"
                        value={row.inTime}
                        onChange={(e) => updateDay(idx, "inTime", e.target.value)}
                        className="border border-slate-200 rounded px-2 py-1 text-xs"
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="number"
                        min="0"
                        step="5"
                        value={row.lunchMinutes}
                        onChange={(e) => updateDay(idx, "lunchMinutes", Number(e.target.value))}
                        className="w-16 border border-slate-200 rounded px-2 py-1 text-xs"
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="time"
                        value={row.outTime}
                        onChange={(e) => updateDay(idx, "outTime", e.target.value)}
                        className="border border-slate-200 rounded px-2 py-1 text-xs"
                      />
                    </td>
                    <td className="p-2.5 text-right font-bold text-indigo-600">
                      {dailyHours[idx].toFixed(2)} hrs
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ResultCard variant="dark" title="Total Weekly Payroll">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-400">Total Hours</span>
              <p className="text-xl font-extrabold text-white mt-1">{totalWeeklyHours.toFixed(2)}</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-400">Regular (40h Max)</span>
              <p className="text-xl font-extrabold text-white mt-1">{regularHours.toFixed(2)}h (${regularPay.toFixed(0)})</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-400">Overtime Hours</span>
              <p className="text-xl font-extrabold text-amber-300 mt-1">{overtimeHours.toFixed(2)}h (${overtimePay.toFixed(0)})</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-400">Gross Payroll Pay</span>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">${totalGrossPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
