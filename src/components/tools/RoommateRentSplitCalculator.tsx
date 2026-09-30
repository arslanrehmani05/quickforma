import React, { useState, useMemo } from 'react';
import { Sparkles, Home, Plus, Trash2 } from 'lucide-react';
import { calculateRoommateRentSplit, Roommate } from '../../utils/finance/studentFinanceEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const RoommateRentSplitCalculator: React.FC = () => {
  const [totalRent, setTotalRent] = useState<number>(2400);
  const [roommates, setRoommates] = useState<Roommate[]>([
    { id: '1', name: 'Alex', roomSqFt: 180, hasPrivateBathroom: true },
    { id: '2', name: 'Jordan', roomSqFt: 140, hasPrivateBathroom: false },
    { id: '3', name: 'Taylor', roomSqFt: 120, hasPrivateBathroom: false },
  ]);

  const addRoommate = () => {
    setRoommates((prev) => [
      ...prev,
      { id: Date.now().toString(), name: 'New Roommate', roomSqFt: 130, hasPrivateBathroom: false },
    ]);
  };

  const removeRoommate = (id: string) => {
    setRoommates((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRoommate = (id: string, field: keyof Roommate, value: any) => {
    setRoommates((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const result = useMemo(() => {
    return calculateRoommateRentSplit(totalRent, roommates);
  }, [totalRent, roommates]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Roommate Rent & Expense Splitter</h2>
            <p className="text-xs text-slate-500">
              Fairly split total apartment rent based on bedroom square footage and private vs shared bathroom amenities.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Total Monthly Rent ($)</label>
          <input
            type="number"
            min="0"
            value={totalRent}
            onChange={(e) => setTotalRent(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Roommates</h3>
            <button
              onClick={addRoommate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Roommate
            </button>
          </div>

          <div className="space-y-2.5">
            {roommates.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-12 gap-2 items-center bg-slate-50/60 p-2.5 rounded-2xl border border-slate-200/60"
              >
                <div className="col-span-5">
                  <input
                    type="text"
                    value={r.name}
                    onChange={(e) => updateRoommate(r.id, 'name', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-600"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    min="10"
                    placeholder="Sq Ft"
                    value={r.roomSqFt}
                    onChange={(e) => updateRoommate(r.id, 'roomSqFt', parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-slate-900 text-center outline-none focus:border-indigo-600 font-mono"
                  />
                </div>
                <div className="col-span-3">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={r.hasPrivateBathroom}
                      onChange={(e) => updateRoommate(r.id, 'hasPrivateBathroom', e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-600"
                    />
                    Pvt Bath
                  </label>
                </div>
                <div className="col-span-1 text-right">
                  <button
                    onClick={() => removeRoommate(r.id)}
                    disabled={roommates.length <= 1}
                    className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Fair Rent Allocation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {result.map((res) => (
            <div key={res.roommateId} className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
              <div className="text-xs text-indigo-200 mb-1">{res.name}</div>
              <div className="text-3xl font-extrabold text-white font-mono">${res.shareOfRent}</div>
              <div className="text-xs text-emerald-400 mt-1">{res.pctOfTotal}% of total</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
