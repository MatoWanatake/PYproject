from wtforms.fields.numeric import FloatField, IntegerField
from wtforms.validators import NumberRange

from app.forms.base_form import BaseForm
from app.forms.validators.required import Required


class ExpenseCreditsPostForm(BaseForm):
    paid_to = IntegerField("paid_to", validators=[Required()])
    amount = FloatField("amount",
                        validators=[Required(), NumberRange(min=0.0, message="Value must be greater than 0.0")])
    group_id = IntegerField("group_id", validators=[])


class ExpenseCreditsPutForm(BaseForm):
    paid_to = IntegerField("paid_to", validators=[Required()])
    amount = FloatField("amount",
                        validators=[Required(), NumberRange(min=0.0, message="Value must be greater than 0.0")])
    group_id = IntegerField("group_id", validators=[])
