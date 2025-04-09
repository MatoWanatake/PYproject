from flask import Blueprint
from flask_login import login_required

from app.api.expenses.get import valid_expense, expenses_get
from app.models import db, Expense

expenses_delete_blueprint = Blueprint('expenses_delete_blueprint', __name__)


@expenses_delete_blueprint.route("/<int:expense_id>", methods=['DELETE'])
@login_required
def expenses_delete(expense_id: int):
    # Make sure current user has access to the expense
    try:
        valid_expense(expense_id)
    except ValueError:
        return {"error": {"message": "Invalid expense"}}, 404

    # Delete the expense
    db.session.query(
        Expense
    ).filter(
        Expense.id == expense_id
    ).delete()

    # Commit remaining changes
    db.session.commit()

    # Return all expenses the current user belongs to
    return expenses_get()
