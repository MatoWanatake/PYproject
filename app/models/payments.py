from .db import db, environment, SCHEMA, add_prefix_for_prod

class Payments(db.Model):
    __tablename__ = 'payments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    payer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    payee_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    amount = db.Column(db.Numeric(10,2), nullable=False)
    date_paid = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    payer = db.relationship('User', foreign_keys=[payer_id], back_populates='payments_made')
    payee = db.relationship('User', foreign_keys=[payee_id], back_populates='payments_received')

    def to_dict(self):
        return {
            'id': self.id,
            'payer_id': self.payer_id,
            'payee_id': self.payee_id,
            'amount': str(self.amount),
            'created_at': self.created_at,
            'date_paid': self.date_paid
        }
