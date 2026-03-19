import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./admin/Dashboard";

export default function AdminDashboard() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
    </Routes>
  );
}
