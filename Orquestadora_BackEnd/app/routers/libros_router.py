from fastapi import APIRouter

router = APIRouter(
    prefix="/libros",
    tags=["libros"]
)

@router.get("/", summary="Listar libros", description="En el futuro mostrará la lista de libros disponibles.")
def listar_libros():
    return {"mensaje": "Aqui listarás libros en el futuro 🚀"}
