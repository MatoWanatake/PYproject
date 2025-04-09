from flask import Blueprint, jsonify
from flask_login import login_required, current_user

from app.models import Expense

expense_debits_get_blueprint = Blueprint('expense_debits_get_blueprint', __name__)


@expense_debits_get_blueprint.route("", methods=['GET'])
@login_required
def expense_debits_get():
    pass