"""Creating Group Members table

Revision ID: 265f5c952055
Revises: 58b78bb09aa1
Create Date: 2025-04-03 01:21:46.658436

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '265f5c952055'
down_revision = '58b78bb09aa1'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('group_members',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('group_id', sa.Integer(), sa.ForeignKey('groups.id')),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id')),  
    )
def downgrade():
    op.drop_table('group_members')
