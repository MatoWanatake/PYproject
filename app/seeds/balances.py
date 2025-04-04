from app.models import db, Balances, environment, SCHEMA
from datetime import datetime

def seed_balances():
    balance1 = Balances(user_id=1, owed_to=2, amount=50.00)
    balance2 = Balances(user_id=2, owed_to=1, amount=50.00)
    balance3 = Balances(user_id=3, owed_to=4, amount=75.00)
    balance4 = Balances(user_id=4, owed_to=3, amount=75.00)

    db.session.add_all([balance1, balance2, balance3, balance4])
    db.session.commit()

def undo_balances():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.balances RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM balances")
    db.session.commit()
