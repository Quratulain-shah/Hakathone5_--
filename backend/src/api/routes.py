from fastapi import APIRouter
from . import courses, chapters, quizzes, progress, auth, search, users, notes, bookmarks

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(courses.router, prefix="/courses", tags=["courses"])
api_router.include_router(chapters.router, prefix="/chapters", tags=["chapters"])
api_router.include_router(quizzes.router, prefix="/quizzes", tags=["quizzes"])
api_router.include_router(progress.router, prefix="/progress", tags=["progress"])
api_router.include_router(search.router, prefix="/search", tags=["search"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(notes.router, prefix="/notes", tags=["notes"])
api_router.include_router(bookmarks.router, prefix="/bookmarks", tags=["bookmarks"])

from .premium import assessments, adaptive, chat
from .admin import analytics

api_router.include_router(assessments.router, prefix="/premium", tags=["premium"])
api_router.include_router(adaptive.router, prefix="/premium", tags=["premium"])
api_router.include_router(chat.router, prefix="/premium", tags=["premium"])
api_router.include_router(analytics.router, prefix="/admin", tags=["admin"])
