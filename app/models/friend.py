from sqlalchemy import func

from .db import db


class Friend(db.Model):
    __tablename__ = 'friends'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'),
                        primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'),
                          primary_key=True)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())

    # Relationships
    user = db.relationship("User", foreign_keys=[user_id], back_populates="friends")
    friend = db.relationship("User", foreign_keys=[friend_id], back_populates="friend_of")

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
