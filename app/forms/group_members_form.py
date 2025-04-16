from app.forms.base_form import BaseForm
from app.forms.fields.passthrough_field import PassThroughField
from app.forms.validators.array_of_integers import ArrayOfIntegers
from app.forms.validators.required import Required


class GroupMembersAddForm(BaseForm):
    ids = PassThroughField("ids", validators=[Required(), ArrayOfIntegers()])


class GroupMembersDeleteForm(BaseForm):
    ids = PassThroughField("ids", validators=[Required(), ArrayOfIntegers()])
