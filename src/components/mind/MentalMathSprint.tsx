import React, { useState, useEffect, useRef } from 'react';
import { Zap, RotateCcw, ArrowLeft, Target, Clock, CheckCircle2, XCircle, Flame, Play, Sparkles } from 'lucide-react';
import { MindDifficulty, MIND_DIFFICULTIES, MathSprintQuestion } from '../../types/mind';
import { generateMathSprintQuestion } from '../../utils/mindGenerators';

interface MentalMathSprintProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'results';

export const MentalMathSprint: React.FC<MentalMathSprintProps> = ({ onBack }) => {
  const [difficulty, setDifficulty] = useState<MindDifficulty>('medium');
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [questionCount, setQuestionCount] = useState<number>(0);

  const [currentQuestion, setCurrentQuestion] = useState<MathSprintQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionStartTimeRef = useRef<number>(0);

  // Start fresh game session
  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setQuestionCount(1);
    setUserAnswer('');
    setFeedback(null);

    const firstQ = generateMathSprintQuestion(difficulty, 1);
    setCurrentQuestion(firstQ);
    questionStartTimeRef.current = performance.now();
  };

  // Countdown timer effect
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

  // Focus input automatically when playing
  useEffect(() => {
    if (gameState === 'playing') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [gameState, currentQuestion]);

  // Handle answer submission with correctness-dominant scoring
  const handleSubmitAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQuestion || gameState !== 'playing') return;

    const parsedInput = parseInt(userAnswer.trim(), 10);
    if (isNaN(parsedInput)) return;

    const isCorrect = parsedInput === currentQuestion.answer;
    const solveTimeMs = performance.now() - questionStartTimeRef.current;

    if (isCorrect) {
      const diffConfig = MIND_DIFFICULTIES[difficulty];
      const streakBonus = Math.min(0.5, currentStreak * 0.05); // Max +50% streak bonus
      const cappedSpeedBonus = Math.min(25, Math.max(0, Math.floor((3000 - solveTimeMs) / 120))); // Max +25 pts speed bonus
      const pointsEarned = Math.round(100 * diffConfig.multiplier * (1 + streakBonus) + cappedSpeedBonus);

      setScore((prev) => prev + pointsEarned);
      setCorrectCount((prev) => prev + 1);
      setCurrentStreak((prev) => {
        const next = prev + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
      setFeedback('correct');
    } else {
      setScore((prev) => Math.max(0, prev - 25)); // Slight penalty for incorrect
      setIncorrectCount((prev) => prev + 1);
      setCurrentStreak(0);
      setFeedback('incorrect');
    }

    // Reset feedback effect after brief micro-animation
    setTimeout(() => {
      setFeedback(null);
    }, 250);

    // Next question
    const nextQIndex = questionCount + 1;
    setQuestionCount(nextQIndex);
    setCurrentQuestion(generateMathSprintQuestion(difficulty, nextQIndex));
    questionStartTimeRef.current = performance.now();
    setUserAnswer('');
  };

  const totalAttempted = correctCount + incorrectCount;
  const accuracyPercentage = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Mind Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Zap className="w-4 h-4 fill-white" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Mental Math Sprint
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                QuickForma Mind
              </span>
            </h1>
            <p className="text-xs text-slate-500">Train your mental math speed & calculation fluency</p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Mind
        </button>
      </div>

      {/* VIEW STATE 1: IDLE / LANDING SCREEN */}
      {gameState === 'idle' && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs text-center space-y-6 relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
              <Zap className="w-8 h-8 fill-indigo-600" />
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Mental Math Sprint
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                60 seconds. Solve mental arithmetic questions as fast and accurately as you can.
              </p>
            </div>

            {/* Difficulty Selector Framework */}
            <div className="space-y-3 max-w-lg mx-auto pt-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Select Difficulty Level
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['easy', 'medium', 'hard', 'expert'] as MindDifficulty[]).map((dKey) => {
                  const cfg = MIND_DIFFICULTIES[dKey];
                  const isSelected = difficulty === dKey;
                  return (
                    <button
                      key={dKey}
                      onClick={() => setDifficulty(dKey)}
                      className={`py-3 px-3 rounded-2xl font-extrabold text-xs border transition-all flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="capitalize">{cfg.name}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {cfg.multiplier}× pts
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-500 italic">
                {MIND_DIFFICULTIES[difficulty].description}
              </p>
            </div>

            {/* Start Button */}
            <div className="pt-4">
              <button
                onClick={handleStartGame}
                className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-lg shadow-md hover:shadow-lg transition-all inline-flex items-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Play className="w-5 h-5 fill-white" /> Start Challenge (60s)
              </button>
            </div>
          </div>

          {/* Sprint Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">60-Second Timed Sprint</h3>
              <p className="text-xs text-slate-500">Fast-paced time pressure to build rapid arithmetic reaction time.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Cognitive Structure Progression</h3>
              <p className="text-xs text-slate-500">Single operations, clean division, compound sequencing, & mental shortcuts.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Correctness-First Scoring</h3>
              <p className="text-xs text-slate-500">Rewards accuracy & streaks; speed provides a small secondary bonus.</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW STATE 2: ACTIVE GAMEPLAY */}
      {gameState === 'playing' && currentQuestion && (
        <div className="space-y-6">
          {/* Live Metrics Header */}
          <div className="grid grid-cols-4 gap-3 text-center">
            {/* Timer Card */}
            <div className={`p-4 rounded-2xl border transition-all ${
              timeLeft <= 10 ? 'bg-amber-50 border-amber-200 text-amber-700 animate-pulse' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Time Left</div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center justify-center gap-1">
                <Clock className="w-5 h-5 text-amber-500 inline" />
                {timeLeft}s
              </div>
            </div>

            {/* Score Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-900">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Score</div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-indigo-600">
                {score}
              </div>
            </div>

            {/* Difficulty Badge Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-900">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Difficulty</div>
              <div className="text-sm sm:text-base font-extrabold tracking-tight text-slate-700 capitalize mt-1">
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                  {MIND_DIFFICULTIES[difficulty].name} ({MIND_DIFFICULTIES[difficulty].multiplier}×)
                </span>
              </div>
            </div>

            {/* Streak Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-900">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Streak</div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-600 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-emerald-500 fill-emerald-500 inline" />
                {currentStreak}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ease-linear ${
                timeLeft <= 10 ? 'bg-amber-500' : 'bg-indigo-600'
              }`}
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            />
          </div>

          {/* Active Question Display Card */}
          <div className={`p-8 sm:p-12 rounded-3xl border text-center space-y-6 transition-all bg-white ${
            feedback === 'correct'
              ? 'border-emerald-300 ring-2 ring-emerald-200'
              : feedback === 'incorrect'
              ? 'border-rose-300 ring-2 ring-rose-200'
              : 'border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Calculate Solution
              {currentQuestion.isShortcut && (
                <span className="text-[10px] font-extrabold uppercase bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Shortcut Family
                </span>
              )}
            </div>

            <div className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-mono">
              {currentQuestion.text} = ?
            </div>

            {/* Answer Form */}
            <form onSubmit={handleSubmitAnswer} className="max-w-xs mx-auto space-y-4">
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter answer"
                className="w-full text-center text-3xl font-extrabold py-3 px-4 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-mono"
                autoComplete="off"
                autoFocus
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base shadow-xs transition-colors"
              >
                Submit Answer ↵
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW STATE 3: RESULTS SCREEN */}
      {gameState === 'results' && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs text-center space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
                Sprint Complete · {MIND_DIFFICULTIES[difficulty].name} Mode
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Mental Math Sprint Summary
              </h2>
            </div>

            {/* Primary Score Callout */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Final Score</div>
              <div className="text-5xl font-black text-indigo-600 tracking-tight">
                {score}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                <div className="text-xl font-black text-slate-900">{correctCount}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Correct</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
                <XCircle className="w-5 h-5 text-rose-500 mx-auto" />
                <div className="text-xl font-black text-slate-900">{incorrectCount}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Incorrect</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
                <Target className="w-5 h-5 text-indigo-500 mx-auto" />
                <div className="text-xl font-black text-slate-900">{accuracyPercentage}%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accuracy</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
                <Flame className="w-5 h-5 text-emerald-500 fill-emerald-500 mx-auto" />
                <div className="text-xl font-black text-slate-900">{bestStreak}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Best Streak</div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleStartGame}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Play Again ({MIND_DIFFICULTIES[difficulty].name})
              </button>

              <button
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base transition-colors"
              >
                Back to Mind Hub
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
