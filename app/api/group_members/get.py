from flask import Blueprint
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload

from app.api.groups.get import valid_group
from app.models import GroupMember

group_members_get_blueprint = Blueprint('group_members_get_blueprint', __name__)


@group_members_get_blueprint.route("/<int:group_id>/members", methods=['GET'])
@login_required
def group_members_get(group_id: int):
    # Make sure current user has access to the group
    try:
        valid_group(group_id)
    except ValueError:
        return {"error": {"message": "Invalid group"}}, 404

    # Return all members of the group
    return [
        friend.user.to_dict(True) for friend in GroupMember.query.options(
            joinedload(GroupMember.user),
        ).filter(
            GroupMember.group_id == group_id,
            GroupMember.user_id != current_user.id
        ).all()
    ]
