from app.models.db import db, SCHEMA
from app.models.friend import Friend


def seed_friends():
    friends = [
        Friend(user_id=1, friend_id=2),
        Friend(user_id=3, friend_id=4),
    ]

    db.session.bulk_save_objects(friends)
    db.session.commit()


def undo_friends():
    if SCHEMA:
        db.session.execute('TRUNCATE friends RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM friends;')
    db.session.commit()