from operator import or_, and_

from flask import Blueprint, jsonify
from flask_login import login_required, current_user

from app.api.friends.get import is_friend
from app.models import ExpenseDebit, Expense, db, ExpenseCredit

expenses_friend_get_blueprint = Blueprint('expenses_friend_get_blueprint', __name__)


@expenses_friend_get_blueprint.route("/<int:friend_id>", methods=['GET'])
@login_required
def expense_friend_get(friend_id: int):
    # Make sure current user is friends with the requested user
    try:
        is_friend(friend_id)
    except ValueError:
        return {"error": {"message": "Invalid friend"}}, 404

    # Store expenses, debits
    expenses = {}
    debits = []

    # Get all associated expense and debits for the friendship
    expenses_debits = db.session.query(Expense, ExpenseDebit).join(
        ExpenseDebit,
        Expense.id == ExpenseDebit.expense_id
    ).filter(
        Expense.group_id.is_(None),
        or_(
            and_(Expense.user_id == current_user.id, ExpenseDebit.user_id == friend_id),
            and_(Expense.user_id == friend_id, ExpenseDebit.user_id == current_user.id)
        )
    ).all()

    # Extract expenses and debits
    for expense, debit in expenses_debits:
        expenses[expense.id] = expense
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
        "expenses": [expense.to_dict() for expense in expenses.values()],
        "debits": [debit.to_dict() | {"user": debit.user.to_dict(), "expense": debit.expense.to_dict()} for debit in
                   debits],
        "credits": [
            credit.to_dict() | {"user_paid_to": credit.recipient.to_dict(), "user_paid_by": credit.payer.to_dict()} for
            credit in expense_credits]
    })
