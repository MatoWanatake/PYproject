from app.models.db import db, SCHEMA
from app.models.group import Group


def seed_groups():
    groups = [
        Group(name="U1 + U2 + U3 + U4"),
        Group(name="U2 + U3"),
    ]

    db.session.bulk_save_objects(groups)
    db.session.commit()


def undo_groups():
    if SCHEMA:
        db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM groups;')
    db.session.commit()