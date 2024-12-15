import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLogin from "./Auth/AdminLogin";
import UserLogin from "./pages/UserLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CreateUser from "./pages/CreateUser";
import CreateTask from "./pages/CreateTask";
import DisplayTasks from "./pages/DisplayTasks";
import DisplayUsers from "./pages/DisplayUsers";
import EditTask from "./pages/EditTask";
import EditUser from "./pages/EditUser";
import LoginChoice from './pages/LoginChoice';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginChoice />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/dashboard" element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        } />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/create-user"
          element={
            <PrivateRoute>
              <CreateUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/create-task"
          element={
            <PrivateRoute>
              <CreateTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/show-tasks"
          element={
            <PrivateRoute>
              <DisplayTasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/show-users"
          element={
            <PrivateRoute>
              <DisplayUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-task/:id"
          element={
            <PrivateRoute>
              <EditTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-user/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
