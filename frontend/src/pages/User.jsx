import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const User = () => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserContent = async () => {
      try {
        // Determinamos qué endpoint llamar dependiendo del rol del usuario
        let endpoint = '/test/user'; // Ruta por defecto para cualquier logueado
        
        if (user.roles.includes('ROLE_ADMIN')) {
          endpoint = '/test/admin';
        } else if (user.roles.includes('ROLE_MODERATOR')) {
          endpoint = '/test/mod';
        }

        const response = await api.get(endpoint, {
          headers: {
            'x-access-token': user.accessToken, // Enviamos el token en los headers
          },
        });
        setContent(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || 'Error al obtener el contenido protegido.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserContent();
  }, [user]);

  // Formatear los roles para visualización más limpia (ej. quita 'ROLE_')
  const rolesDisplay = user.roles.map(r => r.replace('ROLE_', '')).join(', ');

  return (
    <div className="center-content">
      <div className="glass glass-panel" style={{ maxWidth: '600px' }}>
        <h2>Panel de Usuario</h2>
        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px' }}>
          <p style={{ margin: 0, color: 'var(--text-primary)' }}>
            <strong>Bienvenido, {user.username}!</strong>
          </p>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            <strong>Rol(es):</strong> <span style={{ color: 'var(--accent)' }}>{rolesDisplay}</span>
          </p>
        </div>

        {loading ? (
          <p>Cargando contenido protegido...</p>
        ) : error ? (
          <div className="form-global-error">{error}</div>
        ) : (
          <div style={{ padding: '1.5rem', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Respuesta de la API (Ruta Protegida):</h3>
            <p style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '1.2rem' }}>
              "{content}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
