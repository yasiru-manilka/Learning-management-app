import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { PaperProvider } from './context/PaperContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EnrollmentPage from './pages/EnrollmentPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboardPage from './pages/student/DashboardPage';
import StudentPapersPage from './pages/student/PapersPage';
import StudentProfilePage from './pages/student/ProfilePage';
import AdminDashboardPage from './pages/admin/DashboardPage';
import AdminPapersPage from './pages/admin/PapersPage';
import AdminStudentsPage from './pages/admin/StudentsPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth guard component
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            {/* Public routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/enrollment" element={<EnrollmentPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Student routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route element={<DashboardLayout role="student" />}>
                <Route path="/student/dashboard" element={<StudentDashboardPage />} />
                <Route path="/student/papers" element={<StudentPapersPage />} />
                <Route path="/student/profile" element={<StudentProfilePage />} />
              </Route>
            </Route>

            {/* Admin routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route element={<DashboardLayout role="admin" />}>
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/papers" element={<AdminPapersPage />} />
                <Route path="/admin/students" element={<AdminStudentsPage />} />
              </Route>
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;