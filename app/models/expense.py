from sqlalchemy import func

from .db import db


class Expense(db.Model):
    __tablename__ = 'expenses'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'),
                        nullable=False)
    title = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id', onupdate='CASCADE', ondelete='CASCADE'),
                         nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    # Relationships
    user = db.relationship("User", back_populates="expenses")
    group = db.relationship("Group", back_populates="expenses")
    comments = db.relationship("Comment", back_populates="expense", lazy=True)
    debits = db.relationship("ExpenseDebit", back_populates="expense", lazy=True)

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
