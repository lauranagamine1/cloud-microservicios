import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyLoans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchLoans = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/users/${user.id}/loans`);
      setLoans(res.data);
    } catch (err) {
      console.error('Error al obtener préstamos', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Mis Préstamos</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : loans.length === 0 ? (
        <p>No tenés préstamos registrados.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID del Préstamo</th>
              <th>Libro</th>
              <th>Fecha</th>
              <th>Devuelto</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.book_title || loan.book?.title}</td>
                <td>{loan.date || 'Fecha no disponible'}</td>
                <td>{loan.returned ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyLoans;
