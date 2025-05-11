// src/components/Catalog.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const ITEMS_PER_PAGE = 9;

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;
  const rol = user?.rol;

  const fetchBooks = async (q = '') => {
    setLoading(true);
    try {
      // Llamada a la orquestadora paginada si quieres backend paging,
      // o bien aquí traes todos y paginas en frontend:
      const res = await axios.get(`http://localhost:9000/libros/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let data = res.data.items ?? res.data; // si tu backend devuelve { items, total, ... }
      // Si trajo items, usamos eso; si no, asumimos lista completa

      // Filtrado local por búsqueda
      if (q) {
        const ql = q.toLowerCase();
        data = data.filter(book =>
          book.title.toLowerCase().includes(ql) ||
          book.author.name.toLowerCase().includes(ql)
        );
      }
      // Solo disponibles para usuarios no-admin
      if (rol !== 'admin') {
        data = data.filter(book => book.quantity > 0);
      }

      setBooks(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      setPage(1);
    } catch (err) {
      console.error('Error al obtener libros', err);
      alert('Error al cargar catálogo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    fetchBooks(query);
  };

  const handleBorrow = async bookId => {
    try {
      await axios.post(
        'http://localhost:9000/prestamos/rentar',
        { user_id: String(user.id), book_id: bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Préstamo solicitado con éxito');
      fetchBooks(query);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || 'Error al solicitar préstamo');
    }
  };

  // Paginación en cliente
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentBooks = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-4">
        <img src="/logo.png" alt="Logo" style={{ height: '50px', marginRight: '15px' }} />
        <h2 className="text-primary">Catálogo de Libros</h2>
      </div>

      <div className="mb-3">
        <button className="btn btn-outline-primary me-2" onClick={() => window.location.href = '/perfil'}>
          Ir a Mi Perfil
        </button>
        <button className="btn btn-outline-secondary" onClick={() => window.location.href = '/loans'}>
          Ver Mis Préstamos
        </button>
      </div>

      <p>Bienvenido, {user?.sub || 'Usuario'}</p>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por título o autor"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="submit">Buscar</button>
        </div>
      </form>

      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <>
          <div className="row">
            {currentBooks.map(book => (
              <div key={book.id} className="col-md-4 mb-3">
                <div className="card h-100 p-3">
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Autor: {book.author.name}</h6>
                    <p className="card-text">Cantidad disponible: {book.quantity}</p>
                    {rol !== 'admin' && (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleBorrow(book.id)}
                        disabled={book.quantity <= 0}
                      >
                        Pedir préstamo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles de paginación */}
          <div className="d-flex justify-content-center align-items-center mt-4">
            <button
              className="btn btn-outline-secondary me-2"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              ← Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button
              className="btn btn-outline-secondary ms-2"
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  );
}