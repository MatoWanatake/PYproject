from .db import db, environment, SCHEMA, add_prefix_for_prod



class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    user = db.relationship('User', foreign_keys=[user_id], back_populates='friends')
    friend = db.relationship('User', foreign_keys=[friend_id], back_populates='friend_of')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'friend_id': self.friend_id
        }
