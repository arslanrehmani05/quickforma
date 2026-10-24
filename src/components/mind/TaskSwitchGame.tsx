import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, Shuffle, Clock, CheckCircle2, Award } from 'lucide-react';

interface TaskSwitchGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'results';
type ActiveRule = 'parity' | 'magnitude';

interface SwitchTrial {
  digit: number;
  rule: ActiveRule;
  isSwitch: boolean;
  correctAnswer: 'left' | 'right';
  leftLabel: string;
  rightLabel: string;
}

export const TaskSwitchGame: React.FC<TaskSwitchGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);

  // Latencies for switch cost
  const [repeatLatencies, setRepeatLatencies] = useState<number[]>([]);
  const [switchLatencies, setSwitchLatencies] = useState<number[]>([]);

  const [currentTrial, setCurrentTrial] = useState<SwitchTrial | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const prevRuleRef = useRef<ActiveRule | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const trialStartTimeRef = useRef<number>(0);

  const generateTrial = (): SwitchTrial => {
    // 50% switch probability
    const rule: ActiveRule = prevRuleRef.current
      ? Math.random() < 0.5
        ? prevRuleRef.current
        : prevRuleRef.current === 'parity'
        ? 'magnitude'
        : 'parity'
      : Math.random() < 0.5
      ? 'parity'
      : 'magnitude';

    const isSwitch = prevRuleRef.current !== null && prevRuleRef.current !== rule;
    prevRuleRef.current = rule;

    // Pick a number 1 to 9 (excluding 5 for clean magnitude)
    const validDigits = [1, 2, 3, 4, 6, 7, 8, 9];
    const digit = validDigits[Math.floor(Math.random() * validDigits.length)];

    let correctAnswer: 'left' | 'right';
    let leftLabel: string;
    let rightLabel: string;

    if (rule === 'parity') {
      leftLabel = 'Even';
      rightLabel = 'Odd';
      correctAnswer = digit % 2 === 0 ? 'left' : 'right';
    } else {
      leftLabel = 'Low (<5)';
      rightLabel = 'High (>5)';
      correctAnswer = digit < 5 ? 'left' : 'right';
    }

    return {
      digit,
      rule,
      isSwitch,
      correctAnswer,
      leftLabel,
      rightLabel,
    };
  };

  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setRepeatLatencies([]);
    setSwitchLatencies([]);
    setFeedback(null);
    prevRuleRef.current = null;

    const firstTrial = generateTrial();
    setCurrentTrial(firstTrial);
    trialStartTimeRef.current = performance.now();
  };

  useEffect(() => {
    if (gameState === 'playing') {
      gameTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (gameTimerRef.current) clearInterval(gameTimerRef.current);
            setGameState('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    }

    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [gameState]);

  const handleAnswer = (choice: 'left' | 'right') => {
    if (!currentTrial || gameState !== 'playing') return;

    const latency = performance.now() - trialStartTimeRef.current;
    const isCorrect = choice === currentTrial.correctAnswer;

    if (isCorrect) {
      setFeedback('correct');
      setCorrectCount((c) => c + 1);
      const points = currentTrial.isSwitch ? 150 : 100;
      setScore((s) => s + points);

      if (currentTrial.isSwitch) {
        setSwitchLatencies((arr) => [...arr, latency]);
      } else {
        setRepeatLatencies((arr) => [...arr, latency]);
      }
    } else {
      setFeedback('incorrect');
      setIncorrectCount((c) => c + 1);
      setScore((s) => Math.max(0, s - 50));
    }

    setTimeout(() => {
      setFeedback(null);
      const next = generateTrial();
      setCurrentTrial(next);
      trialStartTimeRef.current = performance.now();
    }, 120);
  };

  // Keyboard left/right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        handleAnswer('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        handleAnswer('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const avgRepeat = repeatLatencies.length
    ? Math.round(repeatLatencies.reduce((a, b) => a + b, 0) / repeatLatencies.length)
    : 0;
  const avgSwitch = switchLatencies.length
    ? Math.round(switchLatencies.reduce((a, b) => a + b, 0) / switchLatencies.length)
    : 0;
  const switchCost = avgSwitch > 0 && avgRepeat > 0 ? Math.max(0, avgSwitch - avgRepeat) : 0;

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
          <Shuffle className="w-3.5 h-3.5" />
          Cognitive Task Switching
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Shuffle className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Task Switching Challenge
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Test your cognitive flexibility and mental set-shifting. A top cue indicates which classification rule applies.
              Rapidly adapt as the rule switches between <strong>Even/Odd</strong> and <strong>High/Low</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900">
              <span className="font-extrabold text-xs uppercase tracking-wider block">Rule: Parity</span>
              <p className="text-xs text-indigo-700 mt-1">Classify as <strong>Even</strong> or <strong>Odd</strong></p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
              <span className="font-extrabold text-xs uppercase tracking-wider block">Rule: Magnitude</span>
              <p className="text-xs text-amber-700 mt-1">Classify as <strong>Low (&lt;5)</strong> or <strong>High (&gt;5)</strong></p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Start 60s Session
          </button>
        </div>
      )}

      {gameState === 'playing' && currentTrial && (
        <div className="space-y-6 max-w-lg mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span className="font-black text-xl text-slate-900">{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-600">Score: {score}</span>
              <span className="text-xs font-bold text-emerald-600">✓ {correctCount}</span>
            </div>
          </div>

          {/* Active Rule Cue Banner */}
          <div className={`p-4 rounded-2xl border text-center transition-all ${
            currentTrial.rule === 'parity'
              ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-70 block">
              Active Rule {currentTrial.isSwitch ? '• [RULE SWITCH!]' : '• [Repeat]'}
            </span>
            <span className="text-base font-black uppercase tracking-wide">
              {currentTrial.rule === 'parity' ? 'Classify Parity: Even or Odd' : 'Classify Magnitude: Low or High'}
            </span>
          </div>

          {/* Number Stimulus Card */}
          <div className={`bg-white border-2 rounded-3xl p-8 sm:p-10 shadow-xs text-center space-y-6 transition-all ${
            feedback === 'correct' ? 'border-emerald-400 bg-emerald-50/20' : feedback === 'incorrect' ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
          }`}>
            <div className="py-4">
              <span className="text-7xl font-black text-slate-900 tracking-tighter select-none">
                {currentTrial.digit}
              </span>
            </div>

            {/* Response Options */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer('left')}
                className="py-4 px-4 rounded-2xl border border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50/50 font-bold text-sm text-slate-800 transition-all active:scale-95 flex flex-col items-center justify-center gap-1"
              >
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">[Left / A]</span>
                <span>{currentTrial.leftLabel}</span>
              </button>

              <button
                onClick={() => handleAnswer('right')}
                className="py-4 px-4 rounded-2xl border border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50/50 font-bold text-sm text-slate-800 transition-all active:scale-95 flex flex-col items-center justify-center gap-1"
              >
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">[Right / D]</span>
                <span>{currentTrial.rightLabel}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'results' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Session Complete!</h2>
            <p className="text-sm text-slate-500">
              Cognitive flexibility summary across repeat vs switch rule trials.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Score</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{score}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Accuracy</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">
                {correctCount + incorrectCount > 0
                  ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
                  : 0}
                %
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Switch Cost</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">+{switchCost}ms</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1 text-slate-600">
            <div className="flex justify-between">
              <span>Average Repeat Trial Latency:</span>
              <strong className="text-slate-900">{avgRepeat} ms</strong>
            </div>
            <div className="flex justify-between">
              <span>Average Switch Trial Latency:</span>
              <strong className="text-slate-900">{avgSwitch} ms</strong>
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              * Switch cost reflects the millisecond tax required to disengage from the prior rule and activate the new task set.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleStartGame}
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
