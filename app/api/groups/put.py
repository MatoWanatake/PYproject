from flask import Blueprint, request, jsonify
from flask_login import login_required

from app.api.groups.get import valid_group
from app.forms.groups_form import GroupPutForm
from app.models import db

groups_put_blueprint = Blueprint('groups_put_blueprint', __name__)


@groups_put_blueprint.route("/<int:group_id>", methods=['PUT'])
@login_required
def groups_put(group_id: int):
    # Make sure current user has access to the group
    try:
        group = valid_group(group_id)
    except ValueError:
        return {"error": {"message": "Invalid group"}}, 404

    # Format user input
    form = GroupPutForm(request)

    # Validate input
    if form.validate_on_submit():
        # Update
        group.name = form.data.get("name")
        group.description = form.data.get("description")

        # Commit remaining changes
        db.session.commit()

        # Return group
        return jsonify(group.to_dict())

    # Abort with error
    return jsonify(form.errors), 400
