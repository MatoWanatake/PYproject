from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import ValidationError, Length

from app.forms.validators.required import Required
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[Required(), Length(min=1, max=100)])
    last_name = StringField('last_name', validators=[Required(), Length(min=1, max=100)])
    email = StringField('email', validators=[Required(), user_exists, Length(min=1, max=100)])
    username = StringField('username', validators=[Required(), username_exists, Length(min=1, max=100)])
    password = StringField('password', validators=[Required()])
