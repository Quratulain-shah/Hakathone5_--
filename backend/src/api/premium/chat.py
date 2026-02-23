from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from ...services.llm import LLMService
from ...services.cost import CostTracker
from ...models.premium import FeatureType
from ...models.base import User, Progress, Chapter, Module, Course
from ...core.db import get_session
from .deps import get_current_premium_user, check_rate_limit
from sqlmodel import Session, select

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    context: str

class ChatResponse(BaseModel):
    response: str


def _build_progress_summary(session: Session, user: User) -> str:
    """Build a text summary of the user's progress for the LLM context."""
    courses = session.exec(select(Course)).all()
    if not courses:
        return "No courses enrolled yet."

    lines = []
    for course in courses:
        modules = session.exec(
            select(Module).where(Module.course_id == course.id).order_by(Module.order_index)
        ).all()
        total = 0
        completed = 0
        chapter_details = []
        for mod in modules:
            chapters = session.exec(
                select(Chapter).where(Chapter.module_id == mod.id).order_by(Chapter.order_index)
            ).all()
            for ch in chapters:
                total += 1
                prog = session.get(Progress, (user.id, ch.id))
                status = "not started"
                score_str = ""
                if prog and prog.is_completed:
                    completed += 1
                    status = "completed"
                    if prog.quiz_score is not None:
                        score_str = f" (quiz score: {prog.quiz_score}%)"
                chapter_details.append(f"  - {ch.title}: {status}{score_str}")

        pct = round((completed / total) * 100) if total else 0
        lines.append(f"Course: {course.title} — {completed}/{total} chapters done ({pct}%)")
        lines.extend(chapter_details)

    return "\n".join(lines)


@router.post("/chat", response_model=ChatResponse)
async def chat_with_tutor(
    request: ChatRequest,
    session: Session = Depends(get_session),
    current_user: User = Depends(check_rate_limit) # Rate limit applies
):
    llm = LLMService()
    try:
        # Build progress context for progress-related questions
        progress_summary = _build_progress_summary(session, current_user)
        enriched_context = (
            f"{request.context}\n\n"
            f"<student_progress>\n{progress_summary}\n</student_progress>"
        )

        response_text, p_tok, c_tok = llm.chat_with_tutor(request.message, enriched_context)

        # Log usage
        CostTracker.log_usage(
            session,
            current_user.id,
            FeatureType.CHAT,
            p_tok,
            c_tok,
            llm.model
        )

        return ChatResponse(response=response_text)
    except Exception as e:
        print(f"Chat Error: {e}")
        raise HTTPException(status_code=500, detail="AI Tutor is temporarily unavailable")
