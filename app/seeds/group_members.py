from app.models import db, GroupMember, environment, SCHEMA
from datetime import datetime

def seed_group_members():
    member1 = GroupMember(group_id=1, user_id=1)
    member2 = GroupMember(group_id=1, user_id=2)
    member3 = GroupMember(group_id=2, user_id=3)
    member4 = GroupMember(group_id=2, user_id=4)

    db.session.add_all([member1, member2, member3, member4])
    db.session.commit()

def undo_group_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.group_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM group_members")
    db.session.commit()
