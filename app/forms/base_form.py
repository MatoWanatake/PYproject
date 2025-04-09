from flask import Request
from flask_wtf import FlaskForm


class BaseForm(FlaskForm):
    def __init__(self, request: Request):
        super().__init__()

        self['csrf_token'].data = request.cookies['csrf_token']
