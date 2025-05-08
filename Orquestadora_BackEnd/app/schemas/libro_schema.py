from pydantic import BaseModel, Field
from typing import Optional

class LibroNuevo(BaseModel):
    title: str = Field(..., min_length=1)
    author_id: int = Field(..., gt=0)
    quantity: int = Field(..., ge=0)
    published_year: Optional[int] = Field(None, ge=1000, le=2100)
