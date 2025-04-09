from wtforms.fields.numeric import FloatField, IntegerField
from wtforms.fields.simple import StringField
from wtforms.validators import Length, NumberRange

from app.forms.base_form import BaseForm
from app.forms.fields.passthrough_field import PassThroughField
from app.forms.validators.array_of_debits import ArrayOfDebits
from app.forms.validators.expense_debits import ExpenseDebits
from app.forms.validators.required import Required


class ExpensesPostForm(BaseForm):
    title = StringField("title", validators=[Required(), Length(min=1, max=50)])
    amount = FloatField("amount",
                        validators=[Required(), NumberRange(min=0.0, message="Value must be greater than 0.0")])
    group_id = IntegerField("group_id", validators=[Required()])
    debits = PassThroughField("debits", validators=[ArrayOfDebits(), ExpenseDebits()])


class ExpensesPutForm(BaseForm):
    title = StringField("title", validators=[Required(), Length(min=1, max=100)])
    amount = FloatField("amount",
                        validators=[Required(), NumberRange(min=0.0, message="Value must be greater than 0.0")])
    description = StringField("description", validators=[])
