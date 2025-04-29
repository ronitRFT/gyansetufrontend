import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import TeacherDashBoard from "./components/teacher/TeacherDashBoard";
import TeacherCalendar from "./components/teacher/calender/MainCalenderTeacher";
import Login from "./components/auth/Login";
import Assignment from "./components/teacher/Assignments/AssignmentPage";
import AIAssistantIntegration from "./components/teacher/Assignments/AIGnerate";
import InstituteCalneder from "./components/Institute/calender/MainCalender";
const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/teacherdashboard"
            element={
              user && user.role === "teacher" ? (
                <TeacherDashBoard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/teachercalender"
            element={
              user && user.role === "teacher" ? (
                <TeacherCalendar />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/createassignment"
            element={
              user && user.role === "teacher" ? (
                <Assignment />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/generateassignment"
            element={
              user && user.role === "teacher" ? (
                <AIAssistantIntegration />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              user && user.role === "teacher" ? (
                <Navigate to="/teacherdashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
