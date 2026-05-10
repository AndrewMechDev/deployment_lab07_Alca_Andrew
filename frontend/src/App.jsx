import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // Prevenir render antes de leer localStorage

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/user" />} 
          />
          <Route 
            path="/user" 
            element={user ? <User /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
