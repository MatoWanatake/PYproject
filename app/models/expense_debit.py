from sqlalchemy import func

from .db import db


class ExpenseDebit(db.Model):
    __tablename__ = 'expense_debits'

    expense_id = db.Column(db.BigInteger().with_variant(db.Integer, "sqlite"),
                           db.ForeignKey('expenses.id', onupdate='CASCADE', ondelete='CASCADE'),
                           primary_key=True)
    user_id = db.Column(db.BigInteger().with_variant(db.Integer, "sqlite"),
                        db.ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'),
                        primary_key=True, index=True)
    amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    # Relationships
    expense = db.relationship("Expense", back_populates="debits")
    user = db.relationship("User", back_populates="debits")

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
