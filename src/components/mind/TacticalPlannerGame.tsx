import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, RotateCcw, Swords, CheckCircle2, Award, RefreshCw } from 'lucide-react';

interface TacticalPlannerGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'puzzle-solved' | 'results';

interface Coord {
  r: number;
  c: number;
}

interface TacticalLevel {
  title: string;
  gridSize: number;
  start: Coord;
  targets: Coord[]; // Gems to collect in order or total
  hazards: Coord[]; // Forbidden squares
  maxMoves: number;
  optimalMoves: number;
}

const TACTICAL_LEVELS: TacticalLevel[] = [
  {
    title: 'Level 1: Forward Infiltration',
    gridSize: 4,
    start: { r: 0, c: 0 },
    targets: [{ r: 3, c: 3 }],
    hazards: [{ r: 1, c: 2 }],
    maxMoves: 4,
    optimalMoves: 3,
  },
  {
    title: 'Level 2: Dual Target Extraction',
    gridSize: 5,
    start: { r: 0, c: 0 },
    targets: [{ r: 2, c: 1 }, { r: 4, c: 4 }],
    hazards: [{ r: 1, c: 2 }, { r: 3, c: 3 }],
    maxMoves: 6,
    optimalMoves: 4,
  },
  {
    title: 'Level 3: Minefield Maneuver',
    gridSize: 5,
    start: { r: 4, c: 0 },
    targets: [{ r: 0, c: 4 }],
    hazards: [{ r: 2, c: 1 }, { r: 3, c: 2 }, { r: 1, c: 3 }],
    maxMoves: 6,
    optimalMoves: 4,
  },
];

export const TacticalPlannerGame: React.FC<TacticalPlannerGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const [knightPos, setKnightPos] = useState<Coord>({ r: 0, c: 0 });
  const [remainingTargets, setRemainingTargets] = useState<Coord[]>([]);
  const [movesUsed, setMovesUsed] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startLevel = (index: number) => {
    const level = TACTICAL_LEVELS[index];
    setKnightPos({ ...level.start });
    setRemainingTargets([...level.targets]);
    setMovesUsed(0);
    setErrorMessage(null);
    setGameState('playing');
  };

  const handleStartGame = () => {
    setLevelIndex(0);
    setScore(0);
    startLevel(0);
  };

  const isLegalKnightMove = (from: Coord, to: Coord): boolean => {
    const dr = Math.abs(from.r - to.r);
    const dc = Math.abs(from.c - to.c);
    return (dr === 1 && dc === 2) || (dr === 2 && dc === 1);
  };

  const handleSquareClick = (r: number, c: number) => {
    if (gameState !== 'playing') return;
    const level = TACTICAL_LEVELS[levelIndex];

    // Check hazard
    if (level.hazards.some((h) => h.r === r && h.c === c)) {
      setErrorMessage('Square contains a hazard! Knight cannot land here.');
      return;
    }

    // Check legal L-move
    if (!isLegalKnightMove(knightPos, { r, c })) {
      setErrorMessage('Illegal move: Knight moves in an L-shape (2 squares in one axis, 1 in the other).');
      return;
    }

    const nextMoves = movesUsed + 1;
    setMovesUsed(nextMoves);
    setKnightPos({ r, c });
    setErrorMessage(null);

    // Check if landed on a target
    const nextTargets = remainingTargets.filter((t) => !(t.r === r && t.c === c));
    setRemainingTargets(nextTargets);

    if (nextTargets.length === 0) {
      // Solved!
      const efficiency = Math.max(0.5, level.optimalMoves / nextMoves);
      const points = Math.round(350 * efficiency);
      setScore((s) => s + points);
      setGameState('puzzle-solved');
    } else if (nextMoves >= level.maxMoves) {
      setErrorMessage(`Move limit of ${level.maxMoves} reached! Restarting level.`);
      setTimeout(() => startLevel(levelIndex), 1200);
    }
  };

  const handleNextLevel = () => {
    const next = levelIndex + 1;
    if (next >= TACTICAL_LEVELS.length) {
      setGameState('results');
    } else {
      setLevelIndex(next);
      startLevel(next);
    }
  };

  const currentLevel = TACTICAL_LEVELS[levelIndex];

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
          <Swords className="w-3.5 h-3.5" />
          Tactical Planner
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Swords className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Tactical Knight Planner
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Exercise multi-step forward look-ahead. Command a chess Knight (moving in standard L-shapes) to capture targets
              while evading hazards within strict move limits.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Movement</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Classic L-Shape</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Rules</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Deterministic Grid</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Puzzles</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{TACTICAL_LEVELS.length} Tactical Levels</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Tactical Session
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'puzzle-solved') && currentLevel && (
        <div className="space-y-6 max-w-lg mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                Level {levelIndex + 1}: {currentLevel.title}
              </span>
              <span className="text-xs font-bold text-slate-600">
                Moves: {movesUsed} / {currentLevel.maxMoves}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Score: {score}</span>
              <button
                onClick={() => startLevel(levelIndex)}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                title="Restart Level"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tactical Board */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-center h-6">
              {errorMessage ? (
                <span className="text-xs font-bold text-rose-600 animate-pulse">{errorMessage}</span>
              ) : (
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  Tap an L-shaped move destination for the Knight (♞)
                </span>
              )}
            </div>

            {/* Grid Board */}
            <div
              style={{
                gridTemplateColumns: `repeat(${currentLevel.gridSize}, minmax(0, 1fr))`,
              }}
              className="grid gap-2 w-64 h-64 sm:w-80 sm:h-80 mx-auto select-none"
            >
              {Array.from({ length: currentLevel.gridSize }).map((_, r) =>
                Array.from({ length: currentLevel.gridSize }).map((_, c) => {
                  const isKnight = knightPos.r === r && knightPos.c === c;
                  const isTarget = remainingTargets.some((t) => t.r === r && t.c === c);
                  const isHazard = currentLevel.hazards.some((h) => h.r === r && h.c === c);
                  const isLegalNext = isLegalKnightMove(knightPos, { r, c }) && !isHazard;

                  let cellBg = (r + c) % 2 === 0 ? 'bg-slate-100' : 'bg-slate-50';
                  if (isKnight) cellBg = 'bg-indigo-600 text-white font-black ring-4 ring-indigo-200 shadow-md';
                  else if (isHazard) cellBg = 'bg-rose-100 border border-rose-300 text-rose-700 font-black';
                  else if (isTarget) cellBg = 'bg-amber-100 border border-amber-300 text-amber-700 font-black animate-pulse';
                  else if (isLegalNext) cellBg = 'bg-emerald-50 border border-dashed border-emerald-300 hover:bg-emerald-100';

                  return (
                    <button
                      key={`${r}-${c}`}
                      disabled={gameState !== 'playing'}
                      onClick={() => handleSquareClick(r, c)}
                      className={`rounded-2xl border flex items-center justify-center text-sm font-black transition-all ${cellBg}`}
                    >
                      {isKnight ? '♞' : isTarget ? '★' : isHazard ? '✕' : isLegalNext ? '·' : ''}
                    </button>
                  );
                })
              )}
            </div>

            {/* Solved Banner */}
            {gameState === 'puzzle-solved' && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <span className="text-sm font-extrabold text-emerald-800 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Target Acquired in {movesUsed} Moves!
                </span>
                <button
                  onClick={handleNextLevel}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
                >
                  {levelIndex + 1 >= TACTICAL_LEVELS.length ? 'View Final Results' : 'Next Tactical Level →'}
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
            <h2 className="text-2xl font-black text-slate-900">Tactical Operations Complete!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on Knight move look-ahead, obstacle evasion, and optimal path navigation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Levels Cleared</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">{TACTICAL_LEVELS.length} / {TACTICAL_LEVELS.length}</p>
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
