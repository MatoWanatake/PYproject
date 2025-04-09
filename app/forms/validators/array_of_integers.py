from wtforms.validators import ValidationError


class ArrayOfIntegers:
    def __call__(self, form, field):
        # Parse the JSON string input into a Python object
        data = field.data
        if not isinstance(data, list):
            raise ValidationError("Data must be a JSON array.")

        # Ensure every element in the array is an integer
        if not all(isinstance(item, int) for item in data):
            raise ValidationError("Array must only contain integers.")
