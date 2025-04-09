from flask import Blueprint
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload

from app.models import Friend

friends_get_blueprint = Blueprint('friends_get_blueprint', __name__)


@friends_get_blueprint.route("", methods=['GET'])
@login_required
def friends_get():
    # https://medium.com/@thinesh12/unlocking-the-power-of-composite-primary-keys-in-sqlalchemy-b378fb975e9b
    # Return all friends of the current user
    return [
        friend.user.to_dict(True) for friend in Friend.query.options(
            joinedload(Friend.user),
            joinedload(Friend.friend),
        ).filter_by(
            user_id=current_user.id
        ).all()
    ]
