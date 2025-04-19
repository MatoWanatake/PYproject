from flask import Blueprint
from flask_login import login_required

expense_debits_put_blueprint = Blueprint('expense_debits_put_blueprint', __name__)


@expense_debits_put_blueprint.route("/<int:expense_debit_id>", methods=['PUT'])
@login_required
def expense_debits_put(expense_debit_id: int):
   pass
