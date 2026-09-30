import React from 'react';
import { Compass, ShieldCheck, Clock, Tag, Calendar, DollarSign, UserCheck } from 'lucide-react';
import { AtAGlanceData } from '../../types/seo';

interface AtAGlanceProps {
  data?: AtAGlanceData;
}

export const AtAGlance: React.FC<AtAGlanceProps> = ({ data }) => {
  if (!data) return null;

  const items = [
    { label: 'Category', value: data.categoryLabel || 'Utility', icon: Tag },
    { label: 'Best For', value: data.bestFor || 'Freelancers & Businesses', icon: UserCheck },
    { label: 'Privacy', value: data.privacy || '100% Client-Side RAM', icon: ShieldCheck },
    { label: 'Time Required', value: data.timeRequired || 'Under 1 Minute', icon: Clock },
    { label: 'Cost', value: data.cost || 'Free Forever', icon: DollarSign },
    { label: 'Updated', value: data.lastUpdated || 'August 2026', icon: Calendar },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <Compass className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-slate-900">{data.heading || 'At a Glance'}</h2>
        {data.subheading && <span className="text-xs text-slate-500 font-medium">({data.subheading})</span>}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Icon className="w-3 h-3 text-indigo-600" />
                {item.label}
              </span>
              <span className="text-xs font-bold text-slate-900 truncate">{item.value}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
