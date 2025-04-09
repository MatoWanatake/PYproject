from app.models import db, Friend
from sqlalchemy.sql import text

def seed_friends():
    friend1 = Friend(user_id=1, friend_id=2)
    friend2 = Friend(user_id=1, friend_id=3)
    friend3 = Friend(user_id=2, friend_id=1)
    friend4 = Friend(user_id=3, friend_id=4)

    db.session.add_all([friend1, friend2, friend3, friend4])
    db.session.commit()

def undo_friends():
    db.session.execute(text("DELETE FROM friends"))
    db.session.commit()
