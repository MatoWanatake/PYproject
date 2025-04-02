from .db import db, environment,SCHEMA, add_prefix_for_prod

class Groups(db.Model):
    __tablename__ = 'groups'

    if environment == "production"
        __table_args__ = { 'schema' : SCHEMA}

        id = db.Column(db.Integer, primary_key = True)
        name = db.Column(db.String(100), nullable = False)
        description = db.Column(db.Text)
        created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
        created_at = db.Column(db.DateTime, default = datetime.utcnow)
        updated_at = db.Column(db.DateTime, default = datetime.utcnow, onupdate = datetime.utcnow)

        members = db.relationship('GroupMember', back_populates= 'group', cascade= "all, delete-orphan")
        expenses = db.relationship('Expense', backref= 'group', cascade= "all, delete-orphan")

        def to_dict(self):
            return {
                'Id': self.id,
                'name': self.name,
                'description': self.description,
                'created_by': self.created_by,
                'create_at': self.created_at,
                'updated_at': self.updated_at
            }
