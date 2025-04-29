import React, { useState } from 'react';

function CrearUsuario() {
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
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

    // Validar la contraseña antes de enviar
    const validarPassword = (password) => {
        const tieneMayuscula = /[A-Z]/.test(password);
        const tieneNumero = /[0-9]/.test(password);
        const longitudValida = password.length >= 6;
        return tieneMayuscula && tieneNumero && longitudValida;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarPassword(usuario.password)) {
            setMensaje('La contraseña debe tener al menos 6 caracteres, una letra mayúscula y un número.');
            return;
        }

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
                    password: '',
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
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" value={usuario.password} onChange={handleChange} required />
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
