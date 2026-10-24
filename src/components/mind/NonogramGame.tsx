import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, RotateCcw, Grid3X3, CheckCircle2, Award, Eraser, Check } from 'lucide-react';

interface NonogramGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'puzzle-solved' | 'results';
type CellState = 'empty' | 'filled' | 'crossed';

interface NonogramPuzzle {
  title: string;
  size: number;
  rowClues: number[][];
  colClues: number[][];
  solution: boolean[][]; // true = filled, false = empty
}

const PUZZLES: NonogramPuzzle[] = [
  // 1. Heart (5x5)
  {
    title: 'Heart',
    size: 5,
    rowClues: [[1, 1], [5], [5], [3], [1]],
    colClues: [[2], [4], [4], [4], [2]],
    solution: [
      [false, true, false, true, false],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [false, true, true, true, false],
      [false, false, true, false, false],
    ],
  },
  // 2. Coffee Cup (5x5)
  {
    title: 'Tea Cup',
    size: 5,
    rowClues: [[4], [1, 2], [1, 1], [3], [5]],
    colClues: [[4], [2], [2], [2], [1]],
    solution: [
      [true, true, true, true, false],
      [true, false, false, true, true],
      [true, false, false, true, false],
      [true, true, true, false, false],
      [true, true, true, true, true],
    ],
  },
  // 3. Arrow Up (5x5)
  {
    title: 'Arrow',
    size: 5,
    rowClues: [[1], [3], [5], [1], [1]],
    colClues: [[1], [2], [5], [2], [1]],
    solution: [
      [false, false, true, false, false],
      [false, true, true, true, false],
      [true, true, true, true, true],
      [false, false, true, false, false],
      [false, false, true, false, false],
    ],
  },
];

export const NonogramGame: React.FC<NonogramGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // Active mode: 'fill' or 'cross'
  const [activeTool, setActiveTool] = useState<'fill' | 'cross'>('fill');
  const [grid, setGrid] = useState<CellState[][]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startPuzzle = (index: number) => {
    const p = PUZZLES[index];
    const initialGrid: CellState[][] = Array.from({ length: p.size }, () =>
      Array(p.size).fill('empty')
    );
    setGrid(initialGrid);
    setActiveTool('fill');
    setErrorMessage(null);
    setGameState('playing');
  };

  const handleStartGame = () => {
    setPuzzleIndex(0);
    setScore(0);
    startPuzzle(0);
  };

  const handleCellClick = (r: number, c: number) => {
    if (gameState !== 'playing') return;

    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      const current = next[r][c];

      if (activeTool === 'fill') {
        next[r][c] = current === 'filled' ? 'empty' : 'filled';
      } else {
        next[r][c] = current === 'crossed' ? 'empty' : 'crossed';
      }

      return next;
    });
    setErrorMessage(null);
  };

  const handleVerify = () => {
    const p = PUZZLES[puzzleIndex];
    let isCorrect = true;

    for (let r = 0; r < p.size; r++) {
      for (let c = 0; c < p.size; c++) {
        const isFilled = grid[r][c] === 'filled';
        if (isFilled !== p.solution[r][c]) {
          isCorrect = false;
          break;
        }
      }
      if (!isCorrect) break;
    }

    if (isCorrect) {
      setScore((s) => s + 350);
      setGameState('puzzle-solved');
    } else {
      setErrorMessage('One or more cells do not match the row/column clue constraints.');
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
          <Grid3X3 className="w-3.5 h-3.5" />
          Nonogram (Picross) Logic
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Grid3X3 className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Nonogram (Picross) Deduction
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based on Japanese picture logic puzzles. Use number clues along rows and columns to deduce which cells to fill
              and which to cross out, revealing the hidden pixel image.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Tools</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Fill Cell / Cross Out (✕)</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Clue Rules</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Consecutive Block Lengths</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Nonogram Challenge
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'puzzle-solved') && currentPuzzle && (
        <div className="space-y-6 max-w-lg mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              Puzzle {puzzleIndex + 1} of {PUZZLES.length}: {currentPuzzle.title}
            </span>
            <div className="text-xs font-bold text-slate-800">
              Score: {score} pts
            </div>
          </div>

          {/* Grid Container */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Tool Selection Toggle */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setActiveTool('fill')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTool === 'fill'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-700'
                }`}
              >
                <div className="w-3 h-3 rounded-xs bg-current" /> Fill Tool
              </button>
              <button
                onClick={() => setActiveTool('cross')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTool === 'cross'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-700'
                }`}
              >
                <span className="font-black text-sm leading-none">✕</span> Cross-Out Tool
              </button>
            </div>

            {/* Nonogram Grid with Row/Col Clues */}
            <div className="flex flex-col items-center">
              {/* Top Column Clues */}
              <div className="flex pl-16 sm:pl-20">
                {currentPuzzle.colClues.map((clueArr, c) => (
                  <div
                    key={c}
                    className="w-10 h-14 sm:w-12 sm:h-16 flex flex-col justify-end items-center pb-1 text-[11px] font-extrabold text-slate-600"
                  >
                    {clueArr.map((n, i) => (
                      <span key={i}>{n}</span>
                    ))}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {grid.map((row, r) => (
                <div key={r} className="flex items-center">
                  {/* Left Row Clue */}
                  <div className="w-16 h-10 sm:w-20 sm:h-12 flex justify-end items-center pr-2 text-[11px] font-extrabold text-slate-600 gap-1.5">
                    {currentPuzzle.rowClues[r].map((n, i) => (
                      <span key={i}>{n}</span>
                    ))}
                  </div>

                  {/* Grid Cells */}
                  <div className="flex">
                    {row.map((cell, c) => {
                      let cellClass = 'bg-white border-slate-200 hover:bg-slate-50';
                      if (cell === 'filled') cellClass = 'bg-indigo-600 border-indigo-700 text-white shadow-xs';
                      else if (cell === 'crossed') cellClass = 'bg-slate-100 border-slate-200 text-rose-500 font-black';

                      return (
                        <button
                          key={c}
                          disabled={gameState !== 'playing'}
                          onClick={() => handleCellClick(r, c)}
                          className={`w-10 h-10 sm:w-12 sm:h-12 border-2 flex items-center justify-center text-sm font-black transition-all ${cellClass}`}
                        >
                          {cell === 'crossed' && '✕'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {errorMessage && (
              <p className="text-xs font-bold text-rose-600 text-center">{errorMessage}</p>
            )}

            {/* Action Bar */}
            {gameState === 'puzzle-solved' ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <span className="text-sm font-extrabold text-emerald-800 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Nonogram Logic 100% Verified!
                </span>
                <button
                  onClick={handleNextPuzzle}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
                >
                  {puzzleIndex + 1 >= PUZZLES.length ? 'View Final Results' : 'Next Nonogram →'}
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => startPuzzle(puzzleIndex)}
                  className="py-3 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 transition-all"
                >
                  Clear Grid
                </button>
                <button
                  onClick={handleVerify}
                  className="flex-1 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-bold text-xs text-white transition-all shadow-md"
                >
                  Verify Solution
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
            <h2 className="text-2xl font-black text-slate-900">All Nonograms Solved!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on dual-axis constraint satisfaction and logical deduction.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Puzzles Completed</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">{PUZZLES.length} / {PUZZLES.length}</p>
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
