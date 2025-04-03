from .db import db, environment, SCHEMA, add_prefix_for_prod

class Balances(db.Model):
    __tablename__ = 'balances'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)  # Fixed table name
    owed_to = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    amount = db.Column(db.Numeric(10,2), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', foreign_keys=[user_id], back_populates='balances')
    owed_to_user = db.relationship('User', foreign_keys=[owed_to], back_populates='owed_balances')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'owed_to': self.owed_to,
            'amount': str(self.amount),
            'created_at': self.created_at
        }
