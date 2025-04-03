from app.models import db, Groups
from sqlalchemy.sql import text

def seed_groups():
    group1 = Groups(name="Roommates", description="Splitting rent and groceries", created_by=1)
    group2 = Groups(name="Vacation", description="Trip to Hawaii", created_by=2)

    db.session.add(group1)
    db.session.add(group2)
    db.session.commit()

def undo_groups():
    db.session.execute(text("DELETE FROM groups;"))
    db.session.commit()
