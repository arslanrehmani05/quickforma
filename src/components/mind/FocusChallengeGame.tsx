import React, { useState, useEffect, useRef } from 'react';
import { Target, RotateCcw, ArrowLeft, Clock, CheckCircle2, XCircle, Flame, Play, Eye } from 'lucide-react';

interface FocusChallengeGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'results';

export const FocusChallengeGame: React.FC<FocusChallengeGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [hitsCount, setHitsCount] = useState<number>(0);
  const [missesCount, setMissesCount] = useState<number>(0);
  const [falseAlarmsCount, setFalseAlarmsCount] = useState<number>(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);

  const [currentSymbol, setCurrentSymbol] = useState<number>(7);
  const [targetSymbol, setTargetSymbol] = useState<number>(8);
  const [feedback, setFeedback] = useState<'hit' | 'miss' | 'false_alarm' | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<NodeJS.Timeout | null>(null);
  
  // High-resolution monotonic timestamp tracking (performance.now())
  const stimulusTimeRef = useRef<number>(0);
  const currentSymbolRef = useRef<number>(7);
  const hasRespondedRef = useRef<boolean>(false);

  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setScore(0);
    setHitsCount(0);
    setMissesCount(0);
    setFalseAlarmsCount(0);
    setReactionTimes([]);
    setFeedback(null);

    const target = 8;
    setTargetSymbol(target);
    const initialSym = 7;
    setCurrentSymbol(initialSym);
    currentSymbolRef.current = initialSym;
    hasRespondedRef.current = false;
    stimulusTimeRef.current = performance.now();
  };

  // Main 60s Countdown Timer
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            if (streamRef.current) clearInterval(streamRef.current);
            setGameState('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Rapid Stimulus Stream (updates symbol every 750ms)
      streamRef.current = setInterval(() => {
        // Check if previous symbol was target and user missed it
        if (currentSymbolRef.current === 8 && !hasRespondedRef.current) {
          setMissesCount((m) => m + 1);
        }

        // Pick next symbol (30% chance of target 8, 70% chance of random number 1-9 except 8)
        let nextSym = 8;
        if (Math.random() > 0.3) {
          const pool = [1, 2, 3, 4, 5, 6, 7, 9];
          nextSym = pool[Math.floor(Math.random() * pool.length)];
        }

        setCurrentSymbol(nextSym);
        currentSymbolRef.current = nextSym;
        hasRespondedRef.current = false;
        stimulusTimeRef.current = performance.now();
      }, 750);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) clearInterval(streamRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) clearInterval(streamRef.current);
    };
  }, [gameState]);

  // High-precision Tap / Response Handler
  const handleUserTap = () => {
    if (gameState !== 'playing' || hasRespondedRef.current) return;

    const responseTimeMs = performance.now() - stimulusTimeRef.current;
    hasRespondedRef.current = true;

    if (currentSymbolRef.current === targetSymbol) {
      // HIT!
      const preciseMs = Math.round(responseTimeMs);
      setHitsCount((h) => h + 1);
      setScore((s) => s + 1);
      setReactionTimes((arr) => [...arr, preciseMs]);
      setFeedback('hit');
    } else {
      // FALSE ALARM!
      setFalseAlarmsCount((f) => f + 1);
      setFeedback('false_alarm');
    }

    setTimeout(() => {
      setFeedback(null);
    }, 250);
  };

  // Keyboard shortcut listener (Spacebar / Enter to tap)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'playing' && (e.code === 'Space' || e.code === 'Enter')) {
        e.preventDefault();
        handleUserTap();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const totalEvents = hitsCount + missesCount + falseAlarmsCount;
  const accuracyPercentage = totalEvents > 0 ? Math.round((hitsCount / totalEvents) * 100) : 0;
  const avgReactionTime = reactionTimes.length > 0
    ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
    : 0;

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Eye className="w-4 h-4" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Focus Challenge
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                QuickForma Mind
              </span>
            </h1>
            <p className="text-xs text-slate-500">Test sustained attention, reaction speed, and impulse control</p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Mind Hub
        </button>
      </div>

      {/* IDLE SCREEN */}
      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
            <Eye className="w-8 h-8" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Attention & Reaction Speed
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              60 seconds. A rapid stream of numbers will appear. <strong>TAP or press SPACE</strong> as fast as you can ONLY when target number <span className="inline-block bg-indigo-100 text-indigo-800 font-extrabold px-2 py-0.5 rounded-md">8</span> appears!
            </p>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-lg shadow-md hover:shadow-lg transition-all inline-flex items-center gap-3"
          >
            <Play className="w-5 h-5 fill-white" /> Start Focus Challenge (60s)
          </button>
        </div>
      )}

      {/* PLAYING SCREEN */}
      {gameState === 'playing' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className={`p-4 rounded-2xl border ${timeLeft <= 10 ? 'bg-amber-50 border-amber-200 text-amber-700 animate-pulse' : 'bg-white border-slate-200'}`}>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Time Left</div>
              <div className="text-2xl sm:text-3xl font-extrabold"><Clock className="w-5 h-5 text-amber-500 inline mr-1" />{timeLeft}s</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Hits</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{hitsCount}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Misses</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">{missesCount}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">False Alarms</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-600">{falseAlarmsCount}</div>
            </div>
          </div>

          <div className={`p-8 sm:p-12 rounded-3xl border text-center space-y-6 bg-white transition-all ${
            feedback === 'hit'
              ? 'border-emerald-400 ring-4 ring-emerald-100 bg-emerald-50/30'
              : feedback === 'false_alarm'
              ? 'border-rose-400 ring-4 ring-rose-100 bg-rose-50/30'
              : 'border-slate-200 shadow-xs'
          }`}>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Target: TAP ONLY ON <span className="text-indigo-600 font-extrabold text-sm">8</span> (Or Press Space)
            </div>

            {/* Stimulus Stream Display */}
            <div className="text-7xl sm:text-9xl font-black text-slate-900 font-mono tracking-tight my-4">
              {currentSymbol}
            </div>

            {/* Tap Action Area Button */}
            <button
              onClick={handleUserTap}
              className="w-full max-w-sm py-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-black text-2xl shadow-lg hover:shadow-xl transition-all tracking-wider transform active:scale-95 select-none"
            >
              TAP NOW (SPACE) 🎯
            </button>
          </div>
        </div>
      )}

      {/* RESULTS SCREEN */}
      {gameState === 'results' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs text-center space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">Sprint Complete</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Focus Challenge Summary</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
              <div className="text-xl font-black text-slate-900">{hitsCount}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Target Hits</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <XCircle className="w-5 h-5 text-rose-500 mx-auto" />
              <div className="text-xl font-black text-slate-900">{falseAlarmsCount}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">False Alarms</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <Target className="w-5 h-5 text-indigo-500 mx-auto" />
              <div className="text-xl font-black text-slate-900">{accuracyPercentage}%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <Clock className="w-5 h-5 text-amber-500 mx-auto" />
              <div className="text-xl font-black text-slate-900">{avgReactionTime} ms</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Reaction Time</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={handleStartGame} className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base flex items-center gap-2"><RotateCcw className="w-4 h-4" /> Play Again</button>
            <button onClick={onBack} className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base">Back to Mind Hub</button>
          </div>
        </div>
      )}
    </div>
  );
};
