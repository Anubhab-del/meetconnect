import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './routes/ProtectedRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MyInterviews from './pages/MyInterviews';
import PracticeResource from './pages/PracticeResource';
import MyProfile from './pages/MyProfile';
import About from './pages/About';
import Readiness from './pages/Readiness';
import Battle from './pages/Battle';
import ResumeAnalyzer from './pages/ResumeAnalyzer';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-interviews" element={<MyInterviews />} />
          <Route path="/practice" element={<PracticeResource />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/readiness" element={<Readiness />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;