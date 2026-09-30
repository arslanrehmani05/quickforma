export interface Course {
  id: string;
  name: string;
  grade: string; // Letter grade or numeric grade
  credits: number;
  isHonors?: boolean;
  isAP?: boolean;
}

export interface GradingScale {
  id: string;
  name: string;
  maxGpa: number;
  mapping: Record<string, number>;
}

export const STANDARD_4_0_SCALE: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0,
};

export const SCALE_4_33: Record<string, number> = {
  'A+': 4.33,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0,
};

export const SCALE_5_0_WEIGHTED: Record<string, number> = {
  'A+': 5.0,
  'A': 5.0,
  'A-': 4.7,
  'B+': 4.3,
  'B': 4.0,
  'B-': 3.7,
  'C+': 3.3,
  'C': 3.0,
  'C-': 2.7,
  'D+': 2.3,
  'D': 2.0,
  'D-': 1.7,
  'F': 0.0,
};

/**
 * Calculates Semester GPA from an array of courses
 */
export function calculateSemesterGpa(
  courses: Course[],
  scale: Record<string, number> = STANDARD_4_0_SCALE,
  isWeighted: boolean = false
): { gpa: number; totalCredits: number; totalPoints: number } {
  if (!courses || courses.length === 0) {
    return { gpa: 0, totalCredits: 0, totalPoints: 0 };
  }

  let totalCredits = 0;
  let totalPoints = 0;

  for (const course of courses) {
    const credits = Math.max(0, course.credits || 0);
    let points = scale[course.grade?.toUpperCase()] ?? parseFloat(course.grade);
    
    if (isNaN(points)) {
      points = 0;
    }

    if (isWeighted) {
      if (course.isAP) points += 1.0;
      else if (course.isHonors) points += 0.5;
    }

    totalCredits += credits;
    totalPoints += points * credits;
  }

  const gpa = totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0;
  return { gpa, totalCredits, totalPoints: Math.round(totalPoints * 100) / 100 };
}

/**
 * Calculates Cumulative GPA combining prior history and current semester
 */
export function calculateCumulativeGpa(
  priorGpa: number,
  priorCredits: number,
  currentGpa: number,
  currentCredits: number
): { cumulativeGpa: number; totalCredits: number; gpaChange: number } {
  const safePriorGpa = Math.max(0, priorGpa || 0);
  const safePriorCredits = Math.max(0, priorCredits || 0);
  const safeCurrentGpa = Math.max(0, currentGpa || 0);
  const safeCurrentCredits = Math.max(0, currentCredits || 0);

  const priorPoints = safePriorGpa * safePriorCredits;
  const currentPoints = safeCurrentGpa * safeCurrentCredits;
  const totalCredits = safePriorCredits + safeCurrentCredits;

  if (totalCredits === 0) {
    return { cumulativeGpa: 0, totalCredits: 0, gpaChange: 0 };
  }

  const cumulativeGpa = Math.round(((priorPoints + currentPoints) / totalCredits) * 100) / 100;
  const gpaChange = Math.round((cumulativeGpa - safePriorGpa) * 100) / 100;

  return { cumulativeGpa, totalCredits, gpaChange };
}

/**
 * Calculates Target GPA feasibility and required GPA on remaining credits
 */
export function calculateTargetGpa(
  currentGpa: number,
  completedCredits: number,
  targetGpa: number,
  remainingCredits: number,
  maxScaleGpa: number = 4.0
): { requiredGpa: number; isAchievable: boolean; message: string } {
  const safeCurrentGpa = Math.max(0, currentGpa || 0);
  const safeCompletedCredits = Math.max(0, completedCredits || 0);
  const safeTargetGpa = Math.max(0, targetGpa || 0);
  const safeRemainingCredits = Math.max(0, remainingCredits || 0);

  const totalCredits = safeCompletedCredits + safeRemainingCredits;
  if (totalCredits === 0 || safeRemainingCredits === 0) {
    return {
      requiredGpa: 0,
      isAchievable: false,
      message: 'Remaining credits must be greater than zero to plan future GPA.',
    };
  }

  const totalPointsNeeded = safeTargetGpa * totalCredits;
  const currentPointsEarned = safeCurrentGpa * safeCompletedCredits;
  const remainingPointsNeeded = totalPointsNeeded - currentPointsEarned;

  const requiredGpa = Math.round((remainingPointsNeeded / safeRemainingCredits) * 100) / 100;

  if (requiredGpa < 0) {
    return {
      requiredGpa: 0,
      isAchievable: true,
      message: 'Target GPA already achieved! You can score 0.0 in remaining credits and stay above target.',
    };
  }

  if (requiredGpa > maxScaleGpa) {
    return {
      requiredGpa,
      isAchievable: false,
      message: `Mathematically impossible. You would need a ${requiredGpa.toFixed(2)} GPA on your remaining credits (max is ${maxScaleGpa.toFixed(1)}).`,
    };
  }

  return {
    requiredGpa,
    isAchievable: true,
    message: `You need a ${requiredGpa.toFixed(2)} average GPA across your remaining ${safeRemainingCredits} credit hours.`,
  };
}

/**
 * Final Grade Needed on Exam / Remaining Assessment
 */
export function calculateFinalGradeNeeded(
  currentGradePct: number,
  finalExamWeightPct: number,
  targetGradePct: number
): { requiredExamScore: number; maxPossibleGrade: number; message: string } {
  const current = Math.max(0, currentGradePct || 0);
  const weight = Math.min(100, Math.max(0.1, finalExamWeightPct || 0)) / 100;
  const target = Math.max(0, targetGradePct || 0);

  const currentWeight = 1 - weight;
  const currentContribution = current * currentWeight;
  
  const requiredExamScore = Math.round(((target - currentContribution) / weight) * 10) / 10;
  const maxPossibleGrade = Math.round((currentContribution + 100 * weight) * 10) / 10;

  let message = '';
  if (requiredExamScore <= 0) {
    message = 'You have already secured your target grade regardless of the final exam score!';
  } else if (requiredExamScore > 100) {
    message = `You need ${requiredExamScore}% on the final exam. Even with a 100%, your max possible final grade is ${maxPossibleGrade}%.`;
  } else {
    message = `You need to score at least ${requiredExamScore}% on your final exam to achieve a final grade of ${target}%.`;
  }

  return { requiredExamScore, maxPossibleGrade, message };
}

/**
 * Attendance & Absence Skips Calculator
 */
export function calculateAttendance(
  attendedClasses: number,
  totalClassesHeld: number,
  targetAttendancePct: number = 80,
  totalSemesterClasses?: number
): {
  currentPct: number;
  classesCanSkip: number;
  classesNeededToAttend: number;
  projectedPctIfNoMoreSkips: number;
} {
  const attended = Math.max(0, attendedClasses || 0);
  const held = Math.max(1, totalClassesHeld || 1);
  const targetPct = Math.max(0, Math.min(100, targetAttendancePct || 80)) / 100;

  const currentPct = Math.round((attended / held) * 1000) / 10;

  const classesCanSkip = Math.max(0, Math.floor((attended / targetPct) - held));

  let classesNeededToAttend = 0;
  if (currentPct < targetAttendancePct) {
    classesNeededToAttend = Math.ceil((targetPct * held - attended) / (1 - targetPct));
  }

  let projectedPctIfNoMoreSkips = currentPct;
  if (totalSemesterClasses && totalSemesterClasses > held) {
    const remainingSemester = totalSemesterClasses - held;
    projectedPctIfNoMoreSkips = Math.round(((attended + remainingSemester) / totalSemesterClasses) * 1000) / 10;
  }

  return {
    currentPct,
    classesCanSkip,
    classesNeededToAttend: Math.max(0, classesNeededToAttend),
    projectedPctIfNoMoreSkips,
  };
}

/**
 * Converts Raw Marks / Percentages to Letter Grades & GPAs
 */
export function convertMarksToGrade(
  marks: number,
  maxMarks: number = 100
): { percentage: number; letterGrade: string; gpaPoint: number } {
  const pct = maxMarks > 0 ? (marks / maxMarks) * 100 : 0;
  const percentage = Math.round(pct * 10) / 10;

  let letterGrade = 'F';
  let gpaPoint = 0.0;

  if (percentage >= 93) { letterGrade = 'A'; gpaPoint = 4.0; }
  else if (percentage >= 90) { letterGrade = 'A-'; gpaPoint = 3.7; }
  else if (percentage >= 87) { letterGrade = 'B+'; gpaPoint = 3.3; }
  else if (percentage >= 83) { letterGrade = 'B'; gpaPoint = 3.0; }
  else if (percentage >= 80) { letterGrade = 'B-'; gpaPoint = 2.7; }
  else if (percentage >= 77) { letterGrade = 'C+'; gpaPoint = 2.3; }
  else if (percentage >= 73) { letterGrade = 'C'; gpaPoint = 2.0; }
  else if (percentage >= 70) { letterGrade = 'C-'; gpaPoint = 1.7; }
  else if (percentage >= 67) { letterGrade = 'D+'; gpaPoint = 1.3; }
  else if (percentage >= 63) { letterGrade = 'D'; gpaPoint = 1.0; }
  else if (percentage >= 60) { letterGrade = 'D-'; gpaPoint = 0.7; }
  else { letterGrade = 'F'; gpaPoint = 0.0; }

  return { percentage, letterGrade, gpaPoint };
}
