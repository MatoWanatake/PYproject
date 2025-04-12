from app.models.db import db, SCHEMA
from app.models.group_members import GroupMember


def seed_group_members():
    group_members = [
        # id = 1 (U1 + U2 + U3 + U4)
        GroupMember(group_id=1, user_id=2),
        GroupMember(group_id=1, user_id=3),
        GroupMember(group_id=1, user_id=4),
        GroupMember(group_id=1, user_id=5),

        # id = 2 (U2 + U3)
        GroupMember(group_id=2, user_id=3),
        GroupMember(group_id=2, user_id=4),
    ]

    db.session.bulk_save_objects(group_members)
    db.session.commit()


def undo_group_members():
    if SCHEMA:
        db.session.execute('TRUNCATE group_members RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM group_members;')
    db.session.commit()