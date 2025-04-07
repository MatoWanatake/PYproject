from sqlalchemy import func

from .db import db


class GroupMember(db.Model):
    __tablename__ = 'group_members'

    group_id = db.Column(db.BigInteger().with_variant(db.Integer, "sqlite"),
                         db.ForeignKey('groups.id', onupdate='CASCADE', ondelete='CASCADE'),
                         primary_key=True)
    user_id = db.Column(db.BigInteger().with_variant(db.Integer, "sqlite"),
                        db.ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'),
                        primary_key=True, index=True)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())

    # Relationships
    group = db.relationship("Group", back_populates="members")
    user = db.relationship("User", back_populates="groups")

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
