from wtforms.validators import ValidationError


class ArrayOfStrings:
    def __call__(self, form, field):
        # Get data
        data = field.data

        # Ignore is missing
        if data is None:
            return

        # Ensure data is an array of only strings
        if not isinstance(data, list) or not all(isinstance(item, str) for item in data):
            raise ValidationError("Must be an array of only strings.")
