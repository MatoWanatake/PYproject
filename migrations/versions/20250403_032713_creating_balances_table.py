"""Creating Balances table

Revision ID: b6cc6ca5a78e
Revises: d2f790a4b456
Create Date: 2025-04-03 03:27:13.742907

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b6cc6ca5a78e'
down_revision = 'd2f790a4b456'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('balances',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id')),
        sa.Column('group_id', sa.Integer(), sa.ForeignKey('groups.id')),
        sa.Column('amount', sa.Float(), nullable=False),
    )


def downgrade():
    op.drop_table('balances')
