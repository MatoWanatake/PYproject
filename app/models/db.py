import os

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

if SCHEMA:
    metadata = MetaData(schema=SCHEMA)
else:
    metadata = MetaData()
db = SQLAlchemy(metadata=metadata)


# helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr
