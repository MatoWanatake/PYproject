from flask import Blueprint, request, jsonify
from flask_login import login_required

from app.api.expenses.get import valid_expense
from app.forms.expenses_form import ExpensesPutForm
from app.models import db, ExpenseDebit

expenses_put_blueprint = Blueprint('expenses_put_blueprint', __name__)


@expenses_put_blueprint.route("/<int:expense_id>", methods=['PUT'])
@login_required
def groups_put(expense_id: int):
    # Make sure current user has access to the expense
    try:
        expense = valid_expense(expense_id)
    except ValueError:
        return {"error": {"message": "Invalid expense"}}, 404

    # Format user input
    form = ExpensesPutForm(request)

    # Validate input
    if form.validate_on_submit():
        # Update
        expense.title = form.data.get("title")
        expense.amount = form.data.get("amount")

        # Update the expense
        db.session.flush()

        # Remove existing expense debits
        db.session.query(ExpenseDebit).filter(ExpenseDebit.expense_id == expense.id).delete()

        # Delete the current expense debits
        db.session.flush()

        # Add debits for the expenses
        for debit in form.data.get("debits"):
            db.session.add(ExpenseDebit(
                expense_id=expense.id, user_id=debit.get("user_id"), amount=debit.get("amount")
            ))

        # Commit remaining changes
        db.session.commit()

        # Return the new group
        return jsonify(expense.to_dict())

    # Abort with error
    return jsonify(form.errors), 400
