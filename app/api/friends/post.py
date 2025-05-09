from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.api.friends.get import friends_get
from app.forms.friends_form import FriendsAddForm, FriendsDeleteForm
from app.models import Friend, User, db

friends_post_blueprint = Blueprint('friends_post_blueprint', __name__)


@friends_post_blueprint.route("/add", methods=['POST'])
@login_required
def friends_add():
    # Format user input
    form = FriendsAddForm(request)

    # Validate input
    if form.validate_on_submit():
        # Get values
        ids = form.data.get("ids")
        emails = form.data.get("emails")

        # Add friends (ids)
        if ids is not None and isinstance(ids, list):
            for friend_id in ids:
                # You cannot friend yourself
                if friend_id == current_user.id:
                    continue

                # Create user to friend link
                db.session.add(Friend(
                    user_id=current_user.id, friend_id=friend_id
                ))

                # Create friend to user link
                db.session.add(Friend(
                    user_id=friend_id, friend_id=current_user.id
                ))

        # Add friends (emails)
        if emails is not None and isinstance(emails, list):
            for email in emails:
                # Look up user id by email
                user = User.query.filter_by(email=email).first()

                # Add if user found
                if user is not None:
                    # Create user to friend link
                    db.session.add(Friend(
                        user_id=current_user.id, friend_id=user.id
                    ))

                    # Create friend to user link
                    db.session.add(Friend(
                        user_id=user.id, friend_id=current_user.id
                    ))

        # Commit remaining changes
        db.session.commit()

        # Return friends
        return friends_get()

    # Abort with error
    return jsonify(form.errors), 400


@friends_post_blueprint.route("/delete", methods=['POST'])
@login_required
def friends_delete():
    form = FriendsDeleteForm(request)

    if form.validate_on_submit():
        # Delete friends
        for friend_id in form.data.get("ids"):
            # Delete user to friend link
            db.session.query(
                Friend
            ).filter(
                Friend.user_id == current_user.id, Friend.friend_id == friend_id
            ).delete()

            # Delete friend to user link
            db.session.query(
                Friend
            ).filter(
                Friend.user_id == friend_id, Friend.friend_id == current_user.id
            ).delete()

        # Commit remaining changes
        db.session.commit()

        # Return friends
        return friends_get()

    # Abort with error
    return jsonify(form.errors), 400
