from app.models import db, Comments
from sqlalchemy.sql import text
from datetime import datetime

def seed_comments():
    comment1 = Comments(
        user_id=1,
        expense_id=1,
        content="Thanks for covering lunch! I'll pay you back soon.",
        created_at=datetime.utcnow()
    )
    comment2 = Comments(
        user_id=2,
        expense_id=1,
        content="No worries — it's on me!",
        created_at=datetime.utcnow()
    )
    comment3 = Comments(
        user_id=3,
        expense_id=2,
        content="Can we split this three ways instead?",
        created_at=datetime.utcnow()
    )
    comment4 = Comments(
        user_id=2,
        group_id=1,
        content="Let’s do another dinner this weekend!",
        created_at=datetime.utcnow()
    )

    db.session.add_all([comment1, comment2, comment3, comment4])
    db.session.commit()

def undo_comments():
    db.session.execute(text("DELETE FROM comments"))
    db.session.commit()
