import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          API<span>Auth</span>
        </Link>
        <div className="navbar-menu">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Inicio</Link>
          
          {!user ? (
            <Link to="/login" className={`nav-link ${isActive('/login')}`}>Login</Link>
          ) : (
            <>
              <Link to="/user" className={`nav-link ${isActive('/user')}`}>Usuario</Link>
              <button onClick={handleLogout} className="nav-btn">
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
