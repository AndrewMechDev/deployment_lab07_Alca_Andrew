import React from 'react';

const Home = () => {
  return (
    <div className="center-content">
      <div className="glass glass-panel" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h1>Portal de Accesos - Lab 07</h1>
        <p>
          Plataforma central para la gestión de usuarios y validación de credenciales. 
          El acceso está restringido según los roles asignados en el sistema.
        </p>
        <br />
        <p>Por favor, ingresa con tu cuenta para continuar.</p>
      </div>
    </div>
  );
};

export default Home;
