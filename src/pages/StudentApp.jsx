import { Routes, Route } from "react-router-dom";
import { StudentDashboard } from "./student/StudentDashboard";

export default function StudentApp() {
  return (
    <Routes>
      <Route index element={<StudentDashboard />} />
    </Routes>
  );
}
