"""Creating Expenses table

Revision ID: 8fe3d576b4bb
Revises: 265f5c952055
Create Date: 2025-04-03 02:52:12.382246

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8fe3d576b4bb'
down_revision = '265f5c952055'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('expenses',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('group_id', sa.Integer(), sa.ForeignKey('groups.id')),
        sa.Column('payer_id', sa.Integer(), sa.ForeignKey('users.id')),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('description', sa.String(255), nullable=False),
        sa.Column('date', sa.DateTime(), nullable=False),

    )
def downgrade():
    op.drop_table('expenses')
