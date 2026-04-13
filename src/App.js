import CreateTask from "./pages/CreateTaskPage";
import DashBoard from "./pages/DashBoard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UpateTaskPage from "./pages/UpdateTaskPage";
import Users from "./pages/UsersPage";
import AddUser from "./pages/AddUserPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoutes";
import AdminRoute from "./routes/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes (USER + ADMIN) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/updatetask/:id"
          element={
            <ProtectedRoute>
              <UpateTaskPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Only Routes */}
        <Route
          path="/createtask"
          element={
            <AdminRoute>
              <CreateTask />
            </AdminRoute>
          }
        />

        <Route
          path="/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />

        <Route
          path="/adduser"
          element={
            <AdminRoute>
              <AddUser />
            </AdminRoute>
          }
        />

        {/* Catch all (optional) */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;