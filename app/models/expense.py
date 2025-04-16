from sqlalchemy import func

from .db import db


class Expense(db.Model):
    __tablename__ = 'expenses'

    id = db.Column(db.BigInteger().with_variant(db.Integer, "sqlite"), primary_key=True, autoincrement=True)
    user_id = db.Column(db.BigInteger().with_variant(db.Integer, "sqlite"),
                        db.ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'), nullable=False, index=True)
    title = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    group_id = db.Column(db.BigInteger().with_variant(db.Integer, "sqlite"),
                         db.ForeignKey('groups.id', onupdate='CASCADE', ondelete='CASCADE'), nullable=True, index=True)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    # Relationships
    user = db.relationship("User", back_populates="expenses")
    group = db.relationship("Group", back_populates="expenses")
    comments = db.relationship("Comment", back_populates="expense", cascade="all, delete-orphan", passive_deletes=True)
    debits = db.relationship("ExpenseDebit", back_populates="expense", cascade="all, delete-orphan", passive_deletes=True)

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
