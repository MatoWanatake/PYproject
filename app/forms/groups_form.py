from wtforms.fields.simple import StringField
from wtforms.validators import Length

from app.forms.base_form import BaseForm
from app.forms.validators.required import Required


class GroupPostForm(BaseForm):
    name = StringField("name", validators=[Required(), Length(min=1, max=50)])
    description = StringField("description", validators=[])


class GroupPutForm(BaseForm):
    name = StringField("name", validators=[Required(), Length(min=1, max=50)])
    description = StringField("description", validators=[])
