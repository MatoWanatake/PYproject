from app.models.db import db, SCHEMA
from app.models.user import User


def seed_users():
    users = [
        User(first_name="John", last_name="Doe", email="john.doe@example.com", username="johndoe",
             password="password123"),
        User(first_name="Jane", last_name="Smith", email="jane.smith@example.com", username="janesmith",
             password="password456"),
        User(first_name="Demo", last_name="User", email="demo@aa.io", username="Demo",
             password="password"),
        User(first_name="Demo2", last_name="User", email="demo-two@aa.io", username="Demo2",
             password="password"),
        User(first_name="Demo3", last_name="User", email="demo-three@aa.io", username="Demo3",
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