import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, Sliders, CheckCircle2, Award, Undo2 } from 'lucide-react';

interface TowerOfHanoiGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'solved';

export const TowerOfHanoiGame: React.FC<TowerOfHanoiGameProps> = ({ onBack }) => {
  const [numDisks, setNumDisks] = useState<number>(3);
  const [gameState, setGameState] = useState<GameState>('idle');

  // 3 pegs: Peg 0 (Left), Peg 1 (Middle), Peg 2 (Right)
  // Array of disk sizes, where 1 is smallest, N is largest
  // The bottom disk is at index 0, top disk is at index length-1
  const [pegs, setPegs] = useState<number[][]>([[], [], []]);
  const [selectedPeg, setSelectedPeg] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [moveHistory, setMoveHistory] = useState<{ from: number; to: number }[]>([]);

  const minMoves = Math.pow(2, numDisks) - 1;

  const handleStartGame = () => {
    // Peg 0 has disks [numDisks, ..., 1]
    const initialPeg0: number[] = [];
    for (let i = numDisks; i >= 1; i--) {
      initialPeg0.push(i);
    }
    setPegs([initialPeg0, [], []]);
    setSelectedPeg(null);
    setMoveCount(0);
    setMoveHistory([]);
    setErrorMessage(null);
    setGameState('playing');
  };

  const handlePegClick = (pegIndex: number) => {
    if (gameState !== 'playing') return;

    if (selectedPeg === null) {
      // Trying to select source peg
      if (pegs[pegIndex].length === 0) {
        setErrorMessage('Cannot select an empty peg.');
        return;
      }
      setSelectedPeg(pegIndex);
      setErrorMessage(null);
    } else {
      // Trying to move from selectedPeg to pegIndex
      if (selectedPeg === pegIndex) {
        // Deselect
        setSelectedPeg(null);
        setErrorMessage(null);
        return;
      }

      const sourceDisks = pegs[selectedPeg];
      const targetDisks = pegs[pegIndex];

      const movingDisk = sourceDisks[sourceDisks.length - 1];
      const topTargetDisk = targetDisks.length > 0 ? targetDisks[targetDisks.length - 1] : null;

      // Rule check: larger disk cannot be placed on smaller disk
      if (topTargetDisk !== null && movingDisk > topTargetDisk) {
        setErrorMessage(`Illegal Move: Disk ${movingDisk} cannot be placed on smaller Disk ${topTargetDisk}!`);
        setSelectedPeg(null);
        return;
      }

      // Legal move!
      const nextPegs = pegs.map((p) => [...p]);
      nextPegs[selectedPeg].pop();
      nextPegs[pegIndex].push(movingDisk);

      setPegs(nextPegs);
      setMoveCount((m) => m + 1);
      setMoveHistory((h) => [...h, { from: selectedPeg, to: pegIndex }]);
      setSelectedPeg(null);
      setErrorMessage(null);

      // Check win condition: all disks moved to Peg 2 (Right)
      if (nextPegs[2].length === numDisks) {
        setGameState('solved');
      }
    }
  };

  const handleUndo = () => {
    if (moveHistory.length === 0 || gameState !== 'playing') return;

    const lastMove = moveHistory[moveHistory.length - 1];
    const nextPegs = pegs.map((p) => [...p]);

    const disk = nextPegs[lastMove.to].pop();
    if (disk !== undefined) {
      nextPegs[lastMove.from].push(disk);
    }

    setPegs(nextPegs);
    setMoveCount((m) => Math.max(0, m - 1));
    setMoveHistory((h) => h.slice(0, -1));
    setSelectedPeg(null);
    setErrorMessage(null);
  };

  const getDiskWidth = (diskSize: number) => {
    // Scale disk width based on size (1 to 5)
    return 40 + diskSize * 26;
  };

  const getDiskColor = (diskSize: number) => {
    const colors = ['#6366f1', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b'];
    return colors[(diskSize - 1) % colors.length];
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
          <Sliders className="w-3.5 h-3.5" />
          Tower of Hanoi Planning
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Sliders className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Tower of Hanoi Strategy
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Transfer the stack of disks from Peg A to Peg C.
              You may move only one disk at a time, and <strong>never place a larger disk onto a smaller disk</strong>.
            </p>
          </div>

          {/* Difficulty / Disk Count Selector */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Select Number of Disks
            </span>
            <div className="flex justify-center gap-3">
              {[3, 4, 5].map((count) => (
                <button
                  key={count}
                  onClick={() => setNumDisks(count)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    numDisks === count
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {count} Disks ({Math.pow(2, count) - 1} min moves)
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Start Puzzle Session
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'solved') && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                {numDisks} Disks
              </span>
              <span className="text-xs font-bold text-slate-600">
                Moves: {moveCount} (Min: {minMoves})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={moveHistory.length === 0 || gameState !== 'playing'}
                onClick={handleUndo}
                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1 disabled:opacity-40"
              >
                <Undo2 className="w-3.5 h-3.5" /> Undo
              </button>
              <button
                onClick={handleStartGame}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Peg Board Arena */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-center h-6">
              {errorMessage ? (
                <span className="text-xs font-bold text-rose-600 animate-pulse">{errorMessage}</span>
              ) : selectedPeg !== null ? (
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
                  Disk selected from Peg {String.fromCharCode(65 + selectedPeg)}. Tap target peg to move!
                </span>
              ) : (
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  Tap peg to select top disk, then tap destination peg
                </span>
              )}
            </div>

            {/* 3 Pegs Layout */}
            <div className="grid grid-cols-3 gap-4 pt-4 pb-2">
              {[0, 1, 2].map((pegIdx) => {
                const diskStack = pegs[pegIdx];
                const isSelected = selectedPeg === pegIdx;

                return (
                  <button
                    key={pegIdx}
                    onClick={() => handlePegClick(pegIdx)}
                    className={`relative h-64 sm:h-72 rounded-2xl flex flex-col items-center justify-end pb-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/70 border-2 border-indigo-400 ring-2 ring-indigo-200'
                        : 'bg-slate-50 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Peg Spindle */}
                    <div className="absolute top-6 bottom-3 w-3 bg-slate-300 rounded-full" />

                    {/* Disks stacked bottom to top */}
                    <div className="relative z-10 flex flex-col items-center gap-1.5 w-full">
                      {diskStack.map((diskSize, idx) => {
                        const isTopDisk = idx === diskStack.length - 1;
                        return (
                          <div
                            key={diskSize}
                            style={{
                              width: `${getDiskWidth(diskSize)}px`,
                              backgroundColor: getDiskColor(diskSize),
                            }}
                            className={`h-6 sm:h-7 rounded-lg shadow-sm flex items-center justify-center font-black text-xs text-white transition-all ${
                              isSelected && isTopDisk ? '-translate-y-2 ring-2 ring-white shadow-md' : ''
                            }`}
                          >
                            {diskSize}
                          </div>
                        );
                      })}
                    </div>

                    <span className="text-xs font-extrabold uppercase text-slate-400 mt-3 relative z-10">
                      Peg {String.fromCharCode(65 + pegIdx)} {pegIdx === 2 ? '(Goal)' : ''}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Solved Banner */}
            {gameState === 'solved' && (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-emerald-900 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    Tower Transferred Successfully!
                  </h3>
                  <p className="text-xs text-slate-600">
                    Completed in <strong>{moveCount} moves</strong> (Theoretical optimal: {minMoves} moves).
                    Efficiency: {Math.round((minMoves / moveCount) * 100)}%.
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleStartGame}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={onBack}
                    className="px-6 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all"
                  >
                    Mind Suite
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
