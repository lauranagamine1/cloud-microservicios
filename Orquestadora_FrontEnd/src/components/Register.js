import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    distrito: '',
    departamento: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9000/users', form);
      navigate('/login');
    } catch (err) {
      setError('Error al registrar usuario');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input type="text" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Teléfono</label>
          <input type="text" name="telefono" className="form-control" value={form.telefono} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Dirección</label>
          <input type="text" name="direccion" className="form-control" value={form.direccion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Distrito</label>
          <input type="text" name="distrito" className="form-control" value={form.distrito} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Departamento</label>
          <input type="text" name="departamento" className="form-control" value={form.departamento} onChange={handleChange} />
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
