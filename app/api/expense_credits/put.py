from flask import Blueprint, request, jsonify
from flask_login import login_required

from app.api.expense_credits.get import valid_expense_credit
from app.forms.expense_credits_form import ExpenseCreditsPutForm
from app.models import db

expense_credits_put_blueprint = Blueprint('expense_credits_put_blueprint', __name__)


@expense_credits_put_blueprint.route("/<int:expense_credit_id>", methods=['PUT'])
@login_required
def expense_credits_put(expense_credit_id: int):
    # Make sure current user has access to the expense
    try:
        credit = valid_expense_credit(expense_credit_id)
    except ValueError:
        return {"error": {"message": "Invalid expense"}}, 404

        # Format user input
    form = ExpenseCreditsPutForm(request)

    # Validate input
    if form.validate_on_submit():
        # Update
        credit.paid_to = form.data.get("paid_to")
        credit.amount = form.data.get("amount")

        # Commit remaining changes
        db.session.commit()

        # Return the new group
        return jsonify(credit.to_dict())

    # Abort with error
    return jsonify(form.errors), 400
