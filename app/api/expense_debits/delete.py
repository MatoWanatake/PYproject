from flask import Blueprint
from flask_login import login_required

from app.api.expenses.get import valid_expense, expenses_get
from app.models import db, Expense

expense_debits_delete_blueprint = Blueprint('expense_debits_delete_blueprint', __name__)


@expense_debits_delete_blueprint.route("/<int:expense_debit_id>", methods=['DELETE'])
@login_required
def expense_debits_delete(expense_debit_id: int):
    pass
