from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import SessionLocal
from typing import List

router = APIRouter(prefix="/authors", tags=["authors"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Author)
def create_author(author: schemas.AuthorCreate, db: Session = Depends(get_db)):
    if crud.get_author_by_name(db, author.name):
        raise HTTPException(400, "Author already exists")
    return crud.create_author(db, author)

@router.get("/", response_model=List[schemas.Author])
def list_authors(db: Session = Depends(get_db)):
    return crud.get_authors(db)

@router.get("/{author_id}", response_model=schemas.Author)
def read_author(author_id: int, db: Session = Depends(get_db)):
    db_author = crud.get_author(db, author_id)
    if not db_author:
        raise HTTPException(404, "Author not found")
    return db_author

@router.delete("/{author_id}", response_model=schemas.Author)
def delete_author(author_id: int, db: Session = Depends(get_db)):
    db_author = crud.delete_author(db, author_id)
    if not db_author:
        raise HTTPException(status_code=404, detail="Author not found")
    return db_author