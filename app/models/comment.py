from sqlalchemy import func

from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    expense_id = db.Column(db.Integer, db.ForeignKey('expenses.id', onupdate='CASCADE', ondelete='CASCADE'),
                           nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'),
                        nullable=False)
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    # Relationships
    expense = db.relationship("Expense", back_populates="comments")
    user = db.relationship("User", back_populates="comments")

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
