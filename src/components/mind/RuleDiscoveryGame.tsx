import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, HelpCircle, CheckCircle2, XCircle, Award, Lightbulb } from 'lucide-react';

interface RuleDiscoveryGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'round-feedback' | 'results';

interface RuleTrial {
  categoryName: string;
  ruleExplanation: string;
  positiveExamples: string[];
  negativeExamples: string[];
  testItem: string;
  satisfiesRule: boolean;
}

const TOTAL_ROUNDS = 8;

const RULE_BANK: RuleTrial[] = [
  {
    categoryName: 'Number Sequences',
    ruleExplanation: 'The numbers strictly increase by multiples of 3.',
    positiveExamples: ['3, 6, 9', '12, 15, 18', '21, 24, 27'],
    negativeExamples: ['2, 4, 6', '5, 8, 12', '10, 15, 20'],
    testItem: '15, 18, 21',
    satisfiesRule: true,
  },
  {
    categoryName: 'Arithmetic Parity',
    ruleExplanation: 'The sum of all three digits in the triple is strictly an even number.',
    positiveExamples: ['2, 4, 6 (Sum: 12)', '1, 3, 4 (Sum: 8)', '5, 5, 2 (Sum: 12)'],
    negativeExamples: ['1, 2, 4 (Sum: 7)', '3, 4, 6 (Sum: 13)', '2, 2, 3 (Sum: 7)'],
    testItem: '7, 3, 2 (Sum: 12)',
    satisfiesRule: true,
  },
  {
    categoryName: 'Geometric Sides',
    ruleExplanation: 'All listed polygons have 4 or more sides (Quadrilaterals & above).',
    positiveExamples: ['Square, Rectangle, Pentagon', 'Trapezoid, Hexagon, Octagon', 'Rhombus, Square, Decagon'],
    negativeExamples: ['Triangle, Square, Pentagon', 'Triangle, Circle, Hexagon', 'Triangle, Equilateral, Pentagon'],
    testItem: 'Triangle, Rectangle, Square',
    satisfiesRule: false,
  },
  {
    categoryName: 'Divisibility & Multiples',
    ruleExplanation: 'Every number in the list is divisible by 4 without remainder.',
    positiveExamples: ['8, 16, 24', '12, 28, 40', '4, 20, 36'],
    negativeExamples: ['4, 14, 20', '8, 18, 24', '12, 22, 32'],
    testItem: '16, 32, 44',
    satisfiesRule: true,
  },
  {
    categoryName: 'String Length Induction',
    ruleExplanation: 'Words strictly increase in character count from left to right.',
    positiveExamples: ['cat (3), frog (4), tiger (5)', 'ox (2), dog (3), bear (4)', 'a (1), to (2), run (3)'],
    negativeExamples: ['horse (5), dog (3), cat (3)', 'bird (4), hawk (4), crow (4)', 'elephant (8), ant (3), bee (3)'],
    testItem: 'go (2), tree (4), monkey (6)',
    satisfiesRule: true,
  },
  {
    categoryName: 'Vowel Frequency',
    ruleExplanation: 'The word contains exactly two distinct vowels.',
    positiveExamples: ['Boat (o, a)', 'House (o, u, e = 3 vowels? No: Lion (i, o))', 'Rain (a, i)'],
    negativeExamples: ['Tree (only e = 1 vowel)', 'Queue (u, e)', 'Sky (0 vowels)'],
    testItem: 'Cloud (o, u)',
    satisfiesRule: true,
  },
  {
    categoryName: 'Mathematical Extremes',
    ruleExplanation: 'The middle number is strictly the arithmetic mean (average) of the first and last numbers.',
    positiveExamples: ['2, 4, 6 ((2+6)/2 = 4)', '10, 15, 20 ((10+20)/2 = 15)', '1, 5, 9 ((1+9)/2 = 5)'],
    negativeExamples: ['2, 5, 6', '4, 8, 10', '1, 3, 7'],
    testItem: '3, 7, 11 ((3+11)/2 = 7)',
    satisfiesRule: true,
  },
  {
    categoryName: 'Prime Factors',
    ruleExplanation: 'All numbers are prime numbers (have no positive divisors other than 1 and itself).',
    positiveExamples: ['2, 3, 5', '7, 11, 13', '17, 19, 23'],
    negativeExamples: ['3, 5, 9 (9 is composite)', '7, 14, 21', '2, 4, 6'],
    testItem: '11, 13, 15',
    satisfiesRule: false,
  },
];

export const RuleDiscoveryGame: React.FC<RuleDiscoveryGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [roundIndex, setRoundIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const [currentTrial, setCurrentTrial] = useState<RuleTrial | null>(null);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartGame = () => {
    setRoundIndex(0);
    setScore(0);
    setCorrectCount(0);
    setUserChoice(null);
    setLastCorrect(null);

    setCurrentTrial(RULE_BANK[0]);
    setGameState('playing');
  };

  const handleAnswer = (satisfies: boolean) => {
    if (!currentTrial || gameState !== 'playing') return;

    setUserChoice(satisfies);
    const isCorrect = satisfies === currentTrial.satisfiesRule;
    setLastCorrect(isCorrect);
    setGameState('round-feedback');

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setScore((s) => s + 150);
    }

    timerRef.current = setTimeout(() => {
      const nextRound = roundIndex + 1;
      if (nextRound >= TOTAL_ROUNDS) {
        setGameState('results');
      } else {
        setRoundIndex(nextRound);
        setCurrentTrial(RULE_BANK[nextRound]);
        setUserChoice(null);
        setGameState('playing');
      }
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

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
          <HelpCircle className="w-3.5 h-3.5" />
          Rule Discovery &amp; Induction
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <HelpCircle className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Rule Discovery Challenge
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based on the Wason 2-4-6 inductive concept formation paradigm. Inspect examples that follow an undisclosed rule
              and counter-examples that violate it. Deduce the governing rule and predict whether a new test candidate fits.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Method</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Inductive Inference</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Session</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{TOTAL_ROUNDS} Concept Trials</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Rule Induction
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'round-feedback') && currentTrial && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              Round {roundIndex + 1} of {TOTAL_ROUNDS} · {currentTrial.categoryName}
            </span>
            <div className="text-xs font-bold text-slate-800">
              Score: {score} ({correctCount} correct)
            </div>
          </div>

          {/* Evidence Panels: Positive vs Negative Examples */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Positive Examples */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-black uppercase text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Satisfies Hidden Rule:
                </span>
                <ul className="space-y-1.5 text-xs font-bold text-slate-800">
                  {currentTrial.positiveExamples.map((ex, i) => (
                    <li key={i} className="bg-white/80 px-3 py-1.5 rounded-lg border border-emerald-100">
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Negative Examples */}
              <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-black uppercase text-rose-800 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" /> Violates Hidden Rule:
                </span>
                <ul className="space-y-1.5 text-xs font-bold text-slate-800">
                  {currentTrial.negativeExamples.map((ex, i) => (
                    <li key={i} className="bg-white/80 px-3 py-1.5 rounded-lg border border-rose-100">
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Test Candidate */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                Does this new candidate satisfy the hidden rule?
              </span>
              <div className="text-2xl font-black text-indigo-700 tracking-wide">
                &ldquo;{currentTrial.testItem}&rdquo;
              </div>

              {gameState === 'round-feedback' && (
                <div className={`p-3 rounded-xl border text-xs font-bold space-y-1 ${
                  lastCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <p>{lastCorrect ? '✓ Correct Inference!' : '✗ Incorrect Prediction!'}</p>
                  <p className="font-normal text-slate-600"><strong>Rule:</strong> {currentTrial.ruleExplanation}</p>
                </div>
              )}
            </div>

            {/* Response Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <button
                disabled={gameState !== 'playing'}
                onClick={() => handleAnswer(true)}
                className="py-4 px-4 rounded-2xl border border-emerald-600 bg-emerald-600 hover:bg-emerald-700 font-bold text-sm text-white transition-all active:scale-95 disabled:opacity-40 shadow-sm"
              >
                Yes, Satisfies Rule
              </button>

              <button
                disabled={gameState !== 'playing'}
                onClick={() => handleAnswer(false)}
                className="py-4 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 font-bold text-sm text-slate-800 transition-all active:scale-95 disabled:opacity-40 shadow-xs"
              >
                No, Violates Rule
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
            <h2 className="text-2xl font-black text-slate-900">Session Completed!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on inductive hypothesis testing and concept formulation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Accuracy</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">
                {correctCount} / {TOTAL_ROUNDS}
              </p>
              <span className="text-xs text-slate-500">{Math.round((correctCount / TOTAL_ROUNDS) * 100)}% correct</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Score</span>
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
