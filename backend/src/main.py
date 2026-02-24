from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .api.routes import api_router
from .core.config import settings
from .core.logging import setup_logging
from .core.db import init_db
import traceback

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

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc), "type": type(exc).__name__, "trace": traceback.format_exc()[-1000:]}
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
