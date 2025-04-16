from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy import func

from app.api.groups.get import valid_group
from app.models import Expense, ExpenseDebit, ExpenseCredit, db

users_get_blueprint = Blueprint('users_get_blueprint', __name__)


@users_get_blueprint.route("/balance", methods=['GET'])
@login_required
def users_get_balance():
    # Calculate total amount owed via ExpenseDebit
    owes_amount = db.session.query(func.sum(ExpenseDebit.amount)).filter(
        ExpenseDebit.user_id == current_user.id
    ).scalar() or 0

    # Subtract credits where others paid you
    credits_received = db.session.query(func.sum(ExpenseCredit.amount)).filter(
        ExpenseCredit.paid_to == current_user.id
    ).scalar() or 0

    # Calculate total amount owed to you based on your created expenses
    owed_amount = db.session.query(func.sum(ExpenseDebit.amount)).join(
        Expense, Expense.id == ExpenseDebit.expense_id
    ).filter(
        Expense.user_id == current_user.id
    ).scalar() or 0

    # Subtract credits where others paid you
    credits_paid_to_you = db.session.query(func.sum(ExpenseCredit.amount)).filter(
        ExpenseCredit.paid_to == current_user.id
    ).scalar() or 0

    # Return all debits for the current user and the friend
    return jsonify({
        "owe": owes_amount - credits_received,
        "owed": owed_amount - credits_paid_to_you
    })
