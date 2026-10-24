import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, ShieldAlert, Clock, CheckCircle2, XCircle, Award } from 'lucide-react';

interface GoNoGoGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'results';

interface Stimulus {
  id: number;
  type: 'go' | 'no-go';
  color: string;
  shape: 'circle' | 'square';
  label: string;
}

export const GoNoGoGame: React.FC<GoNoGoGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);

  // Signal detection metrics
  const [hits, setHits] = useState<number>(0); // Go responded
  const [misses, setMisses] = useState<number>(0); // Go omitted
  const [falseAlarms, setFalseAlarms] = useState<number>(0); // No-go responded
  const [correctRejections, setCorrectRejections] = useState<number>(0); // No-go withheld
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);

  const [currentStimulus, setCurrentStimulus] = useState<Stimulus | null>(null);
  const [stimulusVisible, setStimulusVisible] = useState<boolean>(false);
  const [hasRespondedCurrent, setHasRespondedCurrent] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<'hit' | 'false-alarm' | 'miss' | null>(null);

  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stimulusTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stimulusStartTimeRef = useRef<number>(0);

  const currentTrialRef = useRef<{
    stimulus: Stimulus | null;
    responded: boolean;
  }>({ stimulus: null, responded: false });

  const nextTrial = () => {
    // 75% Go (Green Circle), 25% No-Go (Red Square)
    const isGo = Math.random() < 0.75;
    const stim: Stimulus = isGo
      ? { id: Date.now(), type: 'go', color: '#10b981', shape: 'circle', label: 'GO!' }
      : { id: Date.now(), type: 'no-go', color: '#ef4444', shape: 'square', label: 'NO-GO' };

    currentTrialRef.current = { stimulus: stim, responded: false };
    setCurrentStimulus(stim);
    setStimulusVisible(true);
    setHasRespondedCurrent(false);
    stimulusStartTimeRef.current = performance.now();

    // Stimulus stays visible for 700ms
    stimulusTimerRef.current = setTimeout(() => {
      setStimulusVisible(false);

      // Evaluate if player did NOT respond
      if (!currentTrialRef.current.responded) {
        if (stim.type === 'go') {
          // Missed a GO
          setMisses((m) => m + 1);
          setScore((s) => Math.max(0, s - 50));
        } else {
          // Correctly withheld on NO-GO
          setCorrectRejections((cr) => cr + 1);
          setScore((s) => s + 150);
        }
      }

      // ISI blank gap for 350ms before next stimulus
      stimulusTimerRef.current = setTimeout(() => {
        setFeedback(null);
        nextTrial();
      }, 350);
    }, 700);
  };

  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setScore(0);
    setHits(0);
    setMisses(0);
    setFalseAlarms(0);
    setCorrectRejections(0);
    setReactionTimes([]);
    setFeedback(null);

    nextTrial();
  };

  // Response trigger (tap or space)
  const handleResponse = () => {
    if (gameState !== 'playing' || !stimulusVisible || hasRespondedCurrent) return;

    const latency = performance.now() - stimulusStartTimeRef.current;
    setHasRespondedCurrent(true);
    currentTrialRef.current.responded = true;

    if (currentStimulus?.type === 'go') {
      // Correct HIT
      setHits((h) => h + 1);
      setScore((s) => s + 100);
      setReactionTimes((arr) => [...arr, latency]);
      setFeedback('hit');
    } else {
      // FALSE ALARM (reckless response)
      setFalseAlarms((fa) => fa + 1);
      setScore((s) => Math.max(0, s - 200));
      setFeedback('false-alarm');
    }
  };

  // Keyboard space bar listener
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

  // Game timer
  useEffect(() => {
    if (gameState === 'playing') {
      gameTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (gameTimerRef.current) clearInterval(gameTimerRef.current);
            if (stimulusTimerRef.current) clearTimeout(stimulusTimerRef.current);
            setGameState('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      if (stimulusTimerRef.current) clearTimeout(stimulusTimerRef.current);
    }

    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      if (stimulusTimerRef.current) clearTimeout(stimulusTimerRef.current);
    };
  }, [gameState]);

  const avgReactionTime = reactionTimes.length
    ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
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
          <ShieldAlert className="w-3.5 h-3.5" />
          Go / No-Go Inhibition
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Go / No-Go Challenge
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Test your motor impulse control and response inhibition.
              React quickly to frequent <strong>Green Circles</strong> (GO), but strictly <strong>WITHHOLD</strong> on <strong>Red Squares</strong> (NO-GO).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <span className="font-extrabold text-xs uppercase tracking-wider block">Green Circle: GO</span>
              <p className="text-xs text-emerald-700 mt-1">Tap screen or press Spacebar quickly (+100 pts)</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900">
              <span className="font-extrabold text-xs uppercase tracking-wider block">Red Square: NO-GO</span>
              <p className="text-xs text-rose-700 mt-1">Do NOT touch or press anything (-200 pts penalty)</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Start 60s Session
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

          {/* Stimulus Arena (Tap target) */}
          <button
            onClick={handleResponse}
            className="w-full h-80 bg-white border-2 border-slate-200 hover:border-indigo-300 rounded-3xl p-8 shadow-xs flex flex-col items-center justify-center space-y-4 transition-all active:scale-98 cursor-pointer select-none"
          >
            {stimulusVisible && currentStimulus ? (
              <div className="flex flex-col items-center gap-4 animate-scale">
                <div
                  style={{ backgroundColor: currentStimulus.color }}
                  className={`w-32 h-32 flex items-center justify-center shadow-lg transition-transform ${
                    currentStimulus.shape === 'circle' ? 'rounded-full' : 'rounded-2xl'
                  }`}
                >
                  <span className="text-xl font-black text-white uppercase tracking-wider">
                    {currentStimulus.label}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {currentStimulus.type === 'go' ? 'TAP / SPACE' : 'DO NOT TAP!'}
                </span>
              </div>
            ) : (
              <div className="w-4 h-4 rounded-full bg-slate-300 animate-pulse" />
            )}

            {feedback && (
              <div className="text-xs font-black uppercase tracking-widest">
                {feedback === 'hit' && <span className="text-emerald-600">Good Hit!</span>}
                {feedback === 'false-alarm' && <span className="text-rose-600">False Alarm (-200)!</span>}
              </div>
            )}
          </button>
        </div>
      )}

      {gameState === 'results' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Sprint Completed!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on motor impulse withholding and response latency.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Correct Hits</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">{hits}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">False Alarms</span>
              <p className="text-2xl font-black text-rose-600 mt-1">{falseAlarms}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Withheld</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">{correctRejections}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Mean RT</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{avgReactionTime}ms</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between text-left">
            <div>
              <span className="text-xs font-extrabold text-indigo-700 uppercase tracking-wider">Inhibition Score</span>
              <p className="text-xs text-slate-600">Points accumulated with penalty deduplication</p>
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
