import { useState } from 'react';
import { searchBooks } from '../services/api';

function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await searchBooks(query);
    setResults(data);
  };

  const handleBorrow = async (bookId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return alert('Primero debes registrarte o ingresar tu ID');
    const res = await fetch('http://localhost:9000/api/borrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, bookId })
    });
    const json = await res.json();
    alert('Préstamo realizado');
  };

  return (
    <div>
      <h2>Buscar libros</h2>
      <form onSubmit={handleSearch} className="mb-3">
        <input type="text" className="form-control" placeholder="Nombre o autor" value={query} onChange={(e) => setQuery(e.target.value)} />
      </form>

      {results.map(book => (
        <div key={book.id} className="card mb-2">
          <div className="card-body">
            <h5>{book.title}</h5>
            <p>{book.author}</p>
            <button className="btn btn-primary" onClick={() => handleBorrow(book.id)}>Pedir préstamo</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
