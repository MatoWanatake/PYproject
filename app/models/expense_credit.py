from sqlalchemy import func

from .db import db


class ExpenseCredit(db.Model):
    __tablename__ = 'expense_credits'

    id = db.Column(db.Integer, primary_key=True)
    paid_by = db.Column(db.Integer, db.ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'),
                        nullable=False)
    paid_to = db.Column(db.Integer, db.ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'),
                        nullable=False)
    amount = db.Column(db.Float, nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id', onupdate='CASCADE', ondelete='CASCADE'),
                         nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    # Relationships
    payer = db.relationship("User", foreign_keys=[paid_by], back_populates="credits_paid")
    recipient = db.relationship("User", foreign_keys=[paid_to], back_populates="credits_received")
    group = db.relationship("Group", back_populates="credits")

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
