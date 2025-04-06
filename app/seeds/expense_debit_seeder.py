from app.models.db import db, SCHEMA
from app.models.expense_debit import ExpenseDebit


def seed_expense_debits():
    debits = [
        ExpenseDebit(expense_id=1, user_id=2, amount=22.75),
        ExpenseDebit(expense_id=2, user_id=3, amount=75.00),
        ExpenseDebit(expense_id=3, user_id=4, amount=20.75),
    ]

    db.session.bulk_save_objects(debits)
    db.session.commit()


def undo_expense_debits():
    if SCHEMA:
        db.session.execute('TRUNCATE expense_debits RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM expense_debits;')
    db.session.commit()