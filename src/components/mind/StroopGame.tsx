import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, Palette, Clock, CheckCircle2, Award, Zap } from 'lucide-react';

interface StroopGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'results';

interface ColorDefinition {
  name: string;
  hex: string;
  bgClass: string;
  textClass: string;
}

const COLOR_PALETTE: ColorDefinition[] = [
  { name: 'Red', hex: '#ef4444', bgClass: 'bg-red-500', textClass: 'text-red-500' },
  { name: 'Blue', hex: '#3b82f6', bgClass: 'bg-blue-500', textClass: 'text-blue-500' },
  { name: 'Green', hex: '#10b981', bgClass: 'bg-emerald-500', textClass: 'text-emerald-500' },
  { name: 'Yellow', hex: '#eab308', bgClass: 'bg-amber-500', textClass: 'text-amber-500' },
];

interface StroopTrial {
  word: string;
  colorName: string;
  colorHex: string;
  isCongruent: boolean;
  options: string[];
}

export const StroopGame: React.FC<StroopGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);

  // Latency metrics for Stroop effect
  const [congruentLatencies, setCongruentLatencies] = useState<number[]>([]);
  const [incongruentLatencies, setIncongruentLatencies] = useState<number[]>([]);

  const [currentTrial, setCurrentTrial] = useState<StroopTrial | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const trialStartTimeRef = useRef<number>(0);

  const generateTrial = (): StroopTrial => {
    const isCongruent = Math.random() < 0.35; // 35% congruent, 65% incongruent
    const wordDef = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    let colorDef: ColorDefinition;

    if (isCongruent) {
      colorDef = wordDef;
    } else {
      const otherColors = COLOR_PALETTE.filter((c) => c.name !== wordDef.name);
      colorDef = otherColors[Math.floor(Math.random() * otherColors.length)];
    }

    // Shuffle options
    const options = [...COLOR_PALETTE.map((c) => c.name)].sort(() => Math.random() - 0.5);

    return {
      word: wordDef.name.toUpperCase(),
      colorName: colorDef.name,
      colorHex: colorDef.hex,
      isCongruent,
      options,
    };
  };

  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCongruentLatencies([]);
    setIncongruentLatencies([]);
    setFeedback(null);

    const trial = generateTrial();
    setCurrentTrial(trial);
    trialStartTimeRef.current = performance.now();
  };

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setGameState('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const handleOptionSelect = (selectedColorName: string) => {
    if (!currentTrial || gameState !== 'playing') return;

    const latency = performance.now() - trialStartTimeRef.current;
    const isCorrect = selectedColorName === currentTrial.colorName;

    if (isCorrect) {
      setFeedback('correct');
      setCorrectCount((c) => c + 1);
      // Extra points for harder incongruent trials
      const points = currentTrial.isCongruent ? 100 : 150;
      setScore((s) => s + points);

      if (currentTrial.isCongruent) {
        setCongruentLatencies((arr) => [...arr, latency]);
      } else {
        setIncongruentLatencies((arr) => [...arr, latency]);
      }
    } else {
      setFeedback('incorrect');
      setIncorrectCount((c) => c + 1);
      setScore((s) => Math.max(0, s - 50));
    }

    setTimeout(() => {
      setFeedback(null);
      const nextTrial = generateTrial();
      setCurrentTrial(nextTrial);
      trialStartTimeRef.current = performance.now();
    }, 120);
  };

  const avgCongruent = congruentLatencies.length
    ? Math.round(congruentLatencies.reduce((a, b) => a + b, 0) / congruentLatencies.length)
    : 0;
  const avgIncongruent = incongruentLatencies.length
    ? Math.round(incongruentLatencies.reduce((a, b) => a + b, 0) / incongruentLatencies.length)
    : 0;
  const stroopInterference = avgIncongruent > 0 && avgCongruent > 0 ? Math.max(0, avgIncongruent - avgCongruent) : 0;

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
          <Palette className="w-3.5 h-3.5" />
          Stroop Interference Challenge
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Palette className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Stroop Effect Challenge
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Test your inhibitory control and selective attention. Words will appear in colored ink.
              Select the <strong>INK COLOR</strong> of the word — actively suppress reading the written word!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-left text-xs text-amber-900 space-y-1">
            <span className="font-extrabold uppercase tracking-wider block">Rule to remember:</span>
            <p>If the word <strong className="text-blue-500">RED</strong> is written in blue ink, choose <strong>Blue</strong>, not Red!</p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Duration</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">60 Seconds</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Focus</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Response Inhibition</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Metrics</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Stroop Effect (ms)</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Start 60s Sprint
          </button>
        </div>
      )}

      {gameState === 'playing' && currentTrial && (
        <div className="space-y-6 max-w-lg mx-auto">
          {/* Header Stats */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span className="font-black text-xl text-slate-900">{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-600">Score: {score}</span>
              <span className="text-xs font-bold text-emerald-600">✓ {correctCount}</span>
            </div>
          </div>

          {/* Stimulus Card */}
          <div className={`bg-white border-2 rounded-3xl p-8 sm:p-12 shadow-xs text-center space-y-6 transition-all ${
            feedback === 'correct' ? 'border-emerald-400 bg-emerald-50/20' : feedback === 'incorrect' ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
          }`}>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              What color is this text?
            </span>

            <div className="py-6">
              <span
                style={{ color: currentTrial.colorHex }}
                className="text-5xl sm:text-6xl font-black tracking-wider select-none drop-shadow-xs transition-colors duration-100"
              >
                {currentTrial.word}
              </span>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {currentTrial.options.map((colorName) => {
                const colorDef = COLOR_PALETTE.find((c) => c.name === colorName);
                return (
                  <button
                    key={colorName}
                    onClick={() => handleOptionSelect(colorName)}
                    className="py-3.5 px-4 rounded-2xl border border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50/50 font-bold text-sm text-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span
                      style={{ backgroundColor: colorDef?.hex }}
                      className="w-3.5 h-3.5 rounded-full inline-block"
                    />
                    <span>{colorName}</span>
                  </button>
                );
              })}
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
            <h2 className="text-2xl font-black text-slate-900">Sprint Finished!</h2>
            <p className="text-sm text-slate-500">
              Performance summary across congruent and incongruent trials.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Total Score</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{score}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Accuracy</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">
                {correctCount + incorrectCount > 0
                  ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
                  : 0}
                %
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Stroop Delay</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">+{stroopInterference}ms</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1 text-slate-600">
            <div className="flex justify-between">
              <span>Average Congruent Reaction Time:</span>
              <strong className="text-slate-900">{avgCongruent} ms</strong>
            </div>
            <div className="flex justify-between">
              <span>Average Incongruent Reaction Time:</span>
              <strong className="text-slate-900">{avgIncongruent} ms</strong>
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              * The Stroop effect reflects cognitive latency required to resolve word-color semantic conflict.
            </p>
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
