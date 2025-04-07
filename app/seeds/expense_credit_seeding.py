from app.models.db import db, SCHEMA
from app.models.expense_credit import ExpenseCredit


def seed_expense_credits():
    credits = [
        ExpenseCredit(paid_by=1, paid_to=2, amount=50.25, group_id=1),
        ExpenseCredit(paid_by=3, paid_to=4, amount=100.00, group_id=2),
        ExpenseCredit(paid_by=4, paid_to=5, amount=10.00),
    ]

    db.session.bulk_save_objects(credits)
    db.session.commit()


def undo_expense_credits():
    if SCHEMA:
        db.session.execute('TRUNCATE expense_credits RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM expense_credits;')
    db.session.commit()