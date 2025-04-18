from flask_login import current_user

from app.models import Comment


def valid_comment(comment_id: int) -> Comment:
    # Look up comment
    comment = Comment.query.get(comment_id)

    # If the comment isn't owned by the user block editing
    if current_user.id != comment.user_id:
        raise ValueError

    # Return comment
    return comment
