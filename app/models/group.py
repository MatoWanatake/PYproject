from sqlalchemy import func

from .db import db


class Group(db.Model):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    # Relationships
    members = db.relationship("GroupMember", back_populates="group", lazy=True)
    expenses = db.relationship("Expense", back_populates="group", lazy=True)
    credits = db.relationship("ExpenseCredit", back_populates="group", lazy=True)

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
