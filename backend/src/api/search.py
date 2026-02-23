from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select
from ..core.db import get_session
from ..models.base import Chapter, Module, Course
from ..services.content import ContentService

router = APIRouter()
content_service = ContentService()


@router.get("")
def search_chapters(
    q: str = Query(..., min_length=1, description="Search keyword"),
    session: Session = Depends(get_session),
):
    """Deterministic, zero-LLM text search across all chapter content."""
    chapters = session.exec(select(Chapter)).all()
    results = []

    for chapter in chapters:
        content = content_service.get_content(chapter.r2_key, db_content=chapter.content)
        if not content:
            continue

        lower_content = content.lower()
        lower_query = q.lower()
        idx = lower_content.find(lower_query)
        if idx == -1:
            # Also check title
            if lower_query not in chapter.title.lower():
                continue
            snippet = chapter.title
        else:
            # Extract snippet around the match
            start = max(0, idx - 80)
            end = min(len(content), idx + len(q) + 80)
            snippet = ("..." if start > 0 else "") + content[start:end] + ("..." if end < len(content) else "")

        # Get course info via module
        module = session.get(Module, chapter.module_id)
        course = session.get(Course, module.course_id) if module else None

        results.append({
            "chapter_title": chapter.title,
            "chapter_slug": chapter.slug,
            "course_title": course.title if course else None,
            "course_slug": course.slug if course else None,
            "snippet": snippet,
        })

    return {"query": q, "count": len(results), "results": results}
