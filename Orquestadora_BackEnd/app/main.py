from fastapi import FastAPI
from app.routers import usuarios_router, libros_router, prestamos_router

app = FastAPI()

# Incluir routers
app.include_router(usuarios_router.router)
app.include_router(libros_router.router)
app.include_router(prestamos_router.router)

@app.get("/")
def read_root():
    return {"mensaje": "API Orquestadora corriendo 🚀"}
