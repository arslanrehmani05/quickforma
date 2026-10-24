import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, RotateCcw, CircleDot, Award, Undo2, CheckCircle2 } from 'lucide-react';

interface PegSolitaireGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'game-over';

// Standard 7x7 English Cross layout
// True = valid board position, False = corner invalid position
const VALID_HOLES: boolean[][] = [
  [false, false, true, true, true, false, false],
  [false, false, true, true, true, false, false],
  [true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true],
  [false, false, true, true, true, false, false],
  [false, false, true, true, true, false, false],
];

interface Coord {
  r: number;
  c: number;
}

interface MoveRecord {
  from: Coord;
  jumped: Coord;
  to: Coord;
}

export const PegSolitaireGame: React.FC<PegSolitaireGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  // Board: true = has peg, false = empty hole, null = outside board
  const [board, setBoard] = useState<(boolean | null)[][]>([]);
  const [selectedPeg, setSelectedPeg] = useState<Coord | null>(null);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [moveHistory, setMoveHistory] = useState<MoveRecord[]>([]);

  const initializeBoard = () => {
    const newBoard: (boolean | null)[][] = [];
    for (let r = 0; r < 7; r++) {
      const row: (boolean | null)[] = [];
      for (let c = 0; c < 7; c++) {
        if (!VALID_HOLES[r][c]) {
          row.push(null);
        } else if (r === 3 && c === 3) {
          row.push(false); // Center is empty
        } else {
          row.push(true); // All other holes contain pegs (32 pegs)
        }
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
    setSelectedPeg(null);
    setMoveCount(0);
    setMoveHistory([]);
    setGameState('playing');
  };

  const countRemainingPegs = (b: (boolean | null)[][]): number => {
    let count = 0;
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (b[r]?.[c] === true) count++;
      }
    }
    return count;
  };

  // Check if any legal moves remain on the board
  const hasAnyLegalMoves = (b: (boolean | null)[][]): boolean => {
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (b[r]?.[c] === true) {
          for (let i = 0; i < 4; i++) {
            const mr = r + dr[i];
            const mc = c + dc[i];
            const tr = r + dr[i] * 2;
            const tc = c + dc[i] * 2;

            if (
              tr >= 0 && tr < 7 && tc >= 0 && tc < 7 &&
              b[mr]?.[mc] === true &&
              b[tr]?.[tc] === false
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };

  const handleCellClick = (r: number, c: number) => {
    if (gameState !== 'playing' || board[r][c] === null) return;

    if (selectedPeg === null) {
      // Must click on an existing peg
      if (board[r][c] === true) {
        setSelectedPeg({ r, c });
      }
    } else {
      // Already selected a peg
      if (selectedPeg.r === r && selectedPeg.c === c) {
        // Deselect
        setSelectedPeg(null);
        return;
      }

      // If clicked another peg, switch selection
      if (board[r][c] === true) {
        setSelectedPeg({ r, c });
        return;
      }

      // Attempt jump to empty hole (r, c)
      const dr = r - selectedPeg.r;
      const dc = c - selectedPeg.c;

      // Must be orthogonal jump of distance 2
      const isOrthogonal2 = (Math.abs(dr) === 2 && dc === 0) || (Math.abs(dc) === 2 && dr === 0);
      if (!isOrthogonal2) {
        setSelectedPeg(null);
        return;
      }

      const midR = selectedPeg.r + dr / 2;
      const midC = selectedPeg.c + dc / 2;

      // Jumped middle cell must contain a peg
      if (board[midR][midC] !== true) {
        setSelectedPeg(null);
        return;
      }

      // Legal jump!
      const nextBoard = board.map((row) => [...row]);
      nextBoard[selectedPeg.r][selectedPeg.c] = false; // from
      nextBoard[midR][midC] = false; // captured peg removed
      nextBoard[r][c] = true; // to

      const record: MoveRecord = {
        from: { ...selectedPeg },
        jumped: { r: midR, c: midC },
        to: { r, c },
      };

      setBoard(nextBoard);
      setSelectedPeg(null);
      setMoveCount((m) => m + 1);
      setMoveHistory((h) => [...h, record]);

      // Check if any legal moves remain
      if (!hasAnyLegalMoves(nextBoard)) {
        setGameState('game-over');
      }
    }
  };

  const handleUndo = () => {
    if (moveHistory.length === 0 || gameState !== 'playing') return;

    const last = moveHistory[moveHistory.length - 1];
    const nextBoard = board.map((row) => [...row]);

    nextBoard[last.from.r][last.from.c] = true;
    nextBoard[last.jumped.r][last.jumped.c] = true;
    nextBoard[last.to.r][last.to.c] = false;

    setBoard(nextBoard);
    setSelectedPeg(null);
    setMoveCount((m) => Math.max(0, m - 1));
    setMoveHistory((h) => h.slice(0, -1));
  };

  const remainingPegs = countRemainingPegs(board);

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
          <CircleDot className="w-3.5 h-3.5" />
          English Cross Peg Solitaire
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <CircleDot className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Peg Solitaire Strategy
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based on the classic 33-hole English cross board. Jump a peg orthogonally over an adjacent peg into an empty hole
              to remove the jumped peg. Plan your moves ahead to eliminate as many pegs as possible!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Board Style</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">English Cross (33)</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Mastery Goal</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">1 Peg in Center</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Jump Rules</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Orthogonal Distance 2</p>
            </div>
          </div>

          <button
            onClick={initializeBoard}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Solitaire Session
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'game-over') && (
        <div className="space-y-6 max-w-xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                Pegs Remaining: {remainingPegs}
              </span>
              <span className="text-xs font-bold text-slate-600">
                Jumps Made: {moveCount}
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
                onClick={initializeBoard}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
                title="Restart Board"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cross Board Arena */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-center h-6">
              {selectedPeg ? (
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 animate-pulse">
                  Peg selected! Tap an empty hole 2 steps away to jump.
                </span>
              ) : (
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  Tap peg to select, then tap target hole
                </span>
              )}
            </div>

            {/* 7x7 Grid */}
            <div className="grid grid-cols-7 gap-2 w-64 h-64 sm:w-80 sm:h-80 mx-auto select-none">
              {board.map((row, r) =>
                row.map((cell, c) => {
                  if (cell === null) {
                    return <div key={`${r}-${c}`} className="w-full h-full" />;
                  }

                  const hasPeg = cell === true;
                  const isSelected = selectedPeg?.r === r && selectedPeg?.c === c;

                  return (
                    <button
                      key={`${r}-${c}`}
                      disabled={gameState !== 'playing'}
                      onClick={() => handleCellClick(r, c)}
                      className={`w-full h-full rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-700 ring-4 ring-indigo-200 shadow-md scale-105'
                          : hasPeg
                          ? 'bg-indigo-500 border-indigo-600 hover:scale-105 shadow-xs'
                          : 'bg-slate-100 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {hasPeg && (
                        <div className="w-3 h-3 rounded-full bg-white/90 shadow-xs" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Game Over Banner */}
            {gameState === 'game-over' && (
              <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200 text-center space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 flex items-center justify-center gap-2">
                    <Award className="w-6 h-6 text-indigo-600" />
                    No Further Legal Moves!
                  </h3>
                  <p className="text-xs text-slate-600">
                    Finished with <strong>{remainingPegs} peg{remainingPegs === 1 ? '' : 's'}</strong> remaining across {moveCount} jumps.
                    {remainingPegs === 1 ? ' Masterful performance!' : remainingPegs <= 3 ? ' Excellent strategic look-ahead!' : ' Keep practicing!'}
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={initializeBoard}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
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
