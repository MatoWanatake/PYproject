from app.models import db, Expenses, environment, SCHEMA
from datetime import datetime

def seed_expenses():
    expense1 = Expenses(group_id=1, user_id=1, amount=200.00, description="Flight ticket", due_date=datetime(2025, 5, 1))
    expense2 = Expenses(group_id=1, user_id=2, amount=100.00, description="Hotel booking", due_date=datetime(2025, 5, 2))
    expense3 = Expenses(group_id=2, user_id=3, amount=50.00, description="Books", due_date=datetime(2025, 4, 30))
    expense4 = Expenses(group_id=2, user_id=4, amount=25.00, description="Snacks", due_date=datetime(2025, 5, 1))

    db.session.add_all([expense1, expense2, expense3, expense4])
    db.session.commit()

def undo_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM expenses")
    db.session.commit()
