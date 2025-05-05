import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users', form);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/catalog');
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success">Registrarse</button>
        <p className="mt-3">
          ¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
