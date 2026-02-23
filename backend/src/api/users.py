from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session
from datetime import datetime
from ..core.db import get_session
from ..models.base import User
from .deps import get_current_user

router = APIRouter()


@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": str(current_user.id),
        "email": current_user.email,
        "full_name": current_user.full_name,
        "tier": current_user.tier,
        "is_premium": current_user.has_premium_access,
        "is_admin": current_user.is_admin,
        "streak_count": current_user.streak_count,
        "premium_since": current_user.premium_since.isoformat() if current_user.premium_since else None,
    }


class UpgradeRequest(BaseModel):
    tier: str  # "premium" | "pro" | "team"


@router.post("/upgrade")
def upgrade_user(
    request: UpgradeRequest,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    valid_tiers = ["premium", "pro", "team"]
    if request.tier not in valid_tiers:
        raise HTTPException(status_code=400, detail=f"Invalid tier. Must be one of: {valid_tiers}")

    current_user.tier = request.tier
    current_user.is_premium = True
    if not current_user.premium_since:
        current_user.premium_since = datetime.utcnow()

    session.add(current_user)
    session.commit()
    session.refresh(current_user)

    return {
        "status": "upgraded",
        "tier": current_user.tier,
        "is_premium": current_user.has_premium_access,
        "premium_since": current_user.premium_since.isoformat(),
    }
