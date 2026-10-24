import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, Grid, CheckCircle2, Heart, Award, Sparkles } from 'lucide-react';

interface SpatialSequenceGameProps {
  onBack: () => void;
}

type Phase = 'idle' | 'demonstrating' | 'recalling' | 'round-success' | 'round-fail' | 'game-over';

const GRID_CELLS = 16; // 4x4 grid (0 to 15)

export const SpatialSequenceGame: React.FC<SpatialSequenceGameProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [sequenceLength, setSequenceLength] = useState<number>(3);
  const [highestSpan, setHighestSpan] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);

  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const currentSequenceRef = useRef<number[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate random sequence without immediate duplicates
  const generateSequence = (length: number): number[] => {
    const seq: number[] = [];
    while (seq.length < length) {
      const next = Math.floor(Math.random() * GRID_CELLS);
      if (seq.length === 0 || seq[seq.length - 1] !== next) {
        seq.push(next);
      }
    }
    return seq;
  };

  const startRound = (length: number) => {
    const seq = generateSequence(length);
    currentSequenceRef.current = seq;
    setPlayerInput([]);
    setPhase('demonstrating');

    // Play through sequence
    let step = 0;
    const playNext = () => {
      if (step < seq.length) {
        setActiveCell(seq[step]);
        timeoutRef.current = setTimeout(() => {
          setActiveCell(null);
          step++;
          timeoutRef.current = setTimeout(playNext, 200);
        }, 550);
      } else {
        setActiveCell(null);
        setPhase('recalling');
      }
    };

    timeoutRef.current = setTimeout(playNext, 600);
  };

  const handleStartGame = () => {
    setSequenceLength(3);
    setHighestSpan(0);
    setLives(3);
    setScore(0);
    startRound(3);
  };

  const handleCellClick = (cellIndex: number) => {
    if (phase !== 'recalling') return;

    const nextInput = [...playerInput, cellIndex];
    setPlayerInput(nextInput);
    setActiveCell(cellIndex);
    setTimeout(() => setActiveCell(null), 200);

    const stepIndex = nextInput.length - 1;
    const expected = currentSequenceRef.current[stepIndex];

    if (cellIndex !== expected) {
      // Mistake made
      const nextLives = lives - 1;
      setLives(nextLives);
      setPhase('round-fail');

      if (nextLives <= 0) {
        timeoutRef.current = setTimeout(() => {
          setPhase('game-over');
        }, 1200);
      } else {
        timeoutRef.current = setTimeout(() => {
          // Retry same sequence length
          startRound(sequenceLength);
        }, 1200);
      }
      return;
    }

    // Correct tap so far
    if (nextInput.length === currentSequenceRef.current.length) {
      // Round successfully completed
      const nextSpan = Math.max(highestSpan, sequenceLength);
      setHighestSpan(nextSpan);
      setScore((s) => s + sequenceLength * 100);
      setPhase('round-success');

      timeoutRef.current = setTimeout(() => {
        const nextLen = sequenceLength + 1;
        setSequenceLength(nextLen);
        startRound(nextLen);
      }, 1200);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mind Suite
        </button>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
          <Grid className="w-3.5 h-3.5" />
          Spatial Sequence Memory
        </div>
      </div>

      {phase === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Grid className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Spatial Sequence Memory
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based on the Corsi block-tapping paradigm. Watch blocks flash in sequence across the 4×4 grid,
              then tap them back in the exact order. Sequences lengthen with each success.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Starting Span</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">3 Blocks</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Lives Allowed</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">3 Strikes</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Input Mode</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Tap / Click</p>
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

      {(phase === 'demonstrating' ||
        phase === 'recalling' ||
        phase === 'round-success' ||
        phase === 'round-fail') && (
        <div className="space-y-6 max-w-md mx-auto">
          {/* Top Status Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                Sequence Length: {sequenceLength}
              </span>
              <span className="text-xs font-bold text-slate-700">
                Score: {score}
              </span>
            </div>

            {/* Lives */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 ${
                    i < lives
                      ? 'fill-rose-500 text-rose-500'
                      : 'fill-slate-200 text-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Grid Container */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-center h-6">
              {phase === 'demonstrating' && (
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 animate-pulse">
                  Watch Sequence...
                </span>
              )}
              {phase === 'recalling' && (
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-700">
                  Your Turn: Tap in Order ({playerInput.length}/{sequenceLength})
                </span>
              )}
              {phase === 'round-success' && (
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Correct Sequence!
                </span>
              )}
              {phase === 'round-fail' && (
                <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
                  Incorrect Order!
                </span>
              )}
            </div>

            {/* 4x4 Interactive Grid */}
            <div className="grid grid-cols-4 gap-3 w-64 h-64 sm:w-80 sm:h-80 mx-auto">
              {Array.from({ length: GRID_CELLS }).map((_, idx) => {
                const isLit = activeCell === idx;
                const isClickedThisRound = playerInput.includes(idx);

                return (
                  <button
                    key={idx}
                    disabled={phase !== 'recalling'}
                    onClick={() => handleCellClick(idx)}
                    className={`rounded-2xl border-2 transition-all duration-150 relative flex items-center justify-center ${
                      isLit
                        ? 'bg-indigo-600 border-indigo-700 shadow-lg scale-95 ring-4 ring-indigo-200'
                        : isClickedThisRound && phase === 'recalling'
                        ? 'bg-indigo-50 border-indigo-300'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    } ${phase !== 'recalling' ? 'cursor-default' : 'cursor-pointer active:scale-95'}`}
                  >
                    {isLit && (
                      <Sparkles className="w-5 h-5 text-white animate-spin" />
                    )}
                  </button>
                );
              })}
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
              You exercised your visuospatial working memory and ordered sequence recall.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Max Spatial Span</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">{highestSpan}</p>
              <span className="text-xs text-slate-500">blocks in order</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Final Score</span>
              <p className="text-3xl font-black text-slate-900 mt-1">{score}</p>
              <span className="text-xs text-slate-500">points accumulated</span>
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
