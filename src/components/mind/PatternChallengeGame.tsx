import React, { useState, useEffect, useRef } from 'react';
import { Layers, RotateCcw, ArrowLeft, Target, Clock, CheckCircle2, XCircle, Flame, Play } from 'lucide-react';

interface PatternQuestion {
  sequenceText: string;
  answer: number;
  options: number[];
}

interface PatternChallengeGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'results';

export const PatternChallengeGame: React.FC<PatternChallengeGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [questionCount, setQuestionCount] = useState<number>(0);

  const [currentQuestion, setCurrentQuestion] = useState<PatternQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generatePattern = (qIndex: number): PatternQuestion => {
    const patternTypes = ['arithmetic', 'geometric', 'increasing_diff', 'alternating', 'decreasing'];
    const pType = patternTypes[Math.floor(Math.random() * patternTypes.length)];

    let seq: number[] = [];
    let nextVal = 0;

    if (pType === 'arithmetic') {
      const start = Math.floor(Math.random() * 20) + 2;
      const step = Math.floor(Math.random() * 8) + 2;
      seq = [start, start + step, start + step * 2, start + step * 3];
      nextVal = start + step * 4;
    } else if (pType === 'geometric') {
      const start = Math.floor(Math.random() * 5) + 2;
      const mult = [2, 3][Math.floor(Math.random() * 2)];
      seq = [start, start * mult, start * mult * mult, start * mult * mult * mult];
      nextVal = start * mult * mult * mult * mult;
    } else if (pType === 'increasing_diff') {
      const start = Math.floor(Math.random() * 10) + 1;
      let curr = start;
      seq = [curr];
      for (let i = 2; i <= 4; i++) {
        curr += i;
        seq.push(curr);
      }
      nextVal = curr + 5;
    } else if (pType === 'alternating') {
      const start = Math.floor(Math.random() * 20) + 10;
      const addStep = Math.floor(Math.random() * 5) + 4;
      const subStep = Math.floor(Math.random() * 3) + 1;
      let curr = start;
      seq = [curr];
      for (let i = 0; i < 3; i++) {
        curr = i % 2 === 0 ? curr + addStep : curr - subStep;
        seq.push(curr);
      }
      nextVal = curr + addStep;
    } else {
      // Decreasing differences e.g. 100, 90, 81, 73 -> 66 (-10, -9, -8, -7)
      let curr = Math.floor(Math.random() * 50) + 80;
      seq = [curr];
      let dec = 10;
      for (let i = 0; i < 3; i++) {
        curr -= dec;
        seq.push(curr);
        dec--;
      }
      nextVal = curr - dec;
    }

    const sequenceText = `${seq.join(', ')}, ?`;
    const options = [nextVal, nextVal + 2, nextVal - 3, nextVal + 5].sort(() => Math.random() - 0.5);

    return { sequenceText, answer: nextVal, options };
  };

  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setQuestionCount(1);
    setSelectedOption(null);
    setFeedback(null);

    setCurrentQuestion(generatePattern(1));
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

  const handleOptionClick = (val: number) => {
    if (!currentQuestion || gameState !== 'playing') return;

    setSelectedOption(val);
    const isCorrect = val === currentQuestion.answer;

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

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      const nextQ = questionCount + 1;
      setQuestionCount(nextQ);
      setCurrentQuestion(generatePattern(nextQ));
    }, 250);
  };

  const totalAttempted = correctCount + incorrectCount;
  const accuracyPercentage = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Layers className="w-4 h-4" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Pattern Challenge
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                QuickForma Mind
              </span>
            </h1>
            <p className="text-xs text-slate-500">Identify mathematical sequence rules and missing numbers</p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Mind Hub
        </button>
      </div>

      {/* IDLE SCREEN */}
      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
            <Layers className="w-8 h-8" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pattern Recognition
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              60 seconds. Spot numerical sequence patterns and determine the correct missing term.
            </p>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-lg shadow-md hover:shadow-lg transition-all inline-flex items-center gap-3"
          >
            <Play className="w-5 h-5 fill-white" /> Start Pattern Challenge (60s)
          </button>
        </div>
      )}

      {/* PLAYING SCREEN */}
      {gameState === 'playing' && currentQuestion && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className={`p-4 rounded-2xl border ${timeLeft <= 10 ? 'bg-amber-50 border-amber-200 text-amber-700 animate-pulse' : 'bg-white border-slate-200'}`}>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Time Left</div>
              <div className="text-2xl sm:text-3xl font-extrabold"><Clock className="w-5 h-5 text-amber-500 inline mr-1" />{timeLeft}s</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Score</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">{score}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Question</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-700">#{questionCount}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Streak</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600"><Flame className="w-5 h-5 text-emerald-500 fill-emerald-500 inline mr-1" />{currentStreak}</div>
            </div>
          </div>

          <div className={`p-8 sm:p-12 rounded-3xl border text-center space-y-6 bg-white ${
            feedback === 'correct' ? 'border-emerald-300 ring-2 ring-emerald-200' : feedback === 'incorrect' ? 'border-rose-300 ring-2 ring-rose-200' : 'border-slate-200 shadow-xs'
          }`}>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Find Missing Term (?)</div>
            <div className="text-3xl sm:text-5xl font-black text-slate-900 font-mono">{currentQuestion.sequenceText}</div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
              {currentQuestion.options.map((optVal, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(optVal)}
                  className={`py-4 px-4 rounded-2xl font-extrabold text-xl border transition-all ${
                    selectedOption === optVal
                      ? optVal === currentQuestion.answer
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-900 hover:border-indigo-200'
                  }`}
                >
                  {optVal}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RESULTS SCREEN */}
      {gameState === 'results' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs text-center space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">Sprint Complete</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Pattern Challenge Summary</h2>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase">Final Score</div>
            <div className="text-5xl font-black text-indigo-600">{score}</div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
              <div className="text-xl font-black text-slate-900">{correctCount}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Correct</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <XCircle className="w-5 h-5 text-rose-500 mx-auto" />
              <div className="text-xl font-black text-slate-900">{incorrectCount}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Incorrect</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <Target className="w-5 h-5 text-indigo-500 mx-auto" />
              <div className="text-xl font-black text-slate-900">{accuracyPercentage}%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <Flame className="w-5 h-5 text-emerald-500 fill-emerald-500 mx-auto" />
              <div className="text-xl font-black text-slate-900">{bestStreak}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Best Streak</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={handleStartGame} className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base flex items-center gap-2"><RotateCcw className="w-4 h-4" /> Play Again</button>
            <button onClick={onBack} className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base">Back to Mind Hub</button>
          </div>
        </div>
      )}
    </div>
  );
};
