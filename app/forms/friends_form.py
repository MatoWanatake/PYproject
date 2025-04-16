from app.forms.base_form import BaseForm
from app.forms.fields.passthrough_field import PassThroughField
from app.forms.validators.array_of_integers import ArrayOfIntegers
from app.forms.validators.array_of_strings import ArrayOfStrings


class FriendsAddForm(BaseForm):
    ids = PassThroughField("ids", validators=[ArrayOfIntegers()])
    emails = PassThroughField("emails", validators=[ArrayOfStrings()])

class FriendsDeleteForm(BaseForm):
    ids = PassThroughField("ids", validators=[ArrayOfIntegers()])
    emails = PassThroughField("emails", validators=[ArrayOfStrings()])
