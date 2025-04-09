from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

from app.api.groups.get import valid_group
from app.forms.expenses_form import ExpensesPostForm
from app.models import db, Expense, ExpenseDebit

expense_credits_post_blueprint = Blueprint('expenses_post_blueprint', __name__)


@expense_credits_post_blueprint.route("", methods=['POST'])
@login_required
def expense_credits_post():
    pass
