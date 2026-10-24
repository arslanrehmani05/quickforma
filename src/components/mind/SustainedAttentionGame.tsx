import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, Radar, Clock, CheckCircle2, Award, AlertCircle } from 'lucide-react';

interface SustainedAttentionGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'results';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'X', 'Y', 'Z'];

export const SustainedAttentionGame: React.FC<SustainedAttentionGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);

  // CPT metrics
  const [hits, setHits] = useState<number>(0);
  const [misses, setMisses] = useState<number>(0);
  const [falseAlarms, setFalseAlarms] = useState<number>(0);
  const [correctRejections, setCorrectRejections] = useState<number>(0);

  const [currentLetter, setCurrentLetter] = useState<string | null>(null);
  const [letterVisible, setLetterVisible] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const letterTimerRef = useRef<NodeJS.Timeout | null>(null);

  const previousLetterRef = useRef<string | null>(null);
  const currentLetterRef = useRef<string | null>(null);
  const respondedCurrentRef = useRef<boolean>(false);

  const nextLetter = () => {
    // Generate letter: ensure 'A' occurs ~25% of the time, and when previous was 'A', 'X' occurs ~50%
    let next: string;
    const prev = currentLetterRef.current;

    if (prev === 'A') {
      next = Math.random() < 0.5 ? 'X' : LETTERS[Math.floor(Math.random() * LETTERS.length)];
    } else {
      next = Math.random() < 0.25 ? 'A' : LETTERS[Math.floor(Math.random() * LETTERS.length)];
    }

    previousLetterRef.current = prev;
    currentLetterRef.current = next;
    respondedCurrentRef.current = false;

    setCurrentLetter(next);
    setLetterVisible(true);

    // Letter visible for 600ms
    letterTimerRef.current = setTimeout(() => {
      setLetterVisible(false);

      // Evaluate non-response at end of stimulus
      const isAxTarget = previousLetterRef.current === 'A' && next === 'X';
      if (!respondedCurrentRef.current) {
        if (isAxTarget) {
          // Missed AX
          setMisses((m) => m + 1);
          setScore((s) => Math.max(0, s - 60));
        } else {
          setCorrectRejections((cr) => cr + 1);
        }
      }

      // ISI blank gap for 300ms
      letterTimerRef.current = setTimeout(() => {
        setFeedback(null);
        nextLetter();
      }, 300);
    }, 600);
  };

  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setScore(0);
    setHits(0);
    setMisses(0);
    setFalseAlarms(0);
    setCorrectRejections(0);
    setFeedback(null);
    previousLetterRef.current = null;
    currentLetterRef.current = null;

    nextLetter();
  };

  const handleResponse = () => {
    if (gameState !== 'playing' || !letterVisible || respondedCurrentRef.current) return;

    respondedCurrentRef.current = true;
    const isAxTarget = previousLetterRef.current === 'A' && currentLetterRef.current === 'X';

    if (isAxTarget) {
      setHits((h) => h + 1);
      setScore((s) => s + 150);
      setFeedback('Hit (A → X)!');
    } else {
      setFalseAlarms((fa) => fa + 1);
      setScore((s) => Math.max(0, s - 120));
      setFeedback('False Alarm (-120)');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleResponse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    if (gameState === 'playing') {
      gameTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (gameTimerRef.current) clearInterval(gameTimerRef.current);
            if (letterTimerRef.current) clearTimeout(letterTimerRef.current);
            setGameState('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      if (letterTimerRef.current) clearTimeout(letterTimerRef.current);
    }

    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      if (letterTimerRef.current) clearTimeout(letterTimerRef.current);
    };
  }, [gameState]);

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
          <Radar className="w-3.5 h-3.5" />
          Sustained Attention (AX-CPT)
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Radar className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Sustained Attention Task
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based on the continuous performance test (AX-CPT). A rapid stream of letters will flash.
              Respond <strong>ONLY</strong> when an <strong>&ldquo;X&rdquo;</strong> appears immediately following an <strong>&ldquo;A&rdquo;</strong>!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-left text-xs text-indigo-900 space-y-1">
            <span className="font-extrabold uppercase tracking-wider block">Target Condition:</span>
            <p>Letter <strong>&ldquo;A&rdquo;</strong> primes the target. When <strong>&ldquo;X&rdquo;</strong> appears right after, press Space or tap immediately! If X appears after any other letter (e.g. B → X), do NOT respond.</p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Target Rule</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">A followed by X</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Duration</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">60 Seconds</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Controls</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Tap / Spacebar</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Start Vigilance Session
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-6 max-w-lg mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span className="font-black text-xl text-slate-900">{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-600">Score: {score}</span>
              <span className="text-xs font-bold text-emerald-600">Hits: {hits}</span>
              <span className="text-xs font-bold text-rose-600">FA: {falseAlarms}</span>
            </div>
          </div>

          {/* Letter Presentation Arena */}
          <button
            onClick={handleResponse}
            className="w-full h-80 bg-white border-2 border-slate-200 hover:border-indigo-300 rounded-3xl p-8 shadow-xs flex flex-col items-center justify-center space-y-4 transition-all active:scale-98 cursor-pointer select-none"
          >
            {letterVisible && currentLetter ? (
              <span className="text-8xl font-black text-slate-900 select-none animate-scale tracking-tighter">
                {currentLetter}
              </span>
            ) : (
              <div className="w-4 h-4 rounded-full bg-slate-300 animate-pulse" />
            )}

            <div className="h-6">
              {feedback ? (
                <span className={`text-xs font-black uppercase tracking-widest ${
                  feedback.includes('Hit') ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {feedback}
                </span>
              ) : (
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                  Tap / Space ONLY if &ldquo;X&rdquo; follows &ldquo;A&rdquo;
                </span>
              )}
            </div>
          </button>
        </div>
      )}

      {gameState === 'results' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Vigilance Session Completed!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on sustained cognitive monitoring and contextual sequence detection.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Correct Hits</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">{hits}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Missed AX</span>
              <p className="text-2xl font-black text-slate-600 mt-1">{misses}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">False Alarms</span>
              <p className="text-2xl font-black text-rose-600 mt-1">{falseAlarms}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between text-left">
            <div>
              <span className="text-xs font-extrabold text-indigo-700 uppercase tracking-wider">Vigilance Score</span>
              <p className="text-xs text-slate-600">Calculated from hits with false-alarm penalty</p>
            </div>
            <div className="text-2xl font-black text-indigo-700">{score}</div>
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
