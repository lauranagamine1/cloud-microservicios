
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/users/${userId}`);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/catalog'); 
    } catch (err) {
      setError('Usuario no encontrado');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">ID de Usuario</label>
          <input
            type="text"
            className="form-control"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Entrar</button>
        <p className="mt-3">
          ¿No tienes cuenta? <a href="/register">Registrate acá</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
