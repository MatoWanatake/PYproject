from app.models import db, Group, environment, SCHEMA
from datetime import datetime

def seed_groups():
    group1 = Group(
        name="Travel Group",
        description="A group for travel enthusiasts",
        created_by=1
    )
    group2 = Group(
        name="Study Group",
        description="A group for study sessions",
        created_by=2
    )

    db.session.add_all([group1, group2])
    db.session.commit()

def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM groups")
    db.session.commit()
