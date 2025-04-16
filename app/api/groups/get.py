from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload

from app.models import GroupMember, Group

groups_get_blueprint = Blueprint('groups_get_blueprint', __name__)


@groups_get_blueprint.route("", methods=['GET'])
@login_required
def groups_get():
    # Return all groups the current user belongs to
    return jsonify([
        group_member.group.to_dict() for group_member in GroupMember.query.options(
            joinedload(GroupMember.group)
        ).filter_by(
            user_id=current_user.id
        ).all()
    ])


def valid_group(group_id: int) -> Group:
    # Check to see if current user is part of the requested group
    member = GroupMember.query.options(
        joinedload(GroupMember.group),
    ).get([group_id, current_user.id])

    # If no result either group doesn't exist or user isn't part of the group
    if not member:
        raise ValueError

    # Return group
    return member.group
