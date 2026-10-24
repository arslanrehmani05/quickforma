import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, ArrowDownUp, CheckCircle2, XCircle, Award, MoveUp, MoveDown } from 'lucide-react';

interface SequenceOrderingGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'puzzle-solved' | 'results';

interface OrderingPuzzle {
  title: string;
  tasks: string[]; // original unordered list
  dependencies: string[]; // human readable rules
  // valid prerequisite pairs: [prereq, dependent] where prereq must appear before dependent
  constraints: [string, string][];
}

const ORDERING_PUZZLES: OrderingPuzzle[] = [
  {
    title: 'Software Deployment Pipeline',
    tasks: ['Deploy to Production', 'Run Unit Tests', 'Write Code', 'Code Review'],
    dependencies: [
      '• Code Review must happen after Writing Code.',
      '• Run Unit Tests must happen after Writing Code and before Code Review.',
      '• Deploy to Production must be the very last step.',
    ],
    constraints: [
      ['Write Code', 'Run Unit Tests'],
      ['Run Unit Tests', 'Code Review'],
      ['Code Review', 'Deploy to Production'],
    ],
  },
  {
    title: 'Customer Onboarding Workflow',
    tasks: ['Activate Account', 'Identity Verification', 'Welcome Call', 'Submit Application'],
    dependencies: [
      '• Submit Application is the first step.',
      '• Identity Verification must occur before Account Activation.',
      '• Welcome Call occurs after Account Activation.',
    ],
    constraints: [
      ['Submit Application', 'Identity Verification'],
      ['Identity Verification', 'Activate Account'],
      ['Activate Account', 'Welcome Call'],
    ],
  },
  {
    title: 'Manufacturing Assembly',
    tasks: ['Quality Inspection', 'Component Machining', 'Final Packaging', 'Sub-Assembly'],
    dependencies: [
      '• Component Machining must precede Sub-Assembly.',
      '• Quality Inspection must happen after Sub-Assembly.',
      '• Final Packaging cannot happen until Quality Inspection passes.',
    ],
    constraints: [
      ['Component Machining', 'Sub-Assembly'],
      ['Sub-Assembly', 'Quality Inspection'],
      ['Quality Inspection', 'Final Packaging'],
    ],
  },
];

export const SequenceOrderingGame: React.FC<SequenceOrderingGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const [currentOrder, setCurrentOrder] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startPuzzle = (index: number) => {
    const puzzle = ORDERING_PUZZLES[index];
    // Shuffle tasks
    const shuffled = [...puzzle.tasks].sort(() => Math.random() - 0.5);
    setCurrentOrder(shuffled);
    setErrorMessage(null);
    setGameState('playing');
  };

  const handleStartGame = () => {
    setPuzzleIndex(0);
    setScore(0);
    startPuzzle(0);
  };

  const moveTask = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= currentOrder.length) return;
    setCurrentOrder((prev) => {
      const next = [...prev];
      const [item] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, item);
      return next;
    });
    setErrorMessage(null);
  };

  const handleVerify = () => {
    const puzzle = ORDERING_PUZZLES[puzzleIndex];

    // Check all constraints
    for (const [prereq, dependent] of puzzle.constraints) {
      const pIdx = currentOrder.indexOf(prereq);
      const dIdx = currentOrder.indexOf(dependent);

      if (pIdx > dIdx) {
        setErrorMessage(`Dependency violation: "${prereq}" must occur BEFORE "${dependent}".`);
        return;
      }
    }

    // All valid!
    setScore((s) => s + 250);
    setGameState('puzzle-solved');
  };

  const handleNextPuzzle = () => {
    const next = puzzleIndex + 1;
    if (next >= ORDERING_PUZZLES.length) {
      setGameState('results');
    } else {
      setPuzzleIndex(next);
      startPuzzle(next);
    }
  };

  const currentPuzzle = ORDERING_PUZZLES[puzzleIndex];

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
          <ArrowDownUp className="w-3.5 h-3.5" />
          Topological Sequence Ordering
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <ArrowDownUp className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Sequence Ordering &amp; Dependencies
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based on temporal dependency graphs and topological sorting. Arrange operational steps into a valid sequential
              workflow that strictly satisfies all prerequisite constraints.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Interaction</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Move Cards Up/Down</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Rule System</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Topological Precedence</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Workflow Ordering
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'puzzle-solved') && currentPuzzle && (
        <div className="space-y-6 max-w-xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              Workflow {puzzleIndex + 1} of {ORDERING_PUZZLES.length}: {currentPuzzle.title}
            </span>
            <div className="text-xs font-bold text-slate-800">
              Score: {score} pts
            </div>
          </div>

          {/* Rules & Card Ordering Container */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Dependency Constraints Banner */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-black uppercase text-indigo-900 block">Precedence Rules:</span>
              <ul className="space-y-1 text-xs text-slate-700 font-medium">
                {currentPuzzle.dependencies.map((dep, idx) => (
                  <li key={idx}>{dep}</li>
                ))}
              </ul>
            </div>

            {/* Draggable / Movable Cards */}
            <div className="space-y-2.5">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block text-center">
                Order from First (Top) to Last (Bottom):
              </span>

              {currentOrder.map((task, idx) => (
                <div
                  key={task}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-sm text-slate-800">{task}</span>
                  </div>

                  {gameState === 'playing' && (
                    <div className="flex items-center gap-1">
                      <button
                        disabled={idx === 0}
                        onClick={() => moveTask(idx, idx - 1)}
                        className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        disabled={idx === currentOrder.length - 1}
                        onClick={() => moveTask(idx, idx + 1)}
                        className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {errorMessage && (
                <p className="text-xs font-bold text-rose-600 text-center pt-1">{errorMessage}</p>
              )}
            </div>

            {/* Action Button */}
            {gameState === 'puzzle-solved' ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <span className="text-sm font-extrabold text-emerald-800 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  All Dependency Constraints Satisfied!
                </span>
                <button
                  onClick={handleNextPuzzle}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
                >
                  {puzzleIndex + 1 >= ORDERING_PUZZLES.length ? 'View Final Results' : 'Next Workflow →'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleVerify}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all"
              >
                Validate Sequence Order
              </button>
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
            <h2 className="text-2xl font-black text-slate-900">All Workflows Ordered!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on topological sorting, dependency management, and temporal planning.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Workflows Completed</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">{ORDERING_PUZZLES.length} / {ORDERING_PUZZLES.length}</p>
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
