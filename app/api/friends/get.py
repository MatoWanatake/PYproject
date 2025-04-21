from flask import Blueprint, jsonify
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
        friend.friend.to_dict(True) for friend in Friend.query.options(
            joinedload(Friend.user),
            joinedload(Friend.friend),
        ).filter_by(
            user_id=current_user.id
        ).all()
    ]


@friends_get_blueprint.route("/<int:friend_id>", methods=['GET'])
@login_required
def friend_get(friend_id: int):
    # Early out if current user is the requested user
    if friend_id == current_user.id:
        return jsonify(current_user.to_dict())

    # Make sure current user is friends with the requested user
    try:
        friend = is_friend(friend_id)
    except ValueError:
        return {"error": {"message": "Invalid friend"}}, 404

    # Return group
    return jsonify(friend.friend.to_dict())


def is_friend(friend_id: int) -> Friend:
    # Early out if current user is the requested user
    if friend_id == current_user.id:
        return current_user

    # Look up friendship
    friend = Friend.query.options(
        joinedload(Friend.user)
    ).get([current_user.id, friend_id])

    # If nothing is return
    if not friend:
        raise ValueError

    # Return friendship
    return friend
