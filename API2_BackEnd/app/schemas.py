from pydantic import BaseModel
from typing import Optional, List
from datetime import date

class AuthorBase(BaseModel):
    name: str

class AuthorCreate(AuthorBase):
    pass

class Author(AuthorBase):
    id: int
    class Config:
        orm_mode = True

class BookBase(BaseModel):
    title: str
    author_id: int
    quantity: int
    published_year: Optional[int] = None 

class BookCreate(BookBase):
    pass

class Book(BookBase):
    id: int
    author: Author
    class Config:
        orm_mode = True

