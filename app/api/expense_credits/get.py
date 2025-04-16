from flask import Blueprint, jsonify
from flask_login import login_required, current_user

from app.models import ExpenseCredit

expense_credits_get_blueprint = Blueprint('expense_credits_get_blueprint', __name__)


@expense_credits_get_blueprint.route("", methods=['GET'])
@login_required
def expense_credits_get():
    # Return all expense credits
    return jsonify([
        credit.to_dict() for credit in ExpenseCredit.query.filter_by(
            paid_by=current_user.id
        ).all()
    ])


def valid_expense_credit(expense_credit_id: int) -> ExpenseCredit:
    # Look up current expense credit
    credit = ExpenseCredit.query.get(expense_credit_id)

    # If the expense isn't owned by the user block editing
    if current_user.id != credit.paid_by:
        raise ValueError

    # Return expense
    return credit
