import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Tracker from './pages/Tracker';
import Profile from './pages/Profile';
import LentBorrow from './pages/LentBorrow';
import ProtectedRoute from './components/ProtectedRoutes';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/tracker" element={<ProtectedRoute><Tracker /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/lentborrow" element={<ProtectedRoute><LentBorrow /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
