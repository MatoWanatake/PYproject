from collections import defaultdict

from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy import func, literal

from app.models import Expense, ExpenseDebit, ExpenseCredit, db, Group, User

users_get_blueprint = Blueprint('users_get_blueprint', __name__)


@users_get_blueprint.route("/balance", methods=['GET'])
@login_required
def users_get_balance():
    # Total amount owe
    owe = (
        db.session.query(
            func.coalesce(func.sum(ExpenseDebit.amount), 0).label("total_owe")
        )
        .filter(ExpenseDebit.user_id == current_user.id)
    ).first()

    # Total amount owed
    owed = (
        db.session.query(
            func.coalesce(func.sum(ExpenseDebit.amount), 0).label("total_owed")
        )
        .join(Expense, ExpenseDebit.expense_id == Expense.id)
        .filter(Expense.user_id == current_user.id)
    ).first()

    # Debits CTE
    user_debits = (
        db.session.query(
            ExpenseDebit.user_id.label("user_id"),
            func.coalesce(Expense.group_id, literal("-1")).label("group_name"),
            func.coalesce(func.sum(ExpenseDebit.amount), 0).label("total_debit"),
        )
        .join(Expense, Expense.id == ExpenseDebit.expense_id)
        .filter(Expense.user_id == current_user.id)
        .group_by(ExpenseDebit.user_id, func.coalesce(Expense.group_id, literal("-1")))
        .subquery()
    )

    # Credits CTE
    user_credits = (
        db.session.query(
            ExpenseCredit.paid_by.label("user_id"),
            func.coalesce(ExpenseCredit.group_id, literal("-1")).label("group_name"),
            func.coalesce(func.sum(ExpenseCredit.amount), 0).label("total_credit"),
        )
        .filter(ExpenseCredit.paid_to == current_user.id)
        .group_by(ExpenseCredit.paid_by, func.coalesce(ExpenseCredit.group_id, literal("-1")))
        .subquery()
    )

    # Main Query
    results = (
        db.session.query(
            User.username,
            func.coalesce(Group.name, "-1").label("group_name"),
            user_debits.c.total_debit,
            func.coalesce(user_credits.c.total_credit, 0).label("total_credit"),
        )
        .join(User, user_debits.c.user_id == User.id)
        .outerjoin(Group, user_debits.c.group_name == Group.id)
        .outerjoin(
            user_credits,
            (user_debits.c.user_id == user_credits.c.user_id) &
            (user_debits.c.group_name == user_credits.c.group_name)
        )
    ).all()

    # Group by username
    balances = defaultdict(list)
    for row in results:
        balances[row.username].append(dict(row))

    # Return results
    return jsonify({
        "owe": owe.total_owe,
        "owed": owed.total_owed,
        "users": dict(sorted(balances.items()))
    })

