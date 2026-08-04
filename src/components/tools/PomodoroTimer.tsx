import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

export const PomodoroTimer: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let timer: any = null;
    if (isActive && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft(prev => prev - 1), 1000);
    } else if (secondsLeft === 0) {
      if (mode === 'work') {
        setMode('break');
        setSecondsLeft(5 * 60);
      } else {
        setMode('work');
        setSecondsLeft(25 * 60);
      }
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, secondsLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Pomodoro Focus Timer</h2>
            <p className="text-slate-600 text-sm">Minimalist 25/5 minute interval productivity countdown timer.</p>
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-6">
          <div className="inline-flex gap-2 p-1 rounded-xl bg-white border border-slate-200 text-xs shadow-xs">
            <button
              onClick={() => { setMode('work'); setSecondsLeft(25 * 60); setIsActive(false); }}
              className={`px-4 py-1.5 rounded-lg font-bold ${mode === 'work' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
            >
              25 Min Focus
            </button>
            <button
              onClick={() => { setMode('break'); setSecondsLeft(5 * 60); setIsActive(false); }}
              className={`px-4 py-1.5 rounded-lg font-bold ${mode === 'break' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
            >
              5 Min Break
            </button>
          </div>

          <div className="text-6xl sm:text-7xl font-extrabold text-slate-900 font-mono tracking-tight">
            {formattedTime}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={toggleTimer}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isActive ? 'Pause' : 'Start Focus'}</span>
            </button>

            <button
              onClick={resetTimer}
              className="p-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-all"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
