from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comments(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    expense_id = db.Column(db.Integer, db.ForeignKey('expenses.id'), nullable=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    user = db.relationship('User', back_populates='comments')
    expense = db.relationship('Expense', back_populates='comments')
    group = db.relationship('Group', back_populates='comments')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "expense_id": self.expense_id,
            "group_id": self.group_id,
            "content": self.content,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
