from flask_login import UserMixin
from sqlalchemy import func
from werkzeug.security import generate_password_hash, check_password_hash

from .db import db


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.BigInteger().with_variant(db.Integer, "sqlite"), primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    # Relationships
    friends = db.relationship("Friend", primaryjoin="User.id == Friend.user_id", back_populates="user",
                              cascade="all, delete-orphan", passive_deletes=True)
    friend_of = db.relationship("Friend", primaryjoin="User.id == Friend.friend_id", back_populates="friend")
    groups = db.relationship("GroupMember", back_populates="user")
    expenses = db.relationship("Expense", back_populates="user", cascade="all, delete-orphan",
                               passive_deletes=True)
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan", passive_deletes=True)
    debits = db.relationship("ExpenseDebit", back_populates="user", cascade="all, delete-orphan", passive_deletes=True)
    credits_paid = db.relationship("ExpenseCredit", foreign_keys="ExpenseCredit.paid_by", back_populates="payer",
                                   cascade="all, delete-orphan", passive_deletes=True)
    credits_received = db.relationship("ExpenseCredit", foreign_keys="ExpenseCredit.paid_to",
                                       back_populates="recipient", cascade="all, delete-orphan", passive_deletes=True)

    @property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self, terse=False):
        if terse:
            return {column.name: getattr(self, column.name) for column in self.__table__.columns if
                    column.name not in {'email', 'password_hash', 'created_at', 'updated_at'}}

        return {column.name: getattr(self, column.name) for column in self.__table__.columns if
                column.name != 'password_hash'}
