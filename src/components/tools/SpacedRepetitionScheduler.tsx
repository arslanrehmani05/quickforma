import React, { useState } from "react";
import { Brain, Calendar, Clock, RefreshCw } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SpacedRepetitionScheduler: React.FC = () => {
  // SuperMemo SM-2 spaced repetition algorithm simulator
  const [repetitionNumber, setRepetitionNumber] = useState<number>(2);
  const [easinessFactor, setEasinessFactor] = useState<number>(2.5); // Default EF 2.5
  const [reviewQuality, setReviewQuality] = useState<number>(4); // Scale 0-5

  // SM-2 update formula:
  // EF' = max(1.3, EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
  const newEf = Math.max(1.3, easinessFactor + (0.1 - (5 - reviewQuality) * (0.08 + (5 - reviewQuality) * 0.02)));

  // SM-2 interval logic:
  // If q < 3 (failure/lapse): repetition resets to 1, interval is 1 day.
  // If q >= 3 (success):
  //   n = 1: 1 day
  //   n = 2: 6 days
  //   n > 2: I(n) = round(I(n-1) * newEf)
  const isLapse = reviewQuality < 3;
  const nextRepetitionCount = isLapse ? 1 : repetitionNumber + 1;

  const calculateInterval = (rep: number, ef: number) => {
    if (rep <= 1) return 1;
    if (rep === 2) return 6;
    let interval = 6;
    for (let i = 3; i <= rep; i++) {
      interval = Math.round(interval * ef);
    }
    return interval;
  };

  const nextIntervalDays = isLapse ? 1 : calculateInterval(nextRepetitionCount, newEf);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Brain}
            title="Spaced Repetition & SM-2 Interval Flashcard Scheduler"
            description="Simulate the SuperMemo SM-2 algorithm to schedule optimal review intervals and update item Easiness Factor (EF)."
          />
          <ResetButton onReset={() => {
            setRepetitionNumber(2);
            setEasinessFactor(2.5);
            setReviewQuality(4);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Current Repetition Count (n)"
            type="number"
            min={1}
            max={20}
            value={repetitionNumber}
            onChange={(e) => setRepetitionNumber(Math.max(1, Number(e.target.value)))}
          />
          <InputField
            label="Current Easiness Factor (EF)"
            type="number"
            min={1.3}
            max={3.5}
            step={0.1}
            value={easinessFactor}
            onChange={(e) => setEasinessFactor(Math.max(1.3, Number(e.target.value)))}
          />
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Recall Quality Score (0 to 5)
            </label>
            <select
              value={reviewQuality}
              onChange={(e) => setReviewQuality(Number(e.target.value))}
              className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
            >
              <option value={5}>5 - Perfect Recall (No hesitation)</option>
              <option value={4}>4 - Correct Response (Hesitant)</option>
              <option value={3}>3 - Correct with Serious Difficulty</option>
              <option value={2}>2 - Incorrect (Where the right one was easy to recall)</option>
              <option value={1}>1 - Incorrect (Familiar upon seeing)</option>
              <option value={0}>0 - Complete Blackout</option>
            </select>
          </div>
        </div>

        <ResultCard variant="dark" title="Next Review Schedule">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Next Review Due In</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">{nextIntervalDays} {nextIntervalDays === 1 ? "day" : "days"}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {isLapse ? "Reset to interval I(1) (Lapse)" : `Review interval I(${nextRepetitionCount})`}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Updated Easiness (EF)</span>
              <p className="text-4xl font-extrabold text-white mt-1">{newEf.toFixed(2)}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Min bound: 1.30</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Retention Confidence</span>
              <p className="text-sm font-bold text-slate-200 mt-1">
                {reviewQuality >= 4 ? "High Retention (Expanding Gap)" : reviewQuality === 3 ? "Borderline (Reinforce Soon)" : "Reset Repetition (Lapse)"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
