from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import usuarios_router, libros_router, prestamos_router

app = FastAPI(
    title="API Orquestadora - Sistema de Biblioteca",
    description="Administra usuarios, libros y préstamos a través de microservicios",
    version="1.0.0"
)

# CORS para permitir conexión desde tu frontend (S3)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔥 Cambia esto por la URL real de tu frontend S3 cuando lo tengas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios_router.router)
app.include_router(libros_router.router)
app.include_router(prestamos_router.router)

@app.get("/", tags=["root"])
def read_root():
    return {"mensaje": "API Orquestadora corriendo 🚀"}
