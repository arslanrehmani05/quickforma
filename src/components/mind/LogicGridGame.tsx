import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, Table, CheckCircle2, XCircle, Award, Check, X } from 'lucide-react';

interface LogicGridGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'puzzle-solved' | 'results';

interface LogicGridPuzzle {
  title: string;
  itemsA: string[]; // e.g. People: Alice, Bob, Carol
  itemsB: string[]; // e.g. City: London, Paris, Tokyo
  clues: string[];
  // Solution maps index of itemsA to index of itemsB
  solution: number[];
}

const PUZZLES: LogicGridPuzzle[] = [
  {
    title: 'City Assignments',
    itemsA: ['Alice', 'Bob', 'Carol'],
    itemsB: ['London', 'Paris', 'Tokyo'],
    clues: [
      '1. Carol has never visited Europe (Tokyo is in Asia).',
      '2. Alice does not live in Paris.',
      '3. Bob speaks fluent French and lives in France.',
    ],
    solution: [0, 1, 2], // Alice -> London (0), Bob -> Paris (1), Carol -> Tokyo (2)
  },
  {
    title: 'Office Floors',
    itemsA: ['David', 'Elena', 'Frank'],
    itemsB: ['Floor 1', 'Floor 2', 'Floor 3'],
    clues: [
      '1. Frank works on a higher floor than David.',
      '2. Elena works on Floor 1.',
      '3. David does not work on Floor 3.',
    ],
    solution: [1, 0, 2], // David -> Floor 2 (1), Elena -> Floor 1 (0), Frank -> Floor 3 (2)
  },
  {
    title: 'Department Leads',
    itemsA: ['Grace', 'Henry', 'Iris'],
    itemsB: ['Design', 'Finance', 'Engineering'],
    clues: [
      '1. Henry manages the department responsible for software code.',
      '2. Grace works directly with UI/UX mockups, not budgets.',
      '3. Iris approves financial ledgers and payroll.',
    ],
    solution: [0, 2, 1], // Grace -> Design (0), Henry -> Engineering (2), Iris -> Finance (1)
  },
];

export const LogicGridGame: React.FC<LogicGridGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // 3x3 grid state: null | 'x' | 'check'
  const [gridState, setGridState] = useState<(null | 'x' | 'check')[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [assignments, setAssignments] = useState<(number | null)[]>([null, null, null]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startPuzzle = (index: number) => {
    setGridState([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setAssignments([null, null, null]);
    setErrorMessage(null);
    setGameState('playing');
  };

  const handleStartGame = () => {
    setPuzzleIndex(0);
    setScore(0);
    startPuzzle(0);
  };

  const toggleGridCell = (r: number, c: number) => {
    setGridState((prev) => {
      const next = prev.map((row) => [...row]);
      const cur = next[r][c];
      if (cur === null) next[r][c] = 'x';
      else if (cur === 'x') next[r][c] = 'check';
      else next[r][c] = null;
      return next;
    });
  };

  const setPlayerAssignment = (personIdx: number, targetIdx: number | null) => {
    setAssignments((prev) => {
      const next = [...prev];
      next[personIdx] = targetIdx;
      return next;
    });
    setErrorMessage(null);
  };

  const handleVerifySolution = () => {
    const cur = PUZZLES[puzzleIndex];
    if (assignments.some((a) => a === null)) {
      setErrorMessage('Please assign a destination for all 3 people before submitting.');
      return;
    }

    const isAllCorrect = assignments.every((a, idx) => a === cur.solution[idx]);

    if (isAllCorrect) {
      setScore((s) => s + 300);
      setGameState('puzzle-solved');
    } else {
      setErrorMessage('One or more assignments contradict the deductive clues. Check your grid!');
    }
  };

  const handleNextPuzzle = () => {
    const next = puzzleIndex + 1;
    if (next >= PUZZLES.length) {
      setGameState('results');
    } else {
      setPuzzleIndex(next);
      startPuzzle(next);
    }
  };

  const currentPuzzle = PUZZLES[puzzleIndex];

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
          <Table className="w-3.5 h-3.5" />
          Deductive Logic Grid
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Table className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Deductive Logic Grid
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based on constraint satisfaction and deductive cross-elimination. Read clues, toggle cells on the elimination
              matrix (tap to mark eliminated ✕ or confirmed ✓), and deduce the unique assignment.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Clue Deduction</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Propositional Constraints</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Interactive Matrix</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">3×3 Cross-Elimination</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Logic Puzzles
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'puzzle-solved') && currentPuzzle && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              Puzzle {puzzleIndex + 1} of {PUZZLES.length}: {currentPuzzle.title}
            </span>
            <div className="text-xs font-bold text-slate-800">
              Score: {score} pts
            </div>
          </div>

          {/* Clues & Matrix Container */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Clues List */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 space-y-2">
              <span className="text-xs font-black uppercase text-indigo-900 block">Deductive Clues:</span>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                {currentPuzzle.clues.map((clue, idx) => (
                  <li key={idx} className="bg-white px-3 py-1.5 rounded-lg border border-indigo-100/60">
                    {clue}
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Elimination Grid */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block text-center">
                Deduction Matrix (Tap cells to toggle ✕ / ✓):
              </span>

              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border border-slate-200 bg-slate-50 text-xs font-bold text-slate-500"></th>
                      {currentPuzzle.itemsB.map((itemB, c) => (
                        <th key={c} className="p-2 border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700">
                          {itemB}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentPuzzle.itemsA.map((itemA, r) => (
                      <tr key={r}>
                        <td className="p-2 border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 text-left">
                          {itemA}
                        </td>
                        {currentPuzzle.itemsB.map((_, c) => {
                          const state = gridState[r][c];
                          return (
                            <td
                              key={c}
                              onClick={() => toggleGridCell(r, c)}
                              className="p-3 border border-slate-200 hover:bg-slate-50 cursor-pointer text-sm font-black transition-colors"
                            >
                              {state === 'x' && <span className="text-rose-500">✕</span>}
                              {state === 'check' && <span className="text-emerald-600">✓</span>}
                              {state === null && <span className="text-slate-200">·</span>}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Assignment Dropdowns / Pickers */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block text-center">
                Final Deductive Solution:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentPuzzle.itemsA.map((person, pIdx) => (
                  <div key={pIdx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-center">
                    <span className="text-xs font-bold text-slate-600 block">{person}</span>
                    <select
                      value={assignments[pIdx] ?? ''}
                      onChange={(e) => setPlayerAssignment(pIdx, e.target.value === '' ? null : Number(e.target.value))}
                      className="w-full text-xs font-bold py-1.5 px-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                    >
                      <option value="">Select...</option>
                      {currentPuzzle.itemsB.map((dest, dIdx) => (
                        <option key={dIdx} value={dIdx}>
                          {dest}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {errorMessage && (
                <p className="text-xs font-bold text-rose-600 text-center">{errorMessage}</p>
              )}
            </div>

            {/* Action Bar */}
            {gameState === 'puzzle-solved' ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <span className="text-sm font-extrabold text-emerald-800 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Puzzle Deductions 100% Correct!
                </span>
                <button
                  onClick={handleNextPuzzle}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
                >
                  {puzzleIndex + 1 >= PUZZLES.length ? 'View Final Results' : 'Next Puzzle →'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleVerifySolution}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all"
              >
                Submit Deductions
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
            <h2 className="text-2xl font-black text-slate-900">All Logic Grids Solved!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on propositional elimination, matrix deduction, and constraint satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Puzzles Cleared</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">{PUZZLES.length} / {PUZZLES.length}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Logic Score</span>
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
