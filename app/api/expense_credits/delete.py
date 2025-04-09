from flask import Blueprint
from flask_login import login_required

from app.api.expenses.get import valid_expense, expenses_get
from app.models import db, Expense

expense_credits_delete_blueprint = Blueprint('expense_credits_delete_blueprint', __name__)


@expense_credits_delete_blueprint.route("/<int:expense_credit_id>", methods=['DELETE'])
@login_required
def expense_credits_delete(expense_credit_id: int):
    pass
