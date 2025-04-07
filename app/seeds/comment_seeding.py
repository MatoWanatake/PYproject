from app.models.comment import Comment
from app.models.db import db, SCHEMA


def seed_comments():
    comments = [
        Comment(expense_id=1, user_id=2, title="Lunch Expense", body="This was for team lunch."),
        Comment(expense_id=2, user_id=3, title="Groceries", body="Reimbursing shared groceries."),
    ]

    db.session.bulk_save_objects(comments)
    db.session.commit()


def undo_comments():
    if SCHEMA:
        db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM comments;')
    db.session.commit()