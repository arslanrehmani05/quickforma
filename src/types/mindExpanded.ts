export type MindCategory =
  | 'all'
  | 'arithmetic'
  | 'memory'
  | 'attention'
  | 'spatial'
  | 'reasoning'
  | 'planning'
  | 'numerical';

export type MindGameId =
  // Existing 6 games
  | 'math-sprint'
  | 'number-sense'
  | 'pattern-challenge'
  | 'logic-challenge'
  | 'probability-challenge'
  | 'focus-challenge'
  // Group A - Memory & Working Memory (4)
  | 'dual-n-back'
  | 'spatial-sequence'
  | 'sequence-recall'
  | 'change-detection'
  // Group B - Attention & Inhibitory Control (5)
  | 'stroop-challenge'
  | 'go-no-go'
  | 'sustained-attention'
  | 'visual-search'
  | 'task-switch'
  // Group C - Spatial Reasoning (3)
  | 'mental-rotation'
  | 'paper-folding'
  | 'pathfinding'
  // Group D - Abstract & Deductive Reasoning (5)
  | 'matrix-reasoning'
  | 'rule-discovery'
  | 'logic-grid'
  | 'codebreaker'
  | 'sequence-ordering'
  // Group E - Planning & Strategy (5)
  | 'tower-of-hanoi'
  | 'peg-solitaire'
  | 'tactical-planner'
  | 'nonogram-logic'
  | 'planning-constraints'
  // Group F - Numerical & Probabilistic Reasoning (4)
  | 'number-comparison'
  | 'probability-lab'
  | 'evidence-update'
  | 'mental-arithmetic-strategies';

export interface MindGameMeta {
  id: MindGameId;
  title: string;
  category: Exclude<MindCategory, 'all'>;
  badge: string;
  cognitiveSkill: string;
  description: string;
  format: '60s Sprint' | 'Level Progression' | 'Puzzle Challenge' | 'Simulation Lab';
  iconName: string;
  isExisting?: boolean;
}
