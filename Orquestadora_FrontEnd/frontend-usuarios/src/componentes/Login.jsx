import React, { useState } from 'react';

function Login() {
    const [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    });

    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredenciales((prevCredenciales) => ({
            ...prevCredenciales,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await fetch('http://localhost:8000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credenciales)
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                // Guardar el token en localStorage
                localStorage.setItem('access_token', data.access_token);

                setMensaje('Login exitoso. Token guardado.');
                // Opcional: redirigir o mostrar opciones
            } else {
                setMensaje('Error de login: ' + (data.error || 'Credenciales invalidas'));
            }
        } catch (error) {
            setMensaje('Error de conexión: ' + error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Login</h2>
            {mensaje && <div className="alert alert-info">{mensaje}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={credenciales.email} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" value={credenciales.password} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
        </div>
    );
}

export default Login;
