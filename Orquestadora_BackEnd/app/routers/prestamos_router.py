# --- routers/prestamos_router.py ---
from fastapi import APIRouter, HTTPException, Depends
import requests
from datetime import date, timedelta
from app.utils.auth import require_user
from app.schemas.prestamos_schema import RentRequest, DevolucionRequest

router = APIRouter(
    prefix="/prestamos",
    tags=["prestamos"]
)

@router.post("/rentar", dependencies=[Depends(require_user)])
def rent_book(data: RentRequest):
    resp = requests.get(f"http://localhost:3000/loans/user/{data.user_id}/active")
    if resp.status_code != 200:
        raise HTTPException(status_code=500, detail="Error consultando prestamos activos")
    prestamos_activos = resp.json()
    if len(prestamos_activos) >= 3:
        raise HTTPException(status_code=400, detail="El usuario ya tiene 3 prestamos activos")

    libro_resp = requests.get(f"http://localhost:8000/books/{data.book_id}")
    if libro_resp.status_code != 200:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    libro = libro_resp.json()
    if libro["quantity"] <= 0:
        raise HTTPException(status_code=400, detail="No hay ejemplares disponibles")

    nuevo_prestamo = {
        "user_id": data.user_id,
        "book_id": data.book_id,
        "loan_date": str(date.today()),
        "return_date": str(date.today() + timedelta(days=7)),
        "status": "active"
    }
    r = requests.post("http://localhost:3000/loans", json=nuevo_prestamo)
    if r.status_code != 201:
        raise HTTPException(status_code=500, detail="No se pudo registrar el prestamo")

    resp2 = requests.put(f"http://localhost:8000/books/rent/{data.book_id}")
    if resp2.status_code != 200:
        raise HTTPException(status_code=500, detail="No se pudo actualizar el stock del libro")

    return {"message": "Libro rentado correctamente"}


@router.put("/devolver", summary="Devolver un libro", dependencies=[Depends(require_user)])
def devolver_libro(data: DevolucionRequest):
    resp_get = requests.get(f"http://localhost:3000/loans/{data.loan_id}")
    if resp_get.status_code != 200:
        raise HTTPException(status_code=404, detail="Prestamo no encontrado")

    loan = resp_get.json()
    if loan["status"] == "returned":
        raise HTTPException(status_code=400, detail="Este prestamo ya fue devuelto")

    resp = requests.put(f"http://localhost:3000/loans/{data.loan_id}", json={"status": "returned"})
    if resp.status_code != 200:
        raise HTTPException(status_code=500, detail="Error al actualizar el prestamo")

    resp2 = requests.put(f"http://localhost:8000/books/return/{data.book_id}")
    if resp2.status_code != 200:
        raise HTTPException(status_code=500, detail="Error al actualizar el libro")

    return {"message": "Libro devuelto correctamente"}


@router.get("/activos/{user_id}", summary="Prestamos activos por usuario", dependencies=[Depends(require_user)])
def prestamos_activos(user_id: str):
    resp = requests.get(f"http://localhost:3000/loans/user/{user_id}/active")
    if resp.status_code != 200:
        raise HTTPException(status_code=500, detail="No se pudieron obtener los prestamos")
    return resp.json()