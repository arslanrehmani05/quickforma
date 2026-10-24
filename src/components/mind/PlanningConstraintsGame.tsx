import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, RotateCcw, CalendarCheck, CheckCircle2, XCircle, Award } from 'lucide-react';

interface PlanningConstraintsGameProps {
  onBack: () => void;
}

type GameState = 'idle' | 'playing' | 'puzzle-solved' | 'results';
type TimeSlot = 'morning' | 'afternoon' | 'evening';

interface TaskDef {
  id: string;
  name: string;
  requiredResource: string; // e.g. "Lab", "Server", "Studio"
}

interface SchedulePuzzle {
  title: string;
  tasks: TaskDef[];
  rules: string[];
  // Validation function returns null if valid, or error message string if invalid
  validate: (assignment: Record<string, TimeSlot>) => string | null;
}

const PUZZLES: SchedulePuzzle[] = [
  {
    title: 'Media Production Schedule',
    tasks: [
      { id: 'T1', name: 'Podcast Recording', requiredResource: 'Audio Studio' },
      { id: 'T2', name: 'Audio Mastering', requiredResource: 'Audio Studio' },
      { id: 'T3', name: 'Client Presentation', requiredResource: 'Boardroom' },
    ],
    rules: [
      '• Podcast Recording (T1) and Audio Mastering (T2) both require the Audio Studio; they cannot be scheduled in the same time slot.',
      '• Audio Mastering (T2) must happen strictly after Podcast Recording (T1).',
      '• The Boardroom is booked for renovations in the Morning (Client Presentation cannot be in the Morning).',
    ],
    validate: (assignment) => {
      const t1 = assignment['T1'];
      const t2 = assignment['T2'];
      const t3 = assignment['T3'];

      if (!t1 || !t2 || !t3) return 'Please schedule all three tasks.';
      // Rule 1: T1 & T2 cannot share slot
      if (t1 === t2) return 'Resource Conflict: Podcast Recording and Audio Mastering cannot share the Audio Studio at the same time.';
      // Rule 2: T2 strictly after T1
      const order = { morning: 1, afternoon: 2, evening: 3 };
      if (order[t2] <= order[t1]) return 'Precedence Conflict: Audio Mastering must occur strictly after Podcast Recording.';
      // Rule 3: T3 not in morning
      if (t3 === 'morning') return 'Availability Conflict: Boardroom is unavailable in the Morning.';

      return null; // Valid!
    },
  },
  {
    title: 'Server Maintenance & Deployments',
    tasks: [
      { id: 'S1', name: 'Database Migration', requiredResource: 'Main Cluster' },
      { id: 'S2', name: 'Load Testing', requiredResource: 'Main Cluster' },
      { id: 'S3', name: 'Frontend Release', requiredResource: 'CDN Edge' },
    ],
    rules: [
      '• Database Migration (S1) and Load Testing (S2) cannot share the Main Cluster in the same slot.',
      '• Frontend Release (S3) must occur in the Evening after testing completes.',
      '• Database Migration (S1) must be completed in the Morning.',
    ],
    validate: (assignment) => {
      const s1 = assignment['S1'];
      const s2 = assignment['S2'];
      const s3 = assignment['S3'];

      if (!s1 || !s2 || !s3) return 'Please schedule all three tasks.';
      if (s1 !== 'morning') return 'Scheduling Conflict: Database Migration must be completed in the Morning.';
      if (s2 === 'morning') return 'Resource Conflict: Load Testing cannot run on the Main Cluster during Database Migration.';
      if (s3 !== 'evening') return 'Timing Conflict: Frontend Release must occur in the Evening.';

      return null;
    },
  },
  {
    title: 'Laboratory Testing Protocol',
    tasks: [
      { id: 'L1', name: 'Centrifuge Separation', requiredResource: 'Lab Suite A' },
      { id: 'L2', name: 'Spectrometry Analysis', requiredResource: 'Lab Suite A' },
      { id: 'L3', name: 'Results Documentation', requiredResource: 'Office Desk' },
    ],
    rules: [
      '• Centrifuge (L1) and Spectrometry (L2) both require Lab Suite A (cannot overlap).',
      '• Centrifuge Separation must precede Spectrometry Analysis.',
      '• Documentation must be completed in the Evening as the final step.',
    ],
    validate: (assignment) => {
      const l1 = assignment['L1'];
      const l2 = assignment['L2'];
      const l3 = assignment['L3'];

      if (!l1 || !l2 || !l3) return 'Please schedule all three tasks.';
      const order = { morning: 1, afternoon: 2, evening: 3 };
      if (l1 === l2) return 'Resource Conflict: Centrifuge and Spectrometry cannot occupy Lab Suite A at the same time.';
      if (order[l2] <= order[l1]) return 'Precedence Conflict: Spectrometry must occur after Centrifuge.';
      if (l3 !== 'evening') return 'Scheduling Conflict: Results Documentation must be in the Evening.';

      return null;
    },
  },
];

export const PlanningConstraintsGame: React.FC<PlanningConstraintsGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // Task assignments: taskId -> TimeSlot
  const [schedule, setSchedule] = useState<Record<string, TimeSlot>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startPuzzle = (index: number) => {
    setSchedule({});
    setErrorMessage(null);
    setGameState('playing');
  };

  const handleStartGame = () => {
    setPuzzleIndex(0);
    setScore(0);
    startPuzzle(0);
  };

  const handleAssignTask = (taskId: string, slot: TimeSlot) => {
    setSchedule((prev) => ({
      ...prev,
      [taskId]: slot,
    }));
    setErrorMessage(null);
  };

  const handleVerify = () => {
    const p = PUZZLES[puzzleIndex];
    const validationError = p.validate(schedule);

    if (validationError) {
      setErrorMessage(validationError);
    } else {
      setScore((s) => s + 350);
      setGameState('puzzle-solved');
    }
  };

  const handleNextPuzzle = () => {
    const next = puzzleIndex + 1;
    if (next >= PUZZLES.length) {
      setGameState('results');
    } else {
      setPuzzleIndex(next);
      startPuzzle(next);
    }
  };

  const currentPuzzle = PUZZLES[puzzleIndex];

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
          <CalendarCheck className="w-3.5 h-3.5" />
          Planning Under Constraints
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <CalendarCheck className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Planning Under Constraints
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Schedule operations and allocate limited shared resources across time slots (Morning, Afternoon, Evening)
              while satisfying multiple interacting constraints including precedence, resource conflicts, and availability.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Constraints</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Precedence &amp; Resources</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Puzzles</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{PUZZLES.length} Scheduling Scenarios</p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            Begin Scheduling
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'puzzle-solved') && currentPuzzle && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              Scenario {puzzleIndex + 1} of {PUZZLES.length}: {currentPuzzle.title}
            </span>
            <div className="text-xs font-bold text-slate-800">
              Score: {score} pts
            </div>
          </div>

          {/* Rules & Scheduling Grid Container */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Rules Banner */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-black uppercase text-indigo-900 block">Scheduling Constraints:</span>
              <ul className="space-y-1 text-xs text-slate-700 font-medium">
                {currentPuzzle.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>

            {/* Task Allocation Cards */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block text-center">
                Assign Each Task to a Time Slot:
              </span>

              <div className="space-y-3">
                {currentPuzzle.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-xs font-black text-slate-900 block">{task.name}</span>
                      <span className="text-[11px] font-bold text-indigo-600">Resource: {task.requiredResource}</span>
                    </div>

                    <div className="flex gap-2">
                      {(['morning', 'afternoon', 'evening'] as TimeSlot[]).map((slot) => {
                        const isAssigned = schedule[task.id] === slot;
                        return (
                          <button
                            key={slot}
                            disabled={gameState !== 'playing'}
                            onClick={() => handleAssignTask(task.id, slot)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                              isAssigned
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 text-center">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Action Bar */}
            {gameState === 'puzzle-solved' ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <span className="text-sm font-extrabold text-emerald-800 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  All Interacting Constraints Satisfied!
                </span>
                <button
                  onClick={handleNextPuzzle}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
                >
                  {puzzleIndex + 1 >= PUZZLES.length ? 'View Final Results' : 'Next Scenario →'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleVerify}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all"
              >
                Validate Multi-Constraint Schedule
              </button>
            )}
          </div>
        </div>
      )}

      {gameState === 'results' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">All Scenarios Resolved!</h2>
            <p className="text-sm text-slate-500">
              Evaluated on multi-constraint scheduling, resource conflict resolution, and temporal optimization.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Scenarios Cleared</span>
              <p className="text-3xl font-black text-indigo-600 mt-1">{PUZZLES.length} / {PUZZLES.length}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Planning Score</span>
              <p className="text-3xl font-black text-slate-900 mt-1">{score}</p>
            </div>
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
