from wtforms.validators import DataRequired


class Required(DataRequired):
    def __init__(self, message="This field is required"):
        super().__init__(message)