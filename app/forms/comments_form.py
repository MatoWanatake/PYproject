from wtforms.fields.numeric import IntegerField
from wtforms.fields.simple import StringField
from wtforms.validators import Length

from app.forms.base_form import BaseForm
from app.forms.validators.required import Required


class CommentsPostForm(BaseForm):
    expense_id = IntegerField("expense_id", validators=[Required()])
    title = StringField("title", validators=[Required(), Length(min=1, max=100)])
    body = StringField("body", validators=[Required(), Length(min=1)])


class CommentsPutForm(BaseForm):
    expense_id = IntegerField("expense_id", validators=[Required()])
    title = StringField("title", validators=[Required(), Length(min=1, max=100)])
    body = StringField("body", validators=[Required(), Length(min=1)])
