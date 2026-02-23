"""add notes and bookmarks tables

Revision ID: f7a8b9c0d1e2
Revises: a1b2c3d4e5f6
Create Date: 2026-02-19 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f7a8b9c0d1e2'
down_revision: Union[str, None] = 'a1b2c3d4e5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'note',
        sa.Column('id', sa.Uuid(), nullable=False),
        sa.Column('user_id', sa.Uuid(), nullable=False),
        sa.Column('chapter_slug', sa.String(), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['user.id']),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_note_user_id'), 'note', ['user_id'], unique=False)
    op.create_index(op.f('ix_note_chapter_slug'), 'note', ['chapter_slug'], unique=False)

    op.create_table(
        'bookmark',
        sa.Column('id', sa.Uuid(), nullable=False),
        sa.Column('user_id', sa.Uuid(), nullable=False),
        sa.Column('slug', sa.String(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('type', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['user.id']),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_bookmark_user_id'), 'bookmark', ['user_id'], unique=False)
    op.create_index(op.f('ix_bookmark_slug'), 'bookmark', ['slug'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_bookmark_slug'), table_name='bookmark')
    op.drop_index(op.f('ix_bookmark_user_id'), table_name='bookmark')
    op.drop_table('bookmark')
    op.drop_index(op.f('ix_note_chapter_slug'), table_name='note')
    op.drop_index(op.f('ix_note_user_id'), table_name='note')
    op.drop_table('note')
