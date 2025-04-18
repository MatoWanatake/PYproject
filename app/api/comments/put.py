from flask import Blueprint, request, jsonify
from flask_login import login_required

from app.api.comments.get import valid_comment
from app.forms.comments_form import CommentsPutForm
from app.models import db

comments_put_blueprint = Blueprint('comments_put_blueprint', __name__)


@comments_put_blueprint.route("/<int:comment_id>", methods=['POST'])
@login_required
def expense_comment_put(comment_id: int):
    # Make sure current user has access to the expense
    try:
        comment = valid_comment(comment_id)
    except ValueError:
        return {"error": {"message": "Invalid comment"}}, 404

    # Format user input
    form = CommentsPutForm(request)

    # Validate input
    if form.validate_on_submit():
        # Update
        comment.title = form.data.get("title")
        comment.body = form.data.get("body")

        # Commit remaining changes
        db.session.commit()

        # Return the new group
        return jsonify(comment.to_dict()), 201

    # Abort with error
    return jsonify(form.errors), 400
