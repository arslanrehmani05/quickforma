import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, Search, Clock, CheckCircle2, Award } from 'lucide-react';

interface VisualSearchGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'round-feedback' | 'results';

interface SearchItem {
  id: number;
  x: number; // %
  y: number; // %
  rotation: number;
  isTarget: boolean;
  letter: string;
  color: string;
}

const TOTAL_ROUNDS = 10;

export const VisualSearchGame: React.FC<VisualSearchGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [roundIndex, setRoundIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [roundLatencies, setRoundLatencies] = useState<number[]>([]);

  const [items, setItems] = useState<SearchItem[]>([]);
  const [targetSpec, setTargetSpec] = useState<{ letter: string; color: string }>({ letter: 'T', color: '#ef4444' });

  const roundStartTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateRound = (round: number) => {
    // Target: Red 'T'
    const target = { letter: 'T', color: '#ef4444' };
    setTargetSpec(target);

    // Number of items scales: 16 -> 24 -> 32 -> 40
    const itemCount = 16 + Math.min(24, round * 4);
    const newItems: SearchItem[] = [];
    const usedPositions: { x: number; y: number }[] = [];

    // Target position
    const targetX = 10 + Math.floor(Math.random() * 80);
    const targetY = 10 + Math.floor(Math.random() * 80);
    usedPositions.push({ x: targetX, y: targetY });

    newItems.push({
      id: 0,
      x: targetX,
      y: targetY,
      rotation: 0,
      isTarget: true,
      letter: target.letter,
      color: target.color,
    });

    // Conjunction Distractors:
    // Some are Red 'L', some are Blue 'T', some are Blue 'L'
    const distractorTypes = [
      { letter: 'L', color: '#ef4444' }, // Share color
      { letter: 'T', color: '#3b82f6' }, // Share shape
      { letter: 'L', color: '#3b82f6' }, // Share neither
    ];

    for (let i = 1; i < itemCount; i++) {
      let x = 0;
      let y = 0;
      let safe = false;
      let attempts = 0;

      while (!safe && attempts < 60) {
        x = 8 + Math.floor(Math.random() * 84);
        y = 8 + Math.floor(Math.random() * 84);
        safe = usedPositions.every((p) => Math.hypot(p.x - x, p.y - y) > 9);
        attempts++;
      }
      usedPositions.push({ x, y });

      const dType = distractorTypes[Math.floor(Math.random() * distractorTypes.length)];
      // Random rotation (0, 90, 180, 270)
      const rot = [0, 90, 180, 270][Math.floor(Math.random() * 4)];

      newItems.push({
        id: i,
        x,
        y,
        rotation: rot,
        isTarget: false,
        letter: dType.letter,
        color: dType.color,
      });
    }

    setItems(newItems);
    setGameState('playing');
    roundStartTimeRef.current = performance.now();
  };

  const handleStartGame = () => {
    setRoundIndex(0);
    setScore(0);
    setRoundLatencies([]);
    generateRound(0);
  };

  const handleItemClick = (item: SearchItem) => {
    if (gameState !== 'playing') return;

    if (item.isTarget) {
      const latency = performance.now() - roundStartTimeRef.current;
      setRoundLatencies((prev) => [...prev, latency]);

      // Speed bonus: max 500 points minus latency/10
      const speedScore = Math.max(50, Math.round(500 - latency / 15));
      setScore((s) => s + speedScore);
      setGameState('round-feedback');

      timerRef.current = setTimeout(() => {
        const nextRound = roundIndex + 1;
        if (nextRound >= TOTAL_ROUNDS) {
          setGameState('results');
        } else {
          setRoundIndex(nextRound);
          generateRound(nextRound);
        }
      }, 700);
    } else {
      // Penalty for false click
      setScore((s) => Math.max(0, s - 50));
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const avgLatency = roundLatencies.length
    ? Math.round(roundLatencies.reduce((a, b) => a + b, 0) / roundLatencies.length)
    : 0;

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
          <Search className="w-3.5 h-3.5" />
          Conjunction Visual Search
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Visual Search Challenge
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based on feature integration theory (Treisman). Scan a dense visual field of distractors
              to find and click the unique target as rapidly as possible.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center gap-4">
            <span className="text-xs font-extrabold uppercase text-slate-400">Target to Find:</span>
            <div className="flex items-center gap-2 font-black text-2xl text-red-500 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xs">
              <span>T</span>
              <span className="text-xs font-bold text-slate-500">(Red T)</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Distractors</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Red L &amp; Blue T</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Array Size</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">16 to 40 Items</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Rounds</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{TOTAL_ROUNDS} Levels</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Visual Search
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'round-feedback') && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                Round {roundIndex + 1} of {TOTAL_ROUNDS}
              </span>
              <span className="text-xs font-bold text-slate-600">
                Density: {items.length} items
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-xs font-black text-red-600">
                <span>Target:</span>
                <span>T</span>
              </div>
              <span className="text-xs font-bold text-slate-800">Score: {score}</span>
            </div>
          </div>

          {/* Search Field Arena */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs relative">
            <div className="w-full h-80 sm:h-96 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden select-none">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  style={{
                    position: 'absolute',
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                    color: item.color,
                  }}
                  className={`w-8 h-8 flex items-center justify-center font-black text-xl transition-transform active:scale-90 ${
                    gameState === 'round-feedback' && item.isTarget
                      ? 'ring-4 ring-emerald-400 bg-emerald-100 rounded-lg scale-125'
                      : ''
                  }`}
                >
                  {item.letter}
                </button>
              ))}

              {gameState === 'round-feedback' && (
                <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center pointer-events-none">
                  <span className="bg-emerald-600 text-white font-extrabold text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Target Located!
                  </span>
                </div>
              )}
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
            <h2 className="text-2xl font-black text-slate-900">Search Protocol Complete!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on visual feature binding and target scanning efficiency across item set sizes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Mean Target Acquisition</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">{avgLatency}ms</p>
              <span className="text-xs text-slate-500">average response latency</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Total Score</span>
              <p className="text-3xl font-black text-slate-900 mt-1">{score}</p>
              <span className="text-xs text-slate-500">points</span>
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
