from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload

from app.models import ExpenseDebit, Expense

expense_debits_get_blueprint = Blueprint('expense_debits_get_blueprint', __name__)


@expense_debits_get_blueprint.route("", methods=['GET'])
@login_required
def expense_debits_get():
    # Return all expense debits
    return jsonify([
        {
            "debit": debit.to_dict(),
            "expense": debit.expense.to_dict(),
            "user": debit.expense.user.to_dict(),
            "group": debit.expense.group.to_dict() if debit.expense.group else None
        } for debit in ExpenseDebit.query.options(
            joinedload(ExpenseDebit.expense).joinedload(Expense.group),
            joinedload(ExpenseDebit.expense).joinedload(Expense.user),
        ).filter_by(
            user_id=current_user.id
        ).all()
    ])
