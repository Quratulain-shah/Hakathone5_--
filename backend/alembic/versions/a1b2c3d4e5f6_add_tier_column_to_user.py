"""add tier column to user

Revision ID: a1b2c3d4e5f6
Revises: 5b267234d85a
Create Date: 2026-02-17 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, None] = '5b267234d85a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('user', sa.Column('tier', sa.String(), server_default='free', nullable=False))


def downgrade() -> None:
    op.drop_column('user', 'tier')
