import React, { useState } from 'react';
import { Zap, Hash, Layers, Lightbulb, Dices, Eye, ChevronRight, Sparkles } from 'lucide-react';
import { MentalMathSprint } from '../components/mind/MentalMathSprint';
import { NumberSenseGame } from '../components/mind/NumberSenseGame';
import { PatternChallengeGame } from '../components/mind/PatternChallengeGame';
import { LogicChallengeGame } from '../components/mind/LogicChallengeGame';
import { ProbabilityChallengeGame } from '../components/mind/ProbabilityChallengeGame';
import { FocusChallengeGame } from '../components/mind/FocusChallengeGame';

interface MindPageProps {
  onSelectView: (view: string) => void;
}

type ActiveGame =
  | 'math-sprint'
  | 'number-sense'
  | 'pattern-challenge'
  | 'logic-challenge'
  | 'probability-challenge'
  | 'focus-challenge'
  | null;

export const MindPage: React.FC<MindPageProps> = () => {
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);

  // Render individual game if selected
  if (activeGame === 'math-sprint') {
    return <MentalMathSprint onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'number-sense') {
    return <NumberSenseGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'pattern-challenge') {
    return <PatternChallengeGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'logic-challenge') {
    return <LogicChallengeGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'probability-challenge') {
    return <ProbabilityChallengeGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'focus-challenge') {
    return <FocusChallengeGame onBack={() => setActiveGame(null)} />;
  }

  // Otherwise render Mind 6-Game Collection Hub
  return (
    <div className="space-y-10 py-4 max-w-5xl mx-auto">
      {/* Mind Landing Hero */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          QuickForma Mind Collection
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            QuickForma Mind
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Challenge your calculation speed, numerical intuition, pattern recognition, deductive logic, probability, and attention.
          </p>
        </div>
      </div>

      {/* 6-Game Grid Collection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Select a Mind Challenge
          </h2>
          <span className="text-xs font-bold text-slate-400">60-Second Timed Sessions · Ephemeral State</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Mental Math Sprint */}
          <button
            onClick={() => setActiveGame('math-sprint')}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6 fill-indigo-600" />
              </div>
              <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block">
                60 Seconds · Arithmetic
              </span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Mental Math Sprint
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Rapid addition, subtraction, multiplication, and clean division with progressive difficulty.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-extrabold text-indigo-600 pt-2 border-t border-slate-100">
              <span>Play Sprint</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 2. Number Sense */}
          <button
            onClick={() => setActiveGame('number-sense')}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Hash className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block">
                60 Seconds · Intuition
              </span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Number Sense
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evaluate fraction sizes, percentage estimates, closest approximations, and ratio comparisons.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-extrabold text-indigo-600 pt-2 border-t border-slate-100">
              <span>Play Challenge</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 3. Pattern Challenge */}
          <button
            onClick={() => setActiveGame('pattern-challenge')}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block">
                60 Seconds · Sequences
              </span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Pattern Challenge
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Spot arithmetic, geometric, alternating, and increasing difference rules to find missing terms.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-extrabold text-indigo-600 pt-2 border-t border-slate-100">
              <span>Play Challenge</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 4. Logic Challenge */}
          <button
            onClick={() => setActiveGame('logic-challenge')}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Lightbulb className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block">
                60 Seconds · Reasoning
              </span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Logic Challenge
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Solve rapid ordering, spatial positioning, conditional deductions, and syllogisms.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-extrabold text-indigo-600 pt-2 border-t border-slate-100">
              <span>Play Challenge</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 5. Probability Challenge */}
          <button
            onClick={() => setActiveGame('probability-challenge')}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Dices className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block">
                60 Seconds · Probability
              </span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Probability Challenge
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evaluate coin flips, dice rolls, marble bag selection ratios, and card deck odds.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-extrabold text-indigo-600 pt-2 border-t border-slate-100">
              <span>Play Challenge</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 6. Focus Challenge */}
          <button
            onClick={() => setActiveGame('focus-challenge')}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block">
                60 Seconds · Attention & Reaction
              </span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Focus Challenge
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Rapid stimulus stream. Tap or press Space when target appears. Tracks reaction time in ms.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-extrabold text-indigo-600 pt-2 border-t border-slate-100">
              <span>Play Challenge</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
