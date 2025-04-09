from flask import Blueprint, request, jsonify
from flask_login import login_required

from app.api.expenses.get import valid_expense
from app.forms.expenses_form import ExpensesPutForm
from app.models import db, ExpenseDebit

expense_debits_put_blueprint = Blueprint('expense_debits_put_blueprint', __name__)


@expense_debits_put_blueprint.route("/<int:expense_debit_id>", methods=['PUT'])
@login_required
def expense_debits_put(expense_debit_id: int):
   pass
