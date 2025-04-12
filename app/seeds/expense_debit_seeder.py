from app.models.db import db, SCHEMA
from app.models.expense_debit import ExpenseDebit


def seed_expense_debits():
    debits = [
        # id = 1 (U1 + U2) (no group)
        ExpenseDebit(expense_id=1, user_id=3, amount=25),

        # id = 2 (U1 + U2 + U3) (no group)
        ExpenseDebit(expense_id=2, user_id=3, amount=150),
        ExpenseDebit(expense_id=2, user_id=4, amount=150),

        # id = 3 (U1 + U2 + U3 + U2) (group 1)
        ExpenseDebit(expense_id=3, user_id=3, amount=250),
        ExpenseDebit(expense_id=3, user_id=4, amount=250),
        ExpenseDebit(expense_id=3, user_id=5, amount=250),

        # id = 4 (U2 + U3) (group 2)
        ExpenseDebit(expense_id=4, user_id=3, amount=200),
        ExpenseDebit(expense_id=4, user_id=4, amount=200),
    ]

    db.session.bulk_save_objects(debits)
    db.session.commit()


def undo_expense_debits():
    if SCHEMA:
        db.session.execute('TRUNCATE expense_debits RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM expense_debits;')
    db.session.commit()