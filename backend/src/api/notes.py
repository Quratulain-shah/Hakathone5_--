from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, and_
from ..core.db import get_session
from ..models.base import Note, User
from ..api.deps import get_current_user
from datetime import datetime

from pydantic import BaseModel

router = APIRouter()


class NoteCreate(BaseModel):
    content: str
    chapter_slug: str


class NoteUpdate(BaseModel):
    content: str
    chapter_slug: str


@router.get("/{chapter_slug}")
def get_note(
    chapter_slug: str,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    note = session.exec(
        select(Note).where(
            and_(Note.user_id == user.id, Note.chapter_slug == chapter_slug)
        )
    ).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return {
        "id": str(note.id),
        "content": note.content,
        "chapter_slug": note.chapter_slug,
        "created_at": note.created_at.isoformat(),
        "updated_at": note.updated_at.isoformat(),
    }


@router.post("/")
def create_note(
    request: NoteCreate,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    # Check if note already exists for this user + chapter
    existing = session.exec(
        select(Note).where(
            and_(Note.user_id == user.id, Note.chapter_slug == request.chapter_slug)
        )
    ).first()
    if existing:
        # Update instead of creating duplicate
        existing.content = request.content
        existing.updated_at = datetime.utcnow()
        session.add(existing)
        session.commit()
        session.refresh(existing)
        return {
            "id": str(existing.id),
            "content": existing.content,
            "chapter_slug": existing.chapter_slug,
            "status": "updated",
        }

    note = Note(
        user_id=user.id,
        chapter_slug=request.chapter_slug,
        content=request.content,
    )
    session.add(note)
    session.commit()
    session.refresh(note)
    return {
        "id": str(note.id),
        "content": note.content,
        "chapter_slug": note.chapter_slug,
        "status": "created",
    }


@router.put("/{chapter_slug}")
def update_note(
    chapter_slug: str,
    request: NoteUpdate,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    note = session.exec(
        select(Note).where(
            and_(Note.user_id == user.id, Note.chapter_slug == chapter_slug)
        )
    ).first()
    if not note:
        # Create if it doesn't exist (upsert behavior)
        note = Note(
            user_id=user.id,
            chapter_slug=chapter_slug,
            content=request.content,
        )
    else:
        note.content = request.content
        note.updated_at = datetime.utcnow()

    session.add(note)
    session.commit()
    session.refresh(note)
    return {
        "id": str(note.id),
        "content": note.content,
        "chapter_slug": note.chapter_slug,
        "status": "updated",
    }
