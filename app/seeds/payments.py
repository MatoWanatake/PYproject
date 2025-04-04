from app.models import db, Payments, environment, SCHEMA
from datetime import datetime

def seed_payments():
    payment1 = Payments(payer_id=1, payee_id=2, amount=25.00, date_paid=datetime(2025, 4, 1))
    payment2 = Payments(payer_id=2, payee_id=1, amount=25.00, date_paid=datetime(2025, 4, 1))
    payment3 = Payments(payer_id=1, payee_id=3, amount=50.00, date_paid=datetime(2025, 4, 2))
    payment4 = Payments(payer_id=3, payee_id=1, amount=50.00, date_paid=datetime(2025, 4, 2))

    db.session.add_all([payment1, payment2, payment3, payment4])
    db.session.commit()

def undo_payments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.payments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM payments")
    db.session.commit()
