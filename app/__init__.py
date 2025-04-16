import os
from sqlite3 import Connection as SQLite3Connection

from flask import Flask, request, redirect
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from sqlalchemy import event
from sqlalchemy.engine import Engine

from .api.auth_routes import auth_routes
from .api.expense_credits import expense_credits_get_blueprint, expense_credits_post_blueprint, \
    expense_credits_put_blueprint, expense_credits_delete_blueprint
from .api.expense_debits import expense_debits_get_blueprint, expense_debits_post_blueprint, \
    expense_debits_put_blueprint, expense_debits_delete_blueprint
from .api.expense_friends import expenses_friend_get_blueprint
from .api.expense_groups.get import expenses_group_get_blueprint
from .api.expenses import expenses_get_blueprint, expenses_post_blueprint, expenses_put_blueprint, \
    expenses_delete_blueprint
from .api.friends import friends_get_blueprint, friends_post_blueprint
from .api.group_members import group_members_get_blueprint, group_members_post_blueprint
from .api.groups import groups_get_blueprint, groups_post_blueprint, groups_put_blueprint, groups_delete_blueprint
from .api.user_routes import user_routes
from .api.users import users_get_blueprint
from .config import Config
from .models import db, User
from .seeds import seed_commands

app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)

app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')

# Users
app.register_blueprint(users_get_blueprint, url_prefix='/api/users')

# Friends
app.register_blueprint(friends_get_blueprint, url_prefix='/api/friends')
app.register_blueprint(friends_post_blueprint, url_prefix='/api/friends')

# Expenses
expenses_url_prefix = '/api/expenses'
app.register_blueprint(expenses_get_blueprint, url_prefix=expenses_url_prefix)
app.register_blueprint(expenses_post_blueprint, url_prefix=expenses_url_prefix)
app.register_blueprint(expenses_put_blueprint, url_prefix=expenses_url_prefix)
app.register_blueprint(expenses_delete_blueprint, url_prefix=expenses_url_prefix)

# Expense Credits
expense_credits_url_prefix = expenses_url_prefix + '/credits'
app.register_blueprint(expense_credits_get_blueprint, url_prefix=expense_credits_url_prefix)
app.register_blueprint(expense_credits_post_blueprint, url_prefix=expense_credits_url_prefix)
app.register_blueprint(expense_credits_put_blueprint, url_prefix=expense_credits_url_prefix)
app.register_blueprint(expense_credits_delete_blueprint, url_prefix=expense_credits_url_prefix)

# Expense Debits
expense_debits_url_prefix = expenses_url_prefix + '/debits'
app.register_blueprint(expense_debits_get_blueprint, url_prefix=expense_debits_url_prefix)
app.register_blueprint(expense_debits_post_blueprint, url_prefix=expense_debits_url_prefix)
app.register_blueprint(expense_debits_put_blueprint, url_prefix=expense_debits_url_prefix)
app.register_blueprint(expense_debits_delete_blueprint, url_prefix=expense_debits_url_prefix)

# Expense Details
app.register_blueprint(expenses_friend_get_blueprint, url_prefix='/api/expense-friend')
app.register_blueprint(expenses_group_get_blueprint, url_prefix='/api/expense-group')

# Groups
group_url_prefix = '/api/groups'
app.register_blueprint(groups_get_blueprint, url_prefix=group_url_prefix)
app.register_blueprint(groups_post_blueprint, url_prefix=group_url_prefix)
app.register_blueprint(groups_put_blueprint, url_prefix=group_url_prefix)
app.register_blueprint(groups_delete_blueprint, url_prefix=group_url_prefix)

# Group Members
app.register_blueprint(group_members_get_blueprint, url_prefix='/api/groups')
app.register_blueprint(group_members_post_blueprint, url_prefix='/api/groups')

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Make sure the sqlite respects foreign key actions
# https://stackoverflow.com/a/15542046
@event.listens_for(Engine, "connect")
def _set_sqlite_pragma(dbapi_connection, _):
    if isinstance(dbapi_connection, SQLite3Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON;")
        cursor.close()


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = {rule.rule: [[method for method in rule.methods if method in acceptable_methods],
                              app.view_functions[rule.endpoint].__doc__]
                  for rule in app.url_map.iter_rules() if rule.endpoint != 'static'}
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
