from flask import Blueprint
from flask_login import login_required

from app.api.groups.get import valid_group, groups_get
from app.models import db, Group

groups_delete_blueprint = Blueprint('groups_delete_blueprint', __name__)


@groups_delete_blueprint.route("/<int:group_id>", methods=['DELETE'])
@login_required
def groups_delete(group_id: int):
    # Make sure current user has access to the group
    try:
        valid_group(group_id)
    except ValueError:
        return {"error": {"message": "Invalid group"}}, 404

    # Delete the group
    db.session.query(
        Group
    ).filter(
        Group.id == group_id
    ).delete()

    # Commit remaining changes
    db.session.commit()

    # Return all groups the current user belongs to
    return groups_get()
