import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, RotateCw, CheckCircle2, XCircle, Award } from 'lucide-react';

interface MentalRotationGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'round-feedback' | 'results';

// Base polyomino shapes defined as 2D coordinate blocks
const POLYOMINOS: { name: string; blocks: [number, number][] }[] = [
  // F-shape
  {
    name: 'F',
    blocks: [
      [0, 0], [0, 1], [0, 2], [1, 0], [1, 1],
    ],
  },
  // L-hook
  {
    name: 'L-hook',
    blocks: [
      [0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [2, 3],
    ],
  },
  // Z-stepped
  {
    name: 'Z-stepped',
    blocks: [
      [0, 0], [1, 0], [1, 1], [2, 1], [2, 2],
    ],
  },
  // T-cross
  {
    name: 'T-cross',
    blocks: [
      [0, 0], [1, 0], [2, 0], [1, 1], [1, 2],
    ],
  },
];

interface RotationTrial {
  baseBlocks: [number, number][];
  rotationDeg: number;
  isMirrored: boolean; // if true, it's a mirror reflection; if false, it's a pure rotation (identical)
}

const TOTAL_ROUNDS = 10;

export const MentalRotationGame: React.FC<MentalRotationGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [roundIndex, setRoundIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const [currentTrial, setCurrentTrial] = useState<RotationTrial | null>(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);

  const trialStartTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateTrial = (): RotationTrial => {
    const shape = POLYOMINOS[Math.floor(Math.random() * POLYOMINOS.length)];
    const angles = [45, 90, 135, 180, 225, 270, 315];
    const rotationDeg = angles[Math.floor(Math.random() * angles.length)];
    const isMirrored = Math.random() < 0.5;

    return {
      baseBlocks: shape.blocks,
      rotationDeg,
      isMirrored,
    };
  };

  const handleStartGame = () => {
    setRoundIndex(0);
    setScore(0);
    setCorrectCount(0);
    setLastAnswerCorrect(null);

    const trial = generateTrial();
    setCurrentTrial(trial);
    setGameState('playing');
    trialStartTimeRef.current = performance.now();
  };

  const handleAnswer = (userSaidIdentical: boolean) => {
    if (!currentTrial || gameState !== 'playing') return;

    // Identical = NOT mirrored
    const isActuallyIdentical = !currentTrial.isMirrored;
    const isCorrect = userSaidIdentical === isActuallyIdentical;
    const latency = performance.now() - trialStartTimeRef.current;

    setLastAnswerCorrect(isCorrect);
    setGameState('round-feedback');

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      const speedBonus = Math.max(0, Math.round((5000 - latency) / 30));
      setScore((s) => s + 100 + speedBonus);
    }

    timerRef.current = setTimeout(() => {
      const nextRound = roundIndex + 1;
      if (nextRound >= TOTAL_ROUNDS) {
        setGameState('results');
      } else {
        setRoundIndex(nextRound);
        setCurrentTrial(generateTrial());
        setGameState('playing');
        trialStartTimeRef.current = performance.now();
      }
    }, 1100);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const renderBlocksSvg = (blocks: [number, number][], rotation: number, mirror: boolean) => {
    const blockSize = 22;
    // Calculate bounding box
    const maxX = Math.max(...blocks.map((b) => b[0])) + 1;
    const maxY = Math.max(...blocks.map((b) => b[1])) + 1;
    const width = maxX * blockSize;
    const height = maxY * blockSize;

    return (
      <svg
        width="160"
        height="160"
        viewBox="-80 -80 160 160"
        className="overflow-visible"
      >
        <g
          transform={`rotate(${rotation}) ${mirror ? 'scale(-1, 1)' : ''}`}
        >
          <g transform={`translate(-${width / 2}, -${height / 2})`}>
            {blocks.map(([bx, by], idx) => (
              <rect
                key={idx}
                x={bx * blockSize}
                y={by * blockSize}
                width={blockSize - 2}
                height={blockSize - 2}
                rx={4}
                className="fill-indigo-600 stroke-indigo-800 stroke-[1.5]"
              />
            ))}
          </g>
        </g>
      </svg>
    );
  };

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mind Suite
        </button>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
          <RotateCw className="w-3.5 h-3.5" />
          Mental Rotation
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <RotateCw className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Mental Rotation Challenge
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based on the Shepard &amp; Metzler visuospatial paradigm. Compare two geometric figures.
              Determine whether the right figure is an <strong>Identical Rotation</strong> or a <strong>Mirror Reflection</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900">
              <span className="font-extrabold text-xs uppercase tracking-wider block">Identical Shape</span>
              <p className="text-xs text-indigo-700 mt-1">Can be turned in 2D plane to match the original exactly.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800">
              <span className="font-extrabold text-xs uppercase tracking-wider block">Mirror Reflection</span>
              <p className="text-xs text-slate-600 mt-1">Flipped backward; rotation alone can never align the blocks.</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin {TOTAL_ROUNDS} Rounds
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'round-feedback') && currentTrial && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                Round {roundIndex + 1} of {TOTAL_ROUNDS}
              </span>
              <span className="text-xs font-bold text-slate-600">
                Angle: {currentTrial.rotationDeg}°
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800">
              Score: {score} ({correctCount} correct)
            </div>
          </div>

          {/* Comparison Panels */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-center h-6">
              {gameState === 'round-feedback' ? (
                <span className={`text-xs font-extrabold uppercase tracking-widest ${
                  lastAnswerCorrect ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {lastAnswerCorrect ? 'Correct Assessment!' : currentTrial.isMirrored ? 'Incorrect: Was Mirror Reflection' : 'Incorrect: Was Identical Rotation'}
                </span>
              ) : (
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  Can Shape B be rotated to match Shape A?
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Figure A: Base */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 min-h-[220px]">
                <span className="text-xs font-extrabold uppercase text-slate-400">Reference (0°)</span>
                <div className="w-36 h-36 flex items-center justify-center">
                  {renderBlocksSvg(currentTrial.baseBlocks, 0, false)}
                </div>
              </div>

              {/* Figure B: Rotated */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 min-h-[220px]">
                <span className="text-xs font-extrabold uppercase text-indigo-600">Transformed ({currentTrial.rotationDeg}°)</span>
                <div className="w-36 h-36 flex items-center justify-center">
                  {renderBlocksSvg(currentTrial.baseBlocks, currentTrial.rotationDeg, currentTrial.isMirrored)}
                </div>
              </div>
            </div>

            {/* Answer Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                disabled={gameState !== 'playing'}
                onClick={() => handleAnswer(true)}
                className="py-4 px-4 rounded-2xl border border-indigo-600 bg-indigo-600 hover:bg-indigo-700 font-bold text-sm text-white transition-all active:scale-95 disabled:opacity-40 shadow-sm"
              >
                Same (Identical Rotation)
              </button>

              <button
                disabled={gameState !== 'playing'}
                onClick={() => handleAnswer(false)}
                className="py-4 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 font-bold text-sm text-slate-800 transition-all active:scale-95 disabled:opacity-40 shadow-xs"
              >
                Different (Mirror Image)
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
            <h2 className="text-2xl font-black text-slate-900">Session Complete!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on mental rotation angle transformation and mirror discrimination.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Accuracy</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">
                {Math.round((correctCount / TOTAL_ROUNDS) * 100)}%
              </p>
              <span className="text-xs text-slate-500">{correctCount} of {TOTAL_ROUNDS} trials</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Score</span>
              <p className="text-3xl font-black text-slate-900 mt-1">{score}</p>
              <span className="text-xs text-slate-500">points with speed bonus</span>
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
