import React, { useState } from "react";
import { Clock, BookOpen, CheckSquare, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface TaskItem {
  id: string;
  subject: string;
  readingPages: number;
  problemSets: number;
  writingWords: number;
}

export const HomeworkTimeEstimator: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: "1", subject: "Organic Chemistry", readingPages: 15, problemSets: 12, writingWords: 0 },
    { id: "2", subject: "History Essay", readingPages: 20, problemSets: 0, writingWords: 750 },
    { id: "3", subject: "Calculus III", readingPages: 5, problemSets: 15, writingWords: 0 },
  ]);

  const [readingPaceMinPerPage, setReadingPaceMinPerPage] = useState<number>(3);
  const [problemPaceMinPerProblem, setProblemPaceMinPerProblem] = useState<number>(6);
  const [writingWordsPerMin, setWritingWordsPerMin] = useState<number>(12); // ~250 words per 20 min

  const calculateTaskMinutes = (t: TaskItem) => {
    const rPages = Math.max(0, Number(t.readingPages) || 0);
    const pSets = Math.max(0, Number(t.problemSets) || 0);
    const wWords = Math.max(0, Number(t.writingWords) || 0);
    const writingMinutes = writingWordsPerMin > 0 ? wWords / writingWordsPerMin : 0;
    return rPages * readingPaceMinPerPage + pSets * problemPaceMinPerProblem + writingMinutes;
  };

  const totalMinutes = tasks.reduce((sum, t) => sum + calculateTaskMinutes(t), 0);
  const totalHours = totalMinutes / 60;

  // Pomodoro sessions (25 min study + 5 min break)
  const pomodoroBlocks = totalMinutes > 0 ? Math.ceil(totalMinutes / 25) : 0;
  // Breaks occur between blocks (N - 1 breaks)
  const breakMinutes = pomodoroBlocks > 1 ? (pomodoroBlocks - 1) * 5 : 0;
  const totalWithBreaks = totalMinutes + breakMinutes;

  const addTask = () => {
    setTasks([...tasks, { id: Date.now().toString(), subject: "New Assignment", readingPages: 10, problemSets: 5, writingWords: 0 }]);
  };

  const removeTask = (id: string) => {
    if (tasks.length > 1) setTasks(tasks.filter((t) => t.id !== id));
  };

  const updateTask = (id: string, field: keyof TaskItem, val: any) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, [field]: val } : t)));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Clock}
            title="Homework & Assignment Completion Time Estimator"
            description="Estimate study time for textbook reading, math problem sets, and essays with integrated Pomodoro schedule breaks."
          />
          <ResetButton onReset={() => {
            setTasks([
              { id: "1", subject: "Organic Chemistry", readingPages: 15, problemSets: 12, writingWords: 0 },
              { id: "2", subject: "History Essay", readingPages: 20, problemSets: 0, writingWords: 750 },
              { id: "3", subject: "Calculus III", readingPages: 5, problemSets: 15, writingWords: 0 },
            ]);
          }} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Assigned Workload</h3>
            <Button size="sm" variant="secondary" onClick={addTask} className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Assignment
            </Button>
          </div>

          <div className="space-y-2">
            {tasks.map((t) => (
              <div key={t.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="col-span-4">
                  <input
                    type="text"
                    value={t.subject}
                    onChange={(e) => updateTask(t.id, "subject", e.target.value)}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min={0}
                    placeholder="Pages"
                    value={t.readingPages}
                    onChange={(e) => updateTask(t.id, "readingPages", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                  <span className="text-[10px] text-slate-400 block text-center">Pages (3m)</span>
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min={0}
                    placeholder="Problems"
                    value={t.problemSets}
                    onChange={(e) => updateTask(t.id, "problemSets", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                  <span className="text-[10px] text-slate-400 block text-center">Problems (6m)</span>
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    min={0}
                    placeholder="Words"
                    value={t.writingWords}
                    onChange={(e) => updateTask(t.id, "writingWords", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                  <span className="text-[10px] text-slate-400 block text-center">Words written</span>
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={() => removeTask(t.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ResultCard variant="dark" title="Time & Schedule Estimation">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Net Study Time</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">{totalHours.toFixed(1)} hrs</p>
              <span className="text-[11px] text-slate-300 mt-1 block">{Math.round(totalMinutes)} minutes pure study</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Pomodoro Intervals</span>
              <p className="text-4xl font-extrabold text-white mt-1">{pomodoroBlocks}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">25-min focus sessions</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total with 5m Breaks</span>
              <p className="text-2xl font-bold text-indigo-300 mt-1">{(totalWithBreaks / 60).toFixed(1)} hrs</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Includes scheduled rest</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
