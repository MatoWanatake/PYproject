from operator import or_, and_

from flask import Blueprint, jsonify
from flask_login import login_required, current_user

from app.models import ExpenseDebit, Friend, Expense, db, ExpenseCredit

expenses_friend_get_blueprint = Blueprint('expenses_friend_get_blueprint', __name__)


@expenses_friend_get_blueprint.route("/<int:friend_id>", methods=['GET'])
@login_required
def expense_friend_get(friend_id: int):
    # Make sure the current user and the requested user are actually friends
    is_friend(friend_id)

    # Store expenses, debits
    expenses = []
    debits = []

    # Get all associated expense and debits for the friendship
    expenses_debits = db.session.query(Expense, ExpenseDebit).join(
        ExpenseDebit,
        Expense.id == ExpenseDebit.expense_id
    ).filter(
        Expense.group_id.is_(None),
        ExpenseDebit.user_id.in_([current_user.id, friend_id])
    ).all()

    # Extract expenses and debits
    for expense, debit in expenses_debits:
        expenses.append(expense)
        debits.append(debit)

    # Get all credits for the friendship
    expense_credits = db.session.query(ExpenseCredit).filter(
        ExpenseCredit.group_id.is_(None),
        or_(
            and_(ExpenseCredit.paid_by == current_user.id, ExpenseCredit.paid_to == friend_id),
            and_(ExpenseCredit.paid_by == friend_id, ExpenseCredit.paid_to == current_user.id)
        )
    )

    # Return all debits for the current user and the friend
    return jsonify({
        "expenses": [expense.to_dict() for expense in expenses],
        "debits": [debit.to_dict() for debit in debits],
        "credits": [credit.to_dict() for credit in expense_credits]
    })


def is_friend(friend_id: int) -> Friend:
    # Look up friendship
    friend = Friend.query.get([current_user.id, friend_id])

    # If nothing is return
    if not friend:
        raise ValueError

    # Return friendship
    return friend
