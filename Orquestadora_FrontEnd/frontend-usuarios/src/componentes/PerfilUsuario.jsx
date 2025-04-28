import React, { useState, useEffect } from 'react';

function PerfilUsuario() {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);

    // Aqui fijas el ID de usuario por ahora
    const idUsuario = 2; // ⚡ luego lo haremos dinámico (por ejemplo después de loguearse)

    useEffect(() => {
        async function fetchUsuario() {
            try {
                const respuesta = await fetch(`http://localhost:8000/users/${idUsuario}`);
                if (respuesta.ok) {
                    const data = await respuesta.json();
                    setUsuario(data);
                } else {
                    setError("No se pudo cargar la información del usuario.");
                }
            } catch (err) {
                setError("Error de conexión: " + err.message);
            }
        }
        fetchUsuario();
    }, []);

    if (error) {
        return <div className="alert alert-danger mt-5">{error}</div>;
    }

    if (!usuario) {
        return <div className="mt-5">Cargando perfil...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Mi Perfil</h2>
            <div className="card mt-4 p-4">
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                <p><strong>Dirección:</strong> {usuario.direccion}</p>
                <p><strong>Distrito:</strong> {usuario.distrito}</p>
                <p><strong>Departamento:</strong> {usuario.departamento}</p>
            </div>
        </div>
    );
}

export default PerfilUsuario;
