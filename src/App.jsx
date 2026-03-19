import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
// Assuming pages will be tracked here soon.
import StudentApp from "./pages/StudentApp";
import AdminDashboard from "./pages/AdminDashboard";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/student" replace />} />
            <Route path="student/*" element={<StudentApp />} />
            <Route path="admin/*" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
