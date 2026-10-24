import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Play, RotateCcw, Brain, CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';

interface DualNBackGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'results';

const LETTERS = ['C', 'H', 'K', 'L', 'Q', 'R', 'S', 'T'];
const GRID_SIZE = 9; // 3x3 grid (0 to 8)
const TOTAL_TRIALS = 20;

interface TrialItem {
  position: number;
  letter: string;
}

export const DualNBackGame: React.FC<DualNBackGameProps> = ({ onBack }) => {
  const [nLevel, setNLevel] = useState<number>(2);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentTrialIndex, setCurrentTrialIndex] = useState<number>(-1);
  const [activeItem, setActiveItem] = useState<TrialItem | null>(null);
  const [showStimulus, setShowStimulus] = useState<boolean>(false);

  // Player responses for current trial
  const [posPressed, setPosPressed] = useState<boolean>(false);
  const [letterPressed, setLetterPressed] = useState<boolean>(false);

  // Stats
  const [posHits, setPosHits] = useState<number>(0);
  const [posMisses, setPosMisses] = useState<number>(0);
  const [posFalseAlarms, setPosFalseAlarms] = useState<number>(0);

  const [letterHits, setLetterHits] = useState<number>(0);
  const [letterMisses, setLetterMisses] = useState<number>(0);
  const [letterFalseAlarms, setLetterFalseAlarms] = useState<number>(0);

  const trialsRef = useRef<TrialItem[]>([]);
  const trialTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate sequence of trials with guaranteed matches (~30% position, ~30% letter)
  const generateTrialSequence = useCallback((n: number, total: number): TrialItem[] => {
    const list: TrialItem[] = [];
    for (let i = 0; i < total; i++) {
      let pos = Math.floor(Math.random() * GRID_SIZE);
      let letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];

      if (i >= n) {
        // Enforce matches periodically
        if (Math.random() < 0.35) {
          pos = list[i - n].position;
        }
        if (Math.random() < 0.35) {
          letter = list[i - n].letter;
        }
      }
      list.push({ position: pos, letter });
    }
    return list;
  }, []);

  const handleStart = () => {
    const sequence = generateTrialSequence(nLevel, TOTAL_TRIALS);
    trialsRef.current = sequence;

    setPosHits(0);
    setPosMisses(0);
    setPosFalseAlarms(0);
    setLetterHits(0);
    setLetterMisses(0);
    setLetterFalseAlarms(0);

    setPosPressed(false);
    setLetterPressed(false);
    setCurrentTrialIndex(0);
    setGameState('playing');
  };

  const evaluateTrialResponses = useCallback((index: number, pPressed: boolean, lPressed: boolean) => {
    if (index < nLevel) return; // Warmup steps can't be scored as matches

    const current = trialsRef.current[index];
    const target = trialsRef.current[index - nLevel];
    if (!current || !target) return;

    const isPosMatch = current.position === target.position;
    const isLetterMatch = current.letter === target.letter;

    // Evaluate Position
    if (isPosMatch) {
      if (pPressed) setPosHits((h) => h + 1);
      else setPosMisses((m) => m + 1);
    } else {
      if (pPressed) setPosFalseAlarms((fa) => fa + 1);
    }

    // Evaluate Letter
    if (isLetterMatch) {
      if (lPressed) setLetterHits((h) => h + 1);
      else setLetterMisses((m) => m + 1);
    } else {
      if (lPressed) setLetterFalseAlarms((fa) => fa + 1);
    }
  }, [nLevel]);

  // Game loop tick
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (currentTrialIndex >= TOTAL_TRIALS) {
      setGameState('results');
      setShowStimulus(false);
      setActiveItem(null);
      return;
    }

    const item = trialsRef.current[currentTrialIndex];
    if (!item) return;

    setActiveItem(item);
    setShowStimulus(true);
    setPosPressed(false);
    setLetterPressed(false);

    // Show stimulus for 1500ms, then ISI (inter-stimulus interval) for 1000ms
    stepTimerRef.current = setTimeout(() => {
      setShowStimulus(false);
    }, 1500);

    trialTimerRef.current = setTimeout(() => {
      evaluateTrialResponses(currentTrialIndex, posPressed, letterPressed);
      setCurrentTrialIndex((prev) => prev + 1);
    }, 2500);

    return () => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
      if (trialTimerRef.current) clearTimeout(trialTimerRef.current);
    };
  }, [gameState, currentTrialIndex, evaluateTrialResponses, posPressed, letterPressed]);

  // Keyboard controls: 'A' for position, 'L' for letter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === 'a' || e.key === 'A') {
        setPosPressed(true);
      }
      if (e.key === 'l' || e.key === 'L') {
        setLetterPressed(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Calculate scores
  const totalPosMatches = trialsRef.current.slice(nLevel).filter((item, i) => item.position === trialsRef.current[i].position).length;
  const totalLetterMatches = trialsRef.current.slice(nLevel).filter((item, i) => item.letter === trialsRef.current[i].letter).length;
  const totalScoredTrials = Math.max(1, TOTAL_TRIALS - nLevel);
  const totalHits = posHits + letterHits;
  const totalOpportunities = Math.max(1, totalPosMatches + totalLetterMatches);
  const accuracyPct = Math.min(100, Math.round((totalHits / totalOpportunities) * 100));

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mind Suite
        </button>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
          <Brain className="w-3.5 h-3.5" />
          Working Memory · Dual N-Back
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Dual N-Back Challenge
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Track a square flashing in a 3×3 grid while listening/reading a simultaneous letter stream.
              Respond when the current position or letter matches the one from exactly <strong>N steps ago</strong>.
            </p>
          </div>

          {/* N Level Selector */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Select Memory Load (N-Level)
            </span>
            <div className="flex justify-center gap-3">
              {[1, 2, 3].map((level) => (
                <button
                  key={level}
                  onClick={() => setNLevel(level)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    nLevel === level
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  N = {level} {level === 1 ? '(Intro)' : level === 2 ? '(Standard)' : '(Advanced)'}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Instructions */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-left text-xs text-slate-600 space-y-2">
            <div className="font-bold text-indigo-900 flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              Keyboard & Touch Controls:
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Press <strong>A</strong> or tap <strong>Position Match</strong> when the grid square matches N steps ago.</li>
              <li>Press <strong>L</strong> or tap <strong>Letter Match</strong> when the letter matches N steps ago.</li>
              <li>The first {nLevel} stimuli are learning steps and cannot match yet.</li>
            </ul>
          </div>

          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Start Session ({TOTAL_TRIALS} Trials)
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-6 max-w-xl mx-auto">
          {/* Progress Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Level N={nLevel}
              </span>
              <span className="text-xs font-bold text-slate-600">
                Trial {Math.min(TOTAL_TRIALS, currentTrialIndex + 1)} of {TOTAL_TRIALS}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-semibold">
              {currentTrialIndex < nLevel ? 'Priming Memory...' : 'Scored Phase'}
            </div>
          </div>

          {/* 3x3 Grid Display */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col items-center justify-center space-y-6">
            <div className="grid grid-cols-3 gap-3 w-64 h-64 sm:w-72 sm:h-72">
              {Array.from({ length: GRID_SIZE }).map((_, idx) => {
                const isActive = showStimulus && activeItem?.position === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border-2 flex items-center justify-center transition-all duration-150 ${
                      isActive
                        ? 'bg-indigo-600 border-indigo-700 shadow-md scale-95'
                        : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    {isActive && (
                      <span className="text-2xl font-black text-white select-none">
                        {activeItem?.letter}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center h-8">
              {showStimulus && activeItem ? (
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Observe Position & Letter &ldquo;{activeItem.letter}&rdquo;
                </div>
              ) : (
                <div className="text-xs font-bold text-slate-400">Updating...</div>
              )}
            </div>
          </div>

          {/* Interactive Response Controls */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setPosPressed(true)}
              className={`p-4 rounded-2xl font-bold text-sm transition-all flex flex-col items-center justify-center gap-1 border ${
                posPressed
                  ? 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-200'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <span className="text-xs font-extrabold uppercase tracking-wider opacity-70">[A] Key</span>
              <span>Position Match</span>
            </button>

            <button
              onClick={() => setLetterPressed(true)}
              className={`p-4 rounded-2xl font-bold text-sm transition-all flex flex-col items-center justify-center gap-1 border ${
                letterPressed
                  ? 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-200'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <span className="text-xs font-extrabold uppercase tracking-wider opacity-70">[L] Key</span>
              <span>Letter Match</span>
            </button>
          </div>
        </div>
      )}

      {gameState === 'results' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Session Complete!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on Level N={nLevel} working memory capacity across {totalScoredTrials} trials.
            </p>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <span className="text-xs font-extrabold text-slate-500 uppercase">Position Stream</span>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Hits:</span>
                  <span className="text-emerald-600">{posHits} / {totalPosMatches}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Misses:</span>
                  <span>{posMisses}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>False Alarms:</span>
                  <span className="text-amber-600">{posFalseAlarms}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <span className="text-xs font-extrabold text-slate-500 uppercase">Letter Stream</span>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Hits:</span>
                  <span className="text-emerald-600">{letterHits} / {totalLetterMatches}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Misses:</span>
                  <span>{letterMisses}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>False Alarms:</span>
                  <span className="text-amber-600">{letterFalseAlarms}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between text-left">
            <div>
              <span className="text-xs font-extrabold text-indigo-700 uppercase tracking-wider">Overall Match Accuracy</span>
              <p className="text-xs text-slate-600">Correct target identifications</p>
            </div>
            <div className="text-2xl font-black text-indigo-700">{accuracyPct}%</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleStart}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
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
