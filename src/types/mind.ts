export type MindDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface MindDifficultyConfig {
  id: MindDifficulty;
  name: string;
  description: string;
  multiplier: number;
}

export interface MathSprintQuestion {
  num1?: number;
  num2?: number;
  operator?: string;
  text: string;
  answer: number;
  isShortcut?: boolean;
}

export interface NumberSenseQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  family: string;
}

export interface PatternQuestion {
  sequenceText: string;
  answer: number;
  options: number[];
  family: string;
}

export interface LogicQuestion {
  premiseText: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  family: string;
}

export interface ProbabilityQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  family: string;
}

export const MIND_DIFFICULTIES: Record<MindDifficulty, MindDifficultyConfig> = {
  easy: {
    id: 'easy',
    name: 'Easy',
    description: 'Single-operation arithmetic with small numbers (1.0× points)',
    multiplier: 1.0,
  },
  medium: {
    id: 'medium',
    name: 'Medium',
    description: 'Larger single operations & clean integer division (1.5× points)',
    multiplier: 1.5,
  },
  hard: {
    id: 'hard',
    name: 'Hard',
    description: 'Multi-operation expressions requiring mental sequencing (2.0× points)',
    multiplier: 2.0,
  },
  expert: {
    id: 'expert',
    name: 'Expert',
    description: 'Multi-term arithmetic & mental calculation shortcut families (3.0× points)',
    multiplier: 3.0,
  },
};
