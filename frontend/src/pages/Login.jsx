import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const validateForm = () => {
    if (!username || !password) {
      setError('Todos los campos son obligatorios.');
      return false;
    }
    if (username.length < 3) {
      setError('El usuario debe tener al menos 3 caracteres.');
      return false;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.post('/auth/signin', {
        username,
        password,
      });
      // Guardar usuario en el contexto (que también lo guarda en localStorage)
      login(response.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-content">
      <div className="glass glass-panel">
        <h2>Iniciar Sesión</h2>
        {error && <div className="form-global-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>
          
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
