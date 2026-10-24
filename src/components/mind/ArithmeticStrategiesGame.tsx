import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, RotateCcw, Calculator, CheckCircle2, XCircle, Award, Sparkles } from 'lucide-react';

interface ArithmeticStrategiesGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'round-feedback' | 'results';

interface StrategyProblem {
  strategyName: string;
  problemText: string;
  answer: number;
  options: number[];
  stepsExplanation: string[];
}

const STRATEGY_PROBLEMS: StrategyProblem[] = [
  {
    strategyName: 'Rounding & Compensation (A × (B - 1))',
    problemText: 'Calculate: 38 × 19',
    answer: 722,
    options: [722, 742, 692, 712],
    stepsExplanation: [
      '1. Round 19 to friendly number 20: 38 × 20 = 760',
      '2. Subtract the extra single 38: 760 - 38 = 722',
      'Mental shortcut: 38 × (20 - 1) = 760 - 38 = 722',
    ],
  },
  {
    strategyName: 'Doubling and Halving (2A × B/2)',
    problemText: 'Calculate: 24 × 25',
    answer: 600,
    options: [600, 580, 620, 650],
    stepsExplanation: [
      '1. Halve 24 to 12, double 25 to 50: 12 × 50',
      '2. Halve 12 to 6, double 50 to 100: 6 × 100 = 600',
      'Mental shortcut: Halving one term while doubling the other keeps the product invariant.',
    ],
  },
  {
    strategyName: 'Decomposition / 15× Rule (10× + 5×)',
    problemText: 'Calculate: 48 × 15',
    answer: 720,
    options: [720, 740, 680, 760],
    stepsExplanation: [
      '1. Multiply 48 by 10 = 480',
      '2. Half of 480 is 240 (which equals 48 × 5)',
      '3. Sum them: 480 + 240 = 720',
    ],
  },
  {
    strategyName: 'Difference of Two Squares ((X - D)(X + D) = X² - D²)',
    problemText: 'Calculate: 49 × 51',
    answer: 2499,
    options: [2499, 2501, 2489, 2479],
    stepsExplanation: [
      '1. Notice both numbers are symmetrically 1 away from 50: (50 - 1) × (50 + 1)',
      '2. Algebraic rule: (X - D)(X + D) = X² - D²',
      '3. Compute 50² - 1² = 2500 - 1 = 2499',
    ],
  },
  {
    strategyName: 'Multiplying by 5 (10× / 2)',
    problemText: 'Calculate: 184 × 5',
    answer: 920,
    options: [920, 940, 880, 910],
    stepsExplanation: [
      '1. Multiply by 10: 184 × 10 = 1,840',
      '2. Divide by 2: 1,840 / 2 = 920',
      'Mental shortcut: Multiplying by 5 is always equivalent to halving after adding a zero.',
    ],
  },
  {
    strategyName: 'Squaring Numbers Ending in 5 (N5² = N(N+1) followed by 25)',
    problemText: 'Calculate: 65²',
    answer: 4225,
    options: [4225, 4125, 4325, 4255],
    stepsExplanation: [
      '1. Take the leading tens digit (6) and multiply by next integer (7): 6 × 7 = 42',
      '2. Append 25 to the end: 4225',
      'Vedic / mental math rule: Any number ending in 5 squared ends in 25 preceded by n × (n + 1).',
    ],
  },
];

export const ArithmeticStrategiesGame: React.FC<ArithmeticStrategiesGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [problemIndex, setProblemIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const handleStartGame = () => {
    setProblemIndex(0);
    setScore(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setLastCorrect(null);
    setGameState('playing');
  };

  const handleSelectOption = (choice: number) => {
    if (gameState !== 'playing') return;

    setSelectedOption(choice);
    const p = STRATEGY_PROBLEMS[problemIndex];
    const isCorrect = choice === p.answer;
    setLastCorrect(isCorrect);
    setGameState('round-feedback');

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setScore((s) => s + 250);
    }
  };

  const handleNext = () => {
    const next = problemIndex + 1;
    if (next >= STRATEGY_PROBLEMS.length) {
      setGameState('results');
    } else {
      setProblemIndex(next);
      setSelectedOption(null);
      setLastCorrect(null);
      setGameState('playing');
    }
  };

  const currentProblem = STRATEGY_PROBLEMS[problemIndex];

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
          <Calculator className="w-3.5 h-3.5" />
          Mental Arithmetic Strategies
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Calculator className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Mental Arithmetic Strategies
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Master elegant mental decomposition techniques including rounding compensation, doubling/halving, difference of
              squares, and Vedic shortcut formulas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Focus</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Decomposition &amp; Shortcuts</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Problems</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{STRATEGY_PROBLEMS.length} Strategic Drills</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Arithmetic Strategies
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'round-feedback') && currentProblem && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              Problem {problemIndex + 1} of {STRATEGY_PROBLEMS.length}
            </span>
            <div className="text-xs font-bold text-slate-800">
              Score: {score} pts
            </div>
          </div>

          {/* Problem Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-extrabold uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
                Strategy: {currentProblem.strategyName}
              </span>
              <div className="py-6">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  {currentProblem.problemText.replace('Calculate: ', '')}
                </span>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-3">
              {currentProblem.options.map((opt) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === currentProblem.answer;

                let btnClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                if (gameState === 'round-feedback') {
                  if (isCorrect) btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200';
                  else if (isSelected && !isCorrect) btnClass = 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-200';
                }

                return (
                  <button
                    key={opt}
                    disabled={gameState !== 'playing'}
                    onClick={() => handleSelectOption(opt)}
                    className={`py-3.5 px-4 rounded-2xl border-2 font-bold text-base transition-all active:scale-95 disabled:cursor-default ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Step-by-Step Mental Explanation */}
            {gameState === 'round-feedback' && (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className={`p-5 rounded-2xl border text-xs space-y-2 ${
                  lastCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <span className="font-black uppercase tracking-wider block">
                    {lastCorrect ? '✓ Correct Answer!' : 'Step-by-Step Mental Shortcut:'}
                  </span>
                  <ul className="space-y-1 font-medium text-slate-700">
                    {currentProblem.stepsExplanation.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all"
                >
                  {problemIndex + 1 >= STRATEGY_PROBLEMS.length ? 'View Final Results' : 'Next Strategy Drill →'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {gameState === 'results' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Drills Completed!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on mental decomposition, compensation, and algebraic shortcut execution.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Correct Drills</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">{correctCount} / {STRATEGY_PROBLEMS.length}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Total Score</span>
              <p className="text-3xl font-black text-slate-900 mt-1">{score}</p>
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
