from wtforms.fields.core import Field


class PassThroughField(Field):
    # https://code.luasoftware.com/tutorials/flask/flask-wtforms-accept-json-array
    def process_formdata(self, valuelist):
        self.data = valuelist
