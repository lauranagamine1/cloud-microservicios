# --- schemas/prestamo_schema.py ---
from pydantic import BaseModel

class RentRequest(BaseModel):
    user_id: str
    book_id: int

class DevolucionRequest(BaseModel):
    loan_id: str
    book_id: int