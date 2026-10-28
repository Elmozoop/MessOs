import { createContext, useContext, useState, type ReactNode } from 'react';

import type {
  StudentStats,
  Meal,
  AdminMealStats,
  WasteDataPoint,
  DataContextValue,
} from '../types';

interface DataProviderProps {
  children: ReactNode;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: DataProviderProps) {
  // Global student profile stats
  const [studentStats, setStudentStats] = useState<StudentStats>({
    name: 'Alex',
    mealsAttended: 42,
    mealsSkipped: 8,
    wasteSavedKg: 12.5,
    sustainabilityScore: 880,
    rank: 4,
  });

  // Today's upcoming meal
  const [upcomingMeal, setUpcomingMeal] = useState<Meal>({
    id: 'm_latest',
    name: 'Dinner',
    date: new Date().toISOString().split('T')[0],
    menu: ['Paneer Butter Masala', 'Roti', 'Dal Tadka', 'Rice', 'Gulab Jamun'],
    userConfirmed: null,
    timeRemainingMins: 120,
  });

  // Admin dashboard active meal stats
  const [adminMealStats, setAdminMealStats] = useState<AdminMealStats>({
    totalStudents: 500,
    confirmedYes: 310,
    confirmedNo: 45,
    pending: 145,
    predictionAttending: 415,
  });

  // Historical Waste Analytics
  const [wasteData, setWasteData] = useState<WasteDataPoint[]>([
    { day: 'Mon', wasteKg: 45, attendance: 420 },
    { day: 'Tue', wasteKg: 38, attendance: 450 },
    { day: 'Wed', wasteKg: 60, attendance: 390 },
    { day: 'Thu', wasteKg: 30, attendance: 460 },
    { day: 'Fri', wasteKg: 25, attendance: 480 },
    { day: 'Sat', wasteKg: 85, attendance: 310 },
    { day: 'Sun', wasteKg: 90, attendance: 290 },
  ]);

  // Handle student meal confirmation
  const confirmMeal = (willEat: boolean) => {
    setUpcomingMeal((prev: Meal) => ({ ...prev, userConfirmed: willEat }));

    setAdminMealStats((prev: AdminMealStats) => {
      const newYes = willEat ? prev.confirmedYes + 1 : prev.confirmedYes;
      const newNo = !willEat ? prev.confirmedNo + 1 : prev.confirmedNo;
      return {
        ...prev,
        confirmedYes: newYes,
        confirmedNo: newNo,
        pending: prev.totalStudents - newYes - newNo,
      };
    });

    setStudentStats((prev: StudentStats) => ({
      ...prev,
      sustainabilityScore: prev.sustainabilityScore + 10,
      wasteSavedKg: prev.wasteSavedKg + (willEat ? 0 : 0.4),
    }));
  };

  const logDailyWaste = (kg: number) => {
    setWasteData((prev: WasteDataPoint[]) => [
      ...prev,
      { day: 'Today', wasteKg: Number(kg), attendance: adminMealStats.confirmedYes + 10 },
    ]);
  };

  const contextValue: DataContextValue = {
    studentStats,
    upcomingMeal,
    adminMealStats,
    wasteData,
    confirmMeal,
    logDailyWaste,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
}

export const useData = (): DataContextValue => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
