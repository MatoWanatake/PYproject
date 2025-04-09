from flask import Blueprint, request, jsonify
from flask_login import login_required

from app.api.expenses.get import valid_expense
from app.forms.expenses_form import ExpensesPutForm
from app.models import db, ExpenseDebit

expense_credits_put_blueprint = Blueprint('expenses_put_blueprint', __name__)


@expense_credits_put_blueprint.route("/<int:expense_credit_id>", methods=['PUT'])
@login_required
def expense_credits_put(expense_credit_id: int):
   pass
