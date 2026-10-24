import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, ListOrdered, CheckCircle2, XCircle, Delete, Eye, Award } from 'lucide-react';

interface SequenceRecallGameProps {
  onBack: () => void;
}

type Phase = 'idle' | 'memorizing' | 'entering' | 'success' | 'failure' | 'game-over';

export const SequenceRecallGame: React.FC<SequenceRecallGameProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [currentSpan, setCurrentSpan] = useState<number>(4);
  const [maxSpanAchieved, setMaxSpanAchieved] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);

  const [activeSequence, setActiveSequence] = useState<number[]>([]);
  const [enteredSequence, setEnteredSequence] = useState<number[]>([]);
  const [displayNumber, setDisplayNumber] = useState<number | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateDigitSequence = (length: number): number[] => {
    const list: number[] = [];
    for (let i = 0; i < length; i++) {
      list.push(Math.floor(Math.random() * 10)); // 0-9
    }
    return list;
  };

  const startRound = (span: number) => {
    const seq = generateDigitSequence(span);
    setActiveSequence(seq);
    setEnteredSequence([]);
    setPhase('memorizing');

    // Present digits one by one
    let idx = 0;
    const showDigit = () => {
      if (idx < seq.length) {
        setDisplayNumber(seq[idx]);
        timeoutRef.current = setTimeout(() => {
          setDisplayNumber(null);
          idx++;
          timeoutRef.current = setTimeout(showDigit, 250);
        }, 700);
      } else {
        setDisplayNumber(null);
        setPhase('entering');
      }
    };

    timeoutRef.current = setTimeout(showDigit, 400);
  };

  const handleStartGame = () => {
    setCurrentSpan(4);
    setMaxSpanAchieved(0);
    setLives(3);
    setScore(0);
    startRound(4);
  };

  const handleKeypadPress = (digit: number) => {
    if (phase !== 'entering') return;
    if (enteredSequence.length >= activeSequence.length) return;

    const nextEntered = [...enteredSequence, digit];
    setEnteredSequence(nextEntered);

    // If completed entering full sequence, check answer
    if (nextEntered.length === activeSequence.length) {
      const isCorrect = nextEntered.every((d, i) => d === activeSequence[i]);

      if (isCorrect) {
        setMaxSpanAchieved((m) => Math.max(m, currentSpan));
        setScore((s) => s + currentSpan * 150);
        setPhase('success');

        timeoutRef.current = setTimeout(() => {
          const nextSpan = currentSpan + 1;
          setCurrentSpan(nextSpan);
          startRound(nextSpan);
        }, 1200);
      } else {
        const nextLives = lives - 1;
        setLives(nextLives);
        setPhase('failure');

        if (nextLives <= 0) {
          timeoutRef.current = setTimeout(() => {
            setPhase('game-over');
          }, 1500);
        } else {
          timeoutRef.current = setTimeout(() => {
            startRound(currentSpan);
          }, 1500);
        }
      }
    }
  };

  const handleBackspace = () => {
    if (phase !== 'entering' || enteredSequence.length === 0) return;
    setEnteredSequence((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== 'entering') return;
      if (e.key >= '0' && e.key <= '9') {
        handleKeypadPress(parseInt(e.key, 10));
      } else if (e.key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mind Suite
        </button>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
          <ListOrdered className="w-3.5 h-3.5" />
          Sequence Recall
        </div>
      </div>

      {phase === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <ListOrdered className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Sequential Digit Recall
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Exercise your phonological loop and numerical sequence capacity. Memorize digits flashed one by one,
              then enter the sequence in exact order using the keypad or number keys.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Initial Span</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">4 Digits</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Input</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Keypad / Keyboard</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Lives</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">3 Strikes</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Challenge
          </button>
        </div>
      )}

      {(phase === 'memorizing' ||
        phase === 'entering' ||
        phase === 'success' ||
        phase === 'failure') && (
        <div className="space-y-6 max-w-sm mx-auto">
          {/* Header Stats */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              Span: {currentSpan} Digits
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600">Score: {score}</span>
              <span className="text-xs font-extrabold text-rose-500">Lives: {lives}</span>
            </div>
          </div>

          {/* Flash / Memorize Display */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs text-center space-y-6">
            <div className="h-6">
              {phase === 'memorizing' && (
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 animate-pulse">
                  Memorize Digits...
                </span>
              )}
              {phase === 'entering' && (
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-700">
                  Enter Sequence ({enteredSequence.length}/{currentSpan})
                </span>
              )}
              {phase === 'success' && (
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Correct Sequence!
                </span>
              )}
              {phase === 'failure' && (
                <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
                  Target: {activeSequence.join(' ')}
                </span>
              )}
            </div>

            {/* Stimulus Box */}
            <div className="w-32 h-32 rounded-3xl bg-slate-50 border-2 border-indigo-100 flex items-center justify-center mx-auto shadow-inner">
              {phase === 'memorizing' && displayNumber !== null && (
                <span className="text-6xl font-black text-indigo-600 select-none animate-scale">
                  {displayNumber}
                </span>
              )}
              {phase !== 'memorizing' && (
                <div className="flex gap-1.5 flex-wrap justify-center px-2">
                  {Array.from({ length: currentSpan }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-7 h-9 rounded-lg border flex items-center justify-center font-bold text-sm ${
                        enteredSequence[i] !== undefined
                          ? 'bg-indigo-600 border-indigo-700 text-white'
                          : 'bg-white border-slate-200 text-slate-300'
                      }`}
                    >
                      {enteredSequence[i] !== undefined ? enteredSequence[i] : '•'}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Number Keypad */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  disabled={phase !== 'entering'}
                  onClick={() => handleKeypadPress(num)}
                  className="py-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-800 font-extrabold text-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {num}
                </button>
              ))}
              <button
                disabled={phase !== 'entering' || enteredSequence.length === 0}
                onClick={handleBackspace}
                className="py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center transition-all disabled:opacity-40"
              >
                <Delete className="w-5 h-5" />
              </button>
              <button
                disabled={phase !== 'entering'}
                onClick={() => handleKeypadPress(0)}
                className="py-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-800 font-extrabold text-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                0
              </button>
              <div />
            </div>
          </div>
        </div>
      )}

      {phase === 'game-over' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Session Completed!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on forward digit span and working memory capacity.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Max Digit Span</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">{maxSpanAchieved}</p>
              <span className="text-xs text-slate-500">digits reproduced</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Final Score</span>
              <p className="text-3xl font-black text-slate-900 mt-1">{score}</p>
              <span className="text-xs text-slate-500">points</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleStartGame}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm transition-all"
            >
              Return to Mind Suite
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
