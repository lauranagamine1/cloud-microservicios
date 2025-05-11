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
        resp = requests.get("http://localhost:8000/books")
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
        resp = requests.get("http://localhost:8000/books")
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail="No se pudo obtener la lista de libros")
        return resp.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", summary="Registrar nuevo libro")
def crear_libro(libro: LibroNuevo, admin=Depends(require_admin)):
    try:
        response = requests.post("http://localhost:8000/books", json=libro.model_dump())

        if response.status_code not in (200, 201):
            raise HTTPException(status_code=response.status_code, detail="Error al crear el libro")

        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/{id}", summary="Obtener un libro por id")
def get_book(id: int, user=Depends(require_user)):
    try:
        # ← usa f-string para que el {id} sea sustituido
        resp = requests.get(f"http://localhost:8000/books/{id}")
        if resp.status_code == 404:
            raise HTTPException(404, "Libro no encontrado")
        resp.raise_for_status()
        return resp.json()
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, detail=str(e))

@router.get("/", summary="Listar libros paginados")
def listar_libros(
    page: int = Query(1, ge=1, description="Número de página"),
    size: int = Query(10, ge=1, le=100, description="Tamaño de página"),
    search: str = Query("", description="Filtro por título o autor"),
    user=Depends(require_user)
):
    try:
        resp = requests.get("http://localhost:8000/books")
        resp.raise_for_status()
        todos = resp.json()

        # Filtrar según disponibilidad y búsqueda
        if user["rol"] != "admin":
            todos = [b for b in todos if b.get("quantity", 0) > 0]
        if search:
            q = search.lower()
            todos = [
                b for b in todos
                if q in b.get("title","").lower()
                or q in b.get("author",{}).get("name","").lower()
            ]

        total = len(todos)
        start = (page - 1) * size
        end = start + size
        page_items = todos[start:end]

        return {
            "total": total,
            "page": page,
            "size": size,
            "items": page_items
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))