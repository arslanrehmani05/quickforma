import { VerticalId } from '../types';

export interface CategoryItem {
  id: string;
  name: string;
}

export const BUSINESS_CATEGORIES: readonly CategoryItem[] = [
  { id: 'all', name: 'All Business Tools' },
  { id: 'finance', name: 'Finance & Tax' },
  { id: 'business', name: 'Documents & Legal' },
  { id: 'ecommerce', name: 'Ecommerce & Ops' },
  { id: 'developer', name: 'Developer & Web' },
  { id: 'converters', name: 'Converters & Formats' },
  { id: 'content', name: 'Content & Productivity' },
] as const;

export const STUDENT_CATEGORIES: readonly CategoryItem[] = [
  { id: 'all', name: 'All Student Tools' },
  { id: 'grades-gpa', name: 'Grades & GPA' },
  { id: 'math-algebra', name: 'Mathematics' },
  { id: 'stats-probability', name: 'Statistics & Probability' },
  { id: 'chemistry-science', name: 'Chemistry' },
  { id: 'physics-engineering', name: 'Physics' },
  { id: 'writing-research', name: 'Academic Writing' },
  { id: 'study-productivity', name: 'Study & Productivity' },
  { id: 'student-finance', name: 'Student Finance' },
  { id: 'academic-conversions', name: 'Academic Conversions' },
] as const;

export const UNIVERSAL_CATEGORIES: readonly CategoryItem[] = [
  { id: 'all', name: 'All Utilities' },
  { id: 'finance', name: 'Finance & Tax' },
  { id: 'business', name: 'Documents & Legal' },
  { id: 'ecommerce', name: 'Ecommerce & Ops' },
  { id: 'developer', name: 'Developer & Web' },
  { id: 'grades-gpa', name: 'Grades & GPA' },
  { id: 'math-algebra', name: 'Mathematics' },
  { id: 'stats-probability', name: 'Statistics & Probability' },
  { id: 'chemistry-science', name: 'Chemistry' },
  { id: 'physics-engineering', name: 'Physics' },
  { id: 'writing-research', name: 'Academic Writing' },
  { id: 'converters', name: 'Converters & Formats' },
  { id: 'content', name: 'Content & Productivity' },
] as const;

export const getCategoriesForVertical = (vertical: 'all' | VerticalId): readonly CategoryItem[] => {
  if (vertical === 'business') return BUSINESS_CATEGORIES;
  if (vertical === 'students') return STUDENT_CATEGORIES;
  return UNIVERSAL_CATEGORIES;
};
