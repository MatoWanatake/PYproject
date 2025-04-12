from wtforms.validators import ValidationError


class ExpenseDebits:
    def __call__(self, form, field):
       # Get sum of all debits
       total = sum(debit.get("amount") for debit in field.data)

        # Make sure the sum of all debits is less than or equal to the expense
       if total != form.amount.data:
            raise ValidationError("The sum of all debits must be less than or equal to the expense.")

