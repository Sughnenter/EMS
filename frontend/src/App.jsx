import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import ProfilePage from "./pages/profile.jsx";
import TaskPage from "./pages/tasks.jsx";
import AttendancePage from "./pages/AdminAttendance.jsx";
import LeavePage from "./pages/LeavePage.jsx";
import AdminTaskAssignPage from "./pages/AssignTask.jsx";
import AdminEmployeeDetailPage from "./pages/EmployeeDetail.jsx";
import AdminLeaveRequestsPage from "./pages/AdminLeaveRequests.jsx";
import AdminAttendancePage from "./pages/AdminAttendance.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.is_staff || user?.is_superuser;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave"
          element={
            <ProtectedRoute>
              <LeavePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute>
              {isAdmin ? <AttendancePage /> : <h2>Access Denied</h2>}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/task-assign"
          element={
            <ProtectedRoute>
              {isAdmin ? <AdminTaskAssignPage /> : <h2>Access Denied</h2>}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employees/:id"
          element={
            <ProtectedRoute>
              {isAdmin ? <AdminEmployeeDetailPage /> : <h2>Access Denied</h2>}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/leave-requests"
          element={
            <ProtectedRoute>
              {isAdmin ? <AdminLeaveRequestsPage /> : <h2>Access Denied</h2>}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/attendance-summary"
          element={
            <ProtectedRoute>
              {isAdmin ? <AdminAttendancePage /> : <h2>Access Denied</h2>}
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
