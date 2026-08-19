import React, { useState, useEffect, useRef } from 'react';
import { Zap, RotateCcw, ArrowLeft, Target, Clock, CheckCircle2, XCircle, Flame, Play } from 'lucide-react';

interface Question {
  num1: number;
  num2: number;
  operator: '+' | '-' | '×' | '÷';
  answer: number;
  text: string;
}

interface MindPageProps {
  onSelectView: (view: string) => void;
}

type GameState = 'idle' | 'playing' | 'results';

export const MindPage: React.FC<MindPageProps> = ({ onSelectView }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [questionCount, setQuestionCount] = useState<number>(0);

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to generate dynamic arithmetic questions based on question index
  const generateQuestion = (qIndex: number): Question => {
    const ops: Array<'+' | '-' | '×' | '÷'> = ['+', '-', '×', '÷'];
    let op = ops[Math.floor(Math.random() * ops.length)];

    let n1 = 0;
    let n2 = 0;
    let ans = 0;

    if (qIndex <= 5) {
      // Early Phase: Easy & intuitive
      if (op === '+') {
        n1 = Math.floor(Math.random() * 20) + 5;
        n2 = Math.floor(Math.random() * 20) + 5;
        ans = n1 + n2;
      } else if (op === '-') {
        n1 = Math.floor(Math.random() * 30) + 10;
        n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
        ans = n1 - n2;
      } else if (op === '×') {
        n1 = Math.floor(Math.random() * 9) + 2;
        n2 = Math.floor(Math.random() * 9) + 2;
        ans = n1 * n2;
      } else {
        // Division: Clean integer
        n2 = Math.floor(Math.random() * 8) + 2;
        ans = Math.floor(Math.random() * 8) + 2;
        n1 = n2 * ans;
      }
    } else if (qIndex <= 15) {
      // Middle Phase: Moderate mental arithmetic
      if (op === '+') {
        n1 = Math.floor(Math.random() * 60) + 15;
        n2 = Math.floor(Math.random() * 60) + 15;
        ans = n1 + n2;
      } else if (op === '-') {
        n1 = Math.floor(Math.random() * 90) + 25;
        n2 = Math.floor(Math.random() * (n1 - 10)) + 5;
        ans = n1 - n2;
      } else if (op === '×') {
        n1 = Math.floor(Math.random() * 14) + 3;
        n2 = Math.floor(Math.random() * 11) + 3;
        ans = n1 * n2;
      } else {
        n2 = Math.floor(Math.random() * 12) + 3;
        ans = Math.floor(Math.random() * 12) + 3;
        n1 = n2 * ans;
      }
    } else {
      // Later Phase: Advanced arithmetic
      if (op === '+') {
        n1 = Math.floor(Math.random() * 150) + 35;
        n2 = Math.floor(Math.random() * 150) + 35;
        ans = n1 + n2;
      } else if (op === '-') {
        n1 = Math.floor(Math.random() * 250) + 50;
        n2 = Math.floor(Math.random() * (n1 - 20)) + 10;
        ans = n1 - n2;
      } else if (op === '×') {
        n1 = Math.floor(Math.random() * 25) + 5;
        n2 = Math.floor(Math.random() * 15) + 4;
        ans = n1 * n2;
      } else {
        n2 = Math.floor(Math.random() * 15) + 4;
        ans = Math.floor(Math.random() * 16) + 4;
        n1 = n2 * ans;
      }
    }

    const text = `${n1} ${op} ${n2}`;
    return { num1: n1, num2: n2, operator: op, answer: ans, text };
  };

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

    const firstQ = generateQuestion(1);
    setCurrentQuestion(firstQ);
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

  // Handle answer submission
  const handleSubmitAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQuestion || gameState !== 'playing') return;

    const parsedInput = parseInt(userAnswer.trim(), 10);
    if (isNaN(parsedInput)) return;

    const isCorrect = parsedInput === currentQuestion.answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setCorrectCount((prev) => prev + 1);
      setCurrentStreak((prev) => {
        const next = prev + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
      setFeedback('correct');
    } else {
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
    setCurrentQuestion(generateQuestion(nextQIndex));
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
              QuickForma Mind
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                Sprint V0
              </span>
            </h1>
            <p className="text-xs text-slate-500">Train your mental math speed & calculation fluency</p>
          </div>
        </div>

        {gameState !== 'idle' && (
          <button
            onClick={() => setGameState('idle')}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Mind
          </button>
        )}
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
                60 seconds. Solve as many mental arithmetic questions as you can. Test your speed, accuracy, and concentration.
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
              <h3 className="text-sm font-bold text-slate-900">Progressive Arithmetic</h3>
              <p className="text-xs text-slate-500">Addition, subtraction, multiplication, and clean integer division.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Streak & Accuracy Tracking</h3>
              <p className="text-xs text-slate-500">Keyboard-first operation designed to maximize questions per minute.</p>
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

            {/* Question # Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-900">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Question</div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-700">
                #{questionCount}
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
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Calculate Solution
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
                Sprint Complete
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
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>

              <button
                onClick={() => setGameState('idle')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base transition-colors"
              >
                Back to Mind
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
