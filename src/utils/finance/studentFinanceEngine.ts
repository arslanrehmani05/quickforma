/**
 * Pure client-side Student Finance Engine powering QuickForma academic tools
 */

export interface StudentBudgetItem {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
}

export function calculateStudentBudget(items: StudentBudgetItem[]): {
  totalIncome: number;
  totalExpense: number;
  netSavings: number;
  expenseBreakdown: { name: string; pct: number }[];
} {
  let totalIncome = 0;
  let totalExpense = 0;
  const expenses: { name: string; amount: number }[] = [];

  items.forEach((item) => {
    const amt = Math.max(0, item.amount || 0);
    if (item.type === 'income') {
      totalIncome += amt;
    } else {
      totalExpense += amt;
      expenses.push({ name: item.name, amount: amt });
    }
  });

  const netSavings = totalIncome - totalExpense;
  const expenseBreakdown = expenses.map((e) => ({
    name: e.name,
    pct: totalExpense > 0 ? Math.round((e.amount / totalExpense) * 1000) / 10 : 0,
  }));

  return {
    totalIncome: Math.round(totalIncome * 100) / 100,
    totalExpense: Math.round(totalExpense * 100) / 100,
    netSavings: Math.round(netSavings * 100) / 100,
    expenseBreakdown,
  };
}

/**
 * Calculates Cost Per Credit Hour and Cost Per Individual Class Session
 */
export function calculateCostPerClass(
  totalTuitionFees: number,
  totalCredits: number,
  weeksInSemester: number = 15,
  sessionsPerWeekPerCourse: number = 3,
  creditsForTargetCourse: number = 3
): {
  costPerCreditHour: number;
  targetCourseTuition: number;
  costPerClassSession: number;
  financialLossPerSkippedClass: number;
} {
  if (totalCredits <= 0) throw new Error('Total credits must be greater than zero.');
  if (weeksInSemester <= 0) throw new Error('Semester weeks must be greater than zero.');

  const costPerCreditHour = totalTuitionFees / totalCredits;
  const targetCourseTuition = costPerCreditHour * creditsForTargetCourse;
  const totalSessionsInCourse = weeksInSemester * sessionsPerWeekPerCourse;
  const costPerClassSession = totalSessionsInCourse > 0 ? targetCourseTuition / totalSessionsInCourse : 0;

  return {
    costPerCreditHour: Math.round(costPerCreditHour * 100) / 100,
    targetCourseTuition: Math.round(targetCourseTuition * 100) / 100,
    costPerClassSession: Math.round(costPerClassSession * 100) / 100,
    financialLossPerSkippedClass: Math.round(costPerClassSession * 100) / 100,
  };
}

/**
 * Student Loan Payoff & Extra Payment Acceleration
 */
export function calculateStudentLoanPayoff(
  balance: number,
  annualInterestRatePct: number,
  monthlyPayment: number,
  extraMonthlyPayment: number = 0
): {
  monthsToPayoff: number;
  totalInterestPaid: number;
  monthsSavedWithExtra: number;
  interestSavedWithExtra: number;
} {
  const r = annualInterestRatePct / 100 / 12;
  if (r <= 0) {
    const months = Math.ceil(balance / (monthlyPayment + extraMonthlyPayment));
    return { monthsToPayoff: months, totalInterestPaid: 0, monthsSavedWithExtra: 0, interestSavedWithExtra: 0 };
  }

  // Base schedule without extra
  let balBase = balance;
  let monthsBase = 0;
  let interestBase = 0;
  while (balBase > 0 && monthsBase < 600) {
    const interest = balBase * r;
    interestBase += interest;
    balBase = balBase + interest - monthlyPayment;
    monthsBase++;
    if (monthlyPayment <= interest) {
      throw new Error('Monthly payment is less than monthly interest accrued. Loan balance will grow infinitely!');
    }
  }

  // Schedule with extra payment
  let balExtra = balance;
  let monthsExtra = 0;
  let interestExtra = 0;
  const totalMonthly = monthlyPayment + extraMonthlyPayment;
  while (balExtra > 0 && monthsExtra < 600) {
    const interest = balExtra * r;
    interestExtra += interest;
    balExtra = balExtra + interest - totalMonthly;
    monthsExtra++;
  }

  return {
    monthsToPayoff: monthsExtra,
    totalInterestPaid: Math.round(interestExtra * 100) / 100,
    monthsSavedWithExtra: Math.max(0, monthsBase - monthsExtra),
    interestSavedWithExtra: Math.round(Math.max(0, interestBase - interestExtra) * 100) / 100,
  };
}

export interface Roommate {
  id: string;
  name: string;
  roomSqFt: number;
  hasPrivateBathroom: boolean;
}

/**
 * Roommate Rent Splitter by Square Footage & Private Bathroom Weighting
 */
export function calculateRoommateRentSplit(
  totalRent: number,
  roommates: Roommate[],
  privateBathBonusPct: number = 15
): { roommateId: string; name: string; shareOfRent: number; pctOfTotal: number }[] {
  if (!roommates || roommates.length === 0) return [];
  if (totalRent <= 0) return roommates.map((r) => ({ roommateId: r.id, name: r.name, shareOfRent: 0, pctOfTotal: 0 }));

  let totalWeightedUnits = 0;
  const weightedUnits = roommates.map((r) => {
    let units = r.roomSqFt || 100;
    if (r.hasPrivateBathroom) units *= 1 + privateBathBonusPct / 100;
    totalWeightedUnits += units;
    return { id: r.id, name: r.name, units };
  });

  return weightedUnits.map((r) => {
    const share = (r.units / totalWeightedUnits) * totalRent;
    return {
      roommateId: r.id,
      name: r.name,
      shareOfRent: Math.round(share * 100) / 100,
      pctOfTotal: Math.round((r.units / totalWeightedUnits) * 1000) / 10,
    };
  });
}
