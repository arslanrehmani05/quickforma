import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, Scale, Clock, CheckCircle2, Award } from 'lucide-react';

interface NumberComparisonGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'results';

interface ComparisonTrial {
  exprA: string;
  valA: number;
  exprB: string;
  valB: number;
  correctAnswer: 'A' | 'B' | 'equal';
  explanation: string;
}

export const NumberComparisonGame: React.FC<NumberComparisonGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);

  const [currentTrial, setCurrentTrial] = useState<ComparisonTrial | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateTrial = (): ComparisonTrial => {
    const type = Math.floor(Math.random() * 4);
    let exprA = '';
    let valA = 0;
    let exprB = '';
    let valB = 0;
    let explanation = '';

    if (type === 0) {
      // Fraction comparison: a/b vs c/d
      const b = 5 + Math.floor(Math.random() * 15);
      const a = Math.floor(Math.random() * (b - 2)) + 1;
      const d = b + (Math.random() < 0.5 ? 2 : -2);
      const c = Math.round(a * (d / b)) + (Math.random() < 0.5 ? 1 : -1);

      valA = a / b;
      valB = c / d;
      exprA = `${a} / ${b}`;
      exprB = `${c} / ${d}`;
      explanation = `${exprA} = ${valA.toFixed(3)}, ${exprB} = ${valB.toFixed(3)}`;
    } else if (type === 1) {
      // Percentage comparison: P1% of N1 vs P2% of N2
      const p1 = (10 + Math.floor(Math.random() * 8) * 5); // 10% to 50%
      const n1 = 60 + Math.floor(Math.random() * 10) * 10;
      const p2 = p1 + (Math.random() < 0.5 ? 10 : -10);
      const n2 = Math.round((p1 * n1) / p2) + (Math.random() < 0.5 ? 10 : -10);

      valA = (p1 / 100) * n1;
      valB = (p2 / 100) * n2;
      exprA = `${p1}% of ${n1}`;
      exprB = `${p2}% of ${n2}`;
      explanation = `${exprA} = ${valA.toFixed(1)}, ${exprB} = ${valB.toFixed(1)}`;
    } else if (type === 2) {
      // Multiplication vs Addition/Power
      const n = 12 + Math.floor(Math.random() * 15);
      const mult = 15 + Math.floor(Math.random() * 10);
      valA = n * mult;
      exprA = `${n} × ${mult}`;

      const target = valA + (Math.floor(Math.random() * 30) - 15);
      const n2 = Math.round(target / 10) * 10;
      valB = n2;
      exprB = `${n2}`;
      explanation = `${exprA} = ${valA}, compare to ${valB}`;
    } else {
      // Square Root vs Decimal
      const sq = 30 + Math.floor(Math.random() * 60);
      valA = Math.sqrt(sq);
      exprA = `√${sq}`;

      const approx = (Math.round(valA * 10) / 10) + (Math.random() < 0.5 ? 0.3 : -0.3);
      valB = approx;
      exprB = `${approx.toFixed(1)}`;
      explanation = `√${sq} ≈ ${valA.toFixed(2)}, compare to ${valB.toFixed(2)}`;
    }

    let correctAnswer: 'A' | 'B' | 'equal';
    if (Math.abs(valA - valB) < 0.001) {
      correctAnswer = 'equal';
    } else if (valA > valB) {
      correctAnswer = 'A';
    } else {
      correctAnswer = 'B';
    }

    return {
      exprA,
      valA,
      exprB,
      valB,
      correctAnswer,
      explanation,
    };
  };

  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setFeedback(null);

    setCurrentTrial(generateTrial());
  };

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setGameState('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const handleChoice = (choice: 'A' | 'B' | 'equal') => {
    if (!currentTrial || gameState !== 'playing') return;

    const isCorrect = choice === currentTrial.correctAnswer;

    if (isCorrect) {
      setFeedback('correct');
      setCorrectCount((c) => c + 1);
      setScore((s) => s + 100);
    } else {
      setFeedback('incorrect');
      setIncorrectCount((c) => c + 1);
      setScore((s) => Math.max(0, s - 50));
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentTrial(generateTrial());
    }, 150);
  };

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mind Suite
        </button>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          Numerical Magnitude Comparison
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Scale className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Number Comparison &amp; Estimation
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Test your approximate numerical magnitude intuition. Compare rational fractions, square roots, and percentages
              side-by-side to judge which expression yields the larger value.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Duration</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">60 Seconds</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Focus</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Relative Magnitude</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Controls</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">A vs B vs Equal</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Start 60s Sprint
          </button>
        </div>
      )}

      {gameState === 'playing' && currentTrial && (
        <div className="space-y-6 max-w-xl mx-auto">
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

          {/* Comparison Panels */}
          <div className={`bg-white border-2 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 transition-all ${
            feedback === 'correct' ? 'border-emerald-400 bg-emerald-50/20' : feedback === 'incorrect' ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
          }`}>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 text-center block">
              Which expression is larger?
            </span>

            <div className="grid grid-cols-2 gap-4">
              {/* Option A */}
              <button
                onClick={() => handleChoice('A')}
                className="p-6 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all active:scale-95 group text-center"
              >
                <span className="text-xs font-extrabold uppercase text-slate-400 group-hover:text-indigo-600">
                  Expression A
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-indigo-700">
                  {currentTrial.exprA}
                </span>
              </button>

              {/* Option B */}
              <button
                onClick={() => handleChoice('B')}
                className="p-6 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all active:scale-95 group text-center"
              >
                <span className="text-xs font-extrabold uppercase text-slate-400 group-hover:text-indigo-600">
                  Expression B
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-indigo-700">
                  {currentTrial.exprB}
                </span>
              </button>
            </div>

            {/* Equal Button */}
            <div className="text-center pt-1">
              <button
                onClick={() => handleChoice('equal')}
                className="py-2.5 px-6 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 transition-all active:scale-95"
              >
                Both Are Equal (A = B)
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
            <h2 className="text-2xl font-black text-slate-900">Sprint Finished!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on approximate numerical comparison and fraction magnitude discrimination.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Correct Comparisons</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">{correctCount}</p>
              <span className="text-xs text-slate-500">{correctCount + incorrectCount} trials attempted</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Score</span>
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
