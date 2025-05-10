from fastapi import APIRouter, HTTPException, Depends
import requests
from app.schemas.libro_schema import LibroNuevo
from app.utils.auth import require_user, require_admin

router = APIRouter(
    prefix="/libros",
    tags=["libros"]
)

# 🔥 Cambiado al ALB público + PUERTO
LIBROS_API_URL = "http://libros_api:8001/books"

@router.get("/", summary="Listar libros disponibles", description="Devuelve solo libros con cantidad mayor a cero")
def listar_libros_disponibles(user=Depends(require_user)):
    try:
        resp = requests.get(LIBROS_API_URL)
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail="No se pudo obtener la lista de libros")

        libros = resp.json()
        disponibles = [libro for libro in libros if libro.get("quantity", 0) > 0]
        return disponibles
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/admin", summary="Listar todos los libros (admin)", description="Devuelve todos los libros, incluyendo los agotados")
def listar_libros_admin(user=Depends(require_admin)):
    try:
        resp = requests.get(LIBROS_API_URL)
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail="No se pudo obtener la lista de libros")
        return resp.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", summary="Registrar nuevo libro")
def crear_libro(libro: LibroNuevo, admin=Depends(require_admin)):
    try:
        response = requests.post(LIBROS_API_URL, json=libro.model_dump())
        if response.status_code not in (200, 201):
            raise HTTPException(status_code=response.status_code, detail="Error al crear el libro")
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
