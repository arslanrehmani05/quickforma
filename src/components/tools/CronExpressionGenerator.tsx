import React, { useState } from "react";
import { Clock, Calendar, Copy, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const CronExpressionGenerator: React.FC = () => {
  const [minute, setMinute] = useState("0");
  const [hour, setHour] = useState("9");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("1-5");

  const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const getHumanDescription = () => {
    let desc = "At ";
    const h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    if (!isNaN(h) && !isNaN(m)) {
      const ampm = h >= 12 ? "PM" : "AM";
      const displayH = h % 12 === 0 ? 12 : h % 12;
      const displayM = m < 10 ? `0${m}` : m;
      desc += `${displayH}:${displayM} ${ampm}`;
    } else {
      desc += `minute ${minute}, hour ${hour}`;
    }

    if (dayOfWeek === "1-5") {
      desc += ", Monday through Friday";
    } else if (dayOfWeek === "0,6" || dayOfWeek === "6,0") {
      desc += ", on weekends (Saturday and Sunday)";
    } else if (dayOfWeek === "*") {
      desc += ", every day";
    } else {
      desc += `, on day-of-week ${dayOfWeek}`;
    }

    if (month !== "*") desc += ` in month ${month}`;
    if (dayOfMonth !== "*") desc += ` on day ${dayOfMonth} of the month`;

    return desc;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Clock}
            title="Cron Schedule Expression Builder & Visualizer"
            description="Build standard 5-part cron schedule expressions with plain-English human translations and syntax cheatsheet."
          />
          <ResetButton onReset={() => {
            setMinute("0");
            setHour("9");
            setDayOfMonth("*");
            setMonth("*");
            setDayOfWeek("1-5");
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <InputField label="Minute (0-59)" value={minute} onChange={(e) => setMinute(e.target.value)} isMono />
          <InputField label="Hour (0-23)" value={hour} onChange={(e) => setHour(e.target.value)} isMono />
          <InputField label="Day of Month (1-31)" value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} isMono />
          <InputField label="Month (1-12)" value={month} onChange={(e) => setMonth(e.target.value)} isMono />
          <InputField label="Day of Week (0-6)" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} isMono />
        </div>

        <ResultCard variant="dark" title="Generated Cron Schedule">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl sm:text-4xl font-mono font-extrabold text-emerald-400 bg-white/10 px-5 py-2 rounded-2xl border border-white/10">
                {cronExpression}
              </span>
              <CopyButton textToCopy={cronExpression} variant="secondary" />
            </div>

            <p className="text-sm text-indigo-200 font-medium">
              &ldquo;{getHumanDescription()}&rdquo;
            </p>
          </div>
        </ResultCard>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-2">
          <span className="font-bold text-slate-900 block">Common Quick Presets:</span>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Every Hour", exp: ["0", "*", "*", "*", "*"] },
              { label: "Every Day at Midnight", exp: ["0", "0", "*", "*", "*"] },
              { label: "Every Weekday at 9 AM", exp: ["0", "9", "*", "*", "1-5"] },
              { label: "Every 15 Minutes", exp: ["*/15", "*", "*", "*", "*"] },
              { label: "1st of Every Month", exp: ["0", "0", "1", "*", "*"] },
            ].map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setMinute(p.exp[0]);
                  setHour(p.exp[1]);
                  setDayOfMonth(p.exp[2]);
                  setMonth(p.exp[3]);
                  setDayOfWeek(p.exp[4]);
                }}
                className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-800 hover:border-indigo-600 font-medium"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
