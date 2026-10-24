import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, FoldVertical, CheckCircle2, XCircle, Award } from 'lucide-react';

interface PaperFoldingGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'round-feedback' | 'results';

// Paper is a 4x4 coordinate system (0 to 3 for x and y)
interface HoleCoord {
  x: number; // 0, 1, 2, 3
  y: number; // 0, 1, 2, 3
}

interface FoldingPuzzle {
  foldSteps: string[];
  finalPunch: HoleCoord[];
  correctUnfolded: HoleCoord[];
  options: HoleCoord[][];
  correctIndex: number;
}

const TOTAL_ROUNDS = 8;

export const PaperFoldingGame: React.FC<PaperFoldingGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [roundIndex, setRoundIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const [currentPuzzle, setCurrentPuzzle] = useState<FoldingPuzzle | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generates 1-fold and 2-fold mathematical paper folding puzzles
  const generatePuzzle = (round: number): FoldingPuzzle => {
    const isTwoFolds = round >= 3;

    if (!isTwoFolds) {
      // 1 Fold: Left-to-Right (crease at x=1.5, sheet is on right x in [2,3])
      const foldSteps = ['1. Fold left half over to the right.'];
      // Punch a hole in quadrant x in [2,3], y in [0,3]
      const px = 2 + Math.floor(Math.random() * 2);
      const py = Math.floor(Math.random() * 4);
      const punch: HoleCoord[] = [{ x: px, y: py }];

      // Unfolded: original hole (px, py) + mirrored across x=1.5 -> mirroredX = 3 - px
      const mirroredX = 3 - px;
      const correctUnfolded: HoleCoord[] = [
        { x: px, y: py },
        { x: mirroredX, y: py },
      ];

      // Generate 3 plausible distractors
      const opt0 = [...correctUnfolded];
      const opt1 = [
        { x: px, y: py },
        { x: px, y: 3 - py }, // mirrored vertically by mistake
      ];
      const opt2 = [
        { x: px, y: py },
        { x: mirroredX, y: 3 - py }, // mirrored diagonally
      ];
      const opt3 = [
        { x: px, y: py }, // forgot to mirror
      ];

      const rawOptions = [opt0, opt1, opt2, opt3];
      const shuffled = rawOptions
        .map((opt, i) => ({ opt, isCorrect: i === 0 }))
        .sort(() => Math.random() - 0.5);

      const correctIndex = shuffled.findIndex((s) => s.isCorrect);

      return {
        foldSteps,
        finalPunch: punch,
        correctUnfolded,
        options: shuffled.map((s) => s.opt),
        correctIndex,
      };
    } else {
      // 2 Folds: Fold Left-to-Right (leaves x in [2,3]), then Fold Top-to-Bottom (leaves y in [2,3])
      const foldSteps = [
        '1. Fold left half over to the right.',
        '2. Fold top half down to the bottom.',
      ];
      // Punch in bottom-right corner [2,3] x [2,3]
      const px = 2 + Math.floor(Math.random() * 2);
      const py = 2 + Math.floor(Math.random() * 2);
      const punch: HoleCoord[] = [{ x: px, y: py }];

      // 4 symmetric holes upon complete unfolding
      const mx = 3 - px;
      const my = 3 - py;
      const correctUnfolded: HoleCoord[] = [
        { x: px, y: py },
        { x: mx, y: py },
        { x: px, y: my },
        { x: mx, y: my },
      ];

      // Distractors
      const opt0 = [...correctUnfolded];
      // Only 2 holes
      const opt1 = [{ x: px, y: py }, { x: mx, y: py }];
      // Off-axis holes
      const opt2 = [
        { x: px, y: py },
        { x: mx, y: py },
        { x: px, y: py > 2 ? py - 1 : py + 1 },
        { x: mx, y: py > 2 ? py - 1 : py + 1 },
      ];
      // 3 holes
      const opt3 = [{ x: px, y: py }, { x: mx, y: py }, { x: px, y: my }];

      const rawOptions = [opt0, opt1, opt2, opt3];
      const shuffled = rawOptions
        .map((opt, i) => ({ opt, isCorrect: i === 0 }))
        .sort(() => Math.random() - 0.5);

      const correctIndex = shuffled.findIndex((s) => s.isCorrect);

      return {
        foldSteps,
        finalPunch: punch,
        correctUnfolded,
        options: shuffled.map((s) => s.opt),
        correctIndex,
      };
    }
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
      setScore((s) => s + 150);
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
    }, 1300);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const renderSheetGrid = (holes: HoleCoord[], size = 120, isFoldedQuarter = false) => {
    const cellSize = size / 4;
    return (
      <svg width={size} height={size} className="border border-slate-300 rounded-xl bg-white shadow-xs">
        {/* Grid lines */}
        <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke="#e2e8f0" strokeDasharray="2,2" />
        <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke="#e2e8f0" strokeDasharray="2,2" />

        {isFoldedQuarter && (
          <rect x={size / 2} y={size / 2} width={size / 2} height={size / 2} fill="#e0e7ff" opacity={0.4} />
        )}

        {/* Holes */}
        {holes.map((h, i) => (
          <circle
            key={i}
            cx={h.x * cellSize + cellSize / 2}
            cy={h.y * cellSize + cellSize / 2}
            r={cellSize * 0.28}
            className="fill-indigo-600 stroke-indigo-900 stroke-[1.5]"
          />
        ))}
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
          <FoldVertical className="w-3.5 h-3.5" />
          Paper Folding &amp; Punching
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <FoldVertical className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Paper Folding Visualization
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Visualize a square paper sheet folded along creases and hole-punched through all layers.
              Mentally unfold the paper and identify where all holes will appear.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Cognitive Task</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Spatial Reflection &amp; Symmetry</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Puzzles</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{TOTAL_ROUNDS} Progressive Rounds</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Challenge
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'round-feedback') && currentPuzzle && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              Round {roundIndex + 1} of {TOTAL_ROUNDS}
            </span>
            <div className="text-xs font-bold text-slate-800">
              Score: {score} ({correctCount} correct)
            </div>
          </div>

          {/* Folding Instructions & Punch Display */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-center h-6">
              {gameState === 'round-feedback' ? (
                <span className={`text-xs font-extrabold uppercase tracking-widest ${
                  lastCorrect ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {lastCorrect ? 'Correct Spatial Prediction!' : 'Incorrect: Hole reflection misaligned'}
                </span>
              ) : (
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  Observe the folds &amp; hole punch
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="space-y-2 text-xs">
                <span className="font-extrabold text-slate-400 uppercase tracking-wider block">Fold Sequence:</span>
                <ul className="space-y-1 text-slate-700 font-medium">
                  {currentPuzzle.foldSteps.map((step, idx) => (
                    <li key={idx}>• {step}</li>
                  ))}
                  <li>• Punch hole(s) completely through folded sheet.</li>
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="text-[10px] font-bold text-indigo-600 uppercase">Folded &amp; Punched Sheet:</span>
                {renderSheetGrid(currentPuzzle.finalPunch, 130, true)}
              </div>
            </div>

            {/* Multiple Choice Unfolded Options */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block text-center">
                Select the Correct Unfolded Sheet:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentPuzzle.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentPuzzle.correctIndex;

                  let borderClass = 'border-slate-200 hover:border-indigo-300';
                  if (gameState === 'round-feedback') {
                    if (isCorrect) borderClass = 'border-emerald-500 ring-2 ring-emerald-200 bg-emerald-50/30';
                    else if (isSelected && !isCorrect) borderClass = 'border-rose-500 ring-2 ring-rose-200 bg-rose-50/30';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={gameState !== 'playing'}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-3 rounded-2xl border-2 bg-white flex flex-col items-center justify-center space-y-2 transition-all active:scale-95 disabled:cursor-default ${borderClass}`}
                    >
                      <span className="text-xs font-bold text-slate-400">Option {String.fromCharCode(65 + idx)}</span>
                      {renderSheetGrid(option, 90, false)}
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
            <h2 className="text-2xl font-black text-slate-900">Session Completed!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on mental paper unfolding and dual-axis reflection symmetry.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Correct Unfolds</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">
                {correctCount} / {TOTAL_ROUNDS}
              </p>
              <span className="text-xs text-slate-500">{Math.round((correctCount / TOTAL_ROUNDS) * 100)}% accuracy</span>
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
