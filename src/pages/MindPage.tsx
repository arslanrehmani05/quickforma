import React, { useState, useEffect, useMemo } from 'react';
import {
  Zap,
  Hash,
  Layers,
  Lightbulb,
  Dices,
  Eye,
  Brain,
  Grid,
  ListOrdered,
  ScanEye,
  Palette,
  ShieldAlert,
  Radar,
  Search,
  Shuffle,
  RotateCw,
  FoldVertical,
  Compass,
  LayoutGrid,
  HelpCircle,
  Table,
  Key,
  ArrowDownUp,
  Sliders,
  CircleDot,
  Swords,
  Grid3X3,
  CalendarCheck,
  Scale,
  PieChart,
  Percent,
  Calculator,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

import { MindCategory, MindGameId } from '../types/mindExpanded';
import { MIND_GAMES_CATALOG } from '../data/mindGamesCatalog';

// 6 Existing Games
import { MentalMathSprint } from '../components/mind/MentalMathSprint';
import { NumberSenseGame } from '../components/mind/NumberSenseGame';
import { PatternChallengeGame } from '../components/mind/PatternChallengeGame';
import { LogicChallengeGame } from '../components/mind/LogicChallengeGame';
import { ProbabilityChallengeGame } from '../components/mind/ProbabilityChallengeGame';
import { FocusChallengeGame } from '../components/mind/FocusChallengeGame';

// Group A: Memory (4)
import { DualNBackGame } from '../components/mind/DualNBackGame';
import { SpatialSequenceGame } from '../components/mind/SpatialSequenceGame';
import { SequenceRecallGame } from '../components/mind/SequenceRecallGame';
import { ChangeDetectionGame } from '../components/mind/ChangeDetectionGame';

// Group B: Attention (5)
import { StroopGame } from '../components/mind/StroopGame';
import { GoNoGoGame } from '../components/mind/GoNoGoGame';
import { SustainedAttentionGame } from '../components/mind/SustainedAttentionGame';
import { VisualSearchGame } from '../components/mind/VisualSearchGame';
import { TaskSwitchGame } from '../components/mind/TaskSwitchGame';

// Group C: Spatial (3)
import { MentalRotationGame } from '../components/mind/MentalRotationGame';
import { PaperFoldingGame } from '../components/mind/PaperFoldingGame';
import { PathfindingGame } from '../components/mind/PathfindingGame';

// Group D: Reasoning (5)
import { MatrixReasoningGame } from '../components/mind/MatrixReasoningGame';
import { RuleDiscoveryGame } from '../components/mind/RuleDiscoveryGame';
import { LogicGridGame } from '../components/mind/LogicGridGame';
import { CodebreakerGame } from '../components/mind/CodebreakerGame';
import { SequenceOrderingGame } from '../components/mind/SequenceOrderingGame';

// Group E: Planning & Strategy (5)
import { TowerOfHanoiGame } from '../components/mind/TowerOfHanoiGame';
import { PegSolitaireGame } from '../components/mind/PegSolitaireGame';
import { TacticalPlannerGame } from '../components/mind/TacticalPlannerGame';
import { NonogramGame } from '../components/mind/NonogramGame';
import { PlanningConstraintsGame } from '../components/mind/PlanningConstraintsGame';

// Group F: Numerical & Probabilistic (4)
import { NumberComparisonGame } from '../components/mind/NumberComparisonGame';
import { ProbabilityLabGame } from '../components/mind/ProbabilityLabGame';
import { EvidenceUpdateGame } from '../components/mind/EvidenceUpdateGame';
import { ArithmeticStrategiesGame } from '../components/mind/ArithmeticStrategiesGame';

interface MindPageProps {
  onSelectView: (view: string) => void;
}

export const MindPage: React.FC<MindPageProps> = () => {
  // Read initial game from URL if present (?game=id)
  const [activeGame, setActiveGame] = useState<MindGameId | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const gameParam = params.get('game') as MindGameId | null;
      if (gameParam && MIND_GAMES_CATALOG.some((g) => g.id === gameParam)) {
        return gameParam;
      }
    }
    return null;
  });

  const [selectedCategory, setSelectedCategory] = useState<MindCategory>('all');

  // Handle URL sync on game selection
  const handleSelectGame = (gameId: MindGameId | null) => {
    setActiveGame(gameId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (gameId) {
        url.searchParams.set('game', gameId);
      } else {
        url.searchParams.delete('game');
      }
      window.history.pushState(null, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Listen to popstate for back/forward browser buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const gameParam = params.get('game') as MindGameId | null;
      if (gameParam && MIND_GAMES_CATALOG.some((g) => g.id === gameParam)) {
        setActiveGame(gameParam);
      } else {
        setActiveGame(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Filtered games based on active category
  const filteredGames = useMemo(() => {
    if (selectedCategory === 'all') return MIND_GAMES_CATALOG;
    return MIND_GAMES_CATALOG.filter((g) => g.category === selectedCategory);
  }, [selectedCategory]);

  // Dynamic category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MIND_GAMES_CATALOG.length };
    for (const game of MIND_GAMES_CATALOG) {
      counts[game.category] = (counts[game.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Helper to render icon for each game
  const renderGameIcon = (iconName: string) => {
    const iconClass = 'w-6 h-6';
    switch (iconName) {
      case 'Zap': return <Zap className={`${iconClass} fill-indigo-600 text-indigo-600`} />;
      case 'Hash': return <Hash className={iconClass} />;
      case 'Layers': return <Layers className={iconClass} />;
      case 'Lightbulb': return <Lightbulb className={iconClass} />;
      case 'Dices': return <Dices className={iconClass} />;
      case 'Eye': return <Eye className={iconClass} />;
      case 'Brain': return <Brain className={iconClass} />;
      case 'Grid': return <Grid className={iconClass} />;
      case 'ListOrdered': return <ListOrdered className={iconClass} />;
      case 'ScanEye': return <ScanEye className={iconClass} />;
      case 'Palette': return <Palette className={iconClass} />;
      case 'ShieldAlert': return <ShieldAlert className={iconClass} />;
      case 'Radar': return <Radar className={iconClass} />;
      case 'Search': return <Search className={iconClass} />;
      case 'Shuffle': return <Shuffle className={iconClass} />;
      case 'RotateCw': return <RotateCw className={iconClass} />;
      case 'FoldVertical': return <FoldVertical className={iconClass} />;
      case 'Compass': return <Compass className={iconClass} />;
      case 'LayoutGrid': return <LayoutGrid className={iconClass} />;
      case 'HelpCircle': return <HelpCircle className={iconClass} />;
      case 'Table': return <Table className={iconClass} />;
      case 'Key': return <Key className={iconClass} />;
      case 'ArrowDownUp': return <ArrowDownUp className={iconClass} />;
      case 'Sliders': return <Sliders className={iconClass} />;
      case 'CircleDot': return <CircleDot className={iconClass} />;
      case 'Swords': return <Swords className={iconClass} />;
      case 'Grid3X3': return <Grid3X3 className={iconClass} />;
      case 'CalendarCheck': return <CalendarCheck className={iconClass} />;
      case 'Scale': return <Scale className={iconClass} />;
      case 'PieChart': return <PieChart className={iconClass} />;
      case 'Percent': return <Percent className={iconClass} />;
      case 'Calculator': return <Calculator className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  // --- RENDER SELECTED GAME ---
  if (activeGame) {
    const handleBack = () => handleSelectGame(null);

    switch (activeGame) {
      // 6 Existing
      case 'math-sprint': return <MentalMathSprint onBack={handleBack} />;
      case 'number-sense': return <NumberSenseGame onBack={handleBack} />;
      case 'pattern-challenge': return <PatternChallengeGame onBack={handleBack} />;
      case 'logic-challenge': return <LogicChallengeGame onBack={handleBack} />;
      case 'probability-challenge': return <ProbabilityChallengeGame onBack={handleBack} />;
      case 'focus-challenge': return <FocusChallengeGame onBack={handleBack} />;

      // Group A: Memory (4)
      case 'dual-n-back': return <DualNBackGame onBack={handleBack} />;
      case 'spatial-sequence': return <SpatialSequenceGame onBack={handleBack} />;
      case 'sequence-recall': return <SequenceRecallGame onBack={handleBack} />;
      case 'change-detection': return <ChangeDetectionGame onBack={handleBack} />;

      // Group B: Attention (5)
      case 'stroop-challenge': return <StroopGame onBack={handleBack} />;
      case 'go-no-go': return <GoNoGoGame onBack={handleBack} />;
      case 'sustained-attention': return <SustainedAttentionGame onBack={handleBack} />;
      case 'visual-search': return <VisualSearchGame onBack={handleBack} />;
      case 'task-switch': return <TaskSwitchGame onBack={handleBack} />;

      // Group C: Spatial (3)
      case 'mental-rotation': return <MentalRotationGame onBack={handleBack} />;
      case 'paper-folding': return <PaperFoldingGame onBack={handleBack} />;
      case 'pathfinding': return <PathfindingGame onBack={handleBack} />;

      // Group D: Reasoning (5)
      case 'matrix-reasoning': return <MatrixReasoningGame onBack={handleBack} />;
      case 'rule-discovery': return <RuleDiscoveryGame onBack={handleBack} />;
      case 'logic-grid': return <LogicGridGame onBack={handleBack} />;
      case 'codebreaker': return <CodebreakerGame onBack={handleBack} />;
      case 'sequence-ordering': return <SequenceOrderingGame onBack={handleBack} />;

      // Group E: Planning & Strategy (5)
      case 'tower-of-hanoi': return <TowerOfHanoiGame onBack={handleBack} />;
      case 'peg-solitaire': return <PegSolitaireGame onBack={handleBack} />;
      case 'tactical-planner': return <TacticalPlannerGame onBack={handleBack} />;
      case 'nonogram-logic': return <NonogramGame onBack={handleBack} />;
      case 'planning-constraints': return <PlanningConstraintsGame onBack={handleBack} />;

      // Group F: Numerical & Probabilistic (4)
      case 'number-comparison': return <NumberComparisonGame onBack={handleBack} />;
      case 'probability-lab': return <ProbabilityLabGame onBack={handleBack} />;
      case 'evidence-update': return <EvidenceUpdateGame onBack={handleBack} />;
      case 'mental-arithmetic-strategies': return <ArithmeticStrategiesGame onBack={handleBack} />;

      default:
        return <MentalMathSprint onBack={handleBack} />;
    }
  }

  // --- RENDER 32-GAME LIBRARY HUB ---
  return (
    <div className="space-y-10 py-4 max-w-6xl mx-auto">
      {/* Mind Landing Hero */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          QuickForma Mind Suite · 32 Cognitive Challenges
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            QuickForma Mind Suite
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            32 client-side cognitive challenges exercising calculation speed, working memory, inhibitory control, spatial transformation, deductive logic, and strategic planning.
          </p>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {(
          [
            { id: 'all', label: 'All Challenges' },
            { id: 'memory', label: 'Memory' },
            { id: 'attention', label: 'Attention' },
            { id: 'reasoning', label: 'Reasoning' },
            { id: 'spatial', label: 'Spatial' },
            { id: 'planning', label: 'Planning' },
            { id: 'numerical', label: 'Numerical' },
            { id: 'arithmetic', label: 'Arithmetic' },
          ] as { id: MindCategory; label: string }[]
        ).map((cat) => {
          const count = categoryCounts[cat.id] || 0;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 32-Game Grid Collection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Select a Cognitive Challenge ({filteredGames.length})
          </h2>
          <span className="text-xs font-bold text-slate-400">
            Interactive Sessions · 100% Client-Side Ephemeral State
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGames.map((game) => (
            <button
              key={game.id}
              onClick={() => handleSelectGame(game.id)}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group space-y-6"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {renderGameIcon(game.iconName)}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block">
                    {game.badge}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {game.format}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {game.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-extrabold text-indigo-600 pt-3 border-t border-slate-100">
                <span>Play Challenge</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
