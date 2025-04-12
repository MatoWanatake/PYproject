from app.models.comment import Comment
from app.models.db import db, SCHEMA


def seed_comments():
    comments = [
        Comment(expense_id=1, user_id=3, title="U2 Comment", body="Lorem ipsum dolor sit amet."),
        Comment(expense_id=1, user_id=4, title="U3 Comment", body="Quis nostrud exercitation ullamco."),
        Comment(expense_id=1, user_id=4, title="U4 Comment", body="Labore et dolore magna aliqua."),

        Comment(expense_id=2, user_id=4, title="U3 Comment", body="Quis nostrud exercitation ullamco."),
        Comment(expense_id=2, user_id=4, title="U4 Comment", body="Labore et dolore magna aliqua."),

        Comment(expense_id=3, user_id=4, title="U4 Comment", body="Labore et dolore magna aliqua."),
    ]

    db.session.bulk_save_objects(comments)
    db.session.commit()


def undo_comments():
    if SCHEMA:
        db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM comments;')
    db.session.commit()