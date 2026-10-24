import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, LayoutGrid, CheckCircle2, Award, HelpCircle } from 'lucide-react';

interface MatrixReasoningGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'round-feedback' | 'results';

interface MatrixCell {
  shape: 'circle' | 'square' | 'triangle';
  fill: 'empty' | 'solid';
  count: number; // 1, 2, or 3
}

interface MatrixPuzzle {
  ruleDescription: string;
  grid: (MatrixCell | null)[][]; // 3x3
  correctCell: MatrixCell;
  options: MatrixCell[];
  correctIndex: number;
}

const TOTAL_ROUNDS = 8;

export const MatrixReasoningGame: React.FC<MatrixReasoningGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [roundIndex, setRoundIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const [currentPuzzle, setCurrentPuzzle] = useState<MatrixPuzzle | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generates mathematically verified 3x3 Progressive Matrices
  const generatePuzzle = (round: number): MatrixPuzzle => {
    // 3 distinct shapes, fills, and counts
    const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
    const fills: ('empty' | 'solid')[] = ['empty', 'solid'];

    // Select row-column relationship type based on round
    // Pattern: Latin square on shape and progressive count
    const shapeOffset = round % 3;
    const grid: (MatrixCell | null)[][] = [];

    for (let r = 0; r < 3; r++) {
      const row: (MatrixCell | null)[] = [];
      for (let c = 0; c < 3; c++) {
        if (r === 2 && c === 2) {
          row.push(null); // Missing cell
        } else {
          const s = shapes[(r + c + shapeOffset) % 3];
          const count = ((r + c) % 3) + 1; // 1, 2, or 3 dots
          const fill = (r + c) % 2 === 0 ? 'solid' : 'empty';
          row.push({ shape: s, count, fill });
        }
      }
      grid.push(row);
    }

    // Answer for r=2, c=2:
    const targetShape = shapes[(2 + 2 + shapeOffset) % 3];
    const targetCount = ((2 + 2) % 3) + 1;
    const targetFill = (2 + 2) % 2 === 0 ? 'solid' : 'empty';
    const correctCell: MatrixCell = { shape: targetShape, count: targetCount, fill: targetFill };

    // 3 Distractors
    const distractor1: MatrixCell = {
      shape: shapes[(2 + 2 + shapeOffset + 1) % 3], // wrong shape
      count: targetCount,
      fill: targetFill,
    };
    const distractor2: MatrixCell = {
      shape: targetShape,
      count: targetCount === 3 ? 1 : targetCount + 1, // wrong count
      fill: targetFill,
    };
    const distractor3: MatrixCell = {
      shape: targetShape,
      count: targetCount,
      fill: targetFill === 'solid' ? 'empty' : 'solid', // wrong fill
    };

    const rawOptions = [correctCell, distractor1, distractor2, distractor3];
    const shuffled = rawOptions
      .map((opt, i) => ({ opt, isCorrect: i === 0 }))
      .sort(() => Math.random() - 0.5);

    const correctIndex = shuffled.findIndex((s) => s.isCorrect);

    return {
      ruleDescription: `Shape cycles systematically across rows; element count increments sequentially from 1 to 3.`,
      grid,
      correctCell,
      options: shuffled.map((s) => s.opt),
      correctIndex,
    };
  };

  const handleStartGame = () => {
    setRoundIndex(0);
    setScore(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setLastCorrect(null);

    const puzzle = generatePuzzle(0);
    setCurrentPuzzle(puzzle);
    setGameState('playing');
  };

  const handleSelectOption = (index: number) => {
    if (!currentPuzzle || gameState !== 'playing') return;

    setSelectedOption(index);
    const isCorrect = index === currentPuzzle.correctIndex;
    setLastCorrect(isCorrect);
    setGameState('round-feedback');

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setScore((s) => s + 200);
    }

    timerRef.current = setTimeout(() => {
      const nextRound = roundIndex + 1;
      if (nextRound >= TOTAL_ROUNDS) {
        setGameState('results');
      } else {
        setRoundIndex(nextRound);
        setCurrentPuzzle(generatePuzzle(nextRound));
        setSelectedOption(null);
        setGameState('playing');
      }
    }, 1400);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const renderCellSvg = (cell: MatrixCell | null, size = 64) => {
    if (!cell) {
      return (
        <div
          style={{ width: size, height: size }}
          className="border-2 border-dashed border-indigo-400 bg-indigo-50/50 rounded-xl flex items-center justify-center text-indigo-600 font-black text-xl"
        >
          ?
        </div>
      );
    }

    const color = cell.fill === 'solid' ? '#4f46e5' : 'none';
    const stroke = '#4f46e5';

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className="border border-slate-200 rounded-xl bg-white shadow-xs p-1"
      >
        {cell.shape === 'circle' && (
          <circle cx="32" cy="32" r="22" fill={color} stroke={stroke} strokeWidth="2.5" />
        )}
        {cell.shape === 'square' && (
          <rect x="12" y="12" width="40" height="40" rx="4" fill={color} stroke={stroke} strokeWidth="2.5" />
        )}
        {cell.shape === 'triangle' && (
          <polygon points="32,10 10,50 54,50" fill={color} stroke={stroke} strokeWidth="2.5" />
        )}

        {/* Small internal dots indicating count */}
        {cell.count === 1 && (
          <circle cx="32" cy="32" r="3.5" fill={cell.fill === 'solid' ? '#ffffff' : '#4f46e5'} />
        )}
        {cell.count === 2 && (
          <>
            <circle cx="26" cy="32" r="3" fill={cell.fill === 'solid' ? '#ffffff' : '#4f46e5'} />
            <circle cx="38" cy="32" r="3" fill={cell.fill === 'solid' ? '#ffffff' : '#4f46e5'} />
          </>
        )}
        {cell.count === 3 && (
          <>
            <circle cx="22" cy="32" r="2.8" fill={cell.fill === 'solid' ? '#ffffff' : '#4f46e5'} />
            <circle cx="32" cy="32" r="2.8" fill={cell.fill === 'solid' ? '#ffffff' : '#4f46e5'} />
            <circle cx="42" cy="32" r="2.8" fill={cell.fill === 'solid' ? '#ffffff' : '#4f46e5'} />
          </>
        )}
      </svg>
    );
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
          <LayoutGrid className="w-3.5 h-3.5" />
          Matrix Reasoning (Raven Matrices)
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <LayoutGrid className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Matrix Reasoning Challenge
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based on Raven&apos;s Progressive Matrices. Discover the relational logic across rows and columns
              (shape progression, element count, and shading) to identify the unique missing matrix tile.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Puzzles</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{TOTAL_ROUNDS} Progressive Matrices</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Cognitive Focus</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Fluid Intelligence &amp; Induction</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Matrix Challenge
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'round-feedback') && currentPuzzle && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              Matrix {roundIndex + 1} of {TOTAL_ROUNDS}
            </span>
            <div className="text-xs font-bold text-slate-800">
              Score: {score} ({correctCount} correct)
            </div>
          </div>

          {/* 3x3 Matrix Grid Container */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-center h-6">
              {gameState === 'round-feedback' ? (
                <span className={`text-xs font-extrabold uppercase tracking-widest ${
                  lastCorrect ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {lastCorrect ? 'Correct Deductive Selection!' : 'Incorrect Matrix Tile'}
                </span>
              ) : (
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  Analyze rows and columns to find &ldquo;?&rdquo;
                </span>
              )}
            </div>

            {/* 3x3 Grid Display */}
            <div className="grid grid-cols-3 gap-3 w-64 h-64 sm:w-72 sm:h-72 mx-auto p-3 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner">
              {currentPuzzle.grid.map((row, r) =>
                row.map((cell, c) => (
                  <div key={`${r}-${c}`} className="flex items-center justify-center">
                    {renderCellSvg(cell, 68)}
                  </div>
                ))
              )}
            </div>

            {/* Options Row */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block text-center">
                Select the Missing Matrix Tile:
              </span>

              <div className="grid grid-cols-4 gap-3">
                {currentPuzzle.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentPuzzle.correctIndex;

                  let borderClass = 'border-slate-200 hover:border-indigo-400';
                  if (gameState === 'round-feedback') {
                    if (isCorrect) borderClass = 'border-emerald-500 ring-2 ring-emerald-200 bg-emerald-50/30';
                    else if (isSelected && !isCorrect) borderClass = 'border-rose-500 ring-2 ring-rose-200 bg-rose-50/30';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={gameState !== 'playing'}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-3 rounded-2xl border-2 bg-white flex flex-col items-center justify-center space-y-1 transition-all active:scale-95 disabled:cursor-default ${borderClass}`}
                    >
                      <span className="text-[10px] font-bold text-slate-400">Option {idx + 1}</span>
                      {renderCellSvg(option, 54)}
                    </button>
                  );
                })}
              </div>
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
              Evaluated on progressive matrix pattern deduction and fluid reasoning.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Correct Matrices</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">
                {correctCount} / {TOTAL_ROUNDS}
              </p>
              <span className="text-xs text-slate-500">{Math.round((correctCount / TOTAL_ROUNDS) * 100)}% accuracy</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Fluid Score</span>
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
