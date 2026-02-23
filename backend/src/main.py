from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import api_router
from .core.config import settings
from .core.logging import setup_logging
from .core.db import init_db

setup_logging()

app = FastAPI(
    title="Course Companion Backend",
    description="Deterministic backend for Course Companion FTE (Zero-Backend-LLM)",
    version="1.0.0",
)

@app.on_event("startup")
def on_startup():
    # Import all models so SQLModel.metadata knows about them before create_all
    from .models import base, premium  # noqa: F401
    init_db()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for deployment (Vercel + local)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health")
def health_check():
    return {"status": "ok", "zero_llm_compliant": True}

@app.get("/debug-db")
def debug_db():
    from .core.db import engine
    from sqlalchemy import text, inspect
    try:
        with engine.connect() as conn:
            inspector = inspect(engine)
            tables = inspector.get_table_names()
            return {"status": "connected", "tables": tables}
    except Exception as e:
        return {"status": "error", "detail": str(e)}
