import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, Compass, ArrowUp, ArrowDown, ArrowLeft as LeftIcon, ArrowRight as RightIcon, Award, CheckCircle2, RefreshCw } from 'lucide-react';

interface PathfindingGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'level-cleared' | 'results';

const GRID_SIZE = 7; // 7x7 grid
const TOTAL_LEVELS = 5;

interface Coord {
  r: number;
  c: number;
}

interface MazeLevel {
  start: Coord;
  goal: Coord;
  walls: boolean[][];
  shortestLength: number;
}

// Breadth-First Search to find shortest path length and guarantee solvability
const solveBfs = (start: Coord, goal: Coord, walls: boolean[][]): number => {
  const queue: { r: number; c: number; dist: number }[] = [{ ...start, dist: 0 }];
  const visited = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));
  visited[start.r][start.c] = true;

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  while (queue.length > 0) {
    const cur = queue.shift()!;
    if (cur.r === goal.r && cur.c === goal.c) {
      return cur.dist;
    }

    for (let i = 0; i < 4; i++) {
      const nr = cur.r + dr[i];
      const nc = cur.c + dc[i];

      if (
        nr >= 0 &&
        nr < GRID_SIZE &&
        nc >= 0 &&
        nc < GRID_SIZE &&
        !walls[nr][nc] &&
        !visited[nr][nc]
      ) {
        visited[nr][nc] = true;
        queue.push({ r: nr, c: nc, dist: cur.dist + 1 });
      }
    }
  }

  return -1; // Unsolvable
};

export const PathfindingGame: React.FC<PathfindingGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const [currentMaze, setCurrentMaze] = useState<MazeLevel | null>(null);
  const [playerPos, setPlayerPos] = useState<Coord>({ r: 0, c: 0 });
  const [moveCount, setMoveCount] = useState<number>(0);
  const [pathHistory, setPathHistory] = useState<Coord[]>([]);

  const generateSolvableMaze = (level: number): MazeLevel => {
    let attempts = 0;
    const start: Coord = { r: 0, c: 0 };
    const goal: Coord = { r: GRID_SIZE - 1, c: GRID_SIZE - 1 };

    while (attempts < 100) {
      const walls = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));
      const wallDensity = 0.22 + level * 0.03; // 22% to 34% walls

      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          if ((r === start.r && c === start.c) || (r === goal.r && c === goal.c)) continue;
          if (Math.random() < wallDensity) {
            walls[r][c] = true;
          }
        }
      }

      const shortest = solveBfs(start, goal, walls);
      // Valid maze must have a route of at least 8 steps
      if (shortest >= 8) {
        return { start, goal, walls, shortestLength: shortest };
      }
      attempts++;
    }

    // Fallback guaranteed maze if random generation fails
    const fallbackWalls = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));
    fallbackWalls[1][1] = true;
    fallbackWalls[1][2] = true;
    fallbackWalls[3][3] = true;
    return { start, goal, walls: fallbackWalls, shortestLength: 12 };
  };

  const handleStartGame = () => {
    setLevelIndex(0);
    setScore(0);
    startLevel(0);
  };

  const startLevel = (level: number) => {
    const maze = generateSolvableMaze(level);
    setCurrentMaze(maze);
    setPlayerPos({ ...maze.start });
    setMoveCount(0);
    setPathHistory([{ ...maze.start }]);
    setGameState('playing');
  };

  const attemptMove = (dr: number, dc: number) => {
    if (!currentMaze || gameState !== 'playing') return;

    const nr = playerPos.r + dr;
    const nc = playerPos.c + dc;

    // Check bounds
    if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE) return;
    // Check wall
    if (currentMaze.walls[nr][nc]) return;

    const newPos = { r: nr, c: nc };
    setPlayerPos(newPos);
    setMoveCount((m) => m + 1);
    setPathHistory((prev) => [...prev, newPos]);

    // Check win condition
    if (nr === currentMaze.goal.r && nc === currentMaze.goal.c) {
      const movesUsed = moveCount + 1;
      const efficiency = Math.max(0.5, currentMaze.shortestLength / movesUsed);
      const points = Math.round(300 * efficiency);
      setScore((s) => s + points);
      setGameState('level-cleared');
    }
  };

  const handleNextLevel = () => {
    const next = levelIndex + 1;
    if (next >= TOTAL_LEVELS) {
      setGameState('results');
    } else {
      setLevelIndex(next);
      startLevel(next);
    }
  };

  const handleResetLevel = () => {
    if (!currentMaze) return;
    setPlayerPos({ ...currentMaze.start });
    setMoveCount(0);
    setPathHistory([{ ...currentMaze.start }]);
    setGameState('playing');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        attemptMove(-1, 0);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        attemptMove(1, 0);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        attemptMove(0, -1);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        attemptMove(0, 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

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
          <Compass className="w-3.5 h-3.5" />
          Maze Pathfinding &amp; Planning
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Pathfinding &amp; Route Optimization
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Navigate from Start (S) to Goal (G) through obstacle courses. Plan your trajectory carefully — scoring rewards
              finding the theoretical shortest route with minimal backtracking.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Controls</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Arrow Keys / D-Pad</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Grid Dimension</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">7×7 Maze</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Progression</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{TOTAL_LEVELS} Maze Courses</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Pathfinding
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'level-cleared') && currentMaze && (
        <div className="space-y-6 max-w-lg mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                Maze {levelIndex + 1} of {TOTAL_LEVELS}
              </span>
              <span className="text-xs font-bold text-slate-600">
                Moves: {moveCount} (Optimal: {currentMaze.shortestLength})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-800">Score: {score}</span>
              <button
                onClick={handleResetLevel}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                title="Reset Position"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Maze Grid Display */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col items-center justify-center space-y-6">
            <div className="grid grid-cols-7 gap-1.5 w-72 h-72 sm:w-80 sm:h-80 select-none">
              {Array.from({ length: GRID_SIZE }).map((_, r) =>
                Array.from({ length: GRID_SIZE }).map((_, c) => {
                  const isWall = currentMaze.walls[r][c];
                  const isStart = r === currentMaze.start.r && c === currentMaze.start.c;
                  const isGoal = r === currentMaze.goal.r && c === currentMaze.goal.c;
                  const isPlayer = r === playerPos.r && c === playerPos.c;
                  const isVisited = pathHistory.some((p) => p.r === r && p.c === c);

                  let bgClass = 'bg-slate-50 border-slate-200';
                  if (isWall) bgClass = 'bg-slate-800 border-slate-900 shadow-inner';
                  else if (isPlayer) bgClass = 'bg-indigo-600 border-indigo-700 text-white font-black shadow-md ring-2 ring-indigo-300';
                  else if (isGoal) bgClass = 'bg-emerald-500 border-emerald-600 text-white font-black animate-pulse';
                  else if (isStart) bgClass = 'bg-amber-100 border-amber-300 text-amber-900 font-bold';
                  else if (isVisited) bgClass = 'bg-indigo-50 border-indigo-100';

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`rounded-xl border flex items-center justify-center text-xs transition-all duration-100 ${bgClass}`}
                    >
                      {isPlayer ? '●' : isGoal ? 'G' : isStart ? 'S' : isVisited && !isWall ? '·' : ''}
                    </div>
                  );
                })
              )}
            </div>

            {/* Level Cleared Overlay / Banner */}
            {gameState === 'level-cleared' ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center w-full space-y-3">
                <span className="text-sm font-extrabold text-emerald-800 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Maze Cleared in {moveCount} Moves!
                </span>
                <button
                  onClick={handleNextLevel}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
                >
                  {levelIndex + 1 >= TOTAL_LEVELS ? 'View Final Results' : 'Next Maze →'}
                </button>
              </div>
            ) : (
              /* Directional D-Pad Controls */
              <div className="flex flex-col items-center gap-1 pt-1">
                <button
                  onClick={() => attemptMove(-1, 0)}
                  className="w-12 h-12 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 flex items-center justify-center text-slate-700 active:scale-95"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={() => attemptMove(0, -1)}
                    className="w-12 h-12 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 flex items-center justify-center text-slate-700 active:scale-95"
                  >
                    <LeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => attemptMove(1, 0)}
                    className="w-12 h-12 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 flex items-center justify-center text-slate-700 active:scale-95"
                  >
                    <ArrowDown className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => attemptMove(0, 1)}
                    className="w-12 h-12 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 flex items-center justify-center text-slate-700 active:scale-95"
                  >
                    <RightIcon className="w-5 h-5" />
                  </button>
                </div>
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
            <h2 className="text-2xl font-black text-slate-900">All Mazes Solved!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on route planning, forward search, and trajectory optimization.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Courses Completed</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">{TOTAL_LEVELS} / {TOTAL_LEVELS}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Route Score</span>
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
