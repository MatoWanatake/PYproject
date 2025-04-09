from wtforms.validators import ValidationError


class ArrayOfDebits:
    def __init__(self, message=None, keys=None):
        self.message = message
        self.key = keys or ["id", "amount"]

    def __call__(self, form, field):
        # Parse the JSON string input into a Python object
        data = field.data
        if data and not isinstance(data, list):
            raise ValidationError("Data must be a JSON array.")

        # Ensure every element in the array is an integer
        if not all(self.valid_keys(item) for item in data):
            raise ValidationError("Array must only contain objects with the keys id and amount.")

    def valid_keys(self, data):
        if not isinstance(data, dict):
            return False

        return set(data.keys()) == set(self.key)
