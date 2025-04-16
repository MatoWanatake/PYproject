from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

from app.forms.groups_form import GroupPostForm
from app.models import Group, db, GroupMember

groups_post_blueprint = Blueprint('groups_post_blueprint', __name__)


@groups_post_blueprint.route("", methods=['POST'])
@login_required
def groups_post():
    # Format user input
    form = GroupPostForm(request)

    # Validate input
    if form.validate_on_submit():
        # Get values
        ids = form.data.get("ids")

        # Create the group
        group = Group(name=form.data.get("name"), description=form.data.get("description"))

        # Add group to the transaction and flush so the primary key is generated
        db.session.add(group)
        db.session.flush()

        # Add current user to the group
        db.session.add(GroupMember(group_id=group.id, user_id=current_user.id))

        # Add friends (ids)
        if ids is not None and isinstance(ids, list):
            for friend_id in ids:
                # You are already added to the group
                if friend_id == current_user.id:
                    continue

                # Create user to friend link
                db.session.add(GroupMember(group_id=group.id, user_id=friend_id))

        # Commit all changes
        db.session.commit()

        # Return the new group
        return jsonify(group.to_dict()), 201

    # Abort with error
    return jsonify(form.errors), 400
