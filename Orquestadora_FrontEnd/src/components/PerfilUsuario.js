// src/components/PerfilUsuario.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function PerfilUsuario() {
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState(null);
  const [prestamos, setPrestamos] = useState([]);

  const fetchPerfil = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPerfil(res.data);
    } catch (err) {
      console.error('Error al obtener perfil', err);
    }
  };

  const fetchPrestamos = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/prestamos/activos/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrestamos(res.data);
    } catch (err) {
      console.error('Error al obtener prestamos', err);
    }
  };

  useEffect(() => {
    fetchPerfil();
    fetchPrestamos();
  }, []);

  const mostrar = (campo) => {
    return campo && campo.trim() !== '' ? campo : 'No registrado';
  };

  return (
    <div className="container mt-5">
      <h2>Mi Perfil</h2>
      {!perfil ? (
        <p>Cargando perfil...</p>
      ) : (
        <>
          <div className="mb-3">
            <label>Nombre:</label>
            <input type="text" value={mostrar(perfil.nombre)} className="form-control" disabled />
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input type="email" value={mostrar(perfil.email)} className="form-control" disabled />
          </div>
          <div className="mb-3">
            <label>Teléfono:</label>
            <input type="text" value={mostrar(perfil.telefono)} className="form-control" disabled />
          </div>
          <div className="mb-3">
            <label>Dirección:</label>
            <input type="text" value={mostrar(perfil.direccion)} className="form-control" disabled />
          </div>
          <div className="mb-3">
            <label>Distrito:</label>
            <input type="text" value={mostrar(perfil.distrito)} className="form-control" disabled />
          </div>
          <div className="mb-3">
            <label>Departamento:</label>
            <input type="text" value={mostrar(perfil.departamento)} className="form-control" disabled />
          </div>
        </>
      )}

      <button className="btn btn-secondary" onClick={() => navigate('/catalog')}>
        Volver al Catálogo
      </button>

      <hr />
      <h3>Mis Préstamos Activos</h3>
      {prestamos.length === 0 ? (
        <p>No tienes préstamos activos</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Libro</th>
              <th>Prestado</th>
              <th>Devolver antes de</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map((p) => (
              <tr key={p._id}>
                <td>{p.book_id}</td>
                <td>{new Date(p.loan_date).toLocaleDateString()}</td>
                <td>{new Date(p.return_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PerfilUsuario;
