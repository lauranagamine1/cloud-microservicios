
# 📚 Sistema de Gestión de Bibliotecas - Arquitectura de Microservicios

Este proyecto implementa un sistema de gestión de bibliotecas con arquitectura de microservicios. Utiliza **Java Spring Boot**, **FastAPI**, **Node.js** y un **frontend en React** para ofrecer un sistema robusto, seguro y escalable.

---

## 🏗 Arquitectura General

```plaintext
[ React Frontend (localhost:3000) ]
        ↓ (Axios / fetch)
[ API Orquestadora (FastAPI - localhost:8000) ]
        ↓ (requests)
 ┌──────────────────────┬─────────────────────┬──────────────────────┐
 │ Microservicio Java   │ Microservicio Libros│ Microservicio Prést. │
 │ Spring Boot + MySQL  │ FastAPI + PostgreSQL│ Node.js + MongoDB    │
 └──────────────────────┴─────────────────────┴──────────────────────┘
```

---

## 🚀 Tecnologías utilizadas

### 🧩 Microservicio de Usuarios (Java - Spring Boot)

- **Lenguaje:** Java
- **Framework:** Spring Boot
- **Base de datos:** MySQL
- **ORM:** Spring Data JPA
- **Servidor:** Tomcat embebido
- **Hash de contraseñas:** bcrypt
- **Validaciones:**
  - `email` único
  - Password encriptada

**Endpoints:**

| Método | Ruta                          | Descripción                          |
|--------|-------------------------------|--------------------------------------|
| POST   | `/users`                      | Crear usuario                        |
| GET    | `/users/{id}`                 | Obtener usuario por ID               |
| PUT    | `/users/{id}`                 | Actualizar datos personales          |
| DELETE | `/users/{id}`                 | Eliminar usuario                     |
| GET    | `/users`                      | Listar usuarios (para admin)         |
| GET    | `/users/buscar_por_email/{e}` | Buscar por email                     |

---

### 📘 Microservicio de Libros (Python - FastAPI)

- **Lenguaje:** Python
- **Framework:** FastAPI
- **Base de datos:** PostgreSQL
- **ORM:** SQLAlchemy
- **Endpoints:**

| Método | Ruta                    | Descripción                         |
|--------|-------------------------|-------------------------------------|
| GET    | `/books`                | Listar todos los libros             |
| GET    | `/books/{id}`           | Ver detalle de libro                |
| PUT    | `/books/rent/{id}`      | Reducir stock por préstamo          |
| PUT    | `/books/return/{id}`    | Aumentar stock al devolver libro    |

---

### 📚 Microservicio de Préstamos (Node.js + Express)

- **Lenguaje:** JavaScript
- **Framework:** Express.js
- **Base de datos:** MongoDB
- **Endpoints:**

| Método | Ruta                          | Descripción                              |
|--------|-------------------------------|------------------------------------------|
| POST   | `/loans`                      | Registrar nuevo préstamo                 |
| GET    | `/loans/{id}`                 | Obtener préstamo por ID                  |
| GET    | `/loans/user/{user_id}`       | Obtener préstamos de un usuario          |
| GET    | `/loans/user/{user_id}/active`| Ver solo préstamos activos               |
| PUT    | `/loans/{id}`                 | Cambiar estado del préstamo (`returned`) |

---

### 🧠 API Orquestadora (FastAPI)

- **Lenguaje:** Python
- **Framework:** FastAPI
- **Librerías clave:** bcrypt, PyJWT, requests
- **Responsabilidades:**
  - Crear usuarios orquestando hacia Spring Boot
  - Login con validación de contraseña y generación de JWT
  - Rutas protegidas según rol (`admin`, `usuario`)
  - Préstamos y devoluciones (consulta + coordinación)

**Endpoints principales:**

| Método | Ruta                        | Descripción                                 |
|--------|-----------------------------|---------------------------------------------|
| POST   | `/users/`                   | Crear usuario                               |
| POST   | `/users/login`             | Iniciar sesión y obtener JWT                |
| GET    | `/users/{id}`              | Obtener perfil (requiere token válido)      |
| POST   | `/prestamos/rentar`        | Crear un préstamo                           |
| PUT    | `/prestamos/devolver`      | Devolver un préstamo                        |
| GET    | `/prestamos/activos/{id}`  | Ver préstamos activos del usuario           |
| GET    | `/libros/`                 | Listar libros disponibles (con filtro por rol) |

---

## 💻 Frontend (React)

- **Framework:** React con Bootstrap
- **Autenticación:** JWT en `localStorage`
- **Navegación protegida:** Rutas privadas usando `PrivateRoute`
- **Librerías:** `axios`, `react-router-dom`, `jwt-decode`

**Componentes principales:**

| Componente         | Función                                   |
|--------------------|--------------------------------------------|
| `Register`         | Registro de nuevos usuarios                |
| `Login`            | Inicio de sesión                           |
| `Catalog`          | Búsqueda de libros, ver stock, pedir préstamo |
| `PerfilUsuario`    | Mostrar datos personales + préstamos activos |
| `MyLoans`          | Historial de préstamos y devoluciones       |
| `Navbar`           | Navegación + cerrar sesión                  |

---

## ✅ Requisitos de Contraseña

- Al menos 6 caracteres
- Una letra mayúscula
- Un número

---

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Verificación de roles en la orquestadora para restringir acceso
- JWT firmado con secreto (`HS256`)

---

## 📂 Estructura de Carpetas

```
project-root/
│
├── orquestadora/               # API FastAPI (central)
├── usuarios_java/              # Spring Boot (Java)
├── libros_fastapi/             # Microservicio libros (Python)
├── prestamos_node/             # Microservicio préstamos (Node.js)
├── orquestadora_frontend/      # React App
└── README.md
```

---


