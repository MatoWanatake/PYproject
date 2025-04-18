from flask import Blueprint
from flask_login import login_required

from app.api.comments.get import valid_comment
from app.api.expenses.get import expense_comments_get
from app.models import db, Comment

comments_delete_blueprint = Blueprint('comments_delete_blueprint', __name__)


@comments_delete_blueprint.route("/<int:comment_id>", methods=['DELETE'])
@login_required
def comments_delete(comment_id: int):
    # Make sure current user has access to the comment
    try:
        comment = valid_comment(comment_id)
    except ValueError:
        return {"error": {"message": "Invalid comment"}}, 404

    # Delete the expense
    db.session.query(
        Comment
    ).filter(
        Comment.id == comment_id
    ).delete()

    # Commit remaining changes
    db.session.commit()

    # Return all expenses the current user belongs to
    return expense_comments_get(comment.expense_id)
