from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

from app.api.expense_friends.get import is_friend
from app.api.groups.get import valid_group
from app.forms.expense_credits_form import ExpenseCreditsPostForm
from app.models import db, ExpenseCredit

expense_credits_post_blueprint = Blueprint('expense_credits_post_blueprint', __name__)


@expense_credits_post_blueprint.route("", methods=['POST'])
@login_required
def expense_credits_post():
    # Format user input
    form = ExpenseCreditsPostForm(request)

    # Validate input
    if form.validate_on_submit():
        # Get paid to
        paid_to = form.data.get("paid_to")

        # Make sure paid to is actually a friend
        try:
            is_friend(paid_to)
        except ValueError:
            return {"error": {"message": "Invalid friend"}}, 404

        # Get group id
        group_id = form.data.get("group_id")

        # If a group id is provided make sure the current user is part of the group
        if group_id is not None:
            valid_group(group_id)

        # Create the group
        credit = ExpenseCredit(
            paid_by=current_user.id,
            paid_to=form.data.get("paid_to"),
            amount=form.data.get("amount"),
            group_id=form.data.get("group_id")
        )

        # Add credit
        db.session.add(credit)

        # Commit remaining changes
        db.session.commit()

        # Return the new group
        return jsonify(credit.to_dict()), 201

    # Abort with error
    return jsonify(form.errors), 400
