from flask import Blueprint
from flask_login import login_required

from app.api.expense_credits.get import valid_expense_credit, expense_credits_get
from app.models import db, Expense, ExpenseCredit

expense_credits_delete_blueprint = Blueprint('expense_credits_delete_blueprint', __name__)


@expense_credits_delete_blueprint.route("/<int:expense_credit_id>", methods=['DELETE'])
@login_required
def expense_credits_delete(expense_credit_id: int):
    # Make sure current user has access to the expense
    try:
        valid_expense_credit(expense_credit_id)
    except ValueError:
        return {"error": {"message": "Invalid expense"}}, 404

    # Delete the expense
    db.session.query(
        ExpenseCredit
    ).filter(
        Expense.id == expense_credit_id
    ).delete()

    # Commit remaining changes
    db.session.commit()

    # Return all expenses the current user belongs to
    return expense_credits_get()
