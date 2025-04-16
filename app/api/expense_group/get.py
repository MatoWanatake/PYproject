from flask import Blueprint, jsonify
from flask_login import login_required

from app.api.groups.get import valid_group
from app.models import Expense, ExpenseDebit, ExpenseCredit, db

expenses_group_get_blueprint = Blueprint('expenses_group_get_blueprint', __name__)


@expenses_group_get_blueprint.route("/<int:group_id>", methods=['GET'])
@login_required
def expense_group_get(group_id: int):
    # Make sure the current user and the requested user are actually friends
    valid_group(group_id)

    # Store expenses, debits
    expenses = []
    debits = []

    # Get all associated expense and debits for the friendship
    expenses_debits = db.session.query(Expense, ExpenseDebit).join(
        ExpenseDebit,
        Expense.id == ExpenseDebit.expense_id
    ).filter(
        Expense.group_id == group_id
    ).all()

    # Extract expenses and debits
    for expense, debit in expenses_debits:
        expenses.append(expense)
        debits.append(debit)

    # Get all credits for the friendship
    expense_credits = db.session.query(ExpenseCredit).filter(
        ExpenseCredit.group_id == group_id,
    )

    # Return all debits for the current user and the friend
    return jsonify({
        "expenses": [expense.to_dict() for expense in expenses],
        "debits": [debit.to_dict() for debit in debits],
        "credits": [credit.to_dict() for credit in expense_credits]
    })
