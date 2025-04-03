"""Creating Payments table

Revision ID: f9c6b60921d6
Revises: b6cc6ca5a78e
Create Date: 2025-04-03 03:33:05.517160

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f9c6b60921d6'
down_revision = 'b6cc6ca5a78e'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('payments',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('from_user_id', sa.Integer(), sa.ForeignKey('users.id')),
        sa.Column('to_user_id', sa.Integer(), sa.ForeignKey('users.id')),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('date', sa.DateTime(), nullable=False),
        sa.Column('description', sa.String(255), nullable=False),
    )


def downgrade():
    op.drop_table('payments')
