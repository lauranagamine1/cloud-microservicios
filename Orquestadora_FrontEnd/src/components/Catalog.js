import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Catalog() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchBooks = async (q = '') => {
    try {
      const res = await axios.get(`http://localhost:3001/api/search?q=${q}`);
      setBooks(res.data);
    } catch (err) {
      console.error('Error al obtener libros', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(query);
  };

  const handleBorrow = async (bookId) => {
    try {
      const res = await axios.post('http://localhost:3001/api/borrow', {
        user_id: user.id,
        book_id: bookId,
      });

      alert('Préstamo solicitado con éxito');
      fetchBooks(query);
    } catch (err) {
      console.error(err);
      alert('Error al solicitar préstamo');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Catálogo de Libros</h2>
      <p>Bienvenido, {user?.name || 'Usuario'}</p>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por título o autor"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="submit">Buscar</button>
        </div>
      </form>

      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div key={book.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                  <p className="card-text">Cantidad disponible: {book.quantity}</p>
                  <button className="btn btn-primary mt-2" onClick={() => handleBorrow(book.id)}>
                    Pedir préstamo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalog;