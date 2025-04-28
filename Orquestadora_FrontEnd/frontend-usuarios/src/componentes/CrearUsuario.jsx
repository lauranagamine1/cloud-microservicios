import React, { useState } from 'react';

function CrearUsuario() {
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        distrito: '',
        departamento: '',
        estado: true
    });

    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await fetch('http://localhost:8000/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            if (respuesta.ok) {
                const data = await respuesta.json();
                setMensaje('Usuario creado exitosamente: ' + data.nombre);
                setUsuario({
                    nombre: '',
                    email: '',
                    telefono: '',
                    direccion: '',
                    distrito: '',
                    departamento: '',
                    estado: true
                });
            } else {
                setMensaje('Error al crear usuario');
            }
        } catch (error) {
            setMensaje('Error de conexión: ' + error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Registrar Usuario</h2>
            {mensaje && <div className="alert alert-info">{mensaje}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" value={usuario.nombre} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={usuario.email} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="text" className="form-control" id="telefono" value={usuario.telefono} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="direccion" value={usuario.direccion} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Distrito</label>
                    <input type="text" className="form-control" id="distrito" value={usuario.distrito} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Departamento</label>
                    <input type="text" className="form-control" id="departamento" value={usuario.departamento} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    );
}

export default CrearUsuario;
