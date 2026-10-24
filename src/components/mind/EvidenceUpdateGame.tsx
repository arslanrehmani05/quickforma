import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, RotateCcw, Percent, CheckCircle2, XCircle, Award, HelpCircle } from 'lucide-react';

interface EvidenceUpdateGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'round-feedback' | 'results';

interface BayesScenario {
  title: string;
  context: string;
  prior: string;
  testSpec: string;
  question: string;
  options: string[];
  correctIndex: number;
  posteriorPct: number;
  explanation: string;
}

const BAYES_SCENARIOS: BayesScenario[] = [
  {
    title: 'Financial Transaction Fraud',
    context: 'A banking system screens millions of credit card transactions.',
    prior: 'Base Rate: 1% of transactions are fraudulent (1 in 100).',
    testSpec: 'AI Detector: 90% Sensitivity (flags 90% of frauds) and 5% False Alarm Rate (flags 5% of legitimate charges).',
    question: 'A transaction is flagged as fraud. What is the actual probability that it is truly fraudulent?',
    options: ['~90.0%', '~15.4%', '~50.0%', '~1.0%'],
    correctIndex: 1, // ~15.4%
    posteriorPct: 15.4,
    explanation: 'Out of 10,000 transactions: 100 are fraud (90 flagged) and 9,900 are legitimate (495 false alarms). Total flags = 585. Probability = 90 / 585 ≈ 15.4%. The low 1% base rate dominates!',
  },
  {
    title: 'Factory Defect Inspection',
    context: 'A semiconductor plant produces computer microchips.',
    prior: 'Base Rate: 2% of microchips have physical silicon defects.',
    testSpec: 'Quality Scanner: 95% True Positive detection rate and 10% False Positive rate.',
    question: 'A microchip fails the automated scanner. What is the probability that it is truly defective?',
    options: ['~16.2%', '~95.0%', '~45.0%', '~2.0%'],
    correctIndex: 0, // ~16.2%
    posteriorPct: 16.2,
    explanation: 'In 1,000 chips: 20 defective (19 detected) + 980 good (98 false alarms). Total flags = 117. Probability = 19 / 117 ≈ 16.2%.',
  },
  {
    title: 'Software Bug Static Analysis',
    context: 'A code linter inspects repository pull requests.',
    prior: 'Base Rate: 5% of code files contain security vulnerabilities.',
    testSpec: 'Linter Engine: 80% True Positive rate and 10% False Alarm rate.',
    question: 'A security alert is triggered on a file. What is the updated probability of a real vulnerability?',
    options: ['~80.0%', '~29.6%', '~50.0%', '~5.0%'],
    correctIndex: 1, // ~29.6%
    posteriorPct: 29.6,
    explanation: 'In 1,000 files: 50 vulnerable (40 alerted) + 950 clean (95 false alarms). Total alerts = 135. Probability = 40 / 135 ≈ 29.6%.',
  },
];

export const EvidenceUpdateGame: React.FC<EvidenceUpdateGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [scenarioIndex, setScenarioIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const handleStartGame = () => {
    setScenarioIndex(0);
    setScore(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setLastCorrect(null);
    setGameState('playing');
  };

  const handleSelectOption = (idx: number) => {
    if (gameState !== 'playing') return;

    setSelectedOption(idx);
    const scenario = BAYES_SCENARIOS[scenarioIndex];
    const isCorrect = idx === scenario.correctIndex;
    setLastCorrect(isCorrect);
    setGameState('round-feedback');

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setScore((s) => s + 300);
    }
  };

  const handleNext = () => {
    const next = scenarioIndex + 1;
    if (next >= BAYES_SCENARIOS.length) {
      setGameState('results');
    } else {
      setScenarioIndex(next);
      setSelectedOption(null);
      setLastCorrect(null);
      setGameState('playing');
    }
  };

  const currentScenario = BAYES_SCENARIOS[scenarioIndex];

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
          <Percent className="w-3.5 h-3.5" />
          Evidence Update &amp; Bayes Theorem
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Percent className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Evidence Update &amp; Bayes Rule
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Master conditional probability and overcome the base rate fallacy. Evaluate diagnostic tests,
              false alarm rates, and prior probabilities to calculate the true posterior probability.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Core Principle</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Bayes&apos; Theorem</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Cognitive Trap</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Base Rate Neglect</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Bayesian Challenges
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'round-feedback') && currentScenario && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              Scenario {scenarioIndex + 1} of {BAYES_SCENARIOS.length}: {currentScenario.title}
            </span>
            <div className="text-xs font-bold text-slate-800">
              Score: {score} pts
            </div>
          </div>

          {/* Scenario Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-3">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{currentScenario.context}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 space-y-1">
                  <span className="font-extrabold text-indigo-600 uppercase text-[10px] block">Prior Base Rate:</span>
                  <p>{currentScenario.prior}</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 space-y-1">
                  <span className="font-extrabold text-indigo-600 uppercase text-[10px] block">Test Diagnostic Power:</span>
                  <p>{currentScenario.testSpec}</p>
                </div>
              </div>
            </div>

            {/* Question Prompt */}
            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-center">
              <p className="font-black text-sm text-indigo-950">{currentScenario.question}</p>
            </div>

            {/* Answer Choices */}
            <div className="grid grid-cols-2 gap-3">
              {currentScenario.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentScenario.correctIndex;

                let btnClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                if (gameState === 'round-feedback') {
                  if (isCorrect) btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200';
                  else if (isSelected && !isCorrect) btnClass = 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-200';
                }

                return (
                  <button
                    key={idx}
                    disabled={gameState !== 'playing'}
                    onClick={() => handleSelectOption(idx)}
                    className={`py-3.5 px-4 rounded-2xl border-2 font-bold text-sm transition-all active:scale-95 disabled:cursor-default ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Explanation */}
            {gameState === 'round-feedback' && (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
                  lastCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <span className="font-black uppercase tracking-wider block">
                    {lastCorrect ? '✓ Correct Bayesian Deduction!' : '✗ Common Base Rate Fallacy!'}
                  </span>
                  <p className="font-medium text-slate-700 leading-relaxed">{currentScenario.explanation}</p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all"
                >
                  {scenarioIndex + 1 >= BAYES_SCENARIOS.length ? 'View Final Results' : 'Next Scenario →'}
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
            <h2 className="text-2xl font-black text-slate-900">Session Completed!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on base rate integration, diagnostic test interpretation, and Bayesian reasoning.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Correct Updates</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">{correctCount} / {BAYES_SCENARIOS.length}</p>
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
