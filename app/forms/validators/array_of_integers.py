from wtforms.validators import ValidationError


class ArrayOfIntegers:
    def __call__(self, form, field):
        # Ignore is missing
        if field.data is None:
            return

        # Get data
        try:
            data = [int(item) for item in field.data]
        except ValueError:
            raise ValidationError("Must be an array of integers.")

        # Ensure data is an array of only integers
        if not isinstance(data, list) or not all(isinstance(item, int) for item in data):
            raise ValidationError("Must be an array of only integers.")
