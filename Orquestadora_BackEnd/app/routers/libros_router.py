from fastapi import APIRouter, HTTPException, Depends, Query
import requests
from app.schemas.libro_schema import LibroNuevo
from app.utils.auth import require_user, require_admin 

router = APIRouter(
    prefix="/libros",
    tags=["libros"]
)

@router.get("/", summary="Listar libros", description="Devuelve libros filtrados por título o autor. Si no es admin, solo disponibles.")
def listar_libros(search: str = Query(default="", description="Buscar por título o autor"), user=Depends(require_user)):
    try:
        resp = requests.get("http://localhost:8001/books")
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail="No se pudo obtener la lista de libros")

        libros = resp.json()

        if user["rol"] != "admin":
            libros = [libro for libro in libros if libro.get("quantity", 0) > 0]

        if search:
            libros = [
                libro for libro in libros
                if search.lower() in libro.get("title", "").lower() or
                   search.lower() in libro.get("author", {}).get("name", "").lower()
            ]

        return libros
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/admin", summary="Listar todos los libros (admin)", description="Devuelve todos los libros, incluyendo los agotados")
def listar_libros_admin(user=Depends(require_admin)):
    try:
        resp = requests.get("http://localhost:8001/books")
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail="No se pudo obtener la lista de libros")
        return resp.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", summary="Registrar nuevo libro")
def crear_libro(libro: LibroNuevo, admin=Depends(require_admin)):
    try:
        response = requests.post("http://localhost:8001/books", json=libro.model_dump())

        if response.status_code not in (200, 201):
            raise HTTPException(status_code=response.status_code, detail="Error al crear el libro")

        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
