import React, { useState, useRef, useEffect } from 'react';
import { Shield, Lock, Cpu, Info } from 'lucide-react';

interface TrustBadgeItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
}

interface TrustBadgesProps {
  className?: string;
  executionLabel?: 'Calculation' | 'Execution';
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  className = '',
  executionLabel = 'Calculation',
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking or tapping outside, or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveTooltip(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveTooltip(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const badges: TrustBadgeItem[] = [
    {
      id: 'private',
      icon: <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />,
      label: '100% Private Client-Side Engine',
      title: 'What does "Client-Side" mean?',
      description:
        'Everything runs directly on your computer or phone. Your numbers and calculations never leave your browser and are never saved, tracked, or seen by anyone—not even us.',
    },
    {
      id: 'no-uploads',
      icon: <Lock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />,
      label: 'Zero File Server Uploads',
      title: 'What does "Zero Uploads" mean?',
      description:
        'When you create an invoice, convert a file, or enter data, your files are never sent to any cloud or web server. Everything stays safely inside your device memory.',
    },
    {
      id: 'speed',
      icon: <Cpu className="w-3.5 h-3.5 text-amber-600 shrink-0" />,
      label: `Sub-50ms ${executionLabel}`,
      title: 'What does "Sub-50ms" mean?',
      description:
        'Math and results appear in under 50 milliseconds (faster than the blink of an eye). Because your own device does the processing, there is zero internet waiting time.',
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 pt-2 font-medium ${className}`}
    >
      {badges.map((badge) => {
        const isOpen = activeTooltip === badge.id;
        return (
          <div
            key={badge.id}
            className="relative inline-block"
            onMouseEnter={() => setActiveTooltip(badge.id)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <button
              type="button"
              onClick={() => setActiveTooltip(isOpen ? null : badge.id)}
              aria-expanded={isOpen}
              aria-label={`${badge.label}: Click or hover for explanation`}
              className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer select-none transition-all hover:border-slate-300 hover:bg-slate-50/80 active:scale-95 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {badge.icon}
              <span>{badge.label}</span>
              <Info className="w-3 h-3 text-slate-400 opacity-60 hover:opacity-100 transition-opacity ml-0.5 shrink-0" />
            </button>

            {/* Hover & Touch Tooltip Explanation Card */}
            {isOpen && (
              <div
                role="tooltip"
                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 sm:w-72 max-w-[calc(100vw-2rem)] p-3 bg-slate-900 text-white rounded-xl shadow-xl text-left text-xs leading-relaxed z-50 border border-slate-800 pointer-events-auto"
              >
                <div className="flex items-center gap-1.5 font-bold text-slate-100 mb-1 text-[11px] sm:text-xs">
                  {badge.icon}
                  <span>{badge.title}</span>
                </div>
                <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed">
                  {badge.description}
                </p>

                {/* Downward Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
