import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, RotateCcw, PieChart, Sparkles, CheckCircle2, Award, RefreshCw } from 'lucide-react';

interface ProbabilityLabGameProps {
  onBack: () => void;
}

type LabPhase = 'predict' | 'simulating' | 'results';

interface LabExperiment {
  title: string;
  description: string;
  theoreticalPct: number;
  explanation: string;
  runTrial: () => boolean; // returns true if event occurred
}

const EXPERIMENTS: LabExperiment[] = [
  {
    title: 'Two Dice Sum of 7',
    description: 'When rolling two fair 6-sided dice, what is the probability that their sum equals exactly 7?',
    theoreticalPct: 16.67, // 6 out of 36 = 16.67%
    explanation: 'There are 6 winning combinations: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) out of 36 total outcomes (6/36 = 16.67%).',
    runTrial: () => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      return d1 + d2 === 7;
    },
  },
  {
    title: 'At Least 4 Heads in 5 Coin Tosses',
    description: 'When flipping a fair coin 5 times, what is the probability of getting 4 or 5 Heads?',
    theoreticalPct: 18.75, // (5 + 1) / 32 = 6/32 = 18.75%
    explanation: 'There are 32 outcomes (2^5). 5 outcomes with exactly 4 heads + 1 outcome with 5 heads = 6/32 = 18.75%.',
    runTrial: () => {
      let heads = 0;
      for (let i = 0; i < 5; i++) {
        if (Math.random() < 0.5) heads++;
      }
      return heads >= 4;
    },
  },
  {
    title: 'Two Red Marbles Without Replacement',
    description: 'An urn contains 5 Red and 5 Blue marbles. What is the probability of drawing 2 Red marbles consecutively?',
    theoreticalPct: 22.22, // (5/10) * (4/9) = 20/90 = 22.22%
    explanation: 'P(First Red) = 5/10. P(Second Red | First Red) = 4/9. Total = (5/10) × (4/9) = 2/9 ≈ 22.22%.',
    runTrial: () => {
      const d1 = Math.random() < 5 / 10;
      if (!d1) return false;
      const d2 = Math.random() < 4 / 9;
      return d2;
    },
  },
];

export const ProbabilityLabGame: React.FC<ProbabilityLabGameProps> = ({ onBack }) => {
  const [experimentIdx, setExperimentIdx] = useState<number>(0);
  const [phase, setPhase] = useState<LabPhase>('predict');
  const [userPrediction, setUserPrediction] = useState<number>(20);

  // Simulation results
  const [simCount, setSimCount] = useState<number>(0);
  const [successCount, setSuccessCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const currentExp = EXPERIMENTS[experimentIdx];

  const handleRunSimulation = () => {
    setPhase('simulating');
    setSimCount(0);
    setSuccessCount(0);

    const totalSims = 1000;
    let localSuccess = 0;

    // Run batch simulation in increments for visual feedback
    let current = 0;
    const interval = setInterval(() => {
      const step = 50;
      for (let i = 0; i < step; i++) {
        if (currentExp.runTrial()) {
          localSuccess++;
        }
      }
      current += step;
      setSimCount(current);
      setSuccessCount(localSuccess);

      if (current >= totalSims) {
        clearInterval(interval);
        // Calculate points based on prediction error
        const error = Math.abs(userPrediction - currentExp.theoreticalPct);
        const pts = Math.max(50, Math.round(300 - error * 15));
        setScore((s) => s + pts);
        setPhase('results');
      }
    }, 25);
  };

  const handleNextExperiment = () => {
    const next = experimentIdx + 1;
    if (next < EXPERIMENTS.length) {
      setExperimentIdx(next);
      setUserPrediction(20);
      setPhase('predict');
    }
  };

  const empiricalPct = simCount > 0 ? ((successCount / simCount) * 100).toFixed(1) : '0';

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
          <PieChart className="w-3.5 h-3.5" />
          Probability &amp; Monte Carlo Lab
        </div>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
            Experiment {experimentIdx + 1} of {EXPERIMENTS.length}: {currentExp.title}
          </span>
          <span className="text-xs font-bold text-slate-800">
            Total Score: {score} pts
          </span>
        </div>

        {/* Experiment Arena */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900">{currentExp.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{currentExp.description}</p>
          </div>

          {phase === 'predict' && (
            <div className="space-y-6 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold uppercase text-slate-500">
                    Your Probability Prediction:
                  </span>
                  <span className="text-2xl font-black text-indigo-600">{userPrediction}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={userPrediction}
                  onChange={(e) => setUserPrediction(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <button
                onClick={handleRunSimulation}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Run 1,000 Monte Carlo Simulations
              </button>
            </div>
          )}

          {(phase === 'simulating' || phase === 'results') && (
            <div className="space-y-6 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              {/* Progress Counters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase">Simulated Trials</span>
                  <p className="text-2xl font-black text-slate-900 mt-0.5">{simCount} / 1,000</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase">Observed Frequency</span>
                  <p className="text-2xl font-black text-emerald-600 mt-0.5">{empiricalPct}%</p>
                </div>
              </div>

              {phase === 'results' && (
                <div className="space-y-4 pt-2 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-400 block font-bold uppercase text-[10px]">Theoretical Exact</span>
                      <strong className="text-indigo-600 text-base">{currentExp.theoreticalPct}%</strong>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-400 block font-bold uppercase text-[10px]">Your Prediction</span>
                      <strong className="text-slate-800 text-base">{userPrediction}%</strong>
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs space-y-1 text-slate-700">
                    <span className="font-extrabold text-indigo-900 block">Law of Large Numbers:</span>
                    <p>{currentExp.explanation}</p>
                    <p className="text-[11px] text-slate-500 pt-1">
                      * As sample size increases toward infinity, empirical trial frequencies converge upon the theoretical probability.
                    </p>
                  </div>

                  {experimentIdx + 1 < EXPERIMENTS.length ? (
                    <button
                      onClick={handleNextExperiment}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
                    >
                      Next Experiment →
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setExperimentIdx(0);
                        setPhase('predict');
                      }}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
                    >
                      Restart Lab Protocol
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
