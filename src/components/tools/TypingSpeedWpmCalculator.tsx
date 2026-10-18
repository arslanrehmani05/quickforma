import React, { useState, useEffect } from "react";
import { Keyboard, CheckCircle2, RotateCcw, Zap } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TypingSpeedWpmCalculator: React.FC = () => {
  const samplePrompt = "Accurate inventory tracking and real-time cash flow management are essential foundations for sustainable ecommerce operations.";
  const [userInput, setUserInput] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  useEffect(() => {
    let interval: any = null;
    if (startTime && !endTime) {
      interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTime, endTime]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (!startTime && val.length > 0) {
      const now = Date.now();
      setStartTime(now);
      setCurrentTime(now);
    }
    setUserInput(val);
    if (val === samplePrompt) {
      setEndTime(Date.now());
    }
  };

  const elapsedSeconds = startTime
    ? Math.max(0.5, ((endTime || currentTime) - startTime) / 1000)
    : 0;

  // Words = total typed characters / 5 (Standard typing test standard)
  const typedWords = userInput.length / 5;
  const minutes = elapsedSeconds / 60;
  const grossWpm = minutes > 0 && userInput.length > 0 ? Math.round(typedWords / minutes) : 0;

  // Uncorrected errors
  let uncorrectedErrors = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] !== samplePrompt[i]) {
      uncorrectedErrors++;
    }
  }

  const accuracyPct = userInput.length > 0 ? Math.max(0, ((userInput.length - uncorrectedErrors) / userInput.length) * 100) : 100;
  const netWpm = Math.max(0, Math.round(grossWpm * (accuracyPct / 100)));

  const handleReset = () => {
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    setCurrentTime(Date.now());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Keyboard}
            title="Typing Speed (WPM) & Keystroke Accuracy Test"
            description="Test your Words Per Minute (WPM), net typing speed, and typographical accuracy in real-time."
          />
          <ResetButton onReset={handleReset} />
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Prompt to Type</span>
          <p className="text-sm font-mono text-slate-800 leading-relaxed select-none">{samplePrompt}</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Type the Text Here
          </label>
          <textarea
            rows={3}
            value={userInput}
            onChange={handleInputChange}
            placeholder="Start typing the prompt above to begin timer..."
            className="w-full text-sm font-mono p-3 rounded-2xl border border-slate-200 bg-white"
          />
        </div>

        <ResultCard variant="dark" title="Typing Performance">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Net Speed</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">{netWpm} WPM</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Net Words Per Minute</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Accuracy</span>
              <p className="text-4xl font-extrabold text-white mt-1">{accuracyPct.toFixed(1)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">{uncorrectedErrors} typo(s)</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Gross Speed</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">{grossWpm} WPM</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Raw speed</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Elapsed Time</span>
              <p className="text-2xl font-mono font-bold text-slate-200 mt-1">{elapsedSeconds.toFixed(1)}s</p>
              <span className="text-[11px] text-slate-300 mt-1 block">{userInput.length} chars typed</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
