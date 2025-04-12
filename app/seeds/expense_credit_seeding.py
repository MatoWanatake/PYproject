from app.models.db import db, SCHEMA
from app.models.expense_credit import ExpenseCredit


def seed_expense_credits():
    credits = [
        # id = 1
        ExpenseCredit(paid_by=3, paid_to=2, amount=10),

        # id = 2
        ExpenseCredit(paid_by=4, paid_to=2, amount=100.00),

        # id = 3
        ExpenseCredit(paid_by=5, paid_to=2, amount=10.00, group_id=1),

        # id = 4
        ExpenseCredit(paid_by=3, paid_to=2, amount=10.00, group_id=2),
    ]

    db.session.bulk_save_objects(credits)
    db.session.commit()


def undo_expense_credits():
    if SCHEMA:
        db.session.execute('TRUNCATE expense_credits RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM expense_credits;')
    db.session.commit()