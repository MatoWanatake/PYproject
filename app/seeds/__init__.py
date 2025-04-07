from flask.cli import AppGroup

from app.models.db import environment
from .comment_seeding import seed_comments, undo_comments
from .expense_credit_seeding import seed_expense_credits, undo_expense_credits
from .expense_debit_seeder import seed_expense_debits, undo_expense_debits
from .expense_seeding import seed_expenses, undo_expenses
from .friend_seeding import seed_friends, undo_friends
from .group_member_seeder import seed_group_members, undo_group_members
from .group_seeder import seed_groups, undo_groups
from .user_seeder import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # Rollback seeded data on production
    if environment == 'production':
        undo_comments()
        undo_expense_credits()
        undo_expense_debits()
        undo_expenses()
        undo_group_members()
        undo_groups()
        undo_friends()
        undo_users()

    # Seed
    seed_users()
    seed_groups()
    seed_group_members()
    seed_expenses()
    seed_expense_debits()
    seed_expense_credits()
    seed_comments()
    seed_friends()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_expense_credits()
    undo_expense_debits()
    undo_expenses()
    undo_group_members()
    undo_groups()
    undo_friends()
    undo_users()
