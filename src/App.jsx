import { Routes, Route, Navigate } from 'react-router-dom';
import StudentDashboardLayout from './components/layout/StudentDashboardLayout';
import StudentDashboardPage from './pages/StudentDashboardPage';
import StudentTimetablePage from './pages/StudentTimetablePage';
import StudentGradesPage from './pages/StudentGradesPage';
import StudentCoursesPage from './pages/StudentCoursesPage';
import StudentAssignmentsPage from './pages/StudentAssignmentsPage';
import StudentAttendancePage from './pages/StudentAttendancePage';
import StudentAnnouncementsPage from './pages/StudentAnnouncementsPage';
import StudentProfilePage from './pages/StudentProfilePage';
import StudentLoginPage from './pages/StudentLoginPage';

export default function App() {
  return (
    <Routes>
      {/* Student Login Route */}
      <Route path="/login" element={<StudentLoginPage />} />

      {/* Student App Layout with Sidebar & Header */}
      <Route element={<StudentDashboardLayout />}>
        <Route path="/" element={<StudentDashboardPage />} />
        <Route path="/timetable" element={<StudentTimetablePage />} />
        <Route path="/courses" element={<StudentCoursesPage />} />
        <Route path="/grades" element={<StudentGradesPage />} />
        <Route path="/assignments" element={<StudentAssignmentsPage />} />
        <Route path="/attendance" element={<StudentAttendancePage />} />
        <Route path="/announcements" element={<StudentAnnouncementsPage />} />
        <Route path="/profile" element={<StudentProfilePage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
