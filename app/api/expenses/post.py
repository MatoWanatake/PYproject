from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

from app.api.groups.get import valid_group
from app.forms.expenses_form import ExpensesPostForm
from app.models import db, Expense, ExpenseDebit

expenses_post_blueprint = Blueprint('expenses_post_blueprint', __name__)


@expenses_post_blueprint.route("", methods=['POST'])
@login_required
def groups_post():
    # Format user input
    form = ExpensesPostForm(request)

    # Validate input
    if form.validate_on_submit():
        # Get group id
        group_id = form.data.get("group_id")

        # If a group id is provided make sure the current user is part of the group
        if group_id is not None:
            valid_group(group_id)

        # Create the group
        expense = Expense(
            user_id=current_user.id,
            title=form.data.get("title"),
            amount=form.data.get("amount"),
            group_id=form.data.get("group_id")
        )

        # Add group to the transaction and flush so the primary key is generated
        db.session.add(expense)
        db.session.flush()

        # Add debits for the expenses
        for debit in form.data.get("debits"):
            db.session.add(ExpenseDebit(
                expense_id=expense.id, user_id=debit.get("user_id"), amount=debit.get("amount")
            ))

        # Commit remaining changes
        db.session.commit()

        # Return the new group
        return jsonify(expense.to_dict()), 201

    # Abort with error
    return jsonify(form.errors), 400
