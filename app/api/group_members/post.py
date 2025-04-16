from flask import Blueprint, jsonify, request
from flask_login import login_required

from app.api.group_members.get import group_members_get
from app.api.groups.get import valid_group
from app.forms.group_members_form import GroupMembersDeleteForm, GroupMembersAddForm
from app.models import db, GroupMember

group_members_post_blueprint = Blueprint('group_members_post_blueprint', __name__)


@group_members_post_blueprint.route("/<int:group_id>/members/add", methods=['POST'])
@login_required
def group_members_add(group_id: int):
    # Make sure current user has access to the group
    try:
        valid_group(group_id)
    except ValueError:
        return {"error": {"message": "Invalid group"}}, 404

    # Format user input
    form = GroupMembersAddForm(request)

    if form.validate_on_submit():
        # Add group members
        for member_id in form.data.get("ids"):
            db.session.add(GroupMember(
                group_id=group_id, user_id=member_id
            ))

        # Commit remaining changes
        db.session.commit()

        # Return group members
        return group_members_get(group_id)

    # Abort with error
    return jsonify(form.errors), 400


@group_members_post_blueprint.route("/<int:group_id>/members/delete", methods=['POST'])
@login_required
def group_members_delete(group_id: int):
    # Make sure current user has access to the group
    try:
        valid_group(group_id)
    except ValueError:
        return {"error": {"message": "Invalid group"}}, 404

    # Format user input
    form = GroupMembersDeleteForm(request)

    if form.validate_on_submit():
        # Delete group members
        for member_id in form.data.get("ids"):
            db.session.query(
                GroupMember
            ).filter(
                GroupMember.group_id == group_id, GroupMember.user_id == member_id
            ).delete()

        # Commit remaining changes
        db.session.commit()

        # Return group members
        return group_members_get(group_id)

    # Abort with error
    return jsonify(form.errors), 400
