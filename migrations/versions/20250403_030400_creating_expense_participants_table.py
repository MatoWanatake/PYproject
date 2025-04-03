"""Creating Expense Participants table

Revision ID: d2f790a4b456
Revises: 8fe3d576b4bb
Create Date: 2025-04-03 03:04:00.250569

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd2f790a4b456'
down_revision = '8fe3d576b4bb'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('expense_participants',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('expense_id', sa.Integer(), sa.ForeignKey('expenses.id')),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id')),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('paid', sa.Boolean(), default=False)
    )


def downgrade():
    op.drop_table('expense_participants')
