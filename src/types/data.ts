/**
 * DataContext Type Definitions
 * Core types for the Smart Mess application state
 */

export interface StudentStats {
  name: string;
  mealsAttended: number;
  mealsSkipped: number;
  wasteSavedKg: number;
  sustainabilityScore: number;
  rank: number;
}

export interface Meal {
  id: string;
  name: string;
  date: string;
  menu: string[];
  userConfirmed: boolean | null;
  timeRemainingMins: number;
}

export interface AdminMealStats {
  totalStudents: number;
  confirmedYes: number;
  confirmedNo: number;
  pending: number;
  predictionAttending: number;
}

export interface WasteDataPoint {
  day: string;
  wasteKg: number;
  attendance: number;
}

export interface ModelAccuracyDataPoint {
  day: string;
  actual: number;
  predicted: number;
}

export interface WasteCompositionDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface FoodRecommendation {
  item: string;
  qty: string;
  img: string;
}

export interface DataContextValue {
  studentStats: StudentStats;
  upcomingMeal: Meal;
  adminMealStats: AdminMealStats;
  wasteData: WasteDataPoint[];
  confirmMeal: (willEat: boolean) => void;
  logDailyWaste: (kg: number) => void;
}
