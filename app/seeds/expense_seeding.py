from app.models.db import db, SCHEMA
from app.models.expense import Expense


def seed_expenses():
    expenses = [
        # id = 1 (no group)
        Expense(user_id=2, title="U1 -> U1 + U2", amount=50),

        # id = 2 (no group)
        Expense(user_id=2, title="U1 -> U1 + U2 + U3", amount=300),

        # id = 3 (group 1)
        Expense(user_id=2, title="G1", amount=1000, group_id=1),

        # id = 3 (group 2)
        Expense(user_id=2, title="G2", amount=400, group_id=2),
    ]

    db.session.bulk_save_objects(expenses)
    db.session.commit()


def undo_expenses():
    if SCHEMA:
        db.session.execute('TRUNCATE expenses RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM expenses;')
    db.session.commit()