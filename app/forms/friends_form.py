from app.forms.base_form import BaseForm
from app.forms.fields.passthrough_field import PassThroughField
from app.forms.validators.array_of_integers import ArrayOfIntegers
from app.forms.validators.required import Required


class FriendsAddForm(BaseForm):
    ids = PassThroughField("ids", validators=[Required(), ArrayOfIntegers()])


class FriendsDeleteForm(BaseForm):
    ids = PassThroughField("ids", validators=[Required(), ArrayOfIntegers()])
