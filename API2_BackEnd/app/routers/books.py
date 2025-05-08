from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import SessionLocal
from typing import List

router = APIRouter(prefix="/books", tags=["books"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Book)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    if not crud.get_author(db, book.author_id):
        raise HTTPException(400, "Author does not exist")
    return crud.create_book(db, book)

@router.get("/", response_model=List[schemas.Book])
def list_books(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_books(db, skip, limit)

@router.get("/{book_id}", response_model=schemas.Book)
def read_book(book_id: int, db: Session = Depends(get_db)):
    db_book = crud.get_book(db, book_id)
    if not db_book:
        raise HTTPException(404, "Book not found")
    return db_book

@router.put("/{book_id}", response_model=schemas.Book)
def update_book(book_id: int, book: schemas.BookCreate, db: Session = Depends(get_db)):
    updated = crud.update_book(db, book_id, book)
    if not updated:
        raise HTTPException(404, "Book not found")
    return updated

@router.delete("/{book_id}", response_model=schemas.Book)
def delete_book(book_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_book(db, book_id)
    if not deleted:
        raise HTTPException(404, "Book not found")
    return deleted

@router.get("/search", response_model=List[schemas.Book])
def search_books(q: str, db: Session = Depends(get_db)):
    return crud.search_books(db, q)

@router.get("/available", response_model=List[schemas.Book])
def get_available_books(db: Session = Depends(get_db)):
    books = crud.get_available_books(db)
    if not books:
        raise HTTPException(status_code=404, detail="No hay libros disponibles")
    return books

@router.put("/return/{book_id}", response_model=schemas.Book)
def return_book(book_id: int, db: Session = Depends(get_db)):
    returned = crud.return_book(db, book_id)
    if not returned:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    return returned

@router.put("/rent/{book_id}")
def rent_book(book_id: int, db: Session = Depends(get_db)):
    book = crud.get_book(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    if book.quantity <= 0:
        raise HTTPException(status_code=400, detail="No hay stock disponible")
    book.quantity -= 1
    db.commit()
    db.refresh(book)
    return book