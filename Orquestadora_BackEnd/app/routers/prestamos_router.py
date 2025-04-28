from fastapi import APIRouter

router = APIRouter(
    prefix="/prestamos",
    tags=["prestamos"]
)

@router.get("/", summary="Listar prestamos", description="En el futuro mostrará la lista de prestamos realizados.")
def listar_prestamos():
    return {"mensaje": "Aqui listarás prestamos en el futuro 🚀"}
