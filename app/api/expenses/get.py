from flask import Blueprint, jsonify
from flask_login import login_required, current_user

from app.models import Expense

expenses_get_blueprint = Blueprint('expenses_get_blueprint', __name__)


@expenses_get_blueprint.route("", methods=['GET'])
@login_required
def expenses_get():
    # Return all groups the current user belongs to
    return jsonify([
        expense.to_dict() for expense in Expense.query.filter_by(
            user_id=current_user.id
        ).all()
    ])


def valid_expense(expense_id: int) -> Expense:
    # Look up current expense
    expense = Expense.query.get(expense_id)

    # If the expense isn't owned by the user block editing
    if current_user.id != expense.user_id:
        raise ValueError

    # Return expense
    return expense
