from app.models.db import db, SCHEMA
from app.models.user import User


def seed_users():
    users = [
        # id = 1
        User(first_name="Demo", last_name="User", email="demo@aa.io", username="demo",
             password="password"),

        # id = 2
        User(first_name="Demo", last_name="One", email="demo-one@aa.io", username="demo-one",
             password="password"),

        # id = 3
        User(first_name="Demo", last_name="Two", email="demo-two@aa.io", username="demo-two",
             password="password"),

        # id = 4
        User(first_name="Demo", last_name="Three", email="demo-three@aa.io", username="demo-three",
             password="password"),

        # id = 5
        User(first_name="Demo", last_name="Four", email="demo-four@aa.io", username="demo-four",
             password="password"),

        # id = 6
        User(first_name="Jane", last_name="Smith", email="jane.smith@example.com", username="janesmith",
             password="password"),
    ]

    db.session.bulk_save_objects(users)
    db.session.commit()


def undo_users():
    if SCHEMA:
        db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM users;')
    db.session.commit()
