from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, and_
from ..core.db import get_session
from ..models.base import Bookmark, User
from ..api.deps import get_current_user

from pydantic import BaseModel

router = APIRouter()


class BookmarkCreate(BaseModel):
    slug: str
    title: str
    type: str = "lesson"


@router.get("/")
def get_bookmarks(
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    bookmarks = session.exec(
        select(Bookmark).where(Bookmark.user_id == user.id)
    ).all()
    return [
        {
            "id": str(b.id),
            "slug": b.slug,
            "title": b.title,
            "type": b.type,
            "created_at": b.created_at.isoformat(),
        }
        for b in bookmarks
    ]


@router.post("/")
def create_bookmark(
    request: BookmarkCreate,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    # Check if already bookmarked
    existing = session.exec(
        select(Bookmark).where(
            and_(Bookmark.user_id == user.id, Bookmark.slug == request.slug)
        )
    ).first()
    if existing:
        return {
            "id": str(existing.id),
            "slug": existing.slug,
            "title": existing.title,
            "status": "already_exists",
        }

    bookmark = Bookmark(
        user_id=user.id,
        slug=request.slug,
        title=request.title,
        type=request.type,
    )
    session.add(bookmark)
    session.commit()
    session.refresh(bookmark)
    return {
        "id": str(bookmark.id),
        "slug": bookmark.slug,
        "title": bookmark.title,
        "status": "created",
    }


@router.delete("/{slug}")
def delete_bookmark(
    slug: str,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    bookmark = session.exec(
        select(Bookmark).where(
            and_(Bookmark.user_id == user.id, Bookmark.slug == slug)
        )
    ).first()
    if not bookmark:
        raise HTTPException(status_code=404, detail="Bookmark not found")

    session.delete(bookmark)
    session.commit()
    return {"status": "deleted", "slug": slug}
