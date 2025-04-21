from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy import func, literal, union_all

from app.models import Expense, ExpenseDebit, ExpenseCredit, db, Group, User

users_get_blueprint = Blueprint('users_get_blueprint', __name__)


@users_get_blueprint.route("/balance", methods=['GET'])
@login_required
def users_get_balance():
    # Get current user's id
    user_id = current_user.id

    # How much the current user has been paid
    paid = db.session.query(
        func.sum(ExpenseCredit.amount)
    ).filter(
        ExpenseCredit.paid_to == user_id
    ).scalar() or 0

    # How much the current user is owed
    owed = db.session.query(
        func.sum(ExpenseDebit.amount).label('amount')
    ).join(
        Expense,
        Expense.id == ExpenseDebit.expense_id
    ).filter(
        Expense.user_id == user_id
    ).scalar() or 0

    # How much the current user owes
    owes = db.session.query(
        func.sum(ExpenseDebit.amount).label('amount')
    ).filter(
        ExpenseDebit.user_id == user_id
    ).scalar() or 0

    # Get transactions
    transactions = [dict(row) for row in get_transactions(user_id)]

    grouped_transactions = {}
    for transaction in transactions:
        if transaction['type'] not in grouped_transactions:
            grouped_transactions[transaction['type']] = {}

        if transaction['name'] not in grouped_transactions[transaction['type']]:
            grouped_transactions[transaction['type']][transaction['name']] = []

        grouped_transactions[transaction['type']][transaction['name']].append(transaction)

    # Return balance summary
    return jsonify({
        'summary': {
            'paid': paid,
            'owed': owed,
            'owes': owes,
            'net': owed - paid - owes,
        },
        'transactions': grouped_transactions
    })


def get_transactions(user_id: int):
    # Group transactions you owe
    group_owe = db.session.query(
        literal('group').label('type'),
        literal('owe').label('action'),
        Expense.group_id.label('id'),
        func.sum(ExpenseDebit.amount).label('total_amount')
    ).join(
        Expense,
        ExpenseDebit.expense_id == Expense.id
    ).filter(
        ExpenseDebit.user_id == user_id,
        Expense.group_id.isnot(None)
    ).group_by(
        Expense.group_id
    )

    # Group transactions owed to you
    group_owed = db.session.query(
        literal('group').label('type'),
        literal('owed').label('action'),
        Expense.group_id.label('id'),
        func.sum(ExpenseDebit.amount).label('total_amount')
    ).join(
        Expense,
        ExpenseDebit.expense_id == Expense.id
    ).filter(
        Expense.user_id == user_id,
        Expense.group_id.isnot(None)
    ).group_by(
        Expense.group_id
    )

    # Combine group transactions and join with groups
    group_union = union_all(group_owe, group_owed).subquery()

    group_transactions = db.session.query(
        group_union.c.type.label('type'),
        group_union.c.action.label('action'),
        group_union.c.id.label('id'),
        Group.name.label('name'),
        group_union.c.total_amount.label('total_amount')
    ).join(
        Group,
        Group.id == group_union.c.id  # Use the labeled column name
    )

    # User transactions you owe
    user_owe = db.session.query(
        literal('user').label('type'),
        literal('owe').label('action'),
        Expense.user_id.label('id'),  # Label it as 'id' consistently
        func.sum(ExpenseDebit.amount).label('total_amount')
    ).join(
        Expense,
        ExpenseDebit.expense_id == Expense.id
    ).filter(
        ExpenseDebit.user_id == user_id,
        Expense.group_id.is_(None)
    ).group_by(
        Expense.user_id
    )

    # User transactions owed to you
    user_owed = db.session.query(
        literal('user').label('type'),
        literal('owed').label('action'),
        ExpenseDebit.user_id.label('id'),
        func.sum(ExpenseDebit.amount).label('total_amount')
    ).join(
        Expense,
        ExpenseDebit.expense_id == Expense.id
    ).filter(
        Expense.user_id == user_id,
        Expense.group_id.is_(None)
    ).group_by(
        ExpenseDebit.user_id
    )

    # Combine user transactions and join with users
    user_union = union_all(user_owe, user_owed).subquery()

    user_transactions = db.session.query(
        user_union.c.type.label('type'),
        user_union.c.action.label('action'),
        user_union.c.id.label('id'),
        User.username.label('name'),
        user_union.c.total_amount.label('total_amount')
    ).join(
        User,
        User.id == user_union.c.id  # Use the labeled column name
    )

    # Final combined query with ordering
    final_query = union_all(
        group_transactions, user_transactions
    ).order_by('name')

    # Return results
    return db.session.execute(final_query).all()
