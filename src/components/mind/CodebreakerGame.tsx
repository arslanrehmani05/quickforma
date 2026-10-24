import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, Key, CheckCircle2, XCircle, Award, Delete } from 'lucide-react';

interface CodebreakerGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'won' | 'lost';

const CODE_LENGTH = 4;
const MAX_ATTEMPTS = 8;

interface ColorPeg {
  name: string;
  hex: string;
}

const PEGS: ColorPeg[] = [
  { name: 'Red', hex: '#ef4444' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Green', hex: '#10b981' },
  { name: 'Yellow', hex: '#eab308' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Orange', hex: '#f97316' },
];

interface GuessRow {
  guess: string[]; // hex codes
  exactMatches: number; // bulls (green)
  colorMatches: number; // cows (amber)
}

export const CodebreakerGame: React.FC<CodebreakerGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [secretCode, setSecretCode] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [history, setHistory] = useState<GuessRow[]>([]);
  const [score, setScore] = useState<number>(0);

  // Generate 4 unique random colors
  const generateSecretCode = (): string[] => {
    const shuffled = [...PEGS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, CODE_LENGTH).map((p) => p.hex);
  };

  const handleStartGame = () => {
    const code = generateSecretCode();
    setSecretCode(code);
    setCurrentGuess([]);
    setHistory([]);
    setScore(0);
    setGameState('playing');
  };

  const handleColorClick = (hex: string) => {
    if (gameState !== 'playing' || currentGuess.length >= CODE_LENGTH) return;
    setCurrentGuess((prev) => [...prev, hex]);
  };

  const handleBackspace = () => {
    if (gameState !== 'playing' || currentGuess.length === 0) return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleSubmitGuess = () => {
    if (gameState !== 'playing' || currentGuess.length !== CODE_LENGTH) return;

    // Evaluate bulls and cows
    let exact = 0;
    let colorOnly = 0;

    const secretUnmatched: string[] = [];
    const guessUnmatched: string[] = [];

    for (let i = 0; i < CODE_LENGTH; i++) {
      if (currentGuess[i] === secretCode[i]) {
        exact++;
      } else {
        secretUnmatched.push(secretCode[i]);
        guessUnmatched.push(currentGuess[i]);
      }
    }

    for (const g of guessUnmatched) {
      const idx = secretUnmatched.indexOf(g);
      if (idx !== -1) {
        colorOnly++;
        secretUnmatched.splice(idx, 1);
      }
    }

    const row: GuessRow = {
      guess: [...currentGuess],
      exactMatches: exact,
      colorMatches: colorOnly,
    };

    const nextHistory = [...history, row];
    setHistory(nextHistory);
    setCurrentGuess([]);

    if (exact === CODE_LENGTH) {
      // Won!
      const attemptsUsed = nextHistory.length;
      const points = Math.max(100, 1000 - attemptsUsed * 100);
      setScore(points);
      setGameState('won');
    } else if (nextHistory.length >= MAX_ATTEMPTS) {
      // Lost
      setGameState('lost');
    }
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
          <Key className="w-3.5 h-3.5" />
          Codebreaker (Mastermind)
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Key className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Mastermind Codebreaker
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Deduce a hidden 4-color combination within 8 attempts. Each submission reveals precise feedback:
              green pegs indicate exact position matches, and amber pegs indicate correct colors in the wrong position.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <span className="font-extrabold text-xs uppercase tracking-wider block">Exact Match (Green)</span>
              <p className="text-xs text-emerald-700 mt-1">Correct color in the correct position.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
              <span className="font-extrabold text-xs uppercase tracking-wider block">Color Match (Amber)</span>
              <p className="text-xs text-amber-700 mt-1">Correct color, but misplaced position.</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Start Cracking Code
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'won' || gameState === 'lost') && (
        <div className="space-y-6 max-w-lg mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              Attempt {Math.min(MAX_ATTEMPTS, history.length + 1)} of {MAX_ATTEMPTS}
            </span>
            <div className="text-xs font-bold text-slate-600">
              {MAX_ATTEMPTS - history.length} guesses remaining
            </div>
          </div>

          {/* Master Board Display */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Secret Code (Revealed on Game Over) */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-slate-400">Secret Code:</span>
              <div className="flex gap-2">
                {secretCode.map((hex, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: gameState === 'playing' ? '#94a3b8' : hex }}
                    className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center font-bold text-xs text-white shadow-xs"
                  >
                    {gameState === 'playing' ? '?' : ''}
                  </div>
                ))}
              </div>
            </div>

            {/* History Table */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {history.map((row, rIdx) => (
                <div
                  key={rIdx}
                  className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-400 w-6">#{rIdx + 1}</span>

                  {/* Guess Pegs */}
                  <div className="flex gap-2">
                    {row.guess.map((hex, cIdx) => (
                      <div
                        key={cIdx}
                        style={{ backgroundColor: hex }}
                        className="w-7 h-7 rounded-full border border-slate-300 shadow-xs"
                      />
                    ))}
                  </div>

                  {/* Feedback Pegs */}
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl">
                    <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-0.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> {row.exactMatches}
                    </span>
                    <span className="text-xs font-extrabold text-amber-500 flex items-center gap-0.5 ml-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> {row.colorMatches}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Guess Input Row */}
            {gameState === 'playing' && (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-400 uppercase">Current Guess:</span>
                  <div className="flex gap-2">
                    {Array.from({ length: CODE_LENGTH }).map((_, idx) => {
                      const hex = currentGuess[idx];
                      return (
                        <div
                          key={idx}
                          style={{ backgroundColor: hex || '#f1f5f9' }}
                          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                            hex ? 'border-slate-400 shadow-xs' : 'border-dashed border-slate-300'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Color Palette Buttons */}
                <div className="grid grid-cols-6 gap-2">
                  {PEGS.map((peg) => (
                    <button
                      key={peg.name}
                      onClick={() => handleColorClick(peg.hex)}
                      style={{ backgroundColor: peg.hex }}
                      className="h-10 rounded-xl border border-black/10 shadow-xs active:scale-90 transition-transform"
                      title={peg.name}
                    />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    disabled={currentGuess.length === 0}
                    onClick={handleBackspace}
                    className="py-3 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 transition-all flex items-center justify-center gap-1.5 disabled:opacity-40"
                  >
                    <Delete className="w-4 h-4" /> Backspace
                  </button>

                  <button
                    disabled={currentGuess.length !== CODE_LENGTH}
                    onClick={handleSubmitGuess}
                    className="py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-bold text-xs text-white transition-all shadow-sm disabled:opacity-40"
                  >
                    Submit Guess
                  </button>
                </div>
              </div>
            )}

            {/* Game Over Banner */}
            {(gameState === 'won' || gameState === 'lost') && (
              <div className={`p-6 rounded-2xl border text-center space-y-4 ${
                gameState === 'won' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
              }`}>
                <div className="space-y-1">
                  <h3 className={`text-xl font-black ${gameState === 'won' ? 'text-emerald-900' : 'text-rose-900'}`}>
                    {gameState === 'won' ? 'Code Cracked Successfully!' : 'Out of Attempts!'}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {gameState === 'won'
                      ? `Solved in ${history.length} attempts (+${score} points).`
                      : 'The secret combination has been revealed above.'}
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleStartGame}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Play Again
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
