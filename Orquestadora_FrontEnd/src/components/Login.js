import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/users/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.access_token);
      navigate('/catalog');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Email o contraseña incorrectos');
      } else {
        setError('Error al iniciar sesión');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary">Entrar</button>
        <p className="mt-3">
          ¿No tienes cuenta? <a href="/register">Regístrate acá</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
