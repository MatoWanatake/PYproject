from app.models.db import db, SCHEMA
from app.models.expense import Expense


def seed_expenses():
    expenses = [
        Expense(user_id=1, title="Dinner", amount=45.50, group_id=1),
        Expense(user_id=2, title="Office Supplies", amount=150.75, group_id=2),
        Expense(user_id=5, title="Secret Supplies", amount=20.75),
    ]

    db.session.bulk_save_objects(expenses)
    db.session.commit()


def undo_expenses():
    if SCHEMA:
        db.session.execute('TRUNCATE expenses RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM expenses;')
    db.session.commit()