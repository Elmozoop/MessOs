import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  // Global student profile stats
  const [studentStats, setStudentStats] = useState({
    name: "Alex",
    mealsAttended: 42,
    mealsSkipped: 8,
    wasteSavedKg: 12.5,
    sustainabilityScore: 880, // Gamification score
    rank: 4,
  });

  // Today's upcoming meal
  const [upcomingMeal, setUpcomingMeal] = useState({
    id: "m_latest",
    name: "Dinner",
    date: new Date().toISOString().split("T")[0],
    menu: ["Paneer Butter Masala", "Roti", "Dal Tadka", "Rice", "Gulab Jamun"],
    userConfirmed: null, // true (yes), false (no), null (undecided)
    timeRemainingMins: 120, // 2 hours till cooking starts
  });

  // Admin dashboard active meal stats
  const [adminMealStats, setAdminMealStats] = useState({
    totalStudents: 500,
    confirmedYes: 310,
    confirmedNo: 45,
    pending: 145,
    predictionAttending: 415, // AI predicts 415 will actually show up
  });

  // Historical Waste Analytics
  const [wasteData, setWasteData] = useState([
    { day: "Mon", wasteKg: 45, attendance: 420 },
    { day: "Tue", wasteKg: 38, attendance: 450 },
    { day: "Wed", wasteKg: 60, attendance: 390 },
    { day: "Thu", wasteKg: 30, attendance: 460 },
    { day: "Fri", wasteKg: 25, attendance: 480 },
    { day: "Sat", wasteKg: 85, attendance: 310 },
    { day: "Sun", wasteKg: 90, attendance: 290 },
  ]);

  // Handle student meal confirmation
  const confirmMeal = (willEat) => {
    setUpcomingMeal(prev => ({ ...prev, userConfirmed: willEat }));
    
    // Update admin stats real-time mock
    setAdminMealStats(prev => {
      const newYes = willEat ? prev.confirmedYes + 1 : prev.confirmedYes;
      const newNo = !willEat ? prev.confirmedNo + 1 : prev.confirmedNo;
      return {
        ...prev,
        confirmedYes: newYes,
        confirmedNo: newNo,
        pending: prev.totalStudents - newYes - newNo
      };
    });

    // Update student stats
    setStudentStats(prev => ({
      ...prev,
      sustainabilityScore: prev.sustainabilityScore + 10, // points for confirming!
      wasteSavedKg: prev.wasteSavedKg + (willEat ? 0 : 0.4), // mock logic: 400g saved if skipped
    }));
  };

  const logDailyWaste = (kg) => {
    // Add today's log to historical data
    setWasteData(prev => [
      ...prev,
      { day: "Today", wasteKg: Number(kg), attendance: adminMealStats.confirmedYes + 10 }
    ]);
  };

  return (
    <DataContext.Provider value={{
      studentStats,
      upcomingMeal,
      adminMealStats,
      wasteData,
      confirmMeal,
      logDailyWaste
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
