from flask import Blueprint
from flask_login import login_required

expense_debits_post_blueprint = Blueprint('expense_debits_post_blueprint', __name__)


@expense_debits_post_blueprint.route("", methods=['POST'])
@login_required
def expense_debits_post():
    pass
