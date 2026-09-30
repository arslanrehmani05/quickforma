import React, { useState, useEffect, useRef } from 'react';
import { Hash, RotateCcw, ArrowLeft, Target, Clock, CheckCircle2, XCircle, Flame, Play } from 'lucide-react';
import { MindDifficulty, MIND_DIFFICULTIES, NumberSenseQuestion, SprintHistoryItem } from '../../types/mind';
import { generateNumberSenseQuestion } from '../../utils/mindGenerators';
import { SprintReviewPanel } from './SprintReviewPanel';

interface NumberSenseGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'results';

export const NumberSenseGame: React.FC<NumberSenseGameProps> = ({ onBack }) => {
  const [difficulty, setDifficulty] = useState<MindDifficulty>('medium');
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [sprintHistory, setSprintHistory] = useState<SprintHistoryItem[]>([]);

  const [currentQuestion, setCurrentQuestion] = useState<NumberSenseQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionStartTimeRef = useRef<number>(0);

  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setQuestionCount(1);
    setSprintHistory([]);
    setSelectedOption(null);
    setFeedback(null);

    const firstQ = generateNumberSenseQuestion(difficulty, 1);
    setCurrentQuestion(firstQ);
    questionStartTimeRef.current = performance.now();
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

  const handleOptionClick = (index: number) => {
    if (!currentQuestion || gameState !== 'playing') return;

    setSelectedOption(index);
    const isCorrect = index === currentQuestion.correctIndex;
    const solveTimeMs = performance.now() - questionStartTimeRef.current;

    // Track in sprint history
    setSprintHistory((prev) => [
      ...prev,
      {
        id: questionCount,
        prompt: currentQuestion.prompt,
        userAnswer: currentQuestion.options[index] || 'No response',
        correctAnswer: currentQuestion.options[currentQuestion.correctIndex],
        isCorrect,
        explanation: currentQuestion.explanation || `Correct answer: ${currentQuestion.options[currentQuestion.correctIndex]}`,
      },
    ]);

    if (isCorrect) {
      const diffConfig = MIND_DIFFICULTIES[difficulty];
      const streakBonus = Math.min(0.5, currentStreak * 0.05);
      const cappedSpeedBonus = Math.min(25, Math.max(0, Math.floor((3000 - solveTimeMs) / 120)));
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
      setScore((prev) => Math.max(0, prev - 25));
      setIncorrectCount((prev) => prev + 1);
      setCurrentStreak(0);
      setFeedback('incorrect');
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      const nextQ = questionCount + 1;
      setQuestionCount(nextQ);
      setCurrentQuestion(generateNumberSenseQuestion(difficulty, nextQ));
      questionStartTimeRef.current = performance.now();
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
            <Hash className="w-4 h-4" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Number Sense
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                QuickForma Mind
              </span>
            </h1>
            <p className="text-xs text-slate-500">Test numerical intuition, magnitude estimation, & structural relationships</p>
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
            <Hash className="w-8 h-8" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Number Sense Challenge
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              60 seconds. Rapidly evaluate fraction sizes, percentage estimates, structural relationships, and order of magnitude without multi-step paper calculations.
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

          <button
            onClick={handleStartGame}
            className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-lg shadow-md hover:shadow-lg transition-all inline-flex items-center gap-3"
          >
            <Play className="w-5 h-5 fill-white" /> Start Number Sense (60s)
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
              <div className="text-[10px] font-bold text-slate-400 uppercase">Difficulty</div>
              <div className="text-sm sm:text-base font-extrabold text-slate-700 capitalize mt-1">
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                  {MIND_DIFFICULTIES[difficulty].name} ({MIND_DIFFICULTIES[difficulty].multiplier}×)
                </span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Streak</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600"><Flame className="w-5 h-5 text-emerald-500 fill-emerald-500 inline mr-1" />{currentStreak}</div>
            </div>
          </div>

          <div className={`p-8 sm:p-12 rounded-3xl border text-center space-y-6 bg-white ${
            feedback === 'correct' ? 'border-emerald-300 ring-2 ring-emerald-200' : feedback === 'incorrect' ? 'border-rose-300 ring-2 ring-rose-200' : 'border-slate-200 shadow-xs'
          }`}>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Evaluate & Tap</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-relaxed max-w-xl mx-auto">{currentQuestion.prompt}</div>

            <div className={`grid gap-3 max-w-xl mx-auto ${currentQuestion.options.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  className={`py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg border transition-all ${
                    selectedOption === idx
                      ? idx === currentQuestion.correctIndex
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-900 hover:border-indigo-200'
                  }`}
                >
                  {opt}
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
            <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
              Sprint Complete · {MIND_DIFFICULTIES[difficulty].name} Mode
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Number Sense Summary</h2>
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
            <button
              onClick={handleStartGame}
              className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Play Again ({MIND_DIFFICULTIES[difficulty].name})
            </button>
            <button onClick={onBack} className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base">Back to Mind Hub</button>
          </div>

          <SprintReviewPanel history={sprintHistory} />
        </div>
      )}
    </div>
  );
};
