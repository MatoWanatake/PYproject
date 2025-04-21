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

    # Get amount paid to me by each group / friend
    paid_to_me = group_payments([dict(row) for row in db.session.query(
        ExpenseCredit.paid_by.label('user_id'),
        ExpenseCredit.group_id.label('group_id'),
        func.sum(ExpenseCredit.amount).label('total_amount')
    ).filter(
        ExpenseCredit.paid_to == user_id
    ).group_by(
        ExpenseCredit.paid_by,
        ExpenseCredit.group_id
    ).all()])

    # Get amount paid to me by each group / friend
    paid_by_me = group_payments([dict(row) for row in db.session.query(
        ExpenseCredit.paid_to.label('user_id'),
        ExpenseCredit.group_id.label('group_id'),
        func.sum(ExpenseCredit.amount).label('total_amount')
    ).filter(
        ExpenseCredit.paid_by == user_id
    ).group_by(
        ExpenseCredit.paid_to,
        ExpenseCredit.group_id
    ).all()])

    # Get transactions
    transactions = [dict(row) for row in get_transactions(user_id)]

    grouped_transactions = {}
    for transaction in transactions:
        if transaction['type'] not in grouped_transactions:
            grouped_transactions[transaction['type']] = {}

        if transaction['name'] not in grouped_transactions[transaction['type']]:
            grouped_transactions[transaction['type']][transaction['name']] = {
                'id': transaction['group_id'] if transaction['group_id'] else transaction['user_id'],
                'name': transaction['name'],
                'transactions': []
            }

        if transaction['type'] == 'user':
            if transaction['action'] == 'owed':
                transaction['paid'] = paid_by_me['user'][transaction['user_id']]['total_amount']
            else:
                transaction['paid'] = paid_to_me['user'][transaction['user_id']]['total_amount']
        else:
            if transaction['action'] == 'owed':
                transaction['paid'] = paid_by_me['group'][transaction['group_id']][transaction['user_id']]['total_amount']
            else:
                transaction['paid'] = paid_to_me['group'][transaction['group_id']][transaction['user_id']]['total_amount']

        grouped_transactions[transaction['type']][transaction['name']]['transactions'].append(transaction)

    # Return balance summary
    return jsonify({
        'summary': {
            'paid': paid,
            'owed': owed,
            'owes': owes,
            'net': owed - paid - owes,
        },
        'transactions': grouped_transactions,
        'paid_to_me': paid_to_me,
        'paid_by_me': paid_by_me,
    })

def group_payments(payments):
    grouped = {
        'group': {},
        'user': {}
    }

    for payment in payments:
        if payment['group_id'] is not None:
            if payment['group_id'] not in grouped['group']:
                grouped['group'][payment['group_id']] = {}

            grouped['group'][payment['group_id']][payment['user_id']] = payment
        else :
            grouped['user'][payment['user_id']] = payment

    return grouped

def get_transactions(user_id: int):
    # Group transactions you owe
    group_owe = db.session.query(
        literal('group').label('type'),
        literal('owe').label('action'),
        Expense.group_id.label('group_id'),
        ExpenseDebit.user_id.label('user_id'),
        func.sum(ExpenseDebit.amount).label('total_amount')
    ).join(
        Expense,
        ExpenseDebit.expense_id == Expense.id
    ).filter(
        ExpenseDebit.user_id == user_id,
        Expense.group_id.isnot(None)
    ).group_by(
        Expense.group_id,
        ExpenseDebit.user_id
    )

    # Group transactions owed to you
    group_owed = db.session.query(
        literal('group').label('type'),
        literal('owed').label('action'),
        Expense.group_id.label('group_id'),
        ExpenseDebit.user_id.label('user_id'),
        func.sum(ExpenseDebit.amount).label('total_amount')
    ).join(
        Expense,
        ExpenseDebit.expense_id == Expense.id
    ).filter(
        Expense.user_id == user_id,
        Expense.group_id.isnot(None)
    ).group_by(
        Expense.group_id,
        ExpenseDebit.user_id
    )

    # Combine group transactions and join with groups
    group_union = union_all(group_owe, group_owed).subquery()

    group_transactions = db.session.query(
        group_union.c.type.label('type'),
        group_union.c.action.label('action'),
        group_union.c.group_id.label('group_id'),
        group_union.c.user_id.label('user_id'),
        Group.name.label('name'),
        group_union.c.total_amount.label('total_amount')
    ).join(
        Group,
        Group.id == group_union.c.group_id
    )

    # User transactions you owe
    user_owe = db.session.query(
        literal('user').label('type'),
        literal('owe').label('action'),
        Expense.user_id.label('user_id'),
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
        ExpenseDebit.user_id.label('user_id'),
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
        literal(None).label('group_id'),
        user_union.c.user_id.label('user_id'),
        User.username.label('name'),
        user_union.c.total_amount.label('total_amount')
    ).join(
        User,
        User.id == user_union.c.user_id
    )

    # Final combined query with ordering
    final_query = union_all(
        group_transactions, user_transactions
    ).order_by('name')

    # Return results
    return db.session.execute(final_query).all()
