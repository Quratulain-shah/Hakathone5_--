import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Lesson from './pages/Lesson';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Upgrade from './pages/Upgrade';
import TutorChat from './pages/TutorChat';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course/:slug" element={<Dashboard />} /> {/* Simplified for now */}
          <Route path="/lesson/:slug" element={<Lesson />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/tutor" element={<TutorChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
