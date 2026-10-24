import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, ScanEye, CheckCircle2, XCircle, Award, Eye } from 'lucide-react';

interface ChangeDetectionGameProps {
  onBack: () => void;
}

type Phase = 'idle' | 'study' | 'mask' | 'test' | 'feedback' | 'results';

interface ShapeItem {
  id: number;
  x: number; // percentage 10 - 90
  y: number; // percentage 10 - 90
  color: string;
  shape: 'circle' | 'square' | 'triangle' | 'diamond';
}

const COLORS = ['#4f46e5', '#ef4444', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];
const SHAPES: ('circle' | 'square' | 'triangle' | 'diamond')[] = ['circle', 'square', 'triangle', 'diamond'];
const TOTAL_TRIALS = 15;

export const ChangeDetectionGame: React.FC<ChangeDetectionGameProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [trialIndex, setTrialIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const [itemsInitial, setItemsInitial] = useState<ShapeItem[]>([]);
  const [itemsTest, setItemsTest] = useState<ShapeItem[]>([]);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [changedItemId, setChangedItemId] = useState<number | null>(null);

  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateTrial = (itemCount: number) => {
    const list: ShapeItem[] = [];
    const usedPositions: { x: number; y: number }[] = [];

    for (let i = 0; i < itemCount; i++) {
      let x = 0;
      let y = 0;
      let safe = false;
      let attempts = 0;

      while (!safe && attempts < 50) {
        x = 15 + Math.floor(Math.random() * 70);
        y = 15 + Math.floor(Math.random() * 70);
        safe = usedPositions.every((p) => Math.hypot(p.x - x, p.y - y) > 18);
        attempts++;
      }
      usedPositions.push({ x, y });

      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      list.push({ id: i, x, y, color, shape });
    }

    const willChange = Math.random() < 0.5;
    const testList = list.map((item) => ({ ...item }));
    let changedId: number | null = null;

    if (willChange && testList.length > 0) {
      const targetIdx = Math.floor(Math.random() * testList.length);
      changedId = testList[targetIdx].id;
      // Change color or shape
      if (Math.random() < 0.5) {
        const otherColors = COLORS.filter((c) => c !== testList[targetIdx].color);
        testList[targetIdx].color = otherColors[Math.floor(Math.random() * otherColors.length)];
      } else {
        const otherShapes = SHAPES.filter((s) => s !== testList[targetIdx].shape);
        testList[targetIdx].shape = otherShapes[Math.floor(Math.random() * otherShapes.length)];
      }
    }

    setItemsInitial(list);
    setItemsTest(testList);
    setHasChanged(willChange);
    setChangedItemId(changedId);
    setPhase('study');

    // Show initial display for 1800ms
    timerRef.current = setTimeout(() => {
      setPhase('mask');
      // Blank mask for 300ms
      timerRef.current = setTimeout(() => {
        setPhase('test');
      }, 300);
    }, 1800);
  };

  const handleStartGame = () => {
    setTrialIndex(0);
    setScore(0);
    setCorrectCount(0);
    generateTrial(5); // 5 objects
  };

  const handleAnswer = (userSaidChanged: boolean) => {
    if (phase !== 'test') return;

    const isCorrect = userSaidChanged === hasChanged;
    setLastAnswerCorrect(isCorrect);
    setPhase('feedback');

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setScore((s) => s + 100);
    }

    timerRef.current = setTimeout(() => {
      const nextTrial = trialIndex + 1;
      if (nextTrial >= TOTAL_TRIALS) {
        setPhase('results');
      } else {
        setTrialIndex(nextTrial);
        // Vary set size between 4 and 6
        const nextSize = 4 + (nextTrial % 3);
        generateTrial(nextSize);
      }
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const renderShapeSvg = (item: ShapeItem) => {
    const size = 34;
    switch (item.shape) {
      case 'circle':
        return <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill={item.color} />;
      case 'square':
        return <rect x={2} y={2} width={size - 4} height={size - 4} rx={4} fill={item.color} />;
      case 'triangle':
        return <polygon points={`${size / 2},2 2,${size - 2} ${size - 2},${size - 2}`} fill={item.color} />;
      case 'diamond':
        return <polygon points={`${size / 2},2 ${size - 2},${size / 2} ${size / 2},${size - 2} 2,${size / 2}`} fill={item.color} />;
    }
  };

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
          <ScanEye className="w-3.5 h-3.5" />
          Change Detection
        </div>
      </div>

      {phase === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <ScanEye className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Change Detection Challenge
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based on visual flicker paradigms (Luck &amp; Vogel). Memorize an arrangement of colored shapes.
              After a brief mask, determine whether any shape changed in color or geometry.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Set Size</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">4 to 6 Objects</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Retention Time</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">1.8s Display</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Session</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{TOTAL_TRIALS} Trials</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Challenge
          </button>
        </div>
      )}

      {(phase === 'study' || phase === 'mask' || phase === 'test' || phase === 'feedback') && (
        <div className="space-y-6 max-w-xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              Trial {trialIndex + 1} of {TOTAL_TRIALS}
            </span>
            <div className="text-xs font-bold text-slate-600">
              Score: {score} pts ({correctCount} correct)
            </div>
          </div>

          {/* Canvas Display */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="text-center h-6">
              {phase === 'study' && (
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 animate-pulse">
                  Memorize Locations & Colors...
                </span>
              )}
              {phase === 'mask' && (
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  Retaining in Memory...
                </span>
              )}
              {phase === 'test' && (
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                  Did anything change?
                </span>
              )}
              {phase === 'feedback' && (
                <span className={`text-xs font-extrabold uppercase tracking-widest ${lastAnswerCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {lastAnswerCorrect ? 'Correct Decision!' : hasChanged ? 'A change occurred!' : 'No change occurred!'}
                </span>
              )}
            </div>

            {/* Visual Arena */}
            <div className="w-full h-72 sm:h-80 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden">
              {phase === 'mask' && (
                <div className="absolute inset-0 bg-slate-300/40 backdrop-blur-xs flex items-center justify-center" />
              )}

              {(phase === 'study' || phase === 'test' || phase === 'feedback') && (
                (phase === 'study' ? itemsInitial : itemsTest).map((item) => {
                  const isChangedItem = phase === 'feedback' && hasChanged && item.id === changedItemId;

                  return (
                    <div
                      key={item.id}
                      style={{
                        position: 'absolute',
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className={`transition-all duration-200 ${isChangedItem ? 'ring-4 ring-rose-400 rounded-xl p-1 bg-rose-50' : ''}`}
                    >
                      <svg width="34" height="34">
                        {renderShapeSvg(item)}
                      </svg>
                    </div>
                  );
                })
              )}
            </div>

            {/* Response Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                disabled={phase !== 'test'}
                onClick={() => handleAnswer(false)}
                className="py-3.5 px-4 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50 font-bold text-sm text-slate-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
              >
                Same (No Change)
              </button>

              <button
                disabled={phase !== 'test'}
                onClick={() => handleAnswer(true)}
                className="py-3.5 px-4 rounded-2xl border border-indigo-600 bg-indigo-600 hover:bg-indigo-700 font-bold text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                Changed!
              </button>
            </div>
          </div>
        </div>
      )}

      {phase === 'results' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Session Completed!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on visual working memory detail retention and change sensitivity.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Detection Accuracy</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">
                {Math.round((correctCount / TOTAL_TRIALS) * 100)}%
              </p>
              <span className="text-xs text-slate-500">{correctCount} of {TOTAL_TRIALS} trials</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Score</span>
              <p className="text-3xl font-black text-slate-900 mt-1">{score}</p>
              <span className="text-xs text-slate-500">points accumulated</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleStartGame}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
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
